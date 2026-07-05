# API Architecture

This document defines the server-side API architecture for the Nirogitanman platform using Next.js App Router Route Handlers (`app/api/*`).

## API Structure & Route Naming
All endpoints must reside under `/api/v1/` to ensure future-proofing. Routes should be RESTful nouns.

```text
/api/v1/
├── /ai/
│   ├── /chat               (POST: Stream OpenAI responses)
│   ├── /summarize-report   (POST: Process uploaded PDF/Image)
│   └── /diet-planner       (POST: Generate AI diet plan)
├── /webhooks/
│   └── /stripe             (POST: Payment processing)
└── /admin/
    ├── /users              (GET/POST/PUT/DELETE)
    └── /metrics            (GET: Platform analytics)
```

## When to use API Routes vs Direct Database Access
- **Direct Database Access (Supabase Client)**: Standard CRUD operations (fetching appointments, updating profile, reading health reports) MUST be done directly from the frontend or Server Components using the Supabase client, relying entirely on RLS for security.
- **API Routes**: MUST be used when:
  1. Integrating with third-party APIs requiring secret keys (OpenAI, Stripe, Resend).
  2. Performing administrative overrides that bypass RLS (using Supabase Service Role Key).
  3. Processing heavy server-side tasks (PDF parsing before AI ingestion).

## Versioning Strategy
- Current version: `v1`. 
- When breaking changes are introduced, create a new folder `v2`. Never mutate `v1` in a breaking manner once in production.

## Authentication & Authorization
- Every secured API route must validate the Supabase Session.
- Use `@supabase/ssr` to extract the session from cookies.
- If unauthorized, return `401 Unauthorized`.
- For admin routes, assert the user role from the `roles` table. If a non-admin attempts access, return `403 Forbidden`.

## Request Validation
- All incoming `POST`/`PUT` payloads MUST be validated using Zod.
- If validation fails, return `400 Bad Request` with structured Zod errors.

```typescript
// Example Zod validation flow
const payload = await req.json();
const result = chatSchema.safeParse(payload);
if (!result.success) {
  return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
}
```

## Standard Response Format
Responses should be predictable.

**Success (200/201):**
```json
{
  "data": { ... },
  "message": "Optional success message"
}
```

**Error (400/401/403/500):**
```json
{
  "error": {
    "code": "VALIDATION_FAILED", // or "UNAUTHORIZED", "INTERNAL_ERROR"
    "message": "Invalid input provided.",
    "details": { ... } // Optional Zod flattened errors
  }
}
```

## Pagination & Rate Limiting
- **Pagination**: Standardize on cursor-based or limit/offset pagination via query params (`?limit=20&page=1`). Return `next_page` URLs in the response.
- **Rate Limiting**: Critical for AI routes. Implement IP or User-based rate limiting via Vercel KV or Upstash to prevent OpenAI billing abuse (e.g., 10 requests per minute per user).

## Upload Endpoints
- Direct file uploads (like avatars) should use Supabase Storage's direct frontend upload capabilities to save bandwidth.
- API endpoints for uploads should only be used if the server needs to manipulate the file before saving (e.g., parsing text from a health report to feed to OpenAI).
