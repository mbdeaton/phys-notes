import { Fragment } from "react";
import { urlFor } from "../sanityClient";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import NavButton from "./NavButton";
import { InlineFigure, OriginalLetterPages } from "./PostFigures";
import { getNoteSections } from "./postContent";
import type { PostData } from "../types";

const portableTextComponents = {
  marks: {
    link: ({ children, value }) => <a href={value?.href}>{children}</a>,
  },
} satisfies PortableTextComponents;

export default function Post({ post }: { post: PostData }) {
  const noteSections = getNoteSections(post.note ?? [], post.figures ?? []);
  return (
    <main className="post-page">
      <h1>{post.title}</h1>
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
            <PortableText
              value={section.blocks}
              components={portableTextComponents}
            />
            {section.figures.map((figure) => (
              <InlineFigure key={figure.anchor} figure={figure} />
            ))}
          </Fragment>
        ))}
      </article>
      <OriginalLetterPages pages={post.originalLetterPages ?? []} />
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
          label="Gallery"
          direction="none"
          ariaLabel="View gallery"
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
