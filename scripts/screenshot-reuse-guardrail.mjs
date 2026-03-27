/**
 * Screenshot Reuse Guardrail
 * 
 * Prevents template footprints by enforcing a max reuse limit
 * for screenshot assets across pages. Any screenshot used on
 * more than MAX_PAGES pages will cause this script to fail.
 * 
 * Run: node scripts/screenshot-reuse-guardrail.mjs
 * Integrates with the existing SEO guardrails pipeline.
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const PAGES_DIR = "src/pages";
const MAX_PAGES = 3;

function walkDir(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walkDir(full));
    } else if (full.endsWith(".tsx")) {
      files.push(full);
    }
  }
  return files;
}

const assetPages = new Map(); // asset -> Set<page>

for (const file of walkDir(PAGES_DIR)) {
  const content = readFileSync(file, "utf-8");
  const importRegex = /import\s+(\w+)\s+from\s+"@\/assets\/screenshots\/([^"]+)"/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const [, varName, asset] = match;
    // Only count if actually used in a ReviewScreenshot
    if (content.includes(`src={${varName}}`)) {
      if (!assetPages.has(asset)) assetPages.set(asset, new Set());
      assetPages.get(asset).add(relative(PAGES_DIR, file));
    }
  }
}

let violations = 0;

for (const [asset, pages] of [...assetPages.entries()].sort((a, b) => b[1].size - a[1].size)) {
  if (pages.size > MAX_PAGES) {
    violations++;
    console.error(
      `\n❌ FOOTPRINT VIOLATION: ${asset} used on ${pages.size} pages (max ${MAX_PAGES}):`
    );
    for (const p of [...pages].sort()) {
      console.error(`   - ${p}`);
    }
  }
}

if (violations > 0) {
  console.error(`\n🚫 ${violations} screenshot(s) exceed the ${MAX_PAGES}-page reuse limit.`);
  console.error("Fix: Use unique screenshots or reduce reuse to max 3 pages per asset.");
  process.exit(1);
} else {
  const total = assetPages.size;
  const atLimit = [...assetPages.values()].filter((p) => p.size === MAX_PAGES).length;
  console.log(`✅ Screenshot reuse guardrail passed. ${total} assets checked, ${atLimit} at limit (${MAX_PAGES}).`);
  process.exit(0);
}
