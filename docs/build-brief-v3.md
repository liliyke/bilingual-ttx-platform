# TTX Platform — Build Brief (v3 — Bilingual + PCI/SOC 2)

> Reference document for the developer (or Claude Code agent) building the bilingual multi-framework TTX Platform v1. Read alongside the [TTX Platform — Free-Tier Build Guide (v3)](build-guide-v3.md). This document is the actual prompt fed to Claude Code at the start of the build.
>
> **Version:** 3.0 — bilingual French/English plus PCI DSS v4.0 and SOC 2 Type II framework support
> **Supersedes:** v2.0

---

## Document purpose

This brief defines the v1 scope, constraints, architecture, and phased build plan for the bilingual multi-framework TTX Platform. It is designed to be pasted directly into a fresh Claude Code session as the build's foundational prompt.

---

## Build context

You are building a bilingual (French/English) tabletop exercise dashboard for a Quebec fintech with a cardholder data environment in scope under PCI DSS v4.0 and a SOC 2 Type II audit planned within approximately 12 months. French is the default locale. Build free-tier-only. Be disciplined about scope. Use plan mode before any large change. After each phase, stop and wait for confirmation.

**Project name:** `ttx-platform`

---

## Tech stack

- **Framework:** Next.js 14 (App Router), TypeScript strict mode
- **Styling:** Tailwind CSS + shadcn/ui components
- **Backend:** Supabase (Postgres + Auth + Realtime), free tier, Canadian region
- **Internationalization:** `next-intl`
- **Package manager:** pnpm
- **Deployment target:** Cloudflare Pages

---

## Free-tier constraints

- No paid services. No new dependencies requiring subscriptions.
- Stay under Supabase free-tier limits (500 MB DB, 2M Realtime msgs/month, 200 concurrent connections, 1 GB storage)
- Single-tenant, single fintech
- Desktop-only UI
- Inject artifacts as Markdown strings in the database, no large file uploads
- Email + password auth (no SSO)
- No external API integrations in v1

---

## Bilingual / locale requirements (first-class)

- French (`fr-CA`) is the default locale; English (`en-CA`) is selectable
- Supported locales: `fr-CA`, `en-CA` only
- All UI chrome must be available in both
- Scenario content supports per-locale variants (not just translations)
- User-generated content preserved in authoring language
- Locale stored per user and overridable per exercise participant assignment
- Date/time formatting respects locale
- No hardcoded English or French in JSX; all user-facing strings through `useTranslations()`

---

## Multi-framework compliance requirements (first-class)

The platform supports tiered compliance mapping:

**Primary frameworks (drive scenario design):**
- OSFI Guideline B-13
- Quebec Law 25
- NIST Cybersecurity Framework v2.0
- PCI DSS v4.0

**Secondary frameworks (drive evidence mapping):**
- PIPEDA
- Charter of the French Language / Bill 96
- SOC 2 Type II Trust Services Criteria (Security, Availability, Confidentiality, Privacy, Processing Integrity)

**Cross-cutting:**
- MITRE ATT&CK technique IDs (always required on injects)

Every decision point in a scenario can be mapped against one or more frameworks. The platform supports many-to-many mapping. Authors must select frameworks that the decision actually exercises (no cargo-cult tagging).

---

## Roles

| Role | Purpose |
|---|---|
| `facilitator` | Runs exercise, releases injects, controls timing |
| `participant` | Receives injects in their locale, logs decisions |
| `evaluator` | Read-only live, scores decisions, records observations |
| `compliance_reviewer` | Read-only access to scenarios in `pending_review`, validates multi-framework mapping accuracy |
| `observer` | Read-only, no scoring rights |
| `admin` | Manages users, scenarios, exercise templates, reviewer assignments |

---

## v1 feature scope — what IS being built

### 1. Authentication and role-based routing
- Email/password via Supabase Auth
- After login, route to dashboard appropriate to role
- One role per user per exercise

### 2. Internationalization framework
- `next-intl` with `fr-CA` default and `en-CA` selectable
- Server Components and Server Actions both locale-aware
- Date and time formatting respects locale

