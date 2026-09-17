import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const migrationPath = join(
  root,
  "supabase/migrations/20260917101000_enable_rls_policies.sql",
);

const failures = [];
const exposedTables = [
  "profiles",
  "companies",
  "company_claims",
  "testimonials",
  "testimonial_scores",
  "testimonial_flags",
  "helpful_votes",
  "reports",
  "company_responses",
  "moderation_events",
];

if (!existsSync(migrationPath)) {
  failures.push("Missing RLS policies migration");
} else {
  const sql = readFileSync(migrationPath, "utf8").toLowerCase();

  for (const table of exposedTables) {
    if (!sql.includes(`alter table public.${table} enable row level security`)) {
      failures.push(`RLS not enabled for public.${table}`);
    }
  }

  const requiredHelpers = [
    "public.current_profile_role()",
    "public.is_admin_or_moderator()",
    "public.is_company_representative",
  ];

  for (const helper of requiredHelpers) {
    if (!sql.includes(helper)) {
      failures.push(`Missing RLS helper: ${helper}`);
    }
  }

  const requiredPolicySnippets = [
    "testimonials_public_read_approved",
    "testimonials_owner_read_own",
    "testimonials_user_insert_own_pending",
    "testimonials_moderator_update",
    "testimonial_scores_public_read_approved",
    "helpful_votes_user_insert_own",
    "reports_user_insert_own",
    "reports_moderator_read",
    "company_responses_public_read_approved",
    "company_responses_rep_insert_pending",
    "moderation_events_moderator_all",
    "company_claims_user_insert_own",
  ];

  for (const policy of requiredPolicySnippets) {
    if (!sql.includes(policy)) {
      failures.push(`Missing policy: ${policy}`);
    }
  }

  const requiredSafetySnippets = [
    "moderation_status = 'approved'::public.moderation_status",
    "auth.uid() = user_id",
    "auth.uid() = reporter_id",
    "public.is_company_representative(company_id, auth.uid())",
  ];

  for (const snippet of requiredSafetySnippets) {
    if (!sql.includes(snippet)) {
      failures.push(`Missing safety rule snippet: ${snippet}`);
    }
  }
}

const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
if (!packageJson.scripts?.["verify:rls"]) {
  failures.push("Missing npm script: verify:rls");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("RLS policy verification passed");
