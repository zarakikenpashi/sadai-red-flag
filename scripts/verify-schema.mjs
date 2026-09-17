import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const migrationPath = join(
  root,
  "supabase/migrations/20260917095000_create_mvp_schema.sql",
);

const failures = [];

if (!existsSync(migrationPath)) {
  failures.push("Missing MVP schema migration");
} else {
  const sql = readFileSync(migrationPath, "utf8").toLowerCase();

  const requiredTables = [
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

  for (const table of requiredTables) {
    if (!sql.includes(`create table public.${table}`)) {
      failures.push(`Missing table: public.${table}`);
    }
  }

  const requiredEnums = [
    "profile_role",
    "claim_status",
    "employment_status",
    "verification_status",
    "moderation_status",
    "red_flag_type",
    "report_reason",
    "report_status",
  ];

  for (const enumName of requiredEnums) {
    if (!sql.includes(`create type public.${enumName}`)) {
      failures.push(`Missing enum: public.${enumName}`);
    }
  }

  const requiredIndexes = [
    "companies_slug_idx",
    "companies_name_idx",
    "testimonials_company_status_idx",
    "testimonials_user_idx",
    "reports_status_idx",
    "moderation_events_entity_idx",
  ];

  for (const index of requiredIndexes) {
    if (!sql.includes(index)) {
      failures.push(`Missing index: ${index}`);
    }
  }

  const requiredConstraints = [
    "unique (testimonial_id, user_id)",
    "primary key (testimonial_id)",
    "references auth.users",
    "references public.companies",
    "check (red_flag_score >= 0 and red_flag_score <= 100)",
    "check (pay_score >= 1 and pay_score <= 5)",
  ];

  for (const constraint of requiredConstraints) {
    if (!sql.includes(constraint)) {
      failures.push(`Missing constraint: ${constraint}`);
    }
  }
}

const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
if (!packageJson.scripts?.["verify:schema"]) {
  failures.push("Missing npm script: verify:schema");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Database schema verification passed");
