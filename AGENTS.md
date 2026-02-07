# AGENT.md

## Project Overview
This project, "e-micro-commerce" (internally named "tractus"), is a Next.js 16+ application built with the App Router. It serves as a frontend for an e-commerce platform with a decoupled backend architecture.

## Tech Stack
-   **Framework**: Next.js 16 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS (with semantic tokens)
-   **Authentication**: Clerk
-   **Database**: Supabase (PostgreSQL)
-   **ORM**: Prisma
-   **Observability**: Grafana Faro (Frontend), OpenTelemetry (Backend)

## Architecture & Conventions
-   **Import Alias**: Use `@/*` for imports (maps to `./src/*`).
-   **Server Components**: Default to Server Components; use `"use client"` only for interactivity.
-   **State Management**: React Context/Hooks (minimal global state).
-   **Data Fetching**: Server Actions or direct DB queries in Server Components.
-   **Routing**: File-system based routing in `src/app`.
-   **Strict Mode**: `strict: true` in `tsconfig.json`.

## Design System & Styling
-   **Tailwind Configuration**: Use semantic tokens defined in `tailwind.config.ts`.
    -   **Bad**: `bg-white`, `text-black`, `border-gray-200`
    -   **Good**: `bg-background`, `text-foreground`, `border-border`
-   **Color Palette**:
    -   `primary`, `secondary`, `muted`, `accent`, `destructive`
    -   `feedback`: `success`, `warning`, `error`, `info`
-   **Typography**: Use utility classes for font sizes and weights.
-   **Spacing**: Standard Tailwind spacing scale.
-   **Radius**: `rounded-lg`, `rounded-md`, `rounded-sm` (mapped to CSS variables).

## Key Files & Directories
-   `src/app`: Application routes and layouts.
-   `src/components`: UI components (keep them small and focused).
-   `src/lib`: Utility functions and third-party integrations (e.g., `faro.ts`, `supabase.ts`).
-   `docs/`: Single Source of Truth (SSOT) for requirements and specs.
    -   `02_prd.md`: Product Requirements Document.
    -   `03_spec_tech.md`: Technical Specification.
    -   `05_design_system.md`: Design System Rules.

## Development Workflow
1.  **Check Docs**: Always refer to `docs/` for requirements before implementing.
2.  **Semantic Helper**: Ensure all UI elements use semantic class names for theming support.
3.  **Observability**: Ensure critical user interactions are instrumented with Grafana Faro/OpenTelemetry.

## Environment Variables
-   Ensure `.env.local` is configured with necessary keys for Clerk, Supabase, and Grafana.
