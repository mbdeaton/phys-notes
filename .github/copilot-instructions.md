# Project guide

Phys-Notes is a Vite + React + TypeScript site. `src/App.tsx` defines routes; `src/pages/` contains route pages; `src/components/` holds reusable UI and post rendering. Sanity is the headless CMS: `src/sanityClient.ts` configures access and image URLs, and `src/types.ts` defines post data. Global styles live in `src/index.css`.

## Rules
- Prefer simple, focused changes and clean, consistent TypeScript.
- Keep dependencies minimal; use existing libraries and patterns.
- Reuse components and shared types; avoid needless abstraction.
- Preserve the site's content conventions in `POSTING.md`.
- Validate changes with `npm run check`, `npm run lint`, or `npm run build` as appropriate.
