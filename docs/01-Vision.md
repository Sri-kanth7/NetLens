# 01 - Vision

## Product Vision
NetLens is a production-grade network intelligence platform that helps users monitor, analyze, and optimize network health without needing to log into a router. It should feel like a commercial SaaS product from the first interaction, with the clarity of Linear, the polish of Vercel, and the operational depth of Datadog or Grafana.

## Why NetLens Exists
Most network dashboards are either too technical, too fragmented, or too consumer-grade to support serious monitoring. NetLens exists to unify network visibility, device intelligence, alerts, analytics, and future AI-assisted insights into a single premium product.

## What NetLens Is
NetLens is a multi-tenant SaaS network intelligence platform built for home users, gamers, small offices, schools, and small businesses. It will evolve from a Version 1 product focused on authentication, monitoring, analytics, and alerts into a broader platform that includes organizations, collectors, multi-network management, reports, notifications, AI, billing, plugins, and enterprise controls.

## What NetLens Is Not
NetLens is not a router admin panel, not a toy dashboard, and not a temporary prototype. It is not designed around in-memory state, fake data, or one-off shortcuts. The architecture must always assume production usage, long-term scalability, and future expansion.

## Product Promise
NetLens should allow a user to understand the state of their network at a glance, then drill down into devices, alerts, analytics, and historical behavior without having to interact directly with low-level router interfaces.

## Strategic Principles
- Build Version 1 in a way that does not block Versions 2 through 5.
- Use feature-based modules so new capabilities can be added without restructuring the app.
- Treat organizations as the natural future ownership boundary, not a later retrofit.
- Design the collector agent as a separate system that sends data to the backend.
- Keep frontend concerns separate from backend domain logic.
- Prefer strong typing, explicit contracts, and reusable abstractions.

## Success Definition
NetLens succeeds when users can confidently monitor Internet status, network health, connected devices, bandwidth usage, alerts, and historical behavior from a premium interface that feels reliable enough for real operations.
