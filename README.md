# NetLens

Monitor. Analyze. Optimize.

NetLens is a production-oriented SaaS dashboard for network visibility, device management, live monitoring, and analytics. The repository is organized as a small monorepo so the frontend and backend can evolve independently without collapsing into one oversized application.

## What Exists Right Now

- A React 19 + Vite frontend with a polished landing view.
- An Express + TypeScript backend with a health endpoint and Socket.IO server.
- Shared root tooling for formatting, linting, and monorepo orchestration.
- A folder structure prepared for Phase 2 through Phase 10 of the product plan.

## Repository Layout

### Root

The root keeps cross-cutting project rules in one place.

- [package.json](package.json) defines the workspaces and top-level scripts.
- [tsconfig.base.json](tsconfig.base.json) stores shared TypeScript rules.
- [eslint.config.js](eslint.config.js) centralizes lint behavior.
- [prettier.config.cjs](prettier.config.cjs) keeps formatting consistent.
- [.env.example](.env.example) documents root-level environment variables.

### Frontend

The [frontend](frontend) package contains the web app.

- [frontend/src/main.tsx](frontend/src/main.tsx) is the browser entry point.
- [frontend/src/App.tsx](frontend/src/App.tsx) currently renders the product landing hero.
- [frontend/src/styles/globals.css](frontend/src/styles/globals.css) holds the shared global styles and Tailwind directives.
- [frontend/src/lib/utils.ts](frontend/src/lib/utils.ts) is the home for reusable client helpers.

### Backend

The [backend](backend) package contains the API and realtime layer.

- [backend/src/server.ts](backend/src/server.ts) starts the HTTP server and Socket.IO.
- [backend/src/app.ts](backend/src/app.ts) configures the Express app and middleware.
- [backend/src/routes/health.routes.ts](backend/src/routes/health.routes.ts) exposes a health route.
- [backend/src/controllers/health.controller.ts](backend/src/controllers/health.controller.ts) returns the health payload.

## Prerequisites

- Node.js 20+ recommended, Node.js 24 works in this workspace.
- npm 10+.
- MongoDB Atlas for the database when the data layer is added.
- A modern browser for the frontend.

## Install

Run this from the repository root:

```bash
npm install
```

This installs the workspace dependencies for both packages and creates the root lockfile.

## Run Locally

### Start both apps together

```bash
npm run dev
```

This starts:

- the frontend Vite dev server on the default Vite port
- the backend API on `http://localhost:4000`

### Start only the frontend

```bash
npm run dev:frontend
```

### Start only the backend

```bash
npm run dev:backend
```

## Build

```bash
npm run build
```

The build runs the frontend production bundle first and then compiles the backend to `backend/dist`.

## Lint and Format

```bash
npm run lint
npm run format
```

Use lint before commits and format when you want the repository normalized.

## Backend Run Commands

After building the backend, you can start the compiled server with:

```bash
npm run start --workspace backend
```

## Environment Files

### Root

Use [.env.example](.env.example) as the template for top-level environment values.

### Frontend

Use [frontend/.env.example](frontend/.env.example) for Vite environment variables.

```bash
VITE_API_URL=http://localhost:4000/api
```

### Backend

Use [backend/.env.example](backend/.env.example) for API configuration.

```bash
PORT=4000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/netlens
JWT_ACCESS_SECRET=replace-with-a-long-random-secret
JWT_REFRESH_SECRET=replace-with-a-long-random-secret
CORS_ORIGIN=http://localhost:5173
```

## Current API Endpoints

- `GET /api` returns the API name and status.
- `GET /api/health` returns a basic health payload.

## Current Frontend Behavior

The current UI is a clean landing screen that establishes the visual direction for NetLens. It will be replaced by the authenticated dashboard shell in later phases.

## Why The Folder Structure Exists

- `frontend/src/components` will hold reusable UI building blocks.
- `frontend/src/features` can be added later for domain-specific client features if the app grows beyond a simple page layout.
- `frontend/src/services` is the home for API clients and request wrappers.
- `frontend/src/store` is reserved for app state when a shared store becomes necessary.
- `backend/src/controllers` handles HTTP request logic.
- `backend/src/routes` keeps route registration separate from request handling.
- `backend/src/services` is for business logic that should not live in controllers.
- `backend/src/repositories` is reserved for data access and database queries.
- `backend/src/socket` is for Socket.IO events and realtime channels.
- `backend/src/cron` is reserved for scheduled jobs such as usage aggregation or alert scans.

## Phase 2 Auth

The authentication layer now exists as a working contract-first module.

### Backend auth routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/me`

### Frontend auth contracts

- [frontend/src/types/auth.types.ts](frontend/src/types/auth.types.ts) defines request and response shapes.
- [frontend/src/services/auth.service.ts](frontend/src/services/auth.service.ts) centralizes API calls.
- [frontend/src/lib/api.ts](frontend/src/lib/api.ts) owns the Axios client configuration.

The backend currently uses an in-memory repository so the authentication flow is runnable now and can later be swapped to MongoDB without changing the public API contract.

## Deployment Targets

- Frontend: Vercel
- Backend: Railway
- Database: MongoDB Atlas

## Troubleshooting

- If `npm` is not recognized, install Node.js and reopen your terminal.
- If the frontend port is busy, stop the existing Vite process and rerun `npm run dev`.
- If the backend port is busy, change `PORT` in `backend/.env`.
- If MongoDB connection is added later, verify the Atlas IP allowlist and connection string.

## Status

Phase 1 is complete: the repository is scaffolded, the tooling is installed, the frontend builds, and the backend server runs locally.
