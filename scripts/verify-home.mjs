import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const page = readFileSync(join(root, "app/page.tsx"), "utf8");
const failures = [];

const requiredCopy = [
  "Avant de signer, vérifie l’entreprise.",
  "Raconter mon expérience",
  "Voir le top red flags",
  "Témoignages récents",
  "Modération avant publication",
  "score communautaire",
];

for (const copy of requiredCopy) {
  if (!page.includes(copy)) {
    failures.push(`Home page missing copy: ${copy}`);
  }
}

const requiredSections = [
  'id="hero"',
  'id="recherche"',
  'id="top"',
  'id="temoigner"',
  'id="regles"',
  'id="temoignages-recents"',
];

for (const section of requiredSections) {
  if (!page.includes(section)) {
    failures.push(`Home page missing section: ${section}`);
  }
}

const requiredComponents = [
  "PublicHeader",
  "MobileBottomNav",
  "Button",
  "Card",
  "Badge",
  "Input",
];

for (const component of requiredComponents) {
  if (!page.includes(component)) {
    failures.push(`Home page missing reusable component: ${component}`);
  }
}

const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
if (!packageJson.scripts?.["verify:home"]) {
  failures.push("Missing npm script: verify:home");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Home page verification passed");
