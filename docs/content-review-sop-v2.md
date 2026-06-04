# Bilingual Content Review SOP — TTX Platform (v2 — with Compliance Reviewer)

> Standard Operating Procedure for francophone, anglophone, and compliance review of bilingual multi-framework TTX scenario content before it is loaded into the platform or used in a live exercise. Read alongside the [TTX Platform — Free-Tier Build Guide (v3)](build-guide-v3.md), [TTX Platform — Build Brief (v3)](build-brief-v3.md), and [TTX-Architect — Scenario Design Agent Prompt (v3)](ttx-architect-agent-prompt-v3.md).
>
> **Version:** 2.0 — adds compliance reviewer role for PCI DSS v4.0 and SOC 2 TSC mapping validation
> **Supersedes:** v1.0 (linguistic review only)

---

## Purpose

This SOP defines the workflow, responsibilities, and quality criteria for reviewing bilingual multi-framework TTX scenario content. It now covers three review dimensions:

1. **Linguistic accuracy** (Quebec French and Canadian English) — Bilingual Content Review SOP v1.0 scope
2. **Regulatory mapping accuracy** (OSFI B-13, Law 25, NIST CSF, PCI DSS v4.0, SOC 2 TSC, PIPEDA, Bill 96) — new in v2.0
3. **Operational realism** (cross-functional coordination, decision design) — shared responsibility

Without all three review streams, scenarios may look bilingual and comprehensive but fail in front of native speakers, fail an audit's accuracy bar, or fail to actually exercise the controls they claim to.

---

## Scope

This SOP applies to all content that will be:

- Loaded into the TTX Platform's scenario library as `approved` status
- Used in a live exercise as an inject (including curveballs)
- Included in an AAR circulated outside the IR team
- Used as compliance evidence for **OSFI B-13, Law 25, PCI DSS v4.0 Req 12.10, SOC 2 TSC** program audits
- Referenced in any deliverable leaving the security team

It does not apply to:

- Internal working drafts still in design
- User-generated content during a live exercise (preserved in authoring language, not reviewed for translation accuracy)
- Routine UI strings reviewed at platform-build time

---

## Roles

### Francophone Reviewer
- **Qualification:** Native or professionally fluent Quebec French; cybersecurity, financial-sector, or regulatory background preferred
- **Responsibility:** Validates accuracy and authenticity of Quebec French content
- **Time commitment:** ~1–2 hours per scenario, ~30 min per significant curveball
- **Authority:** `approved`, `changes_requested`, or `rejected` on French content

### Anglophone Reviewer
- **Qualification:** Native or professionally fluent Canadian English; cybersecurity, financial-sector, or regulatory background preferred
- **Responsibility:** Validates accuracy and authenticity of English content
- **Time commitment:** ~1 hour per scenario, ~15 min per significant curveball
- **Authority:** Same as francophone reviewer for English content

### Compliance Reviewer (new in v2.0)
- **Qualification:** Familiarity with OSFI B-13, Law 25, NIST CSF v2.0, PCI DSS v4.0, SOC 2 TSC; typically the GRC lead, compliance manager, internal auditor, or external auditor liaison
- **Responsibility:** Validates accuracy of multi-framework mapping; confirms PCI scope is correctly characterized; validates SOC 2 TSC selections
- **Time commitment:** ~30–60 minutes per scenario, ~10–15 min per significant curveball with framework implications
- **Authority:** `approved`, `changes_requested`, or `rejected` on framework mappings

### Scenario Author
- **Responsibility:** Originates scenario via TTX-Architect or manually; addresses all three reviewers' feedback; resolves `[TERM_REVIEW]` markers; coordinates between reviewers when changes ripple
- **Authority:** Cannot self-approve any dimension

### Security Team Lead (or delegate)
- **Responsibility:** Resolves disputes; assigns reviewers; maintains reviewer pool; ensures compliance reviewer capacity aligns with TTX cadence
- **Authority:** Final approval on edge cases

---

## Reviewer pool requirements

Minimum staffing for the three review streams:

