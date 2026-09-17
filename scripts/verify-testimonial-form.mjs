import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const requiredFiles = [
  "app/temoigner/page.tsx",
  "app/temoigner/actions.ts",
  "app/temoigner/testimonial-form.tsx",
  "lib/testimonials.ts",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing testimonial form file: ${file}`);
}

const read = (file) => readFileSync(join(root, file), "utf8");

if (existsSync(join(root, "app/temoigner/testimonial-form.tsx"))) {
  const form = read("app/temoigner/testimonial-form.tsx");
  for (const snippet of [
    '"use client"',
    "Étape 1",
    "Étape 2",
    "Étape 3",
    "Étape 4",
    "Étape 5",
    "Progression",
    "name=\"company_id\"",
    "name=\"employment_status\"",
    "name=\"duration_label\"",
    "name=\"period_label\"",
    "pay_score",
    "management_score",
    "workload_score",
    "hours_score",
    "promises_score",
    "environment_score",
    "training_score",
    "name=\"flag_types\"",
    "name=\"title\"",
    "name=\"body\"",
    "name=\"confirm_truthful\"",
    "name=\"confirm_no_personal_data\"",
    "Suivant",
    "Publier pour modération",
  ]) {
    if (!form.includes(snippet)) failures.push(`Form missing: ${snippet}`);
  }
}

if (existsSync(join(root, "app/temoigner/actions.ts"))) {
  const actions = read("app/temoigner/actions.ts");
  for (const snippet of ["createTestimonial", "insertTestimonial", "redirect", "auth?next=/temoigner"]) {
    if (!actions.includes(snippet)) failures.push(`Action missing: ${snippet}`);
  }
}

if (existsSync(join(root, "lib/testimonials.ts"))) {
  const lib = read("lib/testimonials.ts");
  for (const snippet of ["insertTestimonial", "testimonials", "testimonial_scores", "testimonial_flags", "moderation_status: \"pending\""]) {
    if (!lib.includes(snippet)) failures.push(`Lib missing: ${snippet}`);
  }
}

if (existsSync(join(root, "app/temoigner/page.tsx"))) {
  const page = read("app/temoigner/page.tsx");
  for (const snippet of ["getCurrentUser", "redirect", "Témoignage envoyé", "TestimonialForm", "getCompanies"]) {
    if (!page.includes(snippet)) failures.push(`Page missing: ${snippet}`);
  }
}

const packageJson = JSON.parse(read("package.json"));
if (!packageJson.scripts?.["verify:testimonial-form"]) failures.push("Missing npm script: verify:testimonial-form");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Testimonial form verification passed");
