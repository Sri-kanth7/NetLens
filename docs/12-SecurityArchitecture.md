# 12 - Security Architecture

## Security Objectives
NetLens must protect authentication, sessions, tenant data, network telemetry, and future enterprise data with production-grade security controls.

## Authentication Security
- Use JWT access tokens with a 15 minute lifetime.
- Use JWT refresh tokens with a 7 day lifetime.
- Store refresh tokens in secure HttpOnly cookies.
- Persist refresh tokens in MongoDB for session revocation.
- Hash passwords with bcrypt.
- Never return passwords from any API.

## Cookie Security
- HttpOnly must be enabled.
- Secure must be enabled in production.
- SameSite must be configured.
- Cookie handling must support secure refresh flows.

## API Security
- All public routes must be versioned under `/api/v1`.
- Helmet must protect baseline HTTP headers.
- Rate limiting must reduce abuse risk.
- Request IDs must be attached to each request for traceability.
- Zod validation must protect request input and environment configuration.

## Authorization Security
- Use role-based access control.
- Implement `authenticate()` for private route protection.
- Implement `authorize(role)` for privileged operations.
- Design roles to support Owner, Admin, Technician, Viewer, and Guest.

## Logging and Observability
- Use structured logging with Pino.
- Log authentication events, startup, errors, database connection events, and request IDs.
- Never rely on console logging for production behavior.

## Error Handling
- Use a global error handler.
- Do not expose raw stack traces to clients.
- Return standardized error responses only.

## Input Protection
- Validate all external inputs with Zod.
- Sanitize and constrain request payloads.
- Reject malformed or missing critical values at startup.

## Session Revocation
- Refresh tokens must be revoked on logout.
- Token persistence must allow invalidation and rotation.
- Session-related storage should support future audit and enterprise requirements.

## Multi-Tenant Security Direction
- User access must be scoped by organization in future phases.
- Tenant boundaries must be explicit.
- Collector data must be isolated by network and organization context.

## Future Security Expansion
The architecture must be ready for audit logs, SSO, advanced RBAC, API keys, and enterprise governance without redesigning the authentication core.