- **At least two francophone reviewers** in the active pool
- **At least two anglophone reviewers** in the active pool
- **At least two compliance reviewers** in the active pool — and at least one of them must have direct PCI DSS experience if scenarios will involve CDE scope
- **At least one reviewer cross-trained** in regulatory compliance (Law 25, OSFI B-13 specifically) — may be the same person as a francophone reviewer

If internal capacity is insufficient:

- **Contracted reviewers** acceptable, NDA in place; linguistic reviewers typically $80–150/hour, compliance reviewers $150–300/hour for cybersecurity-fluent contractors
- **External auditor liaison** (the firm conducting your SOC 2 audit or QSA conducting your PCI assessment) can sometimes review TTX scenarios as part of audit-readiness engagement
- **Other Canadian fintech security teams** sometimes exchange linguistic reviewer time at peer level

Reviewer pool is reviewed annually; reviewers must complete one review per quarter to remain active.

---

## Review workflow

### Step 1 — Author marks scenario as ready for review

Author has completed all artifacts, self-reviewed against the quality checklist, resolved `[TERM_REVIEW]` markers, verified both locale variants are present and all framework mappings are populated.

Author transitions scenario status from `draft` to `pending_review` in the platform.

Platform notifies all three assigned reviewers in parallel.

### Step 2 — Reviewer assignment

Security Team Lead (or author with lead approval) assigns:
- One francophone reviewer
- One anglophone reviewer
- One compliance reviewer
- For high-stakes scenarios (regulator-facing AAR planned, audit evidence usage planned): a second compliance reviewer for cross-validation

Assignments recorded via `reviewed_by_fr`, `reviewed_by_en`, `reviewed_by_compliance` fields.

### Step 3 — Parallel three-stream review

All three reviewers work in parallel against their respective dimensions using the role-specific checklists (below). Each produces one of three outcomes:

- `approved`
- `changes_requested` (itemized feedback; author addresses and resubmits)
- `rejected` (fundamental issues; scenario returns to `draft`)

Reviewers record decision and notes in the platform.

### Step 4 — Author iteration

If any reviewer returns `changes_requested`, author addresses feedback. **Critically: framework-mapping changes can ripple into linguistic content** (e.g., adding a PCI mapping requires a corresponding inject that exercises the control, which requires both-locale content, which triggers re-review of linguistic accuracy). The author manages this ripple.

Typical iteration count: 0–2 cycles for TTX-Architect-generated scenarios; 1–3 for manually authored; up to 3–4 for first-time-CDE-scenario authoring before patterns are established.

### Step 5 — Final approval

Once all three reviewers approve, the platform transitions scenario to `approved`. Approval timestamps locked.

### Step 6 — Archive

Author archives to *Scenario Source Materials*:
- TTX-Architect transcript (if applicable)
- All three reviewers' notes
- Any back-and-forth iteration log

