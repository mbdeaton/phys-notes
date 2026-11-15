import { urlFor } from "../sanityClient";
import type { PostData, PostFigure } from "../types";

export function InlineFigure({ figure }: { figure: PostFigure }) {
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

export function OriginalLetterPages({
  pages,
}: {
  pages: NonNullable<PostData["originalLetterPages"]>;
}) {
  if (pages.length === 0) return null;

  return (
    <details className="post-original-letter">
      <summary>View the original handwritten letter</summary>
      <div className="post-original-letter-pages">
        {pages.map((page, index) => (
          <figure
            key={page.asset._ref ?? index}
            className="post-original-letter-page"
          >
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
