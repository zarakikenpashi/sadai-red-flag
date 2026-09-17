-- RED FLAG demo seed data.
-- Fictitious companies and testimonials only. Do not replace with real accusations.
-- Demo identifiers: redflag-demo-testimonial-1 redflag-demo-testimonial-2 redflag-demo-testimonial-3
-- Demo identifiers: redflag-demo-testimonial-4 redflag-demo-testimonial-5 redflag-demo-testimonial-6

insert into auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin
)
values
  (
    '00000000-0000-4000-8000-000000000001',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'redflag-demo-user-1@example.test',
    crypt('RedFlagDemo123!', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"name":"RED FLAG Demo User"}'::jsonb,
    false
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'redflag-demo-user-2@example.test',
    crypt('RedFlagDemo123!', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"name":"RED FLAG Demo User 2"}'::jsonb,
    false
  ),
  (
    '00000000-0000-4000-8000-000000000003',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'redflag-demo-moderator@example.test',
    crypt('RedFlagDemo123!', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"name":"RED FLAG Demo Moderator"}'::jsonb,
    false
  )
on conflict (id) do nothing;

insert into public.profiles (id, display_name, role)
values
  ('00000000-0000-4000-8000-000000000001', 'Demo Candidate 1', 'user'),
  ('00000000-0000-4000-8000-000000000002', 'Demo Candidate 2', 'user'),
  ('00000000-0000-4000-8000-000000000003', 'Demo Moderator', 'moderator')
on conflict (id) do update
set display_name = excluded.display_name,
    role = excluded.role;

insert into public.companies (
  id,
  name,
  slug,
  city,
  country,
  sector,
  description,
  claim_status,
  red_flag_score,
  score_confidence,
  testimonial_count,
  created_by
)
values
  (
    '10000000-0000-4000-8000-000000000001',
    'Agence Baobab Digital',
    'agence-baobab-digital',
    'Abidjan',
    'Côte d''Ivoire',
    'Marketing',
    'Entreprise fictive utilisée pour développer les écrans RED FLAG.',
    'unclaimed',
    34,
    'medium',
    3,
    '00000000-0000-4000-8000-000000000001'
  ),
  (
    '10000000-0000-4000-8000-000000000002',
    'Studio Lagoon Tech',
    'studio-lagoon-tech',
    'Abidjan',
    'Côte d''Ivoire',
    'Tech',
    'Entreprise fictive avec signaux mixtes pour les tests de fiche entreprise.',
    'unclaimed',
    68,
    'low',
    2,
    '00000000-0000-4000-8000-000000000001'
  ),
  (
    '10000000-0000-4000-8000-000000000003',
    'Atelier Cacao Media',
    'atelier-cacao-media',
    'Abidjan',
    'Côte d''Ivoire',
    'Communication',
    'Entreprise fictive favorable pour équilibrer les données de démonstration.',
    'unclaimed',
    82,
    'low',
    1,
    '00000000-0000-4000-8000-000000000002'
  )
on conflict (slug) do update
set name = excluded.name,
    city = excluded.city,
    sector = excluded.sector,
    description = excluded.description,
    red_flag_score = excluded.red_flag_score,
    score_confidence = excluded.score_confidence,
    testimonial_count = excluded.testimonial_count;