Retention: 24 months minimum, **7 years if scenario was used for SOC 2 or PCI audit evidence** (match the audit's evidence retention).

---

## Review checklists

### Francophone reviewer checklist (Quebec French content)

**Linguistic quality**
- [ ] Authentic Quebec French (not France French) — "courriel" not "e-mail", "octroyer" not "donner" in formal contexts
- [ ] Cybersecurity terms align with OQLF *Grand dictionnaire terminologique*
- [ ] Regulator/legal terminology accurate ("incident de confidentialité" for Law 25, "renseignements personnels" not "données personnelles")
- [ ] Tone and register appropriate to inject source
- [ ] No inappropriate anglicisms
- [ ] All `[TERM_REVIEW]` markers addressed

**Regulatory accuracy (linguistic dimension)**
- [ ] Law 25 article references accurate against current published law
- [ ] CAI communication style plausible
- [ ] Notification timelines reflect "without delay" / *sans délai* with risk-of-harm framing
- [ ] Bill 96 implications (if invoked) accurately characterized
- [ ] No fabricated CAI examiner names, no invented regulator quotes

**Cultural and contextual authenticity**
- [ ] Names, addresses, institutional references reflect Quebec context
- [ ] Bilingual stakeholder dynamics realistic
- [ ] References to internal Quebec teams plausible

**Inject-specific**
- [ ] French injects read as originally authored in French
- [ ] Locale-distinct rationale (where applicable) sound

### Anglophone reviewer checklist (Canadian English content)

**Linguistic quality**
- [ ] Canadian English where appropriate ("centre", "cheque", "organization/organisation" used consistently)
- [ ] Cybersecurity terms align with current Canadian industry usage
- [ ] Tone and register appropriate

**Regulatory accuracy (linguistic dimension)**
- [ ] OSFI B-13 references accurate; 24-hour reporting timeline correctly characterized
- [ ] PIPEDA principles referenced accurately
- [ ] OPC communication style plausible
- [ ] Card-brand / acquirer communications (if present) use plausible language without fabricating specific brand statements
- [ ] No fabricated examiner names, no invented quotes

**Contextual authenticity**
- [ ] Names, addresses, institutional references reflect Canadian context
- [ ] Federal vs. provincial regulator distinctions correct (CAI provincial, OPC federal)
- [ ] References to anglophone Canadian media realistic

**Inject-specific**
- [ ] English injects read as originally authored in English
- [ ] Locale-distinct rationale sound

### Compliance reviewer checklist (multi-framework mapping accuracy)

**Framework citation accuracy**
- [ ] **OSFI B-13:** Section references match current published guideline; section numbering correct
- [ ] **Law 25:** Article numbers accurate against current consolidated version; article references substantively relevant to the cited decision
- [ ] **NIST CSF v2.0:** Subcategory IDs use current v2.0 format (e.g., `RS.MA-01` not `RS.RP-01` from v1.1); function-level mappings present where appropriate
- [ ] **PCI DSS v4.0:** Requirement IDs accurate against current published standard; subrequirement granularity appropriate (not just "12.10" but specifically "12.10.4" where the decision exercises personnel training)
- [ ] **SOC 2 TSC:** Criteria IDs correct (CC7.3 not CC7.4 if the decision is about incident handling vs. recovery); 2017 TSC with 2022 points of focus
- [ ] **PIPEDA:** Principle citations accurate
- [ ] **Bill 96:** Provisions cited accurately if invoked

**Mapping substance (cargo-cult test)**
- [ ] Each cited control is substantively exercised by the decision, not merely tangentially related
- [ ] For each mapping, the reviewer can articulate: *"This decision produces evidence for [control] because [reason]"*
- [ ] No "kitchen sink" mappings (every decision mapped to every framework regardless of relevance)
- [ ] Primary vs. secondary framework distinction correctly applied

**PCI scope accuracy**
- [ ] Scenario's PCI scope statement (CDE-resident / CDE-adjacent / out-of-scope) is consistent with the scenario's technical premise
- [ ] If CDE-resident: decisions appropriately exercise PCI Req 12.10.x; if appropriate, also touch Req 11.6.1, 6.4.3, 3.x, 4.x as the scenario warrants
- [ ] PAN values used are standard PCI test PANs only; no real PANs even fictionally
- [ ] Card brand references are generic or clearly fictional; no real-brand-specific statements that could imply official communications
- [ ] Notification timelines align with PCI realities (~72 hours to acquirer; brand-specific timelines vary)
- [ ] Aligns with org's actual merchant level / service provider designation

**SOC 2 TSC accuracy**
- [ ] Selected TSC categories match the org's elected scope (Security minimum; A/C/P/PI as elected)
- [ ] CC series mappings appropriately granular (CC7.3 for handling vs. CC7.4 for recovery vs. CC7.5 for ongoing monitoring)
- [ ] If A1.x selected: scenario actually involves availability impact
- [ ] If C1.x selected: scenario actually involves confidentiality impact
- [ ] If P-series selected: scenario actually involves personal information processing
- [ ] If PI1.x selected: scenario actually involves processing integrity (transactional accuracy, completeness)

**Cross-framework coherence**
- [ ] Multi-clock notification scenarios accurately depict the interaction of overlapping clocks (OSFI 24h + Law 25 "without delay" + PCI ~72h)
- [ ] Where a single decision satisfies multiple frameworks, the mappings reflect that (not duplicated as separate decisions)
- [ ] No conflicts between framework requirements as depicted (if a scenario implies a framework conflict, it's intentional and flagged as a design element)

**Audit-evidence readiness**
- [ ] AAR template will produce content that could be referenced as TTX evidence in a PCI assessment or SOC 2 audit
- [ ] Findings template supports control-level traceability (which findings affect which controls)

### Joint review (all three reviewers, by coordination)

- [ ] FR and EN variants conceptually aligned
- [ ] No critical information in one locale but not the other
- [ ] Framework mappings consistent across both locales (the same decision is mapped the same way regardless of which locale's inject triggered it)
- [ ] Bilingual stakeholder management opportunities present where realistic
- [ ] Language-related coordination friction (if depicted) is plausible

---

## Curveball review (during a live exercise)

Curveballs create a process challenge: no time for full async review.

**Pragmatic compromise:**

1. Facilitator authors curveball in both locales (or marks as intentionally monolingual)
2. **Reviewers from all three streams** on-call during exercises provide rapid review (target: 5 minutes linguistic, 5 minutes compliance)
3. On-call reviewers flag urgent issues; minor issues noted but curveball still releases
4. Post-exercise: curveball content archived with reviewer notes for future-scenario learning

If no compliance reviewer is on-call:
- Facilitator may release a curveball without compliance review only if the curveball has no clear framework implications (e.g., a narrative twist with no notification-clock impact)
- Curveballs with framework implications (new regulator inject, new card-brand communication, new audit-relevant decision) require at least async compliance review within 24 hours; the curveball is logged with `unreviewed_curveball` flag until reviewed

If no linguistic reviewer is on-call, same as v1.0 SOP — release with `unreviewed_curveball` flag, async review within 5 business days.

---

## Disputes and edge cases

### Reviewer and author disagree on substantive issue
- First: direct conversation (sync if possible)
- If unresolved: escalate to Security Team Lead
- Lead's decision final for current scenario

### Two reviewers from different streams disagree
- E.g., compliance reviewer says the scenario needs a PCI 11.6.1 decision; francophone reviewer says the corresponding French inject doesn't read authentically
- Author convenes all three reviewers in a 30-minute sync
- Resolution documented for future reference

### Compliance reviewer raises an issue requiring scenario redesign
- Common pattern: "this scenario claims CDE-resident but the technical premise doesn't actually involve PAN exposure"
- Author and compliance reviewer revise scope statement and mappings; linguistic reviewers re-validate any content changes
- May require iteration through full review cycle

### Stuck in iteration (>3 cycles)
- Security Team Lead reviews whether scenario design is flawed
- Options: simplify, split into two scenarios, or reject
- 4+ cycles is usually a sign the source material needs rework

### Reviewer conflict of interest
- E.g., compliance reviewer is also the SOC 2 audit liaison for the firm conducting the upcoming audit, and a scenario will be referenced in audit evidence
- Reviewer recuses; Security Team Lead assigns alternate
- Recusal documented in reviewer pool log

### Quebec French terminology ambiguity
- Authority: OQLF *Grand dictionnaire terminologique*
- Secondary: current CAI and OSFI bilingual publications
- Fall back to francophone reviewer's professional judgment with rationale

### PCI mapping ambiguity
- Authority: PCI SSC's current published v4.0 standard and supplementary guidance
- Secondary: org's QSA or auditor written interpretations
- Fall back to compliance reviewer's professional judgment with rationale; document for future scenarios

### SOC 2 TSC mapping ambiguity
- Authority: AICPA's current TSC publications and trust services criteria points of focus
- Secondary: org's SOC 2 audit firm's written interpretations
- Fall back to compliance reviewer's judgment with rationale

---

## Metrics and quality tracking

| Metric | Target |
|---|---|
| Scenarios approved on first review (all three streams) | ≥ 40% (lower than v1.0's 50% target due to compliance review complexity) |
| Average review iteration count | ≤ 2 |
| Francophone reviewer time per scenario | ≤ 2 hours |
| Anglophone reviewer time per scenario | ≤ 1 hour |
| Compliance reviewer time per scenario | ≤ 1 hour |
| Curveballs released without pre-release linguistic review | < 20% |
| Curveballs with framework implications released without compliance review | < 10% |
| Reviewer pool size (fr / en / compliance) | ≥ 2 each |
| Reviewer pool churn (annual) | < 50% |

Metrics reviewed at the TTX program retrospective (typically annually).

---

## Tooling

Platform supports:

- Scenario `review_status` field with `draft`, `pending_review`, `approved`, `rejected`
- **Three reviewer assignment fields** (`reviewed_by_fr`, `reviewed_by_en`, `reviewed_by_compliance`)
- Reviewer notes textarea per dimension
- Review history log for traceability
- Notification system for all three streams
- **Framework audit dashboard** showing coverage across the scenario library and flagging mapped controls that have never been exercised in a live exercise

For curveballs:

- `unreviewed_curveball` flag on `released_injects`
- Optional `unreviewed_curveball_framework_implications` flag for higher-priority follow-up
- Automated follow-up task for any unreviewed curveball

---

## Training new reviewers

Linguistic reviewers (v1.0 process unchanged):
1. Review this SOP and TTX-Architect prompt
2. Shadow experienced reviewer on one full scenario (~2–3 hours)
3. First independent review with Security Team Lead as second pair of eyes
4. Added to active pool after successful first independent review

**Compliance reviewers (new in v2.0):**
1. Review this SOP, the TTX-Architect prompt, and the framework constants files in the platform repo (`lib/constants/regulations/`)
2. Familiarity check: walk through a sample approved scenario with the Security Team Lead, discussing each framework mapping and the rationale
3. Shadow experienced compliance reviewer on one full scenario
4. First independent compliance review with Security Team Lead as second pair of eyes
5. Added to active pool after successful first independent review

All reviewers receive annual refresher covering:
- Framework updates (PCI DSS, SOC 2 TSC, Law 25, OSFI B-13, NIST CSF, PIPEDA, Bill 96)
- New scenario types in the rotation (especially CDE scenarios)
- Lessons learned from previous quarter
- Updates to this SOP

---

## Out-of-scope

This SOP does not address:

- **Translation certification** (OTTIAQ-certified translation is separate)
- **OQLF compliance certification of the platform**
- **Real regulator communications** (IR plan, not this SOP)
- **Real PCI compliance documentation** (AOC, RoC, SAQ — out of TTX scope)
- **Real SOC 2 audit evidence** (TTX records contribute, but full evidence collection is GRC tool scope)
- **Exercise transcripts including only user-generated content** (preserved in authoring language, not reviewed for translation)

---

## Related documents

- **[TTX Platform — Free-Tier Build Guide (v3)](build-guide-v3.md)**
- **[TTX Platform — Build Brief (v3)](build-brief-v3.md)**
- **[TTX-Architect — Scenario Design Agent Prompt (v3)](ttx-architect-agent-prompt-v3.md)**
- **TTX Cadence Policy** (to be authored)
- **Incident Response Plan**
- **Scenario Source Materials**
- **PCI DSS Compliance Documentation** (org's CDE scope, merchant level)
- **SOC 2 Readiness Documentation** (org's audit timeline, TSC scope)

---

## Document control

- **Document owner:** [Security team lead]
- **Approval required from:** Security team lead, Legal/Privacy lead (Law 25 references), Quebec Operations lead, **GRC/Compliance lead (PCI DSS and SOC 2 references)**
- **Last reviewed:** [Date]
- **Next review:** [Date + 12 months, or sooner if any in-scope framework amends]
- **Version:** 2.0
- **Change log:**
  - v2.0 — Added Compliance Reviewer role and checklist for PCI DSS v4.0 and SOC 2 TSC mapping validation; added compliance-review training path; updated metrics; added framework-update training cadence; added 7-year retention for audit-evidence scenarios
  - v1.0 — Initial SOP establishing francophone and anglophone reviewer workflow

---

*This SOP is internal-use only. It governs review of simulated content for an internal training program. It does not govern real customer communications, real cardholder data handling, real regulator correspondence, or real audit evidence collection outside TTX scenarios.*