### 3. Scenario library (bilingual, multi-framework)
- Bilingual short-metadata (`title_fr`, `title_en`, `description_fr`, `description_en`)
- Each inject has parallel `inject_variants` records per locale
- **Multi-framework regulatory mapping** with first-class support for the seven primary/secondary frameworks
- Variants may be direct translations OR locale-distinct parallel content

### 4. Exercise instances
- Created from scenario template, participants assigned with per-participant locale
- States: `draft`, `ready`, `in_progress`, `paused`, `completed`

### 5. Live exercise mode
- Facilitator view: master timeline, locale toggle for preview, release controls, curveball composer (both-locale or marked monolingual), pause/resume/end
- Participant view: locale-filtered injects, decision logging
- Evaluator view: locale toggle, decision scoring, observation notes
- Realtime delivery within ~1 second of release, each participant receives their locale's variant

### 6. Bilingual multi-framework AAR export
- Markdown AAR in primary locale set at exercise creation
- Bilingual scenario metadata sections
- User content preserved in authoring locale with `[FR]`/`[EN]` tags
- **Multi-framework coverage matrix** showing the exercise's mapped coverage across all primary and secondary frameworks
- Per-decision framework mapping table

### 7. Compliance review workflow
- Scenarios transition `draft` → `pending_review` → `approved`
- Pending review requires francophone reviewer + anglophone reviewer + compliance reviewer signoff
- Each reviewer's role-specific view filters to their concern area

---

## v1 feature scope — what is NOT being built

- LLM-driven NPC injects (Phase 2 brief)
- Email or SMS delivery
- Mobile UI
- Multi-org / multi-tenant
- SSO / SAML
- File uploads / PDF artifacts
- Video or audio recording
- Analytics dashboards beyond "exercises run" count
- Production-grade error monitoring
- Payment / billing
- Public-facing pages
- Auto-translation of any content
- Locales beyond `fr-CA` and `en-CA`
- **Real cardholder data handling — strictly out of scope, hard line for PCI**
- **PCI ASV scan integration, AOC generation, or other PCI compliance automation** (the platform produces TTX evidence, not PCI scan evidence)
- **SOC 2 control monitoring or evidence collection beyond TTX records** (separate GRC tools handle this)

---

## Data model

Implement as a Supabase migration. RLS on every table. UUID PKs. `created_at` and `updated_at` on every table. Cascade foreign keys appropriately.

### Tables

**`profiles`**
- Linked to `auth.users` via id
- full_name, default_role, org_name
- `locale` (text, default `'fr-CA'`, check `in ('fr-CA', 'en-CA')`)

**`scenarios`**
- threat_type, difficulty, duration_minutes
- industry_tags (text array)
- **regulatory_mappings** (jsonb) — structured as:
```json
{
  "osfi_b13": ["section_4_2", "section_5_1_3"],
  "law25": ["art_3_5", "art_63_1"],
  "nist_csf_v2": ["RS.MA-01", "RS.CO-02"],
  "pci_dss_v4": ["12.10.1", "12.10.4"],
  "pipeda": ["principle_4_7"],
  "bill96": [],
  "soc2_tsc": ["CC7.3", "CC7.4"]
}
```
- `title_fr`, `title_en`, `description_fr`, `description_en`
- `pci_scope` (boolean, default false — flag indicating scenario involves CDE)
- `card_brands` (text array, nullable — fictional or generic only, never real-brand-specific without legal review)
- created_by
- `reviewed_by_fr`, `reviewed_by_en`, `reviewed_by_compliance` (uuid, nullable)
- `reviewed_at_fr`, `reviewed_at_en`, `reviewed_at_compliance` (timestamps, nullable)
- `review_status` (text, enum: `draft`, `pending_review`, `approved`, `rejected`, default `draft`)

**`injects`**
- scenario_id, sequence_order, planned_offset_minutes
- channel, visible_to_roles (text array)
- attack_technique_ids (text array)
- `expected_decisions` (jsonb with locale keys)
- `decision_framework_mappings` (jsonb) — same structure as scenario `regulatory_mappings` but at inject level for granular per-decision mapping