insert into public.testimonials (
  id,
  company_id,
  user_id,
  employment_status,
  duration_label,
  period_label,
  title,
  body,
  verification_status,
  moderation_status,
  helpful_count,
  published_at
)
values
  (
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000001',
    '00000000-0000-4000-8000-000000000001',
    'intern',
    '6 mois',
    '2025',
    'Stage prolongé sans vraie visibilité',
    'RED FLAG demo : expérience fictive. Le stage annoncé pour trois mois a été prolongé plusieurs fois sans calendrier clair de sortie.',
    'declared',
    'approved'::public.moderation_status,
    24,
    now() - interval '12 days'
  ),
  (
    '20000000-0000-4000-8000-000000000002',
    '10000000-0000-4000-8000-000000000001',
    '00000000-0000-4000-8000-000000000002',
    'fixed_term',
    '8 mois',
    'Il y a moins d''un an',
    'Paiement parfois tardif',
    'RED FLAG demo : expérience fictive. Plusieurs collaborateurs mentionnaient des retards de paiement et il fallait souvent relancer.',
    'verified',
    'approved'::public.moderation_status,
    18,
    now() - interval '8 days'
  ),
  (
    '20000000-0000-4000-8000-000000000003',
    '10000000-0000-4000-8000-000000000001',
    '00000000-0000-4000-8000-000000000001',
    'candidate',
    'Process entretien',
    '2026',
    'Promesse salariale peu claire',
    'RED FLAG demo : expérience fictive. Les informations sur la rémunération changeaient entre le premier échange et la proposition finale.',
    'declared',
    'pending'::public.moderation_status,
    0,
    null
  ),
  (
    '20000000-0000-4000-8000-000000000004',
    '10000000-0000-4000-8000-000000000002',
    '00000000-0000-4000-8000-000000000001',
    'permanent',
    '1 an',
    '2024-2025',
    'Bon apprentissage mais rythme élevé',
    'RED FLAG demo : expérience fictive. L’équipe était formatrice, mais les horaires pouvaient devenir lourds pendant les livraisons client.',
    'declared',
    'approved'::public.moderation_status,
    9,
    now() - interval '20 days'
  ),
  (
    '20000000-0000-4000-8000-000000000005',
    '10000000-0000-4000-8000-000000000002',
    '00000000-0000-4000-8000-000000000002',
    'freelance',
    '3 mois',
    '2025',
    'Mission correcte, cadrage à améliorer',
    'RED FLAG demo : expérience fictive. La mission était intéressante mais le périmètre changeait souvent sans formalisation écrite.',
    'declared',
    'approved'::public.moderation_status,
    6,
    now() - interval '18 days'
  ),
  (
    '20000000-0000-4000-8000-000000000006',
    '10000000-0000-4000-8000-000000000003',
    '00000000-0000-4000-8000-000000000002',
    'intern',
    '4 mois',
    '2026',
    'Encadrement sérieux',
    'RED FLAG demo : expérience fictive. Le cadre était clair, les horaires raisonnables et les engagements annoncés en entretien ont été respectés.',
    'verified',
    'approved'::public.moderation_status,
    14,
    now() - interval '5 days'
  )
on conflict (id) do update
set title = excluded.title,
    body = excluded.body,
    verification_status = excluded.verification_status,
    moderation_status = excluded.moderation_status,
    helpful_count = excluded.helpful_count,
    published_at = excluded.published_at;

insert into public.testimonial_scores (
  testimonial_id,
  pay_score,
  management_score,
  workload_score,
  hours_score,
  promises_score,
  environment_score,
  training_score
)
values
  ('20000000-0000-4000-8000-000000000001', 2, 2, 2, 2, 1, 3, 3),
  ('20000000-0000-4000-8000-000000000002', 1, 3, 3, 3, 2, 3, 2),
  ('20000000-0000-4000-8000-000000000003', 2, 3, 3, 3, 1, 3, 2),
  ('20000000-0000-4000-8000-000000000004', 4, 3, 2, 2, 3, 4, 5),
  ('20000000-0000-4000-8000-000000000005', 4, 3, 3, 3, 2, 4, 3),
  ('20000000-0000-4000-8000-000000000006', 5, 5, 4, 4, 5, 5, 5)
on conflict (testimonial_id) do update
set pay_score = excluded.pay_score,
    management_score = excluded.management_score,
    workload_score = excluded.workload_score,
    hours_score = excluded.hours_score,
    promises_score = excluded.promises_score,
    environment_score = excluded.environment_score,
    training_score = excluded.training_score;

insert into public.testimonial_flags (testimonial_id, flag_type)
values
  ('20000000-0000-4000-8000-000000000001', 'extended_internship'),
  ('20000000-0000-4000-8000-000000000001', 'broken_promises'),
  ('20000000-0000-4000-8000-000000000002', 'late_payment'),
  ('20000000-0000-4000-8000-000000000003', 'broken_promises'),
  ('20000000-0000-4000-8000-000000000004', 'hours'),
  ('20000000-0000-4000-8000-000000000005', 'unclear_contract')
on conflict (testimonial_id, flag_type) do nothing;
