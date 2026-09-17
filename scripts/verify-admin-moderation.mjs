import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const requiredFiles = [
  "app/admin/temoignages/page.tsx",
  "app/admin/temoignages/actions.ts",
  "lib/moderation.ts",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing admin moderation file: ${file}`);
}

const read = (file) => readFileSync(join(root, file), "utf8");

if (existsSync(join(root, "app/admin/temoignages/page.tsx"))) {
  const page = read("app/admin/temoignages/page.tsx");
  for (const snippet of [
    "getCurrentProfile",
    "admin",
    "moderator",
    "redirect(\"/auth",
    "getPendingTestimonialsForModeration",
    "Dashboard admin",
    "pending",
    "approveTestimonialAction",
    "needs_changes",
    "rejectTestimonialAction",
    "hideTestimonialAction",
  ]) {
    if (!page.includes(snippet)) failures.push(`Admin page missing: ${snippet}`);
  }
}

if (existsSync(join(root, "app/admin/temoignages/actions.ts"))) {
  const actions = read("app/admin/temoignages/actions.ts");
  for (const snippet of [
    "approveTestimonialAction",
    "requestChangesTestimonialAction",
    "rejectTestimonialAction",
    "hideTestimonialAction",
    "moderateTestimonial",
    "revalidatePath",
  ]) {
    if (!actions.includes(snippet)) failures.push(`Actions missing: ${snippet}`);
  }
}

if (existsSync(join(root, "lib/moderation.ts"))) {
  const lib = read("lib/moderation.ts");
  for (const snippet of [
    "getPendingTestimonialsForModeration",
    "moderateTestimonial",
    "moderation_events",
    "published_at",
    "moderation_status",
    "isModeratorProfile",
  ]) {
    if (!lib.includes(snippet)) failures.push(`Moderation lib missing: ${snippet}`);
  }
}

const rls = read("supabase/migrations/20260917101000_enable_rls_policies.sql");
for (const snippet of ["is_admin_or_moderator", "testimonials_moderator_update", "moderation_events_moderator_all"]) {
  if (!rls.includes(snippet)) failures.push(`RLS missing: ${snippet}`);
}

const packageJson = JSON.parse(read("package.json"));
if (!packageJson.scripts?.["verify:admin-moderation"]) failures.push("Missing npm script: verify:admin-moderation");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Admin moderation verification passed");
