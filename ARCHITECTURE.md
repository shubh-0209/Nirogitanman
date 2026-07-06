# Nirogitanman Architecture Standards

This document defines the architectural standards, structure, and guidelines for developing patient modules in the Nirogitanman application. All new features and modules must adhere strictly to these principles.

## 1. Routing & Layout

All patient-facing pages must reside within the Next.js `(main)` route group to inherit the universal `DashboardLayout`.

**Path:** `src/app/dashboard/(main)/<module-name>/page.tsx`

The `(main)` layout provides the `DashboardShell`, which automatically wraps every page with the Sidebar, Header, Breadcrumbs, Search bar, and responsive layout handling. 

**Rule:** NEVER create a secondary dashboard layout. NEVER place a patient dashboard page outside of the `(main)` route group unless it is a full-page specialized view (e.g., an interactive canvas) that explicitly opts out of the sidebar.

## 2. Feature Structure (Domain-Driven Design)

We use a feature-based folder structure located in `src/features/patient/`. Every distinct business module (e.g., Appointments, Medical Records, Profile) must be encapsulated in its own folder.

```
src/features/patient/<feature-name>/
├── components/       # Feature-specific UI components (e.g., RecordCard.tsx)
├── schemas.ts        # Zod validation schemas and types
├── hooks/            # Feature-specific React hooks (if any)
└── utils/            # Feature-specific utility functions
```

**Rule:** A feature should never import directly from another feature's `components/` directory. If a component is shared across multiple features, it belongs in the global `src/components/` directory (e.g., `src/components/dashboard/`).

## 3. Data Access & Supabase

The application uses strictly typed, standard Supabase instances.

- **Server Components:** Must import and await `createClient()` from `@/lib/supabase/server`.
- **Client Components:** Must import `createClient()` from `@/lib/supabase/client`.

**Rule:** NEVER manually instantiate `createServerClient` or `createBrowserClient` within a page or component. Always use the centralized utility functions to prevent cookie race conditions and ensure singleton patterns.

## 4. Error Handling & State

Every page and feature must gracefully handle:
1. **Loading States:** Use React Suspense or Next.js `loading.tsx`. Provide skeleton loaders where appropriate.
2. **Empty States:** When a query returns no rows, display a helpful empty state (e.g., "No medical records found").
3. **Error Feedback:** Catch all errors (using strongly typed `Error` objects, never `any`) and display them cleanly using `sonner` toast notifications.

## 5. Adding a New Patient Module

When assigned to build a new patient module (e.g., Lab Reports), follow this checklist:
1. Define the database schema and RLS policies via a Supabase migration.
2. Regenerate TypeScript types using the Supabase CLI/MCP.
3. Add the navigation item to `src/config/navigation.ts` pointing to `${ROUTES.DASHBOARD}/lab-reports`.
4. Create the feature directory: `src/features/patient/lab-reports/`.
5. Create the schemas: `src/features/patient/lab-reports/schemas.ts`.
6. Create the Client component: `src/features/patient/lab-reports/components/LabReportsClient.tsx`.
7. Create the Server page: `src/app/dashboard/(main)/lab-reports/page.tsx`.
