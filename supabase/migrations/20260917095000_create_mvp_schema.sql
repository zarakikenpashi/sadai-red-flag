-- RED FLAG MVP schema
-- Creates the relational foundation for companies, testimonials, moderation,
-- reports, and company replies. RLS policies are added in the next migration.

create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

create type public.profile_role as enum (
  'user',
  'moderator',
  'admin',
  'company_rep'
);

create type public.claim_status as enum (
  'unclaimed',
  'pending',
  'approved',
  'rejected'
);

create type public.employment_status as enum (
  'intern',
  'permanent',
  'fixed_term',
  'freelance',
  'apprentice',
  'consultant',
  'candidate',
  'other'
);

create type public.verification_status as enum (
  'unverified',
  'declared',
  'verified'
);

create type public.moderation_status as enum (
  'pending',
  'approved',
  'rejected',
  'hidden',
  'needs_changes'
);

create type public.red_flag_type as enum (
  'late_payment',
  'extended_internship',
  'unpaid_overtime',
  'unclear_contract',
  'broken_promises',
  'management',
  'workload',
  'hours',
  'other'
);

create type public.report_reason as enum (
  'fake_testimonial',
  'insult',
  'personal_data',
  'named_attack',
  'off_topic',
  'other'
);

create type public.report_status as enum (
  'open',
  'reviewing',
  'resolved',
  'dismissed'
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role public.profile_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  city text,
  country text not null default 'Côte d''Ivoire',
  sector text,
  description text,
  claim_status public.claim_status not null default 'unclaimed',
  claimed_by uuid references public.profiles (id) on delete set null,
  red_flag_score integer not null default 0,
  score_confidence text not null default 'low',
  testimonial_count integer not null default 0,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (red_flag_score >= 0 and red_flag_score <= 100),
  check (testimonial_count >= 0),
  check (score_confidence in ('low', 'medium', 'high'))
);

create table public.company_claims (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  requester_id uuid not null references public.profiles (id) on delete cascade,
  requester_name text not null,
  requester_email text not null,
  requester_role text,
  message text,
  status public.claim_status not null default 'pending',
  reviewed_by uuid references public.profiles (id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  employment_status public.employment_status not null,
  duration_label text,
  period_label text,
  title text not null,
  body text not null,
  verification_status public.verification_status not null default 'declared',
  moderation_status public.moderation_status not null default 'pending',
  helpful_count integer not null default 0,
  moderator_note text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (char_length(title) between 3 and 140),
  check (char_length(body) between 20 and 5000),
  check (helpful_count >= 0)
);

create table public.testimonial_scores (
  testimonial_id uuid not null references public.testimonials (id) on delete cascade,
  pay_score smallint not null,
  management_score smallint not null,
  workload_score smallint not null,
  hours_score smallint not null,
  promises_score smallint not null,
  environment_score smallint not null,
  training_score smallint not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (testimonial_id),
  check (pay_score >= 1 and pay_score <= 5),
  check (management_score >= 1 and management_score <= 5),
  check (workload_score >= 1 and workload_score <= 5),
  check (hours_score >= 1 and hours_score <= 5),
  check (promises_score >= 1 and promises_score <= 5),
  check (environment_score >= 1 and environment_score <= 5),
  check (training_score >= 1 and training_score <= 5)
);

create table public.testimonial_flags (
  id uuid primary key default gen_random_uuid(),
  testimonial_id uuid not null references public.testimonials (id) on delete cascade,
  flag_type public.red_flag_type not null,
  created_at timestamptz not null default now(),
  unique (testimonial_id, flag_type)
);

create table public.helpful_votes (
  id uuid primary key default gen_random_uuid(),
  testimonial_id uuid not null references public.testimonials (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (testimonial_id, user_id)
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  testimonial_id uuid not null references public.testimonials (id) on delete cascade,
  reporter_id uuid not null references public.profiles (id) on delete cascade,
  reason public.report_reason not null,
  comment text,
  status public.report_status not null default 'open',
  reviewed_by uuid references public.profiles (id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.company_responses (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  testimonial_id uuid not null references public.testimonials (id) on delete cascade,
  representative_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  moderation_status public.moderation_status not null default 'pending',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (char_length(body) between 20 and 3000),
  unique (testimonial_id, representative_id)
);

create table public.moderation_events (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  moderator_id uuid references public.profiles (id) on delete set null,
  action text not null,
  reason text,
  created_at timestamptz not null default now(),
  check (entity_type in ('testimonial', 'report', 'company_claim', 'company_response', 'company'))
);

create index companies_slug_idx on public.companies (slug);
create index companies_name_idx on public.companies using gin (name gin_trgm_ops);
create index companies_city_sector_idx on public.companies (city, sector);
create index testimonials_company_status_idx on public.testimonials (company_id, moderation_status, published_at desc);
create index testimonials_user_idx on public.testimonials (user_id, created_at desc);
create index testimonial_flags_type_idx on public.testimonial_flags (flag_type);
create index reports_status_idx on public.reports (status, created_at desc);
create index company_claims_status_idx on public.company_claims (status, created_at desc);
create index company_responses_status_idx on public.company_responses (moderation_status, created_at desc);
create index moderation_events_entity_idx on public.moderation_events (entity_type, entity_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger companies_set_updated_at
before update on public.companies
for each row execute function public.set_updated_at();

create trigger company_claims_set_updated_at
before update on public.company_claims
for each row execute function public.set_updated_at();

create trigger testimonials_set_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

create trigger testimonial_scores_set_updated_at
before update on public.testimonial_scores
for each row execute function public.set_updated_at();

create trigger reports_set_updated_at
before update on public.reports
for each row execute function public.set_updated_at();

create trigger company_responses_set_updated_at
before update on public.company_responses
for each row execute function public.set_updated_at();
