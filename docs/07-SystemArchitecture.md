# 07 - System Architecture

## Architecture Overview
NetLens is a feature-based SaaS platform composed of four major systems:
- React frontend
- Node.js API
- Collector agents
- MongoDB Atlas

The frontend is the user-facing application. The backend is the trust boundary and integrates with MongoDB and collector agents. The collector agents are responsible for gathering network information from routers or network devices and sending it to the backend. The frontend never talks directly to routers.

## High-Level Structure
### Frontend
- React 19
- Vite
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Query
- Axios
- React Router
- Framer Motion
- Recharts

### Backend
- Express
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT authentication
- Socket.IO
- bcrypt
- Zod
- Pino logging
- Helmet
- Rate limiting
- Request IDs
- Global error handling

### Collector Layer
- Separate collector agent processes gather network telemetry.
- Collectors send data to backend ingestion endpoints.
- Multiple collectors must be supportable in future versions.

## Backend Feature Module Structure
```text
backend/src/
  modules/
    auth/
    users/
    organizations/
    networks/
    collectors/
    devices/
    analytics/
    alerts/
    notifications/
    reports/
    ai/
  shared/
  config/
  database/
  middleware/
  utils/
  jobs/
  socket/
  server.ts
```

## Frontend Feature Module Structure
```text
frontend/src/
  modules/
    auth/
    dashboard/
    devices/
    analytics/
    alerts/
    reports/
    settings/
    profile/
  components/
  pages/
  routes/
  hooks/
  context/
  services/
  types/
  utils/
  styles/
```

## Architectural Principles
- Use feature-based modules rather than global controller/service folders.
- Keep controllers thin and move business logic into services.
- Isolate MongoDB access in repositories.
- Standardize validation with Zod.
- Standardize responses across the platform.
- Keep logging, auth, and error handling in shared infrastructure layers.
- Design for multi-tenancy from the start.

## Versioning Strategy
All public APIs start under `/api/v1` so future versions can be introduced without breaking clients.

## Security Boundaries
- Frontend handles user interaction and session state.
- Backend owns authentication, authorization, persistence, and collector ingestion.
- Collector agents are separate trusted producers of network telemetry.
- MongoDB Atlas is the system of record.

## Scalability Direction
The architecture must support future organizations, devices, collectors, analytics, alerts, reports, AI, billing, API keys, plugins, and enterprise features without restructuring the core platform.
