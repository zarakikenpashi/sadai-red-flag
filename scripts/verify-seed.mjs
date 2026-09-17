import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const seedPath = join(root, "supabase/seed.sql");
const failures = [];

if (!existsSync(seedPath)) {
  failures.push("Missing supabase/seed.sql");
} else {
  const sql = readFileSync(seedPath, "utf8").toLowerCase();
  const requiredSnippets = [
    "insert into public.companies",
    "insert into public.testimonials",
    "insert into public.testimonial_scores",
    "insert into public.testimonial_flags",
    "red flag demo",
    "redflag-demo-user-1@example.test",
    "agence baobab digital",
    "studio lagoon tech",
    "atelier cacao media",
    "moderation_status",
    "approved'::public.moderation_status",
    "pending'::public.moderation_status",
  ];

  for (const snippet of requiredSnippets) {
    if (!sql.includes(snippet)) {
      failures.push(`Missing seed snippet: ${snippet}`);
    }
  }

  const companyInsertCount = (sql.match(/insert into public\.companies/g) ?? []).length;
  if (companyInsertCount < 1) {
    failures.push("Expected at least one companies insert statement");
  }

  const testimonialValues = (sql.match(/redflag-demo-testimonial-/g) ?? []).length;
  if (testimonialValues < 6) {
    failures.push("Expected at least 6 demo testimonials");
  }
}

const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
if (!packageJson.scripts?.["verify:seed"]) {
  failures.push("Missing npm script: verify:seed");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Seed verification passed");
