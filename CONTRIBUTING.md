# Contributing

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
Push to `main`--Netlify auto-deploys on every push, no manual deploy step.