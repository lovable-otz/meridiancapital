// CI check — fails the build if SEO regressions sneak back in.
// See AGENTS.md for what's protected and why.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const ROOT_TSX = join(SRC, "routes", "__root.tsx");

const SKIP_FILES = new Set([
  "src/routeTree.gen.ts",
  "scripts/check-seo-engine.mjs",
]);

const FORBIDDEN = [
  { name: "lovable.app URL", regex: /lovable\.app/i },
  { name: "keywords meta tag", regex: /name\s*[:=]\s*["']keywords["']/i },
  { name: "aggregateRating schema", regex: /aggregateRating/i },
];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

const errors = [];

for (const file of walk(SRC)) {
  const rel = relative(ROOT, file).replaceAll("\\", "/");
  if (SKIP_FILES.has(rel)) continue;
  const content = readFileSync(file, "utf-8");
  for (const { name, regex } of FORBIDDEN) {
    const m = content.match(regex);
    if (m) {
      const line = content.slice(0, m.index).split("\n").length;
      errors.push(`${rel}:${line}  ${name} → "${m[0]}"`);
    }
  }
}

try {
  const rc = readFileSync(ROOT_TSX, "utf-8");
  if (/rel\s*[:=]\s*["']canonical["']/i.test(rc)) {
    errors.push(
      "src/routes/__root.tsx  canonical link must not live in __root.tsx — set it per page via buildHead()",
    );
  }
} catch {}

if (errors.length) {
  console.error("\nSEO engine check FAILED:\n");
  for (const e of errors) console.error("  - " + e);
  console.error("\nThese patterns will hurt SEO. See AGENTS.md.\n");
  process.exit(1);
}

console.log("SEO engine check passed.");
