import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const requiredFiles = [
  "app/recherche/page.tsx",
  "lib/companies.ts",
  "lib/demo-data.ts",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    failures.push(`Missing search file: ${file}`);
  }
}

if (existsSync(join(root, "app/recherche/page.tsx"))) {
  const page = readFileSync(join(root, "app/recherche/page.tsx"), "utf8");
  const snippets = [
    "Recherche entreprise",
    "Proposer cette entreprise",
    "Score à confirmer",
    "searchParams",
    "getCompanies",
  ];
  for (const snippet of snippets) {
    if (!page.includes(snippet)) failures.push(`Search page missing: ${snippet}`);
  }
}

if (existsSync(join(root, "lib/companies.ts"))) {
  const lib = readFileSync(join(root, "lib/companies.ts"), "utf8");
  for (const snippet of ["getCompanies", "searchCompanies", "red_flag_score", "testimonial_count"]) {
    if (!lib.includes(snippet)) failures.push(`Companies lib missing: ${snippet}`);
  }
}

if (existsSync(join(root, "app/page.tsx"))) {
  const home = readFileSync(join(root, "app/page.tsx"), "utf8");
  if (!home.includes('action="/recherche"')) {
    failures.push("Home search does not submit to /recherche");
  }
  if (!home.includes('name="q"')) {
    failures.push("Home search input does not use q query parameter");
  }
}

const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
if (!packageJson.scripts?.["verify:search"]) {
  failures.push("Missing npm script: verify:search");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Search verification passed");
