import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = join(root, "app/entreprises/[slug]/page.tsx");

if (!existsSync(pagePath)) {
  failures.push("Missing company profile page: app/entreprises/[slug]/page.tsx");
} else {
  const page = readFileSync(pagePath, "utf8");
  const snippets = [
    "Red Flag Score",
    "Pourquoi ce score",
    "Notes par catégorie",
    "Témoignages récents",
    "Raconter mon expérience",
    "Cette entreprise est la vôtre ?",
    "getCompanyBySlug",
    "getCompanyTestimonials",
  ];
  for (const snippet of snippets) {
    if (!page.includes(snippet)) failures.push(`Company profile missing: ${snippet}`);
  }
}

const companiesPath = join(root, "lib/companies.ts");
if (existsSync(companiesPath)) {
  const lib = readFileSync(companiesPath, "utf8");
  for (const snippet of ["getCompanyBySlug", "getCompanyTestimonials", "testimonial_scores", "testimonial_flags"]) {
    if (!lib.includes(snippet)) failures.push(`Companies lib missing: ${snippet}`);
  }
}

const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
if (!packageJson.scripts?.["verify:company-profile"]) {
  failures.push("Missing npm script: verify:company-profile");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Company profile verification passed");
