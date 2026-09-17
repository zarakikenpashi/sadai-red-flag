import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredFiles = [
  "components/ui/button.tsx",
  "components/ui/card.tsx",
  "components/ui/badge.tsx",
  "components/ui/input.tsx",
  "components/ui/dialog.tsx",
  "components/layout/public-header.tsx",
  "components/layout/mobile-bottom-nav.tsx",
  "lib/ui.ts",
];

const requiredGlobalsTokens = [
  "--color-red-flag",
  "--color-deep-alert",
  "--color-ink-black",
  "--color-soft-white",
];

const failures = [];

for (const relativePath of requiredFiles) {
  if (!existsSync(join(root, relativePath))) {
    failures.push(`Missing required UI file: ${relativePath}`);
  }
}

const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
if (!packageJson.scripts?.["verify:ui"]) {
  failures.push("Missing npm script: verify:ui");
}

const globals = readFileSync(join(root, "app/globals.css"), "utf8");
for (const token of requiredGlobalsTokens) {
  if (!globals.includes(token)) {
    failures.push(`Missing design token in globals.css: ${token}`);
  }
}

if (existsSync(join(root, "app/page.tsx"))) {
  const page = readFileSync(join(root, "app/page.tsx"), "utf8");
  for (const importPath of [
    "@/components/ui/button",
    "@/components/ui/card",
    "@/components/ui/badge",
    "@/components/ui/input",
    "@/components/layout/public-header",
  ]) {
    if (!page.includes(importPath)) {
      failures.push(`Home page does not use reusable component: ${importPath}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("UI base verification passed");
