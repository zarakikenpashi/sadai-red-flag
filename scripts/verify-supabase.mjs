import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  ".env.example",
  "lib/supabase/browser.ts",
  "lib/supabase/server.ts",
  "lib/supabase/admin.ts",
  "lib/supabase/proxy.ts",
  "proxy.ts",
];

for (const relativePath of requiredFiles) {
  if (!existsSync(join(root, relativePath))) {
    failures.push(`Missing required Supabase file: ${relativePath}`);
  }
}

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
for (const dependency of ["@supabase/supabase-js", "@supabase/ssr"]) {
  if (!pkg.dependencies?.[dependency]) {
    failures.push(`Missing dependency: ${dependency}`);
  }
}
if (!pkg.scripts?.["verify:supabase"]) {
  failures.push("Missing npm script: verify:supabase");
}

if (existsSync(join(root, ".env.example"))) {
  const envExample = readFileSync(join(root, ".env.example"), "utf8");
  for (const key of [
    "NEXT_PUBLIC_SUPABASE_URL=",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY=",
    "SUPABASE_SERVICE_ROLE_KEY=",
  ]) {
    if (!envExample.includes(key)) {
      failures.push(`Missing env var in .env.example: ${key}`);
    }
  }
}

if (existsSync(join(root, "lib/supabase/browser.ts"))) {
  const browserClient = readFileSync(join(root, "lib/supabase/browser.ts"), "utf8");
  if (browserClient.includes("SUPABASE_SERVICE_ROLE_KEY")) {
    failures.push("Browser Supabase client references service role key");
  }
  if (!browserClient.includes("createBrowserClient")) {
    failures.push("Browser Supabase client does not use createBrowserClient");
  }
}

if (existsSync(join(root, "lib/supabase/server.ts"))) {
  const serverClient = readFileSync(join(root, "lib/supabase/server.ts"), "utf8");
  if (!serverClient.includes("createServerClient")) {
    failures.push("Server Supabase client does not use createServerClient");
  }
  if (!serverClient.includes("cookies")) {
    failures.push("Server Supabase client does not prepare cookie-backed sessions");
  }
}

if (existsSync(join(root, "lib/supabase/admin.ts"))) {
  const adminClient = readFileSync(join(root, "lib/supabase/admin.ts"), "utf8");
  if (!adminClient.includes("SUPABASE_SERVICE_ROLE_KEY")) {
    failures.push("Admin Supabase client does not use service role key");
  }
  if (!adminClient.includes("server-only")) {
    failures.push("Admin Supabase client is not marked server-only");
  }
}

if (existsSync(join(root, "proxy.ts"))) {
  const proxy = readFileSync(join(root, "proxy.ts"), "utf8");
  if (!proxy.includes("updateSession")) {
    failures.push("Next proxy does not call updateSession");
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Supabase integration verification passed");
