import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client, urlFor } from "../sanityClient";

interface GalleryPost {
  slug: {
    current: string;
  };
  photo: {
    asset?: {
      _ref?: string;
    };
    alt?: string;
  };
}

const query = `*[_type == "post"] | order(publishedAt desc) {
  slug,
  photo
}`;

export default function GalleryPage() {
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(query)
      .then((data) => setPosts(data as GalleryPost[]))
      .catch((err) => setError(err.message || "Failed to load gallery"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="gallery-page">
      <h1>Gallery</h1>
      <div className="gallery-grid" aria-label="Post gallery">
        {posts.map((post) => (
          <Link
            key={post.slug.current}
            to={`/posts/${post.slug.current}`}
            className="gallery-item"
            aria-label={`Open post ${post.slug.current}`}
          >
            <img
              src={urlFor(post.photo)
                .width(600)
                .height(600)
                .fit("crop")
                .format("webp")
                .url()}
              alt={post.photo.alt || "Post thumbnail"}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
