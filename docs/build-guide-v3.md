# TTX Platform — Free-Tier Build Guide (v3 — Bilingual + PCI/SOC 2)

> Internal guide for building a bilingual (French/English) cybersecurity tabletop exercise (TTX) platform on $0/month infrastructure, with Claude Code as the development agent. Designed for Quebec fintech compliance context spanning Law 25, Bill 96, OSFI B-13, NIST CSF v2.0, PIPEDA, PCI DSS v4.0, and SOC 2 Type II.
>
> **Version:** 3.0 — adds PCI DSS v4.0 and SOC 2 Type II framework support
> **Supersedes:** v2.0 (bilingual without PCI/SOC 2)

---

## Overview

This guide walks through standing up a working internal TTX platform end-to-end using only free-tier services. The platform supports French and English as first-class languages with French default, and supports compliance mapping across the frameworks that govern a Quebec fintech with cardholder data environment (CDE) scope and a near-term SOC 2 audit horizon.

**Estimated total cost (Year 1):** ~$180–425 CAD, all in Claude API consumption. PCI/SOC 2 mapping work adds roughly $10–25 to the build cost.

**Time required:** ~3 weeks of focused part-time effort (~50–55 hours).

**Outcome:** A working bilingual internal TTX platform with multi-framework compliance mapping, supporting facilitator-led exercises, real-time inject delivery in each participant's locale, evaluator scoring against five regulatory frameworks, and automated bilingual AAR generation.

---

## What you'll have at the end

- A Next.js web application running on Cloudflare Pages (free tier)
- A Supabase Postgres backend in the Canada Central region (free tier)
- Bilingual UI (French default, English selectable per user)
- Role-based access for facilitators, participants, evaluators, observers, and admins
- A scenario library seeded with three ready-to-run bilingual scenarios including a card-data scenario
- Real-time inject delivery during live exercises in each participant's locale
- Evaluator scorecards with mappings to **OSFI B-13, Quebec Law 25, NIST CSF v2.0, PCI DSS v4.0, SOC 2 TSC, MITRE ATT&CK** (and PIPEDA / Bill 96 where applicable)
- Bilingual Markdown AAR export with locale-tagged user content and multi-framework coverage matrix

---

## Compliance context (tiered)

The platform supports a tiered compliance framework approach. Authors and reviewers should be deliberate about which frameworks govern which decisions.

**Primary frameworks (drive scenario design):**
- OSFI Guideline B-13 (Technology and Cyber Risk Management)
- Quebec Law 25 (privacy and breach notification)
- NIST Cybersecurity Framework v2.0
- PCI DSS v4.0 (cardholder data environment in scope)

**Secondary frameworks (drive evidence mapping):**
- PIPEDA (federal privacy)
- Charter of the French Language / Bill 96
- SOC 2 Type II Trust Services Criteria (planned audit within 12 months)

**Reviewed for applicability per scenario:**
- Customer or partner contractual obligations
- Card brand-specific notification requirements (Visa, Mastercard, Amex, Discover)
- Acquirer-specific contractual incident reporting

This tiered structure prevents compliance bloat — authors don't tag every scenario against every framework, but every scenario gets reviewed for applicability across primary frameworks.

---

## Why bilingual + multi-framework matters for a Quebec fintech with CDE scope

Beyond the bilingual drivers (Law 25, Bill 96), CDE-in-scope and pending SOC 2 add operational drivers:

| Driver | Implication |
|---|---|
| **PCI DSS v4.0 Requirement 12.10** | Documented incident response plan tested at least annually — the TTX program directly produces this evidence |
| **PCI breach notification clock (~72 hours to acquirers/card brands)** | Adds a third notification timeline alongside OSFI's 24-hour and Law 25's "without delay" — creates realistic decision pressure across overlapping clocks |
| **PCI-specific scenarios** | Card-data exposure, POS compromise, CDE segmentation failures, tokenization service breach, web-skimming — attack surfaces that pure financial-services scenarios miss |
| **SOC 2 CC7.3 and CC7.4** | Security incident handling and IR procedures — TTX records become control evidence in SOC 2 audits |
| **SOC 2 audit horizon (~12 months)** | Establishing the TTX program now means audit-ready evidence will exist by audit time, not be retroactively constructed |

