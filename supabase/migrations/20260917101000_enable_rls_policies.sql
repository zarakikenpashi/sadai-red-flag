-- RED FLAG MVP Row Level Security policies
-- Protects sensitive user-authored experiences, moderation workflows, and
-- company replies. Service role still bypasses RLS for server-only admin jobs.

create or replace function public.current_profile_role()
returns public.profile_role
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.profiles
  where id = auth.uid()
$$;

create or replace function public.is_admin_or_moderator()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_profile_role() in ('admin', 'moderator'), false)
$$;

create or replace function public.is_company_representative(
  target_company_id uuid,
  target_user_id uuid default auth.uid()
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.companies c
    where c.id = target_company_id
      and c.claim_status = 'approved'::public.claim_status
      and c.claimed_by = target_user_id
  )
$$;

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.company_claims enable row level security;
alter table public.testimonials enable row level security;
alter table public.testimonial_scores enable row level security;
alter table public.testimonial_flags enable row level security;
alter table public.helpful_votes enable row level security;
alter table public.reports enable row level security;
alter table public.company_responses enable row level security;
alter table public.moderation_events enable row level security;

create policy profiles_user_read_own
on public.profiles
for select
to authenticated
using (auth.uid() = id or public.is_admin_or_moderator());

create policy profiles_user_insert_own
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy profiles_user_update_own_basic
on public.profiles
for update
to authenticated
using (auth.uid() = id or public.is_admin_or_moderator())
with check (auth.uid() = id or public.is_admin_or_moderator());

create policy companies_public_read
on public.companies
for select
to anon, authenticated
using (true);

create policy companies_authenticated_insert
on public.companies
for insert
to authenticated
with check (auth.uid() = created_by);

create policy companies_moderator_update
on public.companies
for update
to authenticated
using (public.is_admin_or_moderator())
with check (public.is_admin_or_moderator());

create policy company_claims_user_read_own
on public.company_claims
for select
to authenticated
using (requester_id = auth.uid() or public.is_admin_or_moderator());

create policy company_claims_user_insert_own
on public.company_claims
for insert
to authenticated
with check (requester_id = auth.uid());

create policy company_claims_moderator_update
on public.company_claims
for update
to authenticated
using (public.is_admin_or_moderator())
with check (public.is_admin_or_moderator());

create policy testimonials_public_read_approved
on public.testimonials
for select
to anon, authenticated
using (moderation_status = 'approved'::public.moderation_status);

create policy testimonials_owner_read_own
on public.testimonials
for select
to authenticated
using (auth.uid() = user_id or public.is_admin_or_moderator());

create policy testimonials_user_insert_own_pending
on public.testimonials
for insert
to authenticated
with check (
  auth.uid() = user_id
  and moderation_status = 'pending'::public.moderation_status
);

create policy testimonials_owner_update_pending_or_changes
on public.testimonials
for update
to authenticated
using (
  auth.uid() = user_id
  and moderation_status in (
    'pending'::public.moderation_status,
    'needs_changes'::public.moderation_status
  )
)
with check (
  auth.uid() = user_id
  and moderation_status in (
    'pending'::public.moderation_status,
    'needs_changes'::public.moderation_status
  )
);

create policy testimonials_moderator_update
on public.testimonials
for update
to authenticated
using (public.is_admin_or_moderator())
with check (public.is_admin_or_moderator());

create policy testimonial_scores_public_read_approved
on public.testimonial_scores
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.testimonials t
    where t.id = testimonial_id
      and t.moderation_status = 'approved'::public.moderation_status
  )
);

create policy testimonial_scores_owner_read_own
on public.testimonial_scores
for select
to authenticated
using (
  exists (
    select 1
    from public.testimonials t
    where t.id = testimonial_id
      and (t.user_id = auth.uid() or public.is_admin_or_moderator())
  )
);

create policy testimonial_scores_user_insert_own
on public.testimonial_scores
for insert
to authenticated
with check (
  exists (
    select 1
    from public.testimonials t
    where t.id = testimonial_id
      and t.user_id = auth.uid()
      and t.moderation_status = 'pending'::public.moderation_status
  )
);

