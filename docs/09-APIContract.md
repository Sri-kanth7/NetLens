# 09 - API Contract

## API Versioning
All public backend routes must begin with `/api/v1`.

## Response Standard
### Success Response
```json
{
  "success": true,
  "message": "",
  "data": {},
  "meta": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "",
  "errors": []
}
```

## Auth Contract
### POST /api/v1/auth/register
Creates a new user and starts a session.

### POST /api/v1/auth/login
Authenticates a user and returns session tokens.

### POST /api/v1/auth/refresh
Issues a new access token using a valid refresh token.

### POST /api/v1/auth/logout
Revokes the current refresh token session.

### GET /api/v1/auth/me
Returns the authenticated user profile.

### POST /api/v1/auth/forgot-password
Starts the password recovery flow.

### POST /api/v1/auth/reset-password
Completes the password recovery flow.

## Required Headers
- `Content-Type: application/json`
- `Request-ID: <uuid>`
- `Authorization: Bearer <accessToken>` for protected routes

## Cookie Contract
Refresh tokens must be returned and stored using secure cookie settings:
- HttpOnly
- Secure
- SameSite

## Error Contract
Errors must be returned in a standardized format through the global error handler. Controllers should not return raw stack traces or unstructured failures.

## Auth Request Shapes
### Register
- `fullName`
- `email`
- `password`
- `role`

### Login
- `email`
- `password`

### Refresh
- refresh token via cookie or request body fallback for controlled scenarios

### Forgot Password
- `email`

### Reset Password
- `token`
- `password`

## Versioning Rules
- Version 1 routes must stay backward compatible.
- Future versions should be added under `/api/v2`, `/api/v3`, and so on.
- Breaking changes must never be introduced without a new version.

## Future Contracts
The API must remain ready for modules such as organizations, networks, collectors, devices, analytics, alerts, notifications, reports, AI, billing, API keys, plugins, and enterprise features.
