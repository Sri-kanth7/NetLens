# 11 - Design System

## Purpose
The design system defines the reusable visual and interaction language for NetLens so the product remains consistent as it expands across modules and versions.

## Core Principles
- Reuse components instead of creating one-off UI fragments.
- Keep spacing, typography, and elevation consistent.
- Separate structural layout primitives from domain-specific components.
- Support both dark mode and light mode.
- Make states explicit: default, hover, focus, loading, disabled, success, warning, and error.

## Foundation Tokens
### Color
- Background
- Surface
- Elevated surface
- Border
- Primary accent
- Secondary accent
- Success
- Warning
- Error
- Muted text
- Strong text

### Radius
- Small for compact elements
- Medium for inputs and controls
- Large for cards and panels
- Extra large for premium surfaces

### Shadow and Elevation
- Minimal shadows for subtle depth
- Stronger elevation for overlays and drawers
- Avoid harsh shadows that feel dated

### Typography
- Distinct hierarchy for hero, section, card, label, and helper text
- Balanced sizes for dashboard readability
- Clear numeric typography for metrics and charts

## Core Component Categories
### Navigation
- Sidebar
- Navbar
- Breadcrumb
- Tab navigation

### Data Display
- Dashboard cards
- Tables
- Charts
- Metric badges
- Activity feeds

### Inputs and Actions
- Buttons
- Inputs
- Selects
- Toggles
- Search bars
- Pagination controls
- Filters

### Feedback
- Toasts
- Empty states
- Error states
- Loading skeletons
- Status indicators

### Overlays
- Modals
- Drawers
- Dropdowns
- Tooltips

## Component Behavior
- Components must accept typed props.
- Components must be composable.
- Visual variants should be defined centrally.
- Interactive states must be consistent across the platform.

## Shadcn UI Strategy
Shadcn UI should be used as the base component system and extended with NetLens-specific tokens, patterns, and variants.

## Consistency Rules
- No component should introduce a new visual language without approval.
- Shared behavior should live in shared components.
- Domain-specific UI belongs in feature modules, not in the design system layer.

## Future Extensibility
The system must support future domains such as organizations, reports, billing, API keys, plugins, and enterprise controls without reworking the foundation.
