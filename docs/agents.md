# AI Agent Rules & Guidelines

This document defines the strict behavior, ownership, and coding standards for all AI agents working on the Nirogitanman project. 

## What an AI Agent MUST NEVER Do
- **Never duplicate components**: Always check `components/ui` or `components/forms` before creating new generic UI.
- **Never introduce unnecessary dependencies**: Use native browser APIs or existing libraries (e.g., Zod, date-fns) before adding new packages.
- **Never bypass TypeScript**: Do not use `any`, `@ts-ignore`, or loose type casting.
- **Never hardcode secrets**: API keys, DB URLs, and JWT secrets must always use `env.ts`.
- **Never create business logic inside UI components**: UI components only receive props and fire events. Logic belongs in `features/` or `hooks/`.
- **Never break folder boundaries**: Cross-feature imports are forbidden unless through `features/core`.
- **Never create inconsistent UI**: Adhere strictly to `docs/design.md`. No unauthorized colors, gradients, or shadows.
- **Never ignore accessibility**: Every interactive element must be keyboard navigable and screen-reader friendly.
- **Never execute raw SQL queries**: Always use the Supabase JS client and respect RLS policies.

## Coding Standards

### TypeScript & React
- Strict mode is mandatory.
- Define prop types using `interface`, not `type` (unless union types are needed).
- Use Next.js App Router conventions: Server Components by default. Include `"use client"` only at the lowest possible level in the component tree.
- Avoid `useEffect` for data fetching; use TanStack Query (`react-query`).

### Naming Conventions
- **Folders/Files**: `kebab-case` for non-components (e.g., `auth-service.ts`, `health-records/`).
- **Components**: `PascalCase` (e.g., `PatientCard.tsx`).
- **Hooks**: `camelCase`, prefixed with `use` (e.g., `useAppointments`).
- **Types/Interfaces**: `PascalCase` (e.g., `UserData`, `AppointmentResponse`).
- **Environment Variables**: `UPPER_SNAKE_CASE` (e.g., `NEXT_PUBLIC_API_URL`).

### Import Rules
- Absolute imports must be used (e.g., `@/components/...`).
- Order of imports:
  1. React / Next.js core
  2. Third-party packages
  3. Feature modules (`@/features/...`)
  4. Global components (`@/components/...`)
  5. Utils / Types / Constants
  6. Styles

### Tailwind & Shadcn Rules
- Construct class names using the `cn()` utility (`clsx` + `tailwind-merge`).
- Do not extract Tailwind classes into custom CSS classes (except in `globals.css` for @layer base).
- Shadcn components should remain in `components/ui` and act as the foundational primitives. Do not add business logic to Shadcn components.

### Folder & File Ownership
- **`app/`**: Only routing, page composition, and layout shells. No deep logic.
- **`features/`**: Feature-specific logic, scoped components, and API calls.
- **`services/`**: Class-based or functional wrappers for external APIs (Supabase, OpenAI).
- **`types/`**: Global shared types only. Feature-specific types stay in `features/<name>/types.ts`.

### Security Rules
- All user input must be validated via Zod on both client (React Hook Form) and server (API Routes).
- RLS (Row Level Security) must be enabled on every Supabase table.
- AI prompts must be sanitized to prevent prompt injection.

### OpenAI Integration Rules
- Never expose OpenAI API keys to the client. All OpenAI calls must route through Next.js API Routes (`app/api/ai/...`).
- Always enforce maximum token limits and use streaming responses for UX.
- AI responses must be parsed and sanitized before rendering in the UI.

### Refactoring & Error Handling
- Wrap API calls in `try/catch` and return typed standard Error objects.
- Use Global Error Boundaries (`error.tsx`) in Next.js to catch rendering failures.
- When refactoring, ensure existing tests pass before committing.

### Git & Documentation Rules
- **Commits**: Follow conventional commits (`feat:`, `fix:`, `chore:`, `refactor:`).
- Document all complex algorithms, services, and AI prompts via JSDoc block comments.
- Update `CHANGELOG.md` for major architectural changes.

## Testing Expectations
- AI agents should write unit tests for utils and services (`*.test.ts`).
- React Testing Library for complex interactive components.
- Ensure all mocked data resembles realistic healthcare scenarios.
