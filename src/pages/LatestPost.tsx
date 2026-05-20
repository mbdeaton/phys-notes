import { useEffect, useState } from "react";
import { client } from "../sanityClient";
import Post from "../components/Post";

const query = `*[_type == "post"] | order(publishedAt desc) [0] {
  title, slug, publishedAt, photo, caption, essay,
  "prev": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc) [0].slug
}`;

export default function LatestPost() {
  const [post, setPost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(query)
      .then((data) => setPost(data))
      .catch((err) => setError(err.message || "Failed to load post"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post found.</div>;

  return <Post post={post} />;
}
