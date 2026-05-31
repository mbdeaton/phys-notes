import { urlFor } from "../sanityClient";
import { PortableText } from "@portabletext/react";
import { Link } from "react-router-dom";

interface PostData {
  photo: {
    alt?: string;
  };
  caption?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  essay: any;
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
      <img
        src={urlFor(post.photo).width(1200).format("webp").url()}
        alt={post.photo.alt}
      />
      <p className="caption">{post.caption}</p>
      <article>
        <PortableText value={post.essay} />
      </article>
      <nav className="post-nav">
        {post.prev && (
          <Link
            className="nav-button prev"
            to={`/posts/${post.prev.current}`}
            aria-label="Previous post"
          >
            <span className="arrow">←</span>
            <span className="label">Prev</span>
          </Link>
        )}
        {post.next && (
          <Link
            className="nav-button next"
            to={`/posts/${post.next.current}`}
            aria-label="Next post"
          >
            <span className="label">Next</span>
            <span className="arrow">→</span>
          </Link>
        )}
      </nav>
    </main>
  );
}