**`inject_variants`**
- id (uuid), inject_id (uuid, FK, cascade)
- `locale` (text, check `in ('fr-CA', 'en-CA')`)
- title (text), content (text, markdown)
- unique (inject_id, locale)

**`exercises`**
- name, scenario_id, status
- scheduled_start, actual_start, actual_end
- facilitator_id
- `primary_locale` (text)

**`exercise_participants`**
- exercise_id, user_id, role, assigned_at
- `assigned_locale` (text)

**`released_injects`**
- exercise_id, inject_id, released_at, released_by
- is_curveball (boolean, default false)
- `curveball_content_fr` (text, nullable)
- `curveball_content_en` (text, nullable)
- `curveball_monolingual_locale` (text, nullable)
- `curveball_framework_mappings` (jsonb, nullable — for curveballs that map to specific framework controls)

**`decisions`**
- exercise_id, released_inject_id, participant_id
- decision_text, rationale, decided_at
- `authored_locale` (text)

**`observations`**
- exercise_id, observer_id, observed_at
- severity, category, finding_text, recommendation
- `linked_control_ids` (jsonb) — structured per-framework to support multi-framework observations
- linked_decision_id (nullable)
- `authored_locale` (text)

**`decision_scores`**
- decision_id, evaluator_id
- score (smallint), notes
- `control_mappings` (jsonb) — multi-framework
- `authored_locale` (text)

### Framework constants

Add `lib/constants/regulations/` with these files:

- `osfi-b13.ts` — B-13 section IDs and short descriptions (English; French translations in `messages/fr-CA.json`)
- `quebec-law-25.ts` — Article references relevant to incident response and breach notification
- `nist-csf-v2.ts` — Subcategory IDs across all six functions (GV, ID, PR, DE, RS, RC)
- `pci-dss-v4.ts` — Requirements most relevant to IR (focus on 12.10.x subrequirements, plus 12.5, 12.6, 6.x for vulnerability scenarios, 3.x and 4.x for data-at-rest/in-transit scenarios). You do not need all 300+ subrequirements — only those plausibly exercised in TTXs.
- `pipeda.ts` — Principles 4.7 (safeguards) and 4.9 (individual access), plus breach notification provisions
- `bill96.ts` — Provisions relevant to incident communications and notifications to Quebec individuals
- `soc2-tsc.ts` — CC series (common criteria) in full detail; A1.x, C1.x, P1.x-P8.x, PI1.x if the org elects those TSC categories

Each file exports a typed array of `{ id, label_en, label_fr, description_en, description_fr }` objects.

---

## Coding conventions

- TypeScript strict, no `any`, no `@ts-ignore` without comment
- Server Components default; Client Components only where interactivity demands
- Server Actions for mutations
- Zod for all form validation
- shadcn/ui for primitives
- Tailwind utilities only
- Folder: `app/[locale]/`, `components/`, `lib/`, `lib/supabase/`, `lib/db/`, `lib/types/`, `lib/constants/regulations/`, `messages/`, `supabase/migrations/`
- All user-facing strings through `useTranslations()` / `getTranslations()`
- ICU message format for pluralization/interpolation
- One feature per commit, conventional commits

---

## Phased build plan

Pause for confirmation between phases.

### Phase A — Scaffolding
1. Initialize Next.js 14 with TypeScript, Tailwind, App Router
2. shadcn/ui configured
3. Supabase client libraries
4. Auth middleware
5. Folder structure
6. Initial `README.md` and `.gitignore`
7. `pnpm build` clean
8. Commit. Stop.

### Phase B.5 — Internationalization
1. Install `next-intl`, configure for App Router
2. Locale-based routing: `/[locale]/...`
3. `messages/fr-CA.json` and `messages/en-CA.json` with starter UI strings
4. `fr-CA` default
5. Locale detection logic
6. `next/font` for French accented character rendering
7. Locale switcher component
8. Middleware updates
9. Verify both `/fr-CA` and `/en-CA` routes
10. `pnpm build` clean
11. Commit. Stop.

