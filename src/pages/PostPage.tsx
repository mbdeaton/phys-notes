import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../sanityClient";
import Post from "../components/Post";

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

const query = (
  slug: string,
) => `*[_type == "post" && slug.current == "${slug}"] [0] {
  title, slug, publishedAt, photo, caption, essay,
  "prev": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc) [0].slug,
  "next": *[_type == "post" && publishedAt > ^.publishedAt] | order(publishedAt asc) [0].slug
}`;

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  useEffect(() => {
    if (slug) {
      client.fetch(query(slug)).then(setPost);
    }
  }, [slug]);
  return post ? <Post post={post} /> : null;
}
