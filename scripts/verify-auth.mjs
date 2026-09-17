import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const requiredFiles = [
  "app/auth/page.tsx",
  "app/auth/actions.ts",
  "app/app/page.tsx",
  "lib/auth.ts",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing auth file: ${file}`);
}

if (existsSync(join(root, "app/auth/page.tsx"))) {
  const page = readFileSync(join(root, "app/auth/page.tsx"), "utf8");
  for (const snippet of ["Connexion", "Créer un compte", "name=\"email\"", "name=\"password\"", "signInAction", "signUpAction"]) {
    if (!page.includes(snippet)) failures.push(`Auth page missing: ${snippet}`);
  }
}

if (existsSync(join(root, "app/auth/actions.ts"))) {
  const actions = readFileSync(join(root, "app/auth/actions.ts"), "utf8");
  for (const snippet of ["signInWithPassword", "signUp", "signOutAction", "redirect"]) {
    if (!actions.includes(snippet)) failures.push(`Auth actions missing: ${snippet}`);
  }
}

if (existsSync(join(root, "lib/auth.ts"))) {
  const lib = readFileSync(join(root, "lib/auth.ts"), "utf8");
  for (const snippet of ["getCurrentUser", "getCurrentProfile", "profiles"]) {
    if (!lib.includes(snippet)) failures.push(`Auth lib missing: ${snippet}`);
  }
}

const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
if (!packageJson.scripts?.["verify:auth"]) {
  failures.push("Missing npm script: verify:auth");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Auth verification passed");
