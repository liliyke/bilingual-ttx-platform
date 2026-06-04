-- TTX Platform — initial schema (Phase B)
-- Bilingual (fr-CA/en-CA), multi-framework scenario library, exercises, and the
-- three-reviewer compliance workflow. See docs/build-brief-v3.md "Data model".
--
-- Conventions: UUID PKs, created_at/updated_at on every table, RLS on every table.
-- The baseline policies below grant read to authenticated users and constrain
-- writes to owners; role-scoped policies (facilitator/evaluator/compliance, etc.)
-- are layered on in Phase C as the screens that need them are built.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type locale as enum ('fr-CA', 'en-CA');
create type app_role as enum (
  'facilitator', 'participant', 'evaluator',
  'compliance_reviewer', 'observer', 'admin'
);
create type review_status as enum ('draft', 'pending_review', 'approved', 'rejected');
create type exercise_status as enum ('draft', 'ready', 'in_progress', 'paused', 'completed');

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  default_role app_role,
  org_name text,
  locale locale not null default 'fr-CA',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- scenarios
-- ---------------------------------------------------------------------------
create table scenarios (
  id uuid primary key default gen_random_uuid(),
  threat_type text,
  difficulty text,
  duration_minutes integer,
  industry_tags text[] not null default '{}',
  regulatory_mappings jsonb not null default jsonb_build_object(
    'osfi_b13', '[]'::jsonb,
    'law25', '[]'::jsonb,
    'nist_csf_v2', '[]'::jsonb,
    'pci_dss_v4', '[]'::jsonb,
    'pipeda', '[]'::jsonb,
    'bill96', '[]'::jsonb,
    'soc2_tsc', '[]'::jsonb
  ),
  title_fr text,
  title_en text,
  description_fr text,
  description_en text,
  pci_scope boolean not null default false,
  card_brands text[],
  created_by uuid references auth.users (id) on delete set null,
  reviewed_by_fr uuid references auth.users (id) on delete set null,
  reviewed_by_en uuid references auth.users (id) on delete set null,
  reviewed_by_compliance uuid references auth.users (id) on delete set null,
  reviewed_at_fr timestamptz,
  reviewed_at_en timestamptz,
  reviewed_at_compliance timestamptz,
  review_status review_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- injects + bilingual variants
-- ---------------------------------------------------------------------------
create table injects (
  id uuid primary key default gen_random_uuid(),
  scenario_id uuid not null references scenarios (id) on delete cascade,
  sequence_order integer not null,
  planned_offset_minutes integer,
  channel text,
  visible_to_roles text[] not null default '{}',
  attack_technique_ids text[] not null default '{}',
  expected_decisions jsonb not null default '{}'::jsonb,
  decision_framework_mappings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table inject_variants (
  id uuid primary key default gen_random_uuid(),
  inject_id uuid not null references injects (id) on delete cascade,
  locale locale not null,
  title text,
  content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (inject_id, locale)
);

-- ---------------------------------------------------------------------------
-- exercises + participants
-- ---------------------------------------------------------------------------
create table exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  scenario_id uuid references scenarios (id) on delete set null,
  status exercise_status not null default 'draft',
  scheduled_start timestamptz,
  actual_start timestamptz,
  actual_end timestamptz,
  facilitator_id uuid references auth.users (id) on delete set null,
  primary_locale locale not null default 'fr-CA',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table exercise_participants (
  id uuid primary key default gen_random_uuid(),
  exercise_id uuid not null references exercises (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role app_role not null,
  assigned_at timestamptz default now(),
  assigned_locale locale not null default 'fr-CA',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (exercise_id, user_id)
);

-- ---------------------------------------------------------------------------
-- live exercise records
-- ---------------------------------------------------------------------------
create table released_injects (
  id uuid primary key default gen_random_uuid(),
  exercise_id uuid not null references exercises (id) on delete cascade,
  inject_id uuid not null references injects (id) on delete cascade,
  released_at timestamptz default now(),
  released_by uuid references auth.users (id) on delete set null,
  is_curveball boolean not null default false,
  curveball_content_fr text,
  curveball_content_en text,
  curveball_monolingual_locale locale,
  curveball_framework_mappings jsonb,
  unreviewed_curveball boolean not null default false,
  unreviewed_curveball_framework_implications boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table decisions (
  id uuid primary key default gen_random_uuid(),
  exercise_id uuid not null references exercises (id) on delete cascade,
  released_inject_id uuid references released_injects (id) on delete set null,
  participant_id uuid references auth.users (id) on delete set null,
  decision_text text,
  rationale text,
  decided_at timestamptz default now(),
  authored_locale locale not null default 'fr-CA',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table observations (
  id uuid primary key default gen_random_uuid(),
  exercise_id uuid not null references exercises (id) on delete cascade,
  observer_id uuid references auth.users (id) on delete set null,
  observed_at timestamptz default now(),
  severity text,
  category text,
  finding_text text,
  recommendation text,
  linked_control_ids jsonb not null default '{}'::jsonb,
  linked_decision_id uuid references decisions (id) on delete set null,
  authored_locale locale not null default 'fr-CA',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table decision_scores (
  id uuid primary key default gen_random_uuid(),
  decision_id uuid not null references decisions (id) on delete cascade,
  evaluator_id uuid references auth.users (id) on delete set null,
  score smallint,
  notes text,
  control_mappings jsonb not null default '{}'::jsonb,
  authored_locale locale not null default 'fr-CA',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'profiles','scenarios','injects','inject_variants','exercises',
    'exercise_participants','released_injects','decisions','observations',
    'decision_scores'
  ]
  loop
    execute format(
      'create trigger trg_%1$s_updated_at before update on %1$s
         for each row execute function set_updated_at();', t);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- helpful indexes
-- ---------------------------------------------------------------------------
create index idx_injects_scenario on injects (scenario_id, sequence_order);
create index idx_inject_variants_inject on inject_variants (inject_id);
create index idx_participants_exercise on exercise_participants (exercise_id);
create index idx_released_exercise on released_injects (exercise_id);
create index idx_decisions_exercise on decisions (exercise_id);
create index idx_scenarios_review_status on scenarios (review_status);

-- ---------------------------------------------------------------------------
-- Row Level Security (baseline)
-- ---------------------------------------------------------------------------
alter table profiles enable row level security;
alter table scenarios enable row level security;
alter table injects enable row level security;
alter table inject_variants enable row level security;
alter table exercises enable row level security;
alter table exercise_participants enable row level security;
alter table released_injects enable row level security;
alter table decisions enable row level security;
alter table observations enable row level security;
alter table decision_scores enable row level security;

-- profiles: a user manages only their own row.
create policy "profiles_self_select" on profiles
  for select using (auth.uid() = id);
create policy "profiles_self_upsert" on profiles
  for insert with check (auth.uid() = id);
create policy "profiles_self_update" on profiles
  for update using (auth.uid() = id);

-- Baseline read access for authenticated users on the shared library/exercise
-- tables. Phase C tightens these into role- and assignment-scoped policies.
do $$
declare t text;
begin
  foreach t in array array[
    'scenarios','injects','inject_variants','exercises',
    'exercise_participants','released_injects','decisions','observations',
    'decision_scores'
  ]
  loop
    execute format(
      'create policy "%1$s_auth_read" on %1$s
         for select to authenticated using (true);', t);
  end loop;
end;
$$;

-- Authors can create and edit scenarios they own (refined further in Phase C).
create policy "scenarios_insert_own" on scenarios
  for insert to authenticated with check (auth.uid() = created_by);
create policy "scenarios_update_own" on scenarios
  for update to authenticated using (auth.uid() = created_by);
