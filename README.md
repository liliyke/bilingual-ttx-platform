# bilingual-ttx-platform

A bilingual (French / English) tabletop-exercise platform for running cybersecurity TTXs at a
Quebec fintech, with first-class multi-framework compliance mapping — OSFI B-13, Quebec Law 25,
NIST CSF v2.0, PCI DSS v4.0, SOC 2 Type II, PIPEDA, and Bill 96.

This repo holds the **v3 documentation set** that defines the platform plus a **starter app
skeleton** you can build on. The whole thing is designed to run on free-tier infrastructure
(Supabase + Cloudflare Pages) and to be assembled phase-by-phase with Claude Code as the
development agent.

French (`fr-CA`) is the default locale; English (`en-CA`) is selectable per user.

## What's here

```
.
├── docs/                     # the v3 documentation set (start here)
│   ├── build-guide-v3.md           # free-tier build guide, end to end
│   ├── build-brief-v3.md           # the build spec / Claude Code prompt
│   ├── ttx-architect-agent-prompt-v3.md   # reusable scenario-design system prompt
│   └── content-review-sop-v2.md    # francophone + anglophone + compliance review SOP
│
├── app/                      # config, framework constants, db migration, i18n messages
├── lib/constants/regulations/      # typed control catalogues per framework
├── supabase/migrations/            # bilingual, multi-framework schema with RLS
├── messages/                       # fr-CA / en-CA UI strings
└── .github/workflows/keep-alive.yml
```

The Next.js application code is scaffolded as a **starter skeleton** — the parts that are fully
specified in the docs (the database schema, the framework control catalogues, the i18n wiring,
the keep-alive job) are real and usable; the feature screens are stubs that follow the phased
plan in [`docs/build-brief-v3.md`](docs/build-brief-v3.md).

## Stack

- Next.js 14 (App Router), TypeScript strict
- Tailwind CSS + shadcn/ui
- Supabase (Postgres + Auth + Realtime), Canada Central, free tier
- `next-intl` for internationalization
- pnpm, deployed to Cloudflare Pages

## Where to start

1. Read [`docs/build-guide-v3.md`](docs/build-guide-v3.md) for the end-to-end build.
2. Read [`docs/build-brief-v3.md`](docs/build-brief-v3.md) — this is the actual prompt fed to
   Claude Code, with the data model, conventions, and the eight build phases (A–H).
3. The schema in [`supabase/migrations/`](supabase/migrations) and the control catalogues in
   [`lib/constants/regulations/`](lib/constants/regulations) are ready to apply and extend.

To carry the build forward from where this skeleton stops, see
[`docs/getting-started.md`](docs/getting-started.md) — it maps what's done, the local-dev
setup, and the exact next steps (the auth + role-routing remainder of Phase B).

## Scope and data handling

Everything here is for an **internal training program**. Scenarios use synthetic content only.
No production data, customer PII, or cardholder data (real PANs, track data, CVV, PIN) belongs
anywhere in this system — that's a hard line for the PCI scope the platform is meant to model.
Card-data scenarios use the standard PCI test PANs and generic/fictional card-brand references.

## Status

Documentation: v3, complete. Application: Phase A/B.5 skeleton with the database and framework
layers filled in. Subsequent phases (C–H) are described in the build brief.

## Licence

This repo is dual-licensed by content type:

- **Code** — MIT, see [`LICENSE`](LICENSE). Covers the app skeleton, configs, the database
  migration, and the framework constant files.
- **Documentation** — Creative Commons Attribution 4.0 International (CC-BY-4.0), see
  [`docs/LICENSE`](docs/LICENSE). Covers everything under [`docs/`](docs). Reuse the prose with
  attribution.

The "internal-use only" notices inside the documents are part of the realistic SOP framing, not
a restriction on this repository.
