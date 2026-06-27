# 03 - Software Requirements Specification

## 1. Introduction
### 1.1 Purpose
This document defines the software requirements for NetLens, including functional behavior, architectural constraints, and non-functional expectations.

### 1.2 Scope
NetLens is a SaaS network intelligence platform with a React frontend, Node.js API, MongoDB Atlas persistence, and a collector-driven data ingestion model.

### 1.3 Intended Audience
- Product engineers
- Frontend engineers
- Backend engineers
- QA engineers
- DevOps engineers
- Future AI and data engineers

## 2. System Overview
NetLens contains four major systems:
- React frontend
- Node.js API
- Collector agents
- MongoDB Atlas

The frontend never communicates directly with routers. Collectors gather network data and send it to the backend.

## 3. Functional Requirements
### 3.1 Authentication
- Users shall register with full name, email, password, and role.
- Users shall log in with email and password.
- The system shall issue access and refresh tokens.
- The system shall store refresh tokens securely.
- The system shall support logout and token revocation.
- The system shall support forgot-password and reset-password flows.
- The system shall expose a protected `GET /me` endpoint.

### 3.2 Dashboard
- Users shall see current network status, health, devices, alerts, and analytics entry points.
- The dashboard shall be responsive and visually premium.

### 3.3 Multi-Tenancy Readiness
- The system shall support future organizations.
- The system shall not assume a one-user-to-one-network model.

### 3.4 Collector Integration
- The system shall accept data from one or more collector agents.
- The backend shall be the integration boundary for collectors.

### 3.5 Alerts and Analytics Foundation
- The system shall support alert and analytics modules as first-class features.
- The system shall preserve a shared response contract across modules.

## 4. Non-Functional Requirements
### 4.1 Security
- JWT-based authentication shall be used.
- Passwords shall be hashed with bcrypt.
- Sensitive cookies shall use HttpOnly, Secure, and SameSite flags.
- Zod validation shall be used for request and environment validation.

### 4.2 Scalability
- Modules shall be feature-based and loosely coupled.
- Repositories shall isolate persistence logic from services.
- APIs shall be versioned under `/api/v1`.

### 4.3 Reliability
- Global error handling shall standardize all API failures.
- Request IDs shall be included for observability.
- Logging shall be structured.

### 4.4 Maintainability
- Controllers shall remain thin.
- Business logic shall live in services.
- Shared utilities shall avoid duplication.

## 5. Constraints
- No in-memory repository is allowed for production features.
- No placeholder implementations are allowed.
- MongoDB Atlas is the source of truth for persistent application state.
- The project shall remain compatible with future collector, AI, and enterprise modules.

## 6. Assumptions
- Users may belong to one or more organizations in future phases.
- Devices may belong to a network rather than directly to a user.
- Collector agents may scale horizontally.
- The product will evolve through versioned releases.
