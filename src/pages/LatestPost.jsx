import { useEffect, useState } from "react";
import { client } from "../sanityClient";
import Post from "../components/Post";

const query = `*[_type == "post"] | order(publishedAt desc) [0] {
  title, slug, publishedAt, photo, caption, essay,
  "prev": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc) [0].slug
}`;

export default function LatestPost() {
  const [post, setPost] = useState(null);
  useEffect(() => {
    client.fetch(query).then(setPost);
  }, []);
  return post ? <Post post={post} /> : null;
}
