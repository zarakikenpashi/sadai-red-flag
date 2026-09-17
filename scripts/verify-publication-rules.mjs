import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const requiredFiles = [
  "app/regles/page.tsx",
  "lib/content-safety.ts",
  "app/temoigner/testimonial-form.tsx",
  "lib/testimonials.ts",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing publication rules file: ${file}`);
}

const read = (file) => readFileSync(join(root, file), "utf8");

if (existsSync(join(root, "app/regles/page.tsx"))) {
  const page = read("app/regles/page.tsx");
  for (const snippet of [
    "Règles de publication",
    "Ne cite pas de personnes physiques",
    "insultes",
    "données personnelles",
    "modération",
    "/temoigner",
  ]) {
    if (!page.includes(snippet)) failures.push(`Rules page missing: ${snippet}`);
  }
}

if (existsSync(join(root, "lib/content-safety.ts"))) {
  const safety = read("lib/content-safety.ts");
  for (const snippet of [
    "FORBIDDEN_TERMS",
    "SENSITIVE_TERMS",
    "scanPublicationText",
    "forbiddenMatches",
    "sensitiveMatches",
    "personNameWarning",
  ]) {
    if (!safety.includes(snippet)) failures.push(`Safety lib missing: ${snippet}`);
  }
}

if (existsSync(join(root, "app/temoigner/testimonial-form.tsx"))) {
  const form = read("app/temoigner/testimonial-form.tsx");
  for (const snippet of [
    "Règles affichées avant soumission",
    "J’accepte les règles de publication",
    "name=\"accept_publication_rules\"",
    "Termes sensibles",
    "Ne cite pas de personnes physiques",
    "scanPublicationText",
    "/regles",
  ]) {
    if (!form.includes(snippet)) failures.push(`Form missing: ${snippet}`);
  }
}

if (existsSync(join(root, "lib/testimonials.ts"))) {
  const lib = read("lib/testimonials.ts");
  for (const snippet of [
    "scanPublicationText",
    "moderation_status: \"pending\"",
    "sensitiveMatches",
    "FORBIDDEN_TERMS",
  ]) {
    if (!lib.includes(snippet)) failures.push(`Testimonials lib missing: ${snippet}`);
  }
}

const packageJson = JSON.parse(read("package.json"));
if (!packageJson.scripts?.["verify:publication-rules"]) failures.push("Missing npm script: verify:publication-rules");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Publication rules verification passed");
