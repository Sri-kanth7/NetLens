# 13 - Deployment Architecture

## Deployment Goal
NetLens must be deployable as a production SaaS platform with a clear separation between frontend, backend API, collector agents, and MongoDB Atlas.

## Deployment Targets
- Frontend: Vercel
- Backend API: Railway
- Database: MongoDB Atlas
- Collector Agents: separate runtime deployments, edge hosts, or customer-controlled environments depending on future rollout models

## Environment Model
Each deployment environment should support:
- Development
- Staging
- Production

## Frontend Deployment
- Build the frontend as a static production asset bundle.
- Configure environment variables for API base URLs and feature flags.
- Use CDN-friendly asset delivery via Vercel.

## Backend Deployment
- Deploy the backend API independently from the frontend.
- Expose versioned routes under `/api/v1`.
- Initialize database connections before accepting traffic.
- Support structured logging and request IDs in production.

## Database Deployment
- Use MongoDB Atlas as the managed database layer.
- Restrict access through secure credentials and environment variables.
- Design indexes and data models before production rollout.

## Collector Deployment
Collectors are a separate system from the frontend and API.
- Collectors gather router and network telemetry.
- Collectors send data only to the backend.
- Multiple collectors must be supportable in future versions.

## Configuration Principles
- Environment variables must be validated at startup.
- Secrets must never be hardcoded.
- Runtime differences between environments must be explicit.
- Production settings must prioritize security and observability.

## Rollout Strategy
- Deploy frontend and backend independently.
- Keep the collector architecture versioned and decoupled.
- Support blue-green or rolling deployment patterns later if needed.

## Operational Requirements
- Health checks should exist for the backend.
- Logs must be centralized and searchable.
- Errors must be traceable using request IDs.
- Database connectivity must fail fast if configuration is invalid.
