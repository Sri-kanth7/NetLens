# 08 - Database Design

## Database Strategy
NetLens uses MongoDB Atlas as the system of record. The data model must support multi-tenancy, collector-based ingestion, session revocation, and future expansion into organizations, multiple networks, reports, notifications, billing, and enterprise features.

## Core Hierarchy
```text
Organization
  -> Users
  -> Networks
  -> Collectors
  -> Devices
  -> Sessions
  -> UsageHistory
  -> Alerts
  -> Reports
```

## Design Principles
- Never assume one user owns one network.
- Every collection must be designed for tenant-scoped querying.
- Persist refresh tokens for session revocation.
- Keep collector data separate from user identity data.
- Use indexes for frequently queried fields.
- Keep schemas forward-compatible for Version 2 through Version 5.

## Primary Collections
### Users
Stores authentication identity and role information.

### Organizations
Represents a tenant boundary and future billing/admin scope.

### Networks
Represents a logical network under an organization.

### Collectors
Represents trusted data ingestion agents.

### Devices
Represents connected network devices and device metadata.

### Sessions
Represents authenticated user sessions and token revocation state.

### UsageHistory
Stores historical bandwidth and usage measurements.

### Alerts
Stores alert events and their resolution status.

### Reports
Stores generated or scheduled reports.

## User Model Requirements
Fields:
- `_id`
- `fullName`
- `email`
- `password`
- `role`
- `avatar`
- `emailVerified`
- `refreshToken`
- `createdAt`
- `updatedAt`

Rules:
- Passwords must be hashed with bcrypt before persistence.
- Passwords must never be returned by API responses.
- `email` must be unique and indexed.
- `refreshToken` must be indexed for session lookup and revocation.
- Role must be prepared for Owner, Admin, Technician, Viewer, and Guest.

## Multi-Tenant Direction
The user model must be compatible with future organization membership relationships. Organizations should become the outer tenant boundary, with users optionally belonging to multiple organizations over time.

## Index Strategy
### Users
- Unique index on `email`
- Index on `refreshToken`

### Organizations
- Index on organization slug or tenant key

### Networks
- Index on `organizationId`
- Index on `collectorId`

### Collectors
- Index on `organizationId`
- Index on `networkId`
- Index on `status`

### Devices
- Index on `organizationId`
- Index on `networkId`
- Index on `macAddress`
- Index on `ipAddress`

### Sessions
- Index on `userId`
- Index on `refreshToken`
- Index on `expiresAt`

### UsageHistory
- Index on `networkId`
- Index on `deviceId`
- Index on `timestamp`

### Alerts
- Index on `organizationId`
- Index on `networkId`
- Index on `status`
- Index on `priority`
- Index on `createdAt`

### Reports
- Index on `organizationId`
- Index on `networkId`
- Index on `generatedAt`

## Lifecycle Rules
- Session refresh tokens must be revocable.
- Alert history should be preserved even after resolution.
- Usage data should be append-only.
- Device records should support renaming and status changes.
- Collector records should support multiple future collectors per organization.

## Schema Evolution
Schemas must be designed so additional fields can be added for billing, API keys, plugins, audit logs, and AI outputs without reworking the database core.
