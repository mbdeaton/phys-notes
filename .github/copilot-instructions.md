# Project guide

Phys-Notes is a Vite + React + TypeScript site. `src/App.tsx` defines routes; `src/pages/` contains route pages; `src/components/` holds reusable UI and post rendering. Sanity is the headless CMS: `src/sanityClient.ts` configures access and image URLs, and `src/types.ts` defines post data. Global styles live in `src/index.css`.

## Rules
- Prefer simple, focused changes and clean, consistent TypeScript.
- Keep dependencies minimal; use existing libraries and patterns.
- Reuse components and shared types; avoid needless abstraction.
- Preserve the site's content conventions in `POSTING.md`.
- Keep testing small and maintainable: prefer a minimal Playwright suite with a few live smoke checks and focused mocked cases for speccing behavior.
- Favor simple, readable tests and low-maintenance fixtures over extra abstractions or BDD layers.
- Validate changes with the relevant project checks, such as `npm run check`, `npm run lint`, `npm run build`. Run `npm run test:e2e` when changing behavior.
