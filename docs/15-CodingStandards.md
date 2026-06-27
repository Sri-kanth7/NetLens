# 15 - Coding Standards

## Purpose
These standards define how NetLens should be built so the codebase remains production-ready, readable, and scalable over time.

## Core Rules
- Use TypeScript everywhere.
- Keep modules feature-based.
- Keep modules loosely coupled and highly cohesive.
- Avoid duplicated logic.
- Keep business logic out of controllers.
- Use services for orchestration.
- Use repositories for persistence.
- Use middleware for cross-cutting concerns.
- Use utilities for shared helpers.

## Naming Conventions
- Use descriptive names.
- Prefer full words over abbreviations.
- Use consistent naming across frontend and backend.
- Keep file names aligned with module purpose.

## Architecture Conventions
- Backend modules should follow controller, service, repository, schema, and types patterns.
- Frontend modules should separate pages, routes, services, context, hooks, and reusable components.
- Shared concerns should move to `shared`, `config`, `database`, `middleware`, or `utils` as appropriate.

## Validation Standards
- Use Zod for request validation.
- Use Zod for environment validation.
- Validate early and fail fast.

## Error Handling Standards
- Use a global error handler.
- Return standardized API responses only.
- Do not expose raw stack traces to clients.

## Security Standards
- Hash passwords with bcrypt.
- Use HttpOnly refresh cookies.
- Persist refresh tokens for revocation.
- Enforce RBAC where appropriate.
- Protect private routes with middleware.

## Frontend Standards
- Use reusable components.
- Keep page components thin.
- Use React Query for server state.
- Use Axios interceptors for auth handling.
- Keep UI responsive and accessible.

## Database Standards
- Model for multi-tenancy.
- Add indexes intentionally.
- Avoid assumptions that block organizations or collectors.
- Keep schemas extensible.

## Documentation Standards
- Important architectural decisions must be documented.
- Product and system rules should remain aligned with implementation.
- Update the progress file after each completed feature or documentation milestone.

## Review Standard
Before merging any future module, verify:
- Security
- Readability
- Reusability
- Scalability
- Testability
- Contract consistency
- Alignment with the architecture documents
