import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const requiredFiles = [
  "app/app/page.tsx",
  "app/app/mes-temoignages/page.tsx",
  "lib/testimonials.ts",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing user testimonials file: ${file}`);
}

const read = (file) => readFileSync(join(root, file), "utf8");

if (existsSync(join(root, "app/app/mes-temoignages/page.tsx"))) {
  const page = read("app/app/mes-temoignages/page.tsx");
  for (const snippet of [
    "getCurrentUser",
    "redirect(\"/auth",
    "getUserTestimonials",
    "Mes témoignages",
    "pending",
    "approved",
    "needs_changes",
    "rejected",
    "hidden",
    "moderation_status",
  ]) {
    if (!page.includes(snippet)) failures.push(`My testimonials page missing: ${snippet}`);
  }
}

if (existsSync(join(root, "lib/testimonials.ts"))) {
  const lib = read("lib/testimonials.ts");
  for (const snippet of [
    "getUserTestimonials",
    ".eq(\"user_id\", userId)",
    "companies",
    "moderation_status",
    "order(\"created_at\"",
  ]) {
    if (!lib.includes(snippet)) failures.push(`Testimonials lib missing: ${snippet}`);
  }
}

if (existsSync(join(root, "app/app/page.tsx"))) {
  const dashboard = read("app/app/page.tsx");
  for (const snippet of ["/app/mes-temoignages", "Mes témoignages", "Témoigner"]) {
    if (!dashboard.includes(snippet)) failures.push(`Dashboard missing: ${snippet}`);
  }
}

const rls = read("supabase/migrations/20260917101000_enable_rls_policies.sql");
for (const snippet of ["testimonials_owner_read_own", "auth.uid() = user_id"]) {
  if (!rls.includes(snippet)) failures.push(`RLS missing: ${snippet}`);
}

const packageJson = JSON.parse(read("package.json"));
if (!packageJson.scripts?.["verify:user-testimonials"]) failures.push("Missing npm script: verify:user-testimonials");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("User testimonials verification passed");
