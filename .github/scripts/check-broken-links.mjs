/**
 * Broken Internal Link Checker + Orphan Page Detector
 *
 * Scans all .tsx files in src/ for internal links (<Link to="...">, href="/...")
 * and verifies they resolve to a known route in seoRoutes.ts or App.tsx routes.
 * Also detects orphan/near-orphan pages (routes with 0 or <2 internal links).
 *
 * Usage: node .github/scripts/check-broken-links.mjs
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

// ── Known valid routes ─────────────────────────────────────────

const SEOROUTES_PATH = "src/lib/seoRoutes.ts";

function extractSeoRoutePaths() {
  const content = readFileSync(SEOROUTES_PATH, "utf-8");
  const paths = new Set();
  const regex = /path:\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    paths.add(match[1]);
  }
  return paths;
}

// Routes that exist but aren't in seoRoutes (community, auth, admin, etc.)
const KNOWN_DYNAMIC_ROUTES = new Set([
  "/community",
  "/community/slots",
  "/community/slots/book-of-fedesvin",
  "/community/slots/rise-of-fedesvin",
  "/community/slots/gates-of-fedesvin",
  "/community/slots/fedesvin-bonanza",
  "/community/turneringer",
  "/community/turneringer/arkiv",
  "/community/hall-of-fame",
  "/community/spin-the-reel",
  "/community/rewards",
  "/bonus-hunt",
  "/bonus-hunt/arkiv",
  "/slot-database",
  "/auth",
  "/auth/callback",
  "/profil",
  "/admin",
  "/butik",
  "/highlights",
]);

// Patterns for dynamic route segments (e.g. /casino-anmeldelser/:slug)
const DYNAMIC_PATTERNS = [
  /^\/casino-nyheder\/.+$/,
  /^\/highlights\/.+$/,
  /^\/profil\/.+$/,
  /^\/ordbog\/.+$/,
];

// External link prefixes to ignore
const EXTERNAL_PREFIXES = ["http://", "https://", "mailto:", "tel:", "#", "//"];

// ── File scanner ───────────────────────────────────────────────

function getAllTsxFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory() && entry !== "node_modules" && entry !== ".git") {
      files.push(...getAllTsxFiles(fullPath));
    } else if (extname(entry) === ".tsx" || extname(entry) === ".ts") {
      files.push(fullPath);
    }
  }
  return files;
}

function extractInternalLinks(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const links = [];

  // Match <Link to="..." /> and <Link to={"..."} />
  const linkToRegex = /(?:<Link|<NavLink)\s[^>]*to=(?:{?"([^"{}]+)"|})/g;
  let match;
  while ((match = linkToRegex.exec(content)) !== null) {
    if (match[1]) links.push({ path: match[1], line: getLine(content, match.index) });
  }

  // Match href="/..." in <a> tags (internal only)
  const hrefRegex = /href="(\/[^"]+)"/g;
  while ((match = hrefRegex.exec(content)) !== null) {
    links.push({ path: match[1], line: getLine(content, match.index) });
  }

  return links;
}

function getLine(content, index) {
  return content.substring(0, index).split("\n").length;
}

// ── Validation ─────────────────────────────────────────────────

function isValidRoute(path, seoRoutes) {
  if (!path.startsWith("/")) return true;
  if (EXTERNAL_PREFIXES.some((p) => path.startsWith(p) && p !== "/")) return true;
  if (path.includes("${") || path.includes("{")) return true;

  const cleanPath = path.split("?")[0].split("#")[0];

  if (seoRoutes.has(cleanPath)) return true;
  if (KNOWN_DYNAMIC_ROUTES.has(cleanPath)) return true;
  if (DYNAMIC_PATTERNS.some((pattern) => pattern.test(cleanPath))) return true;

  return false;
}

// ── Orphan Page Detection ──────────────────────────────────────

function buildInboundLinkCounts(files) {
  /** @type {Map<string, number>} path → count of files linking to it */
  const counts = new Map();

  for (const file of files) {
    const links = extractInternalLinks(file);
    // Deduplicate per file so one file counts as 1 inbound regardless of link count
    const uniquePaths = new Set(
      links
        .map((l) => l.path.split("?")[0].split("#")[0])
        .filter((p) => p.startsWith("/"))
    );
    for (const p of uniquePaths) {
      counts.set(p, (counts.get(p) || 0) + 1);
    }
  }
  return counts;
}

// ── Main ───────────────────────────────────────────────────────

function main() {
  console.log("\n🔗 Broken Internal Link Checker + Orphan Detector");
  console.log("─".repeat(55));

  const seoRoutes = extractSeoRoutePaths();
  console.log(`📋 Known SEO routes: ${seoRoutes.size}`);
  console.log(`📋 Known dynamic routes: ${KNOWN_DYNAMIC_ROUTES.size}`);

  const files = getAllTsxFiles("src");
  console.log(`📁 Scanning ${files.length} files...\n`);

  // ── 1. Broken links ──────────────────────────────────────────
  const broken = [];

  for (const file of files) {
    const links = extractInternalLinks(file);
    for (const link of links) {
      if (!isValidRoute(link.path, seoRoutes)) {
        broken.push({ file, path: link.path, line: link.line });
      }
    }
  }

  if (broken.length === 0) {
    console.log("✅ No broken internal links found!");
  } else {
    console.log(`❌ Found ${broken.length} potentially broken link(s):\n`);
    for (const item of broken) {
      console.log(`  ${item.file}:${item.line}`);
      console.log(`    → ${item.path}\n`);
    }
  }

  // ── 2. Orphan / near-orphan detection ────────────────────────
  console.log("\n" + "─".repeat(55));
  console.log("👻 Orphan & Near-Orphan Page Analysis\n");

  const inboundCounts = buildInboundLinkCounts(files);

  const orphans = []; // 0 inbound links
  const nearOrphans = []; // 1 inbound link (< 2)

  for (const route of seoRoutes) {
    const count = inboundCounts.get(route) || 0;
    if (count === 0) {
      orphans.push(route);
    } else if (count < 2) {
      nearOrphans.push({ path: route, count });
    }
  }

  if (orphans.length === 0) {
    console.log("✅ No orphan pages found (all SEO routes have ≥1 inbound link)");
  } else {
    console.log(`⚠️  Found ${orphans.length} orphan page(s) (0 inbound links):\n`);
    for (const path of orphans) {
      console.log(`  🔴 ${path}`);
    }
  }

  if (nearOrphans.length > 0) {
    console.log(`\n⚠️  Found ${nearOrphans.length} near-orphan page(s) (<2 inbound links):\n`);
    for (const item of nearOrphans) {
      console.log(`  🟡 ${item.path} (${item.count} link)`);
    }
  }

  console.log("\n" + "─".repeat(55));

  // Exit with error in CI if broken links found
  if (broken.length > 0 && process.env.CI) {
    process.exit(1);
  }
}

main();
