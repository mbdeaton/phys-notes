import { urlFor } from "../sanityClient";
import { PortableText } from "@portabletext/react";
import { Link } from "react-router-dom";
import NavButton from "./NavButton";

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
          <NavButton
            to={`/posts/${post.prev.current}`}
            label="Prev"
            direction="left"
            ariaLabel="Previous post"
            className="prev"
          />
        )}
        {post.next && (
          <NavButton
            to={`/posts/${post.next.current}`}
            label="Next"
            direction="right"
            ariaLabel="Next post"
            className="next"
          />
        )}
      </nav>
    </main>
  );
}
