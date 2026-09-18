import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const files = [
  "app/top-red-flags/page.tsx",
  "app/admin/signalements/page.tsx",
  "app/admin/revendications/page.tsx",
  "app/admin/reponses-entreprises/page.tsx",
  "app/confidentialite/page.tsx",
  "app/conditions/page.tsx",
  "lib/scoring.ts",
  "lib/interactions.ts",
  "lib/company-workflows.ts",
  "Dockerfile",
  ".dockerignore",
  ".github/workflows/ci.yml",
  "README.md",
  "docs/coolify.md",
  "playwright.config.ts",
  "vitest.config.ts",
];
for (const file of files) if (!existsSync(join(root, file))) failures.push(`Missing ${file}`);
const read = (file) => readFileSync(join(root, file), "utf8");
const checks = [
  ["lib/scoring.ts", ["calculateRedFlagScore", "pay_score", "management_score", "confidence"]],
  ["lib/moderation.ts", ["recalculateCompanyScore", "published_at", "moderation_events"]],
  ["app/entreprises/[slug]/page.tsx", ["Utile", "Signaler", "Réponse officielle entreprise", "Profil officiel"]],
  ["lib/interactions.ts", ["helpful_votes", "reports", "fake_testimonial", "personal_data"]],
  ["lib/company-workflows.ts", ["company_claims", "company_responses", "pending", "approved"]],
  ["app/top-red-flags/page.tsx", ["Top Red Flags", "Red Flag Score", "getTopRedFlagCompanies"]],
  ["next.config.ts", ["X-Frame-Options", "X-Content-Type-Options", "Permissions-Policy"]],
  ["README.md", ["Limitations MVP", "Coolify", "Supabase local"]],
  ["package.json", ["\"test\"", "\"test:e2e\""]],
];
for (const [file, snippets] of checks) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const snippet of snippets) if (!content.includes(snippet)) failures.push(`${file} missing ${snippet}`);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("MVP completion verification passed");
