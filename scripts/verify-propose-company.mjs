import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const requiredFiles = [
  "app/entreprises/proposer/page.tsx",
  "app/entreprises/proposer/actions.ts",
  "lib/company-proposals.ts",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing propose-company file: ${file}`);
}

if (existsSync(join(root, "app/entreprises/proposer/page.tsx"))) {
  const page = readFileSync(join(root, "app/entreprises/proposer/page.tsx"), "utf8");
  for (const snippet of ["Proposer une fiche entreprise", "name=\"name\"", "name=\"city\"", "name=\"sector\"", "proposeCompanyAction"]) {
    if (!page.includes(snippet)) failures.push(`Propose page missing: ${snippet}`);
  }
}

if (existsSync(join(root, "lib/company-proposals.ts"))) {
  const lib = readFileSync(join(root, "lib/company-proposals.ts"), "utf8");
  for (const snippet of ["createCompanySlug", "validateCompanyProposal", "detectCompanyDuplicate", "proposeCompany"]) {
    if (!lib.includes(snippet)) failures.push(`Company proposal lib missing: ${snippet}`);
  }
}

for (const file of ["app/recherche/page.tsx", "app/page.tsx"]) {
  if (existsSync(join(root, file))) {
    const content = readFileSync(join(root, file), "utf8");
    if (!content.includes("/entreprises/proposer")) failures.push(`${file} does not link to /entreprises/proposer`);
  }
}

const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
if (!packageJson.scripts?.["verify:propose-company"]) {
  failures.push("Missing npm script: verify:propose-company");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Propose company verification passed");
