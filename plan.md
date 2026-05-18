# Deployment Plan: Nature Physics Blog

## 1. Sanity Project Setup

1. Go to [sanity.io](https://sanity.io) → create a free account → **New Project**
2. Name it (e.g. `nature-physics`), choose **Clean project**, dataset name `production`
3. Note your **Project ID** from the project dashboard

## 2. Create the Git Repo

```bash
# Scaffold Vite + React app
npm create vite@latest nature-physics -- --template react
cd nature-physics
git init
git add .
git commit -m "init"
```

Push to a new GitHub repo (public or private — Netlify supports both).

## 3. Install Dependencies

```bash
npm install @sanity/client @sanity/image-url react-router-dom
```

## 4. Configure the Sanity Client

Create `src/sanityClient.js`:

```js
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)
```

Create `.env` at the project root:

```
VITE_SANITY_PROJECT_ID=your_project_id_here
```

Add `.env` to `.gitignore`.

## 5. Define the Sanity Schema

In the Sanity project directory (created separately via `npm create sanity@latest`), define `schemas/post.js`:

```js
export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    { name: 'title',       type: 'string',   title: 'Title' },
    { name: 'slug',        type: 'slug',     title: 'Slug', options: { source: 'title' } },
    { name: 'publishedAt', type: 'datetime', title: 'Published At' },
    { name: 'photo',       type: 'image',    title: 'Photo', options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] },
    { name: 'caption',     type: 'text',     title: 'Caption (30–100 words)' },
    { name: 'essay',       type: 'array',    title: 'Essay',
      of: [{ type: 'block' }] },
  ],
}
```

Deploy the Studio: `npx sanity deploy` → gives you a free `yourname.sanity.studio` URL.

## 6. Build the React App

**`src/App.jsx`** — routing:
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LatestPost from './pages/LatestPost'
import PostPage from './pages/PostPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LatestPost />} />
        <Route path="/posts/:slug" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

**`src/pages/LatestPost.jsx`** — fetch most recent post:
```jsx
import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import Post from '../components/Post'

const query = `*[_type == "post"] | order(publishedAt desc) [0] {
  title, slug, publishedAt, photo, caption, essay,
  "prev": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc) [0].slug
}`

export default function LatestPost() {
  const [post, setPost] = useState(null)
  useEffect(() => { client.fetch(query).then(setPost) }, [])
  return post ? <Post post={post} /> : null
}
```

**`src/pages/PostPage.jsx`** — fetch by slug:
```jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../sanityClient'
import Post from '../components/Post'

const query = (slug) => `*[_type == "post" && slug.current == "${slug}"] [0] {
  title, slug, publishedAt, photo, caption, essay,
  "prev": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc) [0].slug,
  "next": *[_type == "post" && publishedAt > ^.publishedAt] | order(publishedAt asc) [0].slug
}`

export default function PostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  useEffect(() => { client.fetch(query(slug)).then(setPost) }, [slug])
  return post ? <Post post={post} /> : null
}
```

**`src/components/Post.jsx`** — renders image, caption, essay, nav:
```jsx
import { urlFor } from '../sanityClient'
import { PortableText } from '@portabletext/react'
import { Link } from 'react-router-dom'

// npm install @portabletext/react

export default function Post({ post }) {
  return (
    <main>
      <img
        src={urlFor(post.photo).width(1200).format('webp').url()}
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
  )
}
```

Install the portable text renderer:
```bash
npm install @portabletext/react
```

## 7. Style It

Keep CSS minimal. Key rules in `src/index.css`:

```css
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: Georgia, serif;
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: #fff;
  color: #111;
  line-height: 1.7;
}

img { width: 100%; height: auto; display: block; }

.caption {
  margin: 1rem 0 2rem;
  font-style: italic;
  color: #444;
}

article { font-size: 1.1rem; }
article p { margin-bottom: 1.5rem; }

nav {
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
}
```

This is intentionally bare — refine to taste.

## 8. Deploy to Netlify

1. Push all code to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Select your repo
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Under **Site configuration → Environment variables**, add:
   - `VITE_SANITY_PROJECT_ID` = your project ID
6. Click **Deploy** — done

Netlify will auto-deploy on every `git push`.

## 9. Allow Netlify's Domain in Sanity CORS

In your Sanity project dashboard → **API → CORS Origins**, add your Netlify URL (e.g. `https://yoursite.netlify.app`).

## 10. Publishing Workflow (ongoing)

1. Open `yourname.sanity.studio` in the browser
2. Create a new **Post** — upload photo, write caption + essay, set date
3. Click **Publish**
4. Site reflects new post immediately — no code change or deploy needed

---

## Extensibility Notes

- **New pages:** add a route in `App.jsx` and a new component in `src/pages/`
- **Post index/archive:** add a `*[_type == "post"] | order(publishedAt desc)` query and a new page
- **Math rendering:** drop in `katex` or `react-katex` for LaTeX in essays
- **RSS feed:** generate at build time with a Netlify serverless function
- **Custom domain:** add it in Netlify's domain settings for free (you just pay the registrar)
