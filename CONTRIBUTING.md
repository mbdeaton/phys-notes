# Contributing Guidelines


## Two repos
This project spans two codebases:

- [phys-notes](https://github.com/mbdeaton/phys-notes):
  the Vite/React frontend (this repo)
- [phys-notes-studio](https://github.com/mbdeaton/studio-phys-notes):
  the Sanity Studio

Frontend changes go here. Schema changes (adding or modifying content fields)
go in the Studio repo and require redeploying the Studio with
`npx sanity deploy`.


## Local dev
Frontend:
```bash
npm install
npm run dev # starts at http://localhost:5173
```

Requires a `.env` file at the project root:
```
VITE_SANITY_PROJECT_ID=project_id_here
```

The local frontend reads from the live Sanity `production` dataset, so real
content is visible immediately.

Studio:
```bash
npm install
npx sanity dev # starts at http://localhost:3333
```

Changes to the schema are reflected live in the local Studio. Deploy changes
with `npx sanity deploy`.


## Deploying the frontend
Push to `main`: Netlify auto-deploys on every push, no manual deploy step.


## Publishing workflow (ongoing)
1. Open `yourname.sanity.studio` in the browser
2. Create a new **Post** — upload photo, write caption + essay, set date
3. Click **Publish**
4. Site reflects new post immediately — no code change or deploy needed


## Extensibility notes
- **New pages:** add a route in `App.jsx` and a new component in `src/pages/`
- **Post index/archive:** add a `*[_type == "post"] | order(publishedAt desc)` query and a new page
- **Math rendering:** drop in `katex` or `react-katex` for LaTeX in essays
- **RSS feed:** generate at build time with a Netlify serverless function
- **Custom domain:** add it in Netlify's domain settings for free (you just pay the registrar)