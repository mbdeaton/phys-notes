**Getting Started for Newbies (web dev newcomers, desktop engineers)**

This short guide explains how to run, test, lint, add dependencies, and deploy this Epic Stack web app (the project scaffolded with the Epic Stack). Assume you have Node.js (see `engines` in `package.json`) and Git installed.

**Prerequisites**:
- Node.js matching `engines.node` in [package.json](package.json) (this repo targets Node 22+).
- Git, Docker (optional for local container builds), Fly CLI if you plan to deploy to Fly.
- Copy environment variables: `cp .env.example .env` before running things that need env vars (Playwright, seed, etc.).

**1. How do I start up the app locally?**
- Install dependencies:

```sh
npm install
```

- Initial project setup (build assets, apply migrations, install Playwright binaries):

```sh
npm run setup
```

- Seed local DB (if you want sample data):

```sh
npm run prisma:seed
```

- Start the dev server (development mode uses Vite middleware):

```sh
npm run dev
# or with no mocks: npm run dev:no-mocks
```

- Default server port: the app prefers `PORT` or falls back to `3000`. Check the startup log for the exact URL (it prints Local and On Your Network URLs).

Notes:
- The dev server runs Vite in middleware mode, so edits trigger fast HMR and server-side rendering updates.
- Some behavior is toggled with env vars: `MOCKS=true` (development mocks), `ALLOW_INDEXING`, etc.

**2. How do I deploy?**
- This repo includes documentation for Fly.io deployment. Basic steps:
  - Install Fly CLI (`flyctl`).
  - Authenticate: `fly auth signup` (or `fly auth login`).
  - Create apps (production and staging):

```sh
fly apps create your-app-name
fly apps create your-app-name-staging
```

  - Create persistent volumes for sqlite (or follow your DB host guidance) and set secrets (e.g., `SESSION_SECRET`, `HONEYPOT_SECRET`, `ALLOW_INDEXING=false` for staging).

  - Commit your code, push to GitHub. The Epic Stack includes a GitHub Action that deploys on pushes to `main` (production) and `dev` (staging) if configured.

  - To deploy from your machine (local Fly deployment):

```sh
fly deploy
```

- Alternative: Build and run a Docker container (repo contains guidance in `other/Dockerfile`)—useful for local container testing.

**3. How do I run tests?**
- Copy env example first:

```sh
cp .env.example .env
```

- Unit / utility tests (Vitest):

```sh
npm run test     # runs vitest
npm run coverage # run with coverage
```

- End-to-end tests (Playwright):

```sh
npm run test:e2e:dev  # runs Playwright against the dev server (interactive)
# or CI-style run (uses built artifacts):
npm run test:e2e:run
```

- Type checking:

```sh
npm run typecheck
```

- There is a convenience `validate` script which runs fast tests, lint, typecheck and e2e runs in sequence (useful before merging):

```sh
npm run validate
```

**4. How do I add a new package dependency?**
- Install the package and save it to `dependencies` or `devDependencies` as appropriate:

```sh
npm install some-package
# or for dev-only:
npm install -D some-dev-package
```

- If the package has TypeScript types separate from the package, add the `@types/...` dev package where needed.
- After installing, run formatting, lint, and typecheck to catch integration issues:

```sh
npm run format
npm run lint
npm run typecheck
```

- If you added Prisma-related packages or changed the schema, run `prisma generate` and apply migrations as needed.

**5. How do I run linting locally before pushing?**
- Run ESLint across the project:

```sh
npm run lint
```

- Format code with Prettier:

```sh
npm run format
```

- Combine checks with `npm run validate` to run tests + lint + typecheck + e2e (good pre-push or CI check).

**6. Other important tips and environment notes**
- Environment variables: copy `.env.example` to `.env` for local development. Some runtime features (payments, email, third-party auth) require provider credentials.
- Default port: app uses `PORT` env var or 3000. The server prints the Local and LAN URLs on startup.
- Mocks: set `MOCKS=true` for local mock data (`npm run dev` already sets `MOCKS=true` in `package.json` script). Use `dev:no-mocks` if you want real-service behavior.
- Prisma: the repo uses Prisma v6. After modifying schema, run migrations and `prisma generate`.
- Assets & icons: If you hit missing icon imports, run `npm run build` to regenerate assets, as the project uses an icons sprite build step.
- Troubleshooting: See `docs/troubleshooting.md` for common issues like CSP, hydration mismatches, and missing icons.
- CI & deploy: The Epic Stack ships with GitHub Actions for deploying to Fly; secrets such as `FLY_API_TOKEN` should be stored in GitHub Secrets.

**Where to read more**
- Project docs: [docs/getting-started.md](docs/getting-started.md)
- Deployment details: [docs/deployment.md](docs/deployment.md)
- Testing: [docs/testing.md](docs/testing.md)
- Troubleshooting: [docs/troubleshooting.md](docs/troubleshooting.md)

---

If you'd like, I can also:
- Add a short `README` section to the repo root linking to this guide.
- Create a `Makefile` or simple shell scripts to standardize common commands (setup/start/test/lint).
