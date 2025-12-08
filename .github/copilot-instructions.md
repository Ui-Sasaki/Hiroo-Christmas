# Copilot instructions for 2025christmas repo

Quick orientation
- Frontend: a Vite + React + TypeScript app at the repo root. Entry is `src/main.tsx` -> `src/App.tsx`. Uses React Router (client-side routing).
- Backend: a Next.js app in `backend/` (app directory). Server code (API routes) lives under `backend/app/api` and uses Prisma (`backend/prisma`).
- Styling: Tailwind CSS is used (see `tailwind.config.js` and `backend` Tailwind setup).

Dev/run commands
- Frontend (from repo root):
  - dev: `npm run dev` (runs Vite, default port 5173)
  - build: `npm run build` (runs `tsc -b` then `vite build`)
  - lint: `npm run lint` (eslint over project)
- Backend (in `backend/`):
  - dev: `cd backend && npm run dev` (Next dev server on port 3000)
  - build/start: `cd backend && npm run build && npm run start`

Architecture and important patterns
- The frontend is a standalone SPA using React Router. The main layout (sidebar, header, content) is in `src/App.tsx` and UI pieces are under `src/components/` (e.g. `Sidebar.tsx`, `Header.tsx`, `TransactionTable.tsx`).
- The backend is a Next.js app (app router). Example API route: `backend/app/api/products/route.ts` — it instantiates `PrismaClient` and exposes GET/POST handlers returning `Response.json(...)`.
- Database: Prisma schema lives in `backend/prisma/schema.prisma`. The dev datasource uses SQLite (`file:./dev.db`). Prisma client usage is server-side only (API routes / server components).

What Copilot agents should do (practical rules)
- Run dev servers separately when debugging: frontend `npm run dev` and backend `cd backend && npm run dev` (they are independent). Don't assume a single monorepo dev script exists.
- When editing backend API code, prefer server-side patterns: use `@prisma/client` on the server, and return HTTP Responses from route handlers (see `backend/app/api/products/route.ts`).
- For frontend changes that call the backend, use absolute URLs to the running Next server (http://localhost:3000/api/...) during local dev, or add a small wrapper in the frontend that reads a runtime base URL.
- Respect existing styling: Tailwind utility classes are the project's predominant style. Keep tailwind-first approach rather than introducing new CSS systems.

Files and locations to reference when coding
- Frontend root: `src/` (components in `src/components/`) — e.g. `src/components/Sidebar.tsx` demonstrates localized state + Tailwind usage.
- Frontend build/config: `vite.config.ts`, `tsconfig.*`, `package.json` at repo root.
- Backend: `backend/app/` (pages / API routes), `backend/package.json`, `backend/prisma/` (schema + migrations).

Small contract examples
- API: GET `/api/products` returns JSON array of products (see `backend/app/api/products/route.ts`). POST expects { name: string, price: number } and returns created product.
- Data model: Prisma models `Product` and `Transaction` (see `backend/prisma/schema.prisma`). Product has one-to-many Transactions.

Quick debugging tips
- If backend Prisma client errors appear, ensure `npx prisma generate` has been run in `backend/` and the SQLite `dev.db` is present under `backend/prisma/` (migrations are under `backend/prisma/migrations`).
- Type/TS issues for frontend: root `package.json` uses `tsc -b` as part of build; fix path/tsconfig issues by checking `tsconfig.app.json` and `tsconfig.node.json`.

Conventions to follow
- Keep UI in `src/components/` and pages in `src/pages/` for the frontend SPA. Use descriptive component names and avoid coupling components to backend shapes — use small adapters where necessary.
- Tests: there are no existing test files to mirror; add tests near the code they validate and follow the repo's TypeScript patterns.

When merging/creating files
- If you add new backend API surface, update `backend/prisma` (migrations + client) and run `npx prisma migrate dev` / `npx prisma generate` as part of the backend dev workflow.

If anything in these notes is unclear or you'd like a different focus (examples, more file references, or a template PR message), tell me which sections to expand and I'll iterate.
