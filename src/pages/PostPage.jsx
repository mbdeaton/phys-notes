import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../sanityClient";
import Post from "../components/Post";

const query = (slug) => `*[_type == "post" && slug.current == "${slug}"] [0] {
  title, slug, publishedAt, photo, caption, essay,
  "prev": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc) [0].slug,
  "next": *[_type == "post" && publishedAt > ^.publishedAt] | order(publishedAt asc) [0].slug
}`;

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    client.fetch(query(slug)).then(setPost);
  }, [slug]);
  return post ? <Post post={post} /> : null;
}
