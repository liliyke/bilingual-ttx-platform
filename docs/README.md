# Documentation — v3 set

The four documents that define the bilingual multi-framework TTX Platform. Read them in this
order if you're new to the project:

1. **[build-guide-v3.md](build-guide-v3.md)** — *Free-Tier Build Guide (v3)*
   End-to-end walkthrough for standing the platform up on $0/month infrastructure (Supabase +
   Cloudflare Pages), with Claude Code as the build agent. Start here.

2. **[build-brief-v3.md](build-brief-v3.md)** — *Build Brief (v3)*
   The actual build spec / Claude Code prompt: scope, tech stack, full data model, framework
   constants, coding conventions, and the eight-phase build plan (A–H). This is the document the
   schema and skeleton in this repo are built from.

3. **[ttx-architect-agent-prompt-v3.md](ttx-architect-agent-prompt-v3.md)** — *TTX-Architect — Scenario Design Agent Prompt (v3)*
   A reusable Claude system prompt for designing bilingual, multi-framework scenarios, with the
   output contract, design principles, and a Quebec-fintech scenario rotation.

4. **[content-review-sop-v2.md](content-review-sop-v2.md)** — *Bilingual Content Review SOP (v2)*
   The three-stream review workflow (francophone + anglophone + compliance) that gates scenarios
   from `draft` to `approved`, with per-role checklists.

## Frameworks in scope

Primary (drive scenario design): **OSFI B-13, Quebec Law 25, NIST CSF v2.0, PCI DSS v4.0**.
Secondary (drive evidence mapping): **PIPEDA, Bill 96, SOC 2 Type II TSC**.
Cross-cutting: **MITRE ATT&CK** technique IDs on every inject.

The control catalogues these documents reference live in code under
[`../lib/constants/regulations/`](../lib/constants/regulations).

## A note on the "internal-use only" footers

Each document ends with an internal-use notice. That language is part of the realistic SOP
framing for a Quebec fintech — it's how these documents would actually read inside an org. It is
not a restriction on this public reference repository.