### Phase B — Database and authentication
1. Write Supabase migration with full multi-framework schema and RLS
2. Generate TypeScript types
3. Create the `lib/constants/regulations/` framework constant files
4. Login, signup, password reset pages (fully translated)
5. `/profile` with locale selector
6. Role-based middleware routing to `/[locale]/{role}` paths
7. Stub role dashboards greeting user in their locale
8. Commit. Stop.

### Phase C — Scenario library (bilingual, multi-framework authoring)
1. CRUD UI for scenarios
2. Bilingual authoring form: side-by-side FR/EN fields for short metadata
3. Nested CRUD for injects with FR/EN tabbed variant authoring
4. **Multi-framework mapping picker:**
   - Tabbed interface for the seven frameworks (OSFI B-13, Law 25, NIST CSF v2.0, PCI DSS v4.0, PIPEDA, Bill 96, SOC 2 TSC)
   - Each tab shows the framework's available controls/articles/requirements from `lib/constants/regulations/`
   - Multi-select per framework
   - Per-decision mapping at the inject level using the same picker
5. `pci_scope` boolean flag and `card_brands` text array on scenarios
6. Validation: both locales filled before scenario can transition to `pending_review`
7. Validation: PCI scope scenarios must have at least one PCI DSS mapping
8. Review status workflow with reviewer assignment for three roles (fr, en, compliance)
9. Zod validation
10. Commit. Stop.

### Phase D — Exercise creation and participant assignment
1. Exercise CRUD: create from scenario, assign participants by email
2. Per-participant locale assignment
3. Pre-start lobby view in each role's locale
4. State transitions: `draft` → `ready` → `in_progress`
5. Commit. Stop.

### Phase E — Live exercise mode
1. Facilitator view: master timeline, current inject, locale toggle preview, release controls, curveball composer (FR+EN tabs, framework mapping picker, monolingual override), pause/resume/end
2. Participant view: locale-filtered injects, decision logging
3. Evaluator view: locale toggle, decision scoring with framework mapping tags, observation notes
4. Supabase Realtime: per-participant locale variant delivery within ~1 second
5. Commit. Stop.

