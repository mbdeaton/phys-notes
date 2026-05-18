import { urlFor } from "../sanityClient";
import { PortableText } from "@portabletext/react";
import { Link } from "react-router-dom";

export default function Post({ post }) {
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
        {post.next && <Link to={`/posts/${post.next.current}`}>← Newer</Link>}
        {post.prev && <Link to={`/posts/${post.prev.current}`}>Older →</Link>}
      </nav>
    </main>
  );
}
