import { useEffect, useState, type ComponentProps } from "react";
import { client } from "../sanityClient";
import Post from "../components/Post";

type PostData = ComponentProps<typeof Post>["post"];

const query = `*[_type == "post"] | order(publishedAt desc) [0] {
  title, slug, publishedAt, photo, caption, note, figures, originalLetterPages,
  "prev": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc) [0].slug
}`;

export default function LatestPost() {
  const [post, setPost] = useState<PostData | null>(null);
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