### Phase F — Bilingual multi-framework AAR export
1. Server action pulling full exercise data and rendering bilingual Markdown AAR
2. Primary locale chosen at generation (defaults to exercise's `primary_locale`)
3. Bilingual scenario summary, timeline
4. User content preserved in `authored_locale` with `[FR]`/`[EN]` tags
5. **Multi-framework coverage matrix:** table showing each framework's coverage in this exercise — which controls were exercised by which decisions, and confidence level (fully exercised / partially / unaddressed)
6. **Per-decision mapping table** in AAR appendix
7. Download button on exercise summary page
8. Commit. Stop.

### Phase G — Bilingual seed scenarios (including PCI-relevant)
1. Create three seed scenarios via SQL migration, fully bilingual with full multi-framework mappings:
   - **Ransomware double-extortion targeting Quebec fintech** (Akira-style, 6 injects, OSFI B-13 + Law 25 + NIST CSF + SOC 2 TSC mappings)
   - **Third-party KYC SaaS provider breach** (5 injects, OSFI B-13 + Law 25 + NIST CSF + SOC 2 TSC + PIPEDA mappings)
   - **CDE compromise via web-skimming malware** (7 injects, OSFI B-13 + Law 25 + NIST CSF + **PCI DSS v4.0** + SOC 2 TSC mappings) — exercises the 72-hour PCI notification clock alongside Law 25's "without delay" and OSFI's 24-hour, with a French CAI inquiry inject and an English card-brand notification inject as parallel realistic communications
2. All seed scenarios fully metadata-complete in both locales
3. `pnpm seed` script
4. Final README updates with multi-framework dry-run instructions
5. Commit. Stop.

### Phase H — Multi-framework bilingual smoke test and reviewer workflow
1. Implement the three-reviewer signoff flow (francophone, anglophone, compliance)
2. End-to-end test: create users in both locales plus a compliance reviewer; run a small exercise from the CDE scenario; verify locale filtering, framework mapping persistence, and AAR coverage matrix accuracy
3. Build `/admin/i18n-audit` page listing missing translation keys
4. Build `/admin/framework-audit` page summarizing framework mapping coverage across the scenario library (which frameworks have low coverage, which controls are unmapped)
5. Final smoke test checklist in README
6. Commit. Stop.

---

## Operating rules for the development agent

- Use plan mode before each phase
- After each phase, run `pnpm build` and `pnpm lint`, fix errors before reporting completion
- If information needed is not in this brief, ASK rather than guess
- If a feature requires a paid service, STOP and propose a free-tier alternative
- Do not install dependencies not strictly required
- Commit after each working sub-step, conventional commits
- Never write secrets to committed files
- For UI strings: never invent translations; mark with TODO comments for `translations-needed.md`
- **For framework mappings: never invent control IDs.** If a relevant control isn't in the constants files, flag it for the compliance reviewer and add to a `framework-mappings-needed.md` file.
- **Never include real cardholder data, real PANs (other than the standard test PANs designed for this purpose), or real card-brand-specific statements** in seed scenarios

---

## Verification checklist (per phase)

- [ ] `pnpm build` clean
- [ ] `pnpm lint` clean
- [ ] `pnpm dev` runs, both `/fr-CA` and `/en-CA` routes load
- [ ] New functionality tested in both locales
- [ ] No hardcoded English or French in JSX
- [ ] Translation keys present in both `messages/fr-CA.json` and `messages/en-CA.json`
- [ ] Framework constants files complete and typed (Phase B+)
- [ ] Multi-framework mapping picker accepts all seven frameworks (Phase C+)
- [ ] Changes committed with clear conventional-commits message

---

## Definition of "v1 done"

- [ ] All eight phases confirmed
- [ ] Supabase migration pushed
- [ ] Application deployed to Cloudflare Pages
- [ ] Live bilingual dry-run with francophone + anglophone test users on the CDE scenario
- [ ] AAR downloaded, both locale variants render correctly, multi-framework coverage matrix complete
- [ ] User content preserved in authored locale
- [ ] Keep-alive GitHub Action in place
- [ ] `translations-needed.md` empty (or resolved)
- [ ] `framework-mappings-needed.md` empty (or resolved by compliance reviewer)
- [ ] Developer README complete

---

## Out-of-scope items tracked for later

- **Phase 2 — LLM-driven NPC engine** (locale-aware NPC dialogue)
- **Phase 3 — Compliance and operations** (Supabase Pro, backups, custom domain, audit logging, platform itself in SOC 2 scope)
- **Phase 4 — Multi-tenant and SSO**
- **Phase 5 — Additional locales**
- **Phase 6 — Scenario marketplace**
- **Phase 7 — PCI evidence automation** (AOC support, ASV scan integration, RoC artifact generation) — not a TTX feature, but worth noting the boundary
- **Phase 8 — Direct GRC tool integration** (push TTX findings to Drata/Vanta/Secureframe for SOC 2 evidence collection)

---

## Document control

- **Document owner:** [Security team lead]
- **Last reviewed:** [Date]
- **Next review:** On v1 completion, then every 6 months
- **Version:** 3.0
- **Change log:**
  - v3.0 — Added PCI DSS v4.0 and SOC 2 TSC framework constants, multi-framework regulatory_mappings jsonb schema, compliance_reviewer role, per-decision framework mapping, CDE seed scenario, framework-audit admin page
  - v2.0 — Added Phase B.5 (i18n), bilingual schema, locale-aware live mode, bilingual AAR, Phase H, Quebec Law 25 mappings
  - v1.0 — Initial English-only version

---

*This document is internal-use only. It describes the build specification for an internal bilingual training tool. The platform built from this brief is classified Internal and does not process production data, customer data, or cardholder data.*