---

## Free-tier stack

| Component | Service | Free-tier limit |
|---|---|---|
| Frontend hosting | Cloudflare Pages | Unlimited requests, commercial use allowed |
| Database + Auth + Realtime | Supabase (Canada Central) | 500 MB DB, 2M Realtime msgs/month, project pauses after 7 days idle |
| Source control | GitHub | Free private repos |
| Internationalization | `next-intl` library | Open source |
| Development environment | WSL2 Ubuntu 24.04 + VS Code | Free |
| Development agent | Claude Code CLI | Pay-as-you-go API or covered by Pro/Max subscription |

---

## Prerequisites

- Windows 10/11 host machine with WSL2 enabled
- Ubuntu 24.04 installed in WSL
- A GitHub account
- A Supabase account (sign in with GitHub)
- A Cloudflare account
- An Anthropic account or Claude Pro/Max subscription
- A reviewer who can validate Quebec French content
- **Awareness of your fintech's PCI scope** (merchant level, service provider designation, CDE boundary) — needed for accurate scenario authoring
- **Awareness of your SOC 2 scope** (TSC categories: Security at minimum; Availability, Confidentiality, Privacy, Processing Integrity if elected) — needed for mapping decisions

---

## Phase 1 — Local environment setup (~30 minutes, one-time)

Run inside your WSL Ubuntu shell:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential curl git

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts

npm install -g pnpm
npm install -g @anthropic-ai/claude-code
npm install -g supabase

git config --global user.name "Your Name"
git config --global user.email "you@company.com"
```

Install VS Code on Windows plus the WSL extension. Keep your project under `~/projects/`, not `/mnt/c/`.

---

## Phase 2 — Create cloud accounts and project (~15 minutes)

### Supabase project

1. https://supabase.com → sign in with GitHub
2. New project → name `ttx-platform`
3. Generate a strong database password, save in password manager
4. Region: Canada Central (`ca-central-1`)
5. Plan: Free
6. After provisioning, collect from Settings → API:
   - Project URL
   - `anon` public key
   - `service_role` key

### GitHub repository

Create a private repo named `ttx-platform`. Don't initialize with files.

### Cloudflare account

Sign up at https://dash.cloudflare.com.

---

## Phase 3 — Initialize the project (~10 minutes)

```bash
mkdir -p ~/projects/ttx-platform
cd ~/projects/ttx-platform
git init
git remote add origin <your-repo-url>
```

Create `.env.local`:

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
ANTHROPIC_API_KEY=
NEXT_PUBLIC_APP_NAME="TTX Platform"
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=fr-CA
NEXT_PUBLIC_SUPPORTED_LOCALES=fr-CA,en-CA
EOF
```

Create `.env.example` with the same keys but blank values.

---

## Phase 4 — Run the build prompt with Claude Code

The full build brief is maintained as a separate document: **[TTX Platform — Build Brief (v3)](build-brief-v3.md)**. Save that document as `BUILD_BRIEF.md`, then:

```bash
cd ~/projects/ttx-platform
claude
```

Paste the build brief as the first message. The build is structured into **eight phases (A through H)**. Verify after each phase:

```bash
pnpm install
pnpm build
pnpm lint
pnpm dev
```

### Phase breakdown

| Phase | Deliverable | Approx. duration |
|---|---|---|
| A | Next.js scaffold + Supabase clients + auth middleware | 1–2 hours |
| B.5 | Internationalization (next-intl, fr-CA default) | 2–3 hours |
| B | Database schema (bilingual, multi-framework) + auth + role routing | 5–6 hours |
| C | Scenario library CRUD with locale-aware bilingual authoring + multi-framework mapping | 6–8 hours |
| D | Exercise creation + participant assignment with per-user locale | 3–4 hours |
| E | Live exercise mode + locale-aware Realtime sync | 6–8 hours |
| F | Bilingual AAR Markdown export with multi-framework coverage matrix | 4–5 hours |
| G | Bilingual seed scenarios including a PCI-relevant card-data scenario | 4–5 hours |
| H | Bilingual smoke test + francophone reviewer signoff + framework mapping audit | 3–4 hours |

