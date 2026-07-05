# Enterprise Architecture & Roadmap

This document outlines the high-level architecture, module boundaries, layers, testing strategy, and implementation roadmap for the Nirogitanman platform.

## 1. Folder Structure

A production-ready, feature-driven structure:

```text
src/
├── app/              # Next.js App Router. ONLY routing, page composition, and API routes.
├── features/         # Core business logic. Modules like auth, appointments, reports.
├── components/       # Generic, reusable UI (shadcn, forms, layout elements).
├── services/         # Wrappers for external APIs (Supabase, OpenAI, Stripe).
├── lib/              # Third-party library initialization (Supabase client, React Query).
├── providers/        # React Context providers (Theme, Auth, Query).
├── hooks/            # Global custom React hooks (e.g., useMediaQuery, useLocalStorage).
├── types/            # Global TypeScript definitions and shared generic interfaces.
├── utils/            # Pure functions (formatting, date logic, math).
├── constants/        # System-wide static variables and enums.
├── config/           # Configuration files (routing, SEO, env validation).
├── validation/       # Zod schemas for system-wide use.
├── ai/               # Dedicated AI logic (prompts, chains, parsers).
├── styles/           # Global CSS and Tailwind configs.
├── public/           # Static assets (images, fonts, favicons).
├── docs/             # Project architecture and rules documentation.
└── tests/            # E2E and global integration tests.
```

## 2. Configuration Architecture (`config/`)
Centralized configuration prevents magic strings scattered across the codebase.
- **`env.ts`**: Zod validation for `process.env`. Ensures the app fails to build if env vars are missing.
- **`routes.ts`**: Object defining all public, protected, and auth routes for the `middleware.ts` to consume.
- **`navigation.ts`**: Definitions for sidebar and header links (roles, icons, paths).
- **`metadata.ts`**: Base Next.js SEO metadata configuration.
- **`permissions.ts`**: RBAC matrices defining what each role can do.
- **`constants.ts`**: (Can also live in `/constants`) Reusable config values like `MAX_FILE_SIZE`.

## 3. Services Layer (`services/`)
Services isolate external dependencies from UI and feature logic.
- **`auth.service.ts`**: Wraps Supabase login/logout/session logic.
- **`appointment.service.ts`**: Fetches, creates, and cancels appointments.
- **`ai.service.ts`**: Wraps the OpenAI API calls.
- **`reports.service.ts`**: Handles uploading and fetching medical records via Supabase Storage.
UI components never call Supabase directly; they call a function exported from the services layer or via a TanStack Query hook that uses the service.

## 4. Providers Layer (`providers/`)
Providers wrap the root `layout.tsx` to inject global context.
1. **`ThemeProvider`**: Handles light/dark mode (next-themes).
2. **`QueryProvider`**: Instantiates the TanStack Query Client for caching server state.
3. **`AuthProvider`**: Listens to Supabase auth state changes and provides the current user to the tree.
4. **`ToastProvider`**: Initializes the notification system (e.g., Sonner or shadcn Toaster).
*Initialization Order*: Theme -> Query -> Auth -> Toast.

## 5. Validation Layer (`validation/` or `features/*/validation`)
Using **Zod** to guarantee type safety at runtime.
- **`auth.schema.ts`**: Login and registration schemas.
- **`appointment.schema.ts`**: Validates date/time and doctor selection.
- **`ai.schema.ts`**: Validates the JSON structure returned by OpenAI using structured outputs.
These schemas are shared between React Hook Form (client) and Next.js API Routes (server).

## 6. Utilities (`utils/`)
Pure, deterministic functions with no side effects.
- **`cn.ts`**: Merges Tailwind classes (`clsx` + `tailwind-merge`).
- **`dates.ts`**: Wrappers around `date-fns` for formatting (e.g., `formatToHealthcareStandard()`).
- **`upload.ts` / `download.ts`**: Generic file manipulation helpers.
- **`currency.ts`**: Formats billing amounts.

## 7. Constants Strategy (`constants/`)
Static definitions to avoid magic strings.
- **Roles**: `export const ROLES = { ADMIN: 'admin', DOCTOR: 'doctor', PATIENT: 'patient' }`
- **Appointment Status**: `PENDING`, `CONFIRMED`, `CANCELLED`.
- **AI Models**: `export const AI_MODELS = { PRIMARY: 'gpt-4o', FALLBACK: 'gpt-4-turbo' }`

## 8. AI Architecture (`ai/`)
A dedicated module to handle complex LLM interactions cleanly.
- **`prompts/`**: Stores system instructions (e.g., `symptom-checker.prompt.ts`, `diet-planner.prompt.ts`). Keeps prompt text out of API routes.
- **`parsers/`**: Functions that take raw AI text output and convert it into structured JSON objects.
- **`chains/`**: Orchestration logic (e.g., fetching a health report, passing it to the prompt, and calling OpenAI).

## 9. Testing Architecture
- **Unit Testing**: Vitest for `utils`, `validation`, and `ai/parsers`.
- **Integration Testing**: React Testing Library for complex forms (e.g., Appointment Booking).
- **E2E Testing**: Playwright for critical flows (Login -> Book Appointment -> View Dashboard).
- **Accessibility**: Axe-core integrated into testing pipelines.
- **Folder Structure**: `tests/unit/`, `tests/integration/`, `tests/e2e/`.

## 10. Documentation Structure
- `architecture.md`: This document (folders, layers, roadmap).
- `design.md`: UI/UX, typography, and styling rules.
- `agents.md`: Strict rules for AI code generation.
- `database.md`: Supabase schema, ER diagram, and RLS.
- `api.md`: Next.js Route Handler conventions.
- `deployment.md`: (Future) Vercel and CI/CD setup.
- `prompts.md`: (Future) Registry of all AI system prompts.
- `changelog.md`: Record of major structural changes.

## 11. Final Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- Scaffold Next.js project.
- Establish folder structure, `utils`, `constants`, and `config`.
- Integrate Tailwind, shadcn/ui, and `design.md` guidelines.
- Setup Supabase project, DB schema, and RLS (`database.md`).
- Implement Auth Provider and Middleware routing logic.

### Phase 2: Core Dashboards (Weeks 3-4)
- Build global layouts (sidebars, headers).
- Create generic components (Data Tables, Cards, Forms).
- Develop Patient Dashboard and Doctor Dashboard shells.
- Implement User Profile management.

### Phase 3: Healthcare Logic (Weeks 5-6)
- Develop the Appointment Booking System (Services, UI, Validation).
- Develop Health Reports storage and viewing logic.
- Implement the Notifications system (Toast/DB-based).

### Phase 4: AI & Advanced Features (Weeks 7-8)
- Integrate OpenAI API.
- Build the AI Symptom Checker and Health Summary agent.
- Implement the AI Diet Planner.
- Develop the Blog/CMS for the public marketing site.

### Phase 5: Hardening & Production (Week 9)
- Write E2E tests for critical paths.
- Conduct Accessibility and Performance audits.
- Final deploy to Vercel production environment.
- Post-launch monitoring and analytics integration.
