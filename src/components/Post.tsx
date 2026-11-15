import { urlFor } from "../sanityClient";
import { PortableText } from "@portabletext/react";
import NavButton from "./NavButton";

interface PostData {
  photo: {
    alt?: string;
  };
  caption?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  note: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  figures?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originalLetterPages?: any[];
  next?: {
    current: string;
  };
  prev?: {
    current: string;
  };
}

export default function Post({ post }: { post: PostData }) {
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
        <PortableText value={post.note} />
      </article>
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