create policy testimonial_scores_user_update_own_pending
on public.testimonial_scores
for update
to authenticated
using (
  exists (
    select 1
    from public.testimonials t
    where t.id = testimonial_id
      and t.user_id = auth.uid()
      and t.moderation_status in (
        'pending'::public.moderation_status,
        'needs_changes'::public.moderation_status
      )
  )
)
with check (
  exists (
    select 1
    from public.testimonials t
    where t.id = testimonial_id
      and t.user_id = auth.uid()
      and t.moderation_status in (
        'pending'::public.moderation_status,
        'needs_changes'::public.moderation_status
      )
  )
);

create policy testimonial_scores_moderator_all
on public.testimonial_scores
for all
to authenticated
using (public.is_admin_or_moderator())
with check (public.is_admin_or_moderator());

create policy testimonial_flags_public_read_approved
on public.testimonial_flags
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.testimonials t
    where t.id = testimonial_id
      and t.moderation_status = 'approved'::public.moderation_status
  )
);

create policy testimonial_flags_owner_read_own
on public.testimonial_flags
for select
to authenticated
using (
  exists (
    select 1
    from public.testimonials t
    where t.id = testimonial_id
      and (t.user_id = auth.uid() or public.is_admin_or_moderator())
  )
);

create policy testimonial_flags_user_insert_own
on public.testimonial_flags
for insert
to authenticated
with check (
  exists (
    select 1
    from public.testimonials t
    where t.id = testimonial_id
      and t.user_id = auth.uid()
      and t.moderation_status = 'pending'::public.moderation_status
  )
);

create policy testimonial_flags_user_delete_own_pending
on public.testimonial_flags
for delete
to authenticated
using (
  exists (
    select 1
    from public.testimonials t
    where t.id = testimonial_id
      and t.user_id = auth.uid()
      and t.moderation_status in (
        'pending'::public.moderation_status,
        'needs_changes'::public.moderation_status
      )
  )
);

create policy testimonial_flags_moderator_all
on public.testimonial_flags
for all
to authenticated
using (public.is_admin_or_moderator())
with check (public.is_admin_or_moderator());

create policy helpful_votes_user_read_own
on public.helpful_votes
for select
to authenticated
using (auth.uid() = user_id or public.is_admin_or_moderator());

create policy helpful_votes_user_insert_own
on public.helpful_votes
for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.testimonials t
    where t.id = testimonial_id
      and t.moderation_status = 'approved'::public.moderation_status
  )
);

create policy helpful_votes_user_delete_own
on public.helpful_votes
for delete
to authenticated
using (auth.uid() = user_id);

create policy reports_user_read_own
on public.reports
for select
to authenticated
using (auth.uid() = reporter_id or public.is_admin_or_moderator());

create policy reports_moderator_read
on public.reports
for select
to authenticated
using (public.is_admin_or_moderator());

create policy reports_user_insert_own
on public.reports
for insert
to authenticated
with check (
  auth.uid() = reporter_id
  and exists (
    select 1
    from public.testimonials t
    where t.id = testimonial_id
      and t.moderation_status = 'approved'::public.moderation_status
  )
);

create policy reports_moderator_update
on public.reports
for update
to authenticated
using (public.is_admin_or_moderator())
with check (public.is_admin_or_moderator());

create policy company_responses_public_read_approved
on public.company_responses
for select
to anon, authenticated
using (moderation_status = 'approved'::public.moderation_status);

create policy company_responses_rep_read_own
on public.company_responses
for select
to authenticated
using (
  representative_id = auth.uid()
  or public.is_company_representative(company_id, auth.uid())
  or public.is_admin_or_moderator()
);

create policy company_responses_rep_insert_pending
on public.company_responses
for insert
to authenticated
with check (
  public.is_company_representative(company_id, auth.uid())
  and representative_id = auth.uid()
  and moderation_status = 'pending'::public.moderation_status
);

create policy company_responses_rep_update_pending
on public.company_responses
for update
to authenticated
using (
  representative_id = auth.uid()
  and moderation_status in (
    'pending'::public.moderation_status,
    'needs_changes'::public.moderation_status
  )
)
with check (
  representative_id = auth.uid()
  and moderation_status in (
    'pending'::public.moderation_status,
    'needs_changes'::public.moderation_status
  )
);

create policy company_responses_moderator_update
on public.company_responses
for update
to authenticated
using (public.is_admin_or_moderator())
with check (public.is_admin_or_moderator());

create policy moderation_events_moderator_all
on public.moderation_events
for all
to authenticated
using (public.is_admin_or_moderator())
with check (public.is_admin_or_moderator());
