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
      <nav>
        {post.prev && <Link to={`/posts/${post.prev.current}`}>← Prev</Link>}
        {post.next && <Link to={`/posts/${post.next.current}`}>Next →</Link>}
      </nav>
    </main>
  );
}
