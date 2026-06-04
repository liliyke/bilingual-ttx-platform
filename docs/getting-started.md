# Getting started — picking up the build

This skeleton stops part-way through the build brief on purpose. This page records
**exactly where it stops** and what to do to carry it forward, so you can resume
without re-reading the whole brief.

If you only want the spec, read [build-brief-v3.md](build-brief-v3.md) — that's the
source of truth for scope and the eight phases (A–H). This page is the "you are here"
map and the local-dev setup.

## You are here

| Brief phase | State |
|---|---|
| **A** — Next.js scaffold, Tailwind, folder structure | done |
| **B.5** — `next-intl`, fr-CA default / en-CA routing, message catalogues, locale switcher | done |
| **B** — schema migration + RLS, framework constants | done (schema + `lib/constants/regulations/`) |
| **B** — auth pages, `/profile`, role-based routing, role dashboards | **not done — start here** |
| **C–H** — scenario authoring, exercises, live mode, AAR, seed data, reviewer workflow | not started |

So the next chunk of real work is the **back half of Phase B: authentication and
role-based routing**. The plumbing is already in place — Supabase clients, the
`profiles` table (`default_role`, `locale`), RLS, and a `updateSession()` helper —
but nothing logs a user in yet.

## Local development setup

This is the first phase that needs a live Supabase project; up to now everything has
been static.

```bash
pnpm install

# 1. Stand up a Supabase project (free tier, Canada Central) and copy its
#    URL + anon + service_role keys into .env.local
cp .env.example .env.local
#    ...then fill in the values.

# 2. Apply the schema and regenerate the precise DB types
supabase link --project-ref <your-project-ref>
supabase db push
pnpm db:types          # overwrites the hand-written lib/types/database.types.ts

# 3. Run it
pnpm dev               # http://localhost:3000 -> redirects to /fr-CA
```

Both `/fr-CA` and `/en-CA` should load. That's the baseline before you add auth.

## Resuming Phase B — auth and role routing

Five pieces, in roughly this order. Run `pnpm build` and `pnpm lint` after each and
check both locales before moving on (the brief's per-phase rule).

### 1. Compose the middleware
`middleware.ts` currently runs only `next-intl`. `lib/supabase/middleware.ts` already
exports `updateSession()` but nothing calls it. Chain them so both run per request —
the catch is **cookie propagation**: `updateSession` returns a response carrying
refreshed auth cookies, and `next-intl` returns its own response for locale
rewrites/redirects. Merge them so the Supabase `Set-Cookie` headers survive the intl
rewrite, or the session drops on every navigation. Then add the guard: no session →
redirect to `/[locale]/login`; wrong role path → redirect to the user's own
`/[locale]/{role}`.

### 2. Auth pages + server actions
Add routes under `app/[locale]/(auth)/`: `login`, `signup`, `reset-password`. Each is
a Zod-validated form backed by a Server Action calling `supabase.auth` (sign-in,
sign-up, reset). All strings through `next-intl` — add an `auth` namespace to both
`messages/fr-CA.json` and `messages/en-CA.json` (never hardcode FR/EN in JSX).

### 3. Profile-on-signup
Every `auth.users` row needs a matching `profiles` row (it holds `locale` and
`default_role`). Cleanest is a Postgres trigger on `auth.users` insert — add it as a
new migration `supabase/migrations/0002_profile_trigger.sql`. (Doing it in the signup
Server Action also works but is easier to get half-right.)

### 4. Role-based routing
After login, send the user to `/[locale]/{role}` based on `profiles.default_role`.
Design note worth deciding once: the brief says **one role per user per exercise**
(that role lives on `exercise_participants` and governs what you can do *inside* an
exercise). `default_role` is separate — use it only to choose the *landing dashboard*.

### 5. `/profile` + role dashboards
- `app/[locale]/profile/` — a page with a locale selector that persists to
  `profiles.locale` via a Server Action (this is what makes the language choice stick
  across sessions, unlike the in-session header switcher).
- `app/[locale]/{facilitator,participant,evaluator,compliance-reviewer,observer,admin}/` —
  six near-empty dashboards that just greet the user in their locale. Placeholders so
  routing is provable; the real features arrive in Phases C–E.

**Done when:** you can sign up two accounts (one fr-CA, one en-CA), log in, land on the
right role dashboard in the right language, change your locale and have it persist, and
get bounced to login when signed out.

## After Phase B

Phases C–H are specified in [build-brief-v3.md](build-brief-v3.md#phased-build-plan):
scenario library + multi-framework mapping picker (C), exercises + participant
assignment (D), live mode + Realtime (E), bilingual AAR with the coverage matrix (F),
bilingual seed scenarios incl. the CDE/PCI one (G), reviewer workflow + audits (H).

When you author scenarios, remember the framework catalogues in
`lib/constants/regulations/` are **starter subsets** — several entries are flagged
in-file for compliance-reviewer validation, per the
[content review SOP](content-review-sop-v2.md). Fill gaps in a `framework-mappings-needed.md`
rather than inventing control IDs.