Total: roughly 35–45 hours of human time across 2–3 weeks.

---

## Phase 5 — Apply the database migration

After Phase B:

```bash
supabase link --project-ref <your-project-ref>
supabase db push
supabase gen types typescript --linked > lib/types/database.types.ts
```

Verify in Supabase Dashboard → Database → Tables that all tables (including locale-aware columns and the multi-framework regulatory mapping schema) are created with RLS enabled.

---

## Phase 6 — Deploy to Cloudflare Pages

After Phase H:

1. Push to GitHub: `git push origin main`
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
3. Select `ttx-platform`, framework preset Next.js
4. Build command: `pnpm build`
5. Add environment variables matching `.env.local`
6. Deploy

Note: Next.js on Cloudflare Pages requires `@cloudflare/next-on-pages`.

---

## Phase 7 — Keep-alive automation

Create `.github/workflows/keep-alive.yml`:

```yaml
name: Keep Supabase Alive
on:
  schedule:
    - cron: '0 12 */3 * *'
  workflow_dispatch:
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Supabase
        run: |
          curl -sSf "${{ secrets.SUPABASE_URL }}/rest/v1/scenarios?select=id&limit=1" \
            -H "apikey: ${{ secrets.SUPABASE_ANON_KEY }}" \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}" \
            > /dev/null
```

Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` as repo secrets.

---

## Phase 8 — Multi-framework bilingual dry run

1. Sign up two test accounts with different locale preferences
2. Promote one to facilitator
3. Create an exercise from the card-data breach seed scenario
4. Assign both as participants in their respective locales
5. Open two browsers, log in as each user
6. Verify each user sees the UI and injects in their preferred language
7. Log decisions in each user's language
8. End the exercise, download the AAR
9. Verify the AAR contains:
   - Both locale variants
   - User content preserved in original language
   - Multi-framework coverage matrix showing the scenario's coverage across OSFI B-13, Law 25, NIST CSF, PCI DSS, and SOC 2 TSC

If everything works, v1 is operational.

---

## Free-tier constraints to communicate to stakeholders

| Constraint | Mitigation |
|---|---|
| Supabase free pauses after 7 days idle | GitHub Actions keep-alive cron |
| No daily automated backups on Supabase free | Optional weekly `pg_dump` to Backblaze B2 free tier |
| 500 MB database limit | Bilingual + multi-framework metadata still supports ~400 scenarios |
| No SOC 2 / formal compliance docs on free tier infrastructure | Document platform itself as Internal classification; the platform produces audit evidence, but the platform's own infrastructure isn't in SOC 2 scope at free tier |
| Vercel hobby prohibits commercial use | Using Cloudflare Pages |
| No SSO / SAML | Email + password via Supabase Auth |
| Translation quality requires human review | Francophone SME review step mandatory before scenarios go live |
| **Framework mapping accuracy requires SME review** | **Compliance lead or auditor liaison reviews mappings before scenarios are marked approved** |

---

## Data classification and acceptable use

The TTX platform is classified Internal and aligned with Law 25, Bill 96, and PCI DSS requirements for security-program documentation.

**Permitted data:**
- Synthetic scenario content in French and English
- Observation notes about exercise execution
- Evaluator scores and findings
- AAR drafts
- Multi-framework mapping metadata

**Prohibited data:**
- Real customer PII
- **Real cardholder data (PAN, full track data, CVV, PIN) — this is a hard line for PCI scope**
- Real production credentials or system identifiers
- Real third-party incident details under NDA
- Real financial transaction data
- Real regulator correspondence

All scenarios use synthetic data. Card-data scenarios use clearly fictional PAN values (e.g., the standard test PANs like `4111111111111111`) and synthetic merchant IDs. Card-brand names in scenarios should be either fictional or generic ("a major card network") to avoid implying real-brand statements.

---

## Multi-framework content governance

**Framework mapping accuracy matters as much as translation quality for compliance-evidence value.**

1. All new scenarios require:
   - Francophone reviewer signoff (Quebec French content)
   - Anglophone reviewer signoff (English content)
   - **Compliance reviewer signoff (multi-framework mapping accuracy)** — typically the security team's GRC lead or external auditor liaison
2. **Compliance reviewer focus:**
   - Are framework citations accurate (correct article numbers, requirement IDs, TSC criteria)?
   - Are mappings substantive (the decision actually exercises the cited control), not cargo-cult tagging?
   - Are PCI scenarios consistent with the org's actual CDE boundary and merchant/service-provider designation?
   - Do SOC 2 mappings target current TSC categories (2017 TSC with 2022 points of focus) accurately?
3. Reviewer signoffs documented in scenario record (`reviewed_by_fr`, `reviewed_by_en`, `reviewed_by_compliance`)
4. Re-review trigger: any framework update (PCI DSS revision, SOC 2 TSC revision, Law 25 amendment, OSFI B-13 revision) triggers re-validation of mapped scenarios

---

## Cost summary

| Item | One-time | Recurring |
|---|---|---|
| Infrastructure (Supabase, Cloudflare, GitHub) | $0 | $0/month |
| Claude API for initial build | $180–350 | — |
| Claude API per exercise (bilingual scenario design + multi-framework mapping + AAR) | — | $10–30 per exercise |
| Francophone reviewer time (per scenario) | — | 1–2 hours, internal or ~$100–200 contracted |
| Compliance reviewer time (per scenario) | — | 30–60 min, internal |
| **Year 1 estimate (quarterly cadence)** | **$180–350** | **$40–120/year API + reviewer time** |

---

## When to consider upgrading

- Exercise data must support SOC 2 / OSFI third-party audit evidence with formal compliance documentation → Supabase Pro
- Custom domain required → ~$15 CAD/year
- Exercises expand beyond internal teams → Vercel Pro or equivalent
- Real customer or card data needs to flow through → full paid tier with appropriate compliance posture (this would also dramatically expand PCI scope; typically a separate decision)
- OQLF technology platform certification → coordinate with Quebec compliance
- **SOC 2 audit underway and audit firm requires platform itself to be in scope** → upgrade to Supabase Pro at minimum, document the platform in the SOC 2 system description

---

## Related documents

- **[TTX Platform — Build Brief (v3)](build-brief-v3.md)** — Full Claude Code prompt with bilingual phases and multi-framework mapping
- **[TTX-Architect — Scenario Design Agent Prompt (v3)](ttx-architect-agent-prompt-v3.md)** — Reusable Claude system prompt for bilingual multi-framework scenarios
- **[Bilingual Content Review SOP](content-review-sop-v2.md)** — Reviewer checklist and signoff workflow (with compliance-reviewer extension)
- **TTX Cadence Policy** — Quarterly cadence, audience rotation, scenario rotation (to be authored)
- **Incident Response Plan** — The IRP that TTXs validate
- **PCI DSS Compliance Documentation** — Org's PCI scope and merchant/service-provider designation
- **SOC 2 Readiness Documentation** — Org's SOC 2 audit timeline and TSC scope

---

## Owner and review cadence

- **Document owner:** [Security team lead]
- **Last reviewed:** [Date]
- **Next review:** [Date + 6 months]
- **Change log:**
  - v3.0 — Added PCI DSS v4.0 and SOC 2 Type II framework support, multi-framework mapping governance, compliance-reviewer signoff workflow, card-data scenario in seed library
  - v2.0 — Added first-class bilingual support, Phase B.5 (i18n), Phase H, Quebec regulatory framing
  - v1.0 — Initial English-only version

---

*This guide is internal-use only. The platform it describes is an internal training tool and does not process production or customer data, including cardholder data.*
