import { Fragment } from "react";
import { urlFor } from "../sanityClient";
import { PortableText } from "@portabletext/react";
import NavButton from "./NavButton";
import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";
import type { PostData, PostFigure } from "../types";

function isPortableTextSpan(
  child: PortableTextBlock["children"][number],
): child is PortableTextSpan {
  return child._type === "span";
}

function getLinkedFigureAnchors(block: PortableTextBlock) {
  const markDefs = block.markDefs ?? [];
  const anchors = new Set<string>();

  for (const child of block.children) {
    if (!isPortableTextSpan(child)) continue;

    for (const mark of child.marks ?? []) {
      const link = markDefs.find(
        (definition) => definition._key === mark && definition._type === "link",
      );
      const href = link?.href;

      if (typeof href === "string" && href.startsWith("#") && href.length > 1) {
        anchors.add(href.slice(1));
      }
    }
  }

  return [...anchors];
}

function getNoteSections(note: PortableTextBlock[], figures: PostFigure[]) {
  const figuresByAnchor = new Map(figures.map((figure) => [figure.anchor, figure]));
  const placedAnchors = new Set<string>();
  const sections: Array<{ blocks: PortableTextBlock[]; figures: PostFigure[] }> = [];
  let sectionStart = 0;

  note.forEach((block, index) => {
    const linkedFigures = getLinkedFigureAnchors(block)
      .map((anchor) => figuresByAnchor.get(anchor))
      .filter((figure): figure is PostFigure => figure !== undefined)
      .filter((figure) => {
        if (placedAnchors.has(figure.anchor)) return false;
        placedAnchors.add(figure.anchor);
        return true;
      });

    if (linkedFigures.length > 0) {
      sections.push({
        blocks: note.slice(sectionStart, index + 1),
        figures: linkedFigures,
      });
      sectionStart = index + 1;
    }
  });

  if (sectionStart < note.length) {
    sections.push({ blocks: note.slice(sectionStart), figures: [] });
  }

  return sections;
}

function InlineFigure({ figure }: { figure: PostFigure }) {
  return (
    <figure id={figure.anchor} className="post-inline-figure">
      <img
        src={urlFor(figure.image).width(960).format("webp").url()}
        alt={figure.image.alt}
        loading="lazy"
      />
      {figure.caption && <figcaption>{figure.caption}</figcaption>}
    </figure>
  );
}

function OriginalLetterPages({ pages }: { pages: NonNullable<PostData["originalLetterPages"]> }) {
  if (pages.length === 0) return null;

  return (
    <details className="post-original-letter">
      <summary>View the original handwritten letter</summary>
      <div className="post-original-letter-pages">
        {pages.map((page, index) => (
          <figure key={page.asset._ref ?? index} className="post-original-letter-page">
            <img
              src={urlFor(page).width(1200).format("webp").url()}
              alt={page.alt || `Original handwritten letter page ${index + 1}`}
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </details>
  );
}

export default function Post({ post }: { post: PostData }) {
  const noteSections = getNoteSections(post.note ?? [], post.figures ?? []);
  const originalLetterPages = post.originalLetterPages ?? [];

  return (
    <main>
      <figure>
        <img
          src={urlFor(post.photo).width(1200).format("webp").url()}
          alt={post.photo.alt}
        />
        <figcaption>{post.caption}</figcaption>
      </figure>
      <article>
        {noteSections.map((section, index) => (
          <Fragment key={index}>
            <PortableText value={section.blocks} />
            {section.figures.map((figure) => (
              <InlineFigure key={figure.anchor} figure={figure} />
            ))}
          </Fragment>
        ))}
      </article>
      {originalLetterPages.length > 0 && (
        <OriginalLetterPages pages={originalLetterPages} />
      )}
      <nav className="post-nav">
        <NavButton
          to={post.prev ? `/posts/${post.prev.current}` : undefined}
          label="Prev"
          direction="left"
          ariaLabel="Previous post"
          className="prev"
          disabled={!post.prev}
        />
        <NavButton
          to="/gallery"
          label="All"
          direction="none"
          ariaLabel="View all posts"
          className="all"
        />
        <NavButton
          to={post.next ? `/posts/${post.next.current}` : undefined}
          label="Next"
          direction="right"
          ariaLabel="Next post"
          className="next"
          disabled={!post.next}
        />
      </nav>
    </main>
  );
}
