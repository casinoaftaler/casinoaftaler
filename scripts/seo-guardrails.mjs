import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");

const IGNORE_DIRS = new Set(["node_modules", "dist", ".git"]);
const FILE_EXT = /\.(ts|tsx)$/;

/** @typedef {{file: string; line: number; type: string; snippet: string}} Violation */

/** @type {Violation[]} */
const violations = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(abs);
      continue;
    }
    if (!FILE_EXT.test(entry.name)) continue;
    scanFile(abs);
  }
}

function lineAt(content, index) {
  return content.slice(0, index).split("\n").length;
}

function pushViolation(file, content, index, type) {
  const line = lineAt(content, index);
  const lineText = content.split("\n")[line - 1]?.trim() || "";
  violations.push({
    file: path.relative(ROOT, file),
    line,
    type,
    snippet: lineText.slice(0, 160),
  });
}

function scanPattern(file, content, regex, type) {
  let m;
  while ((m = regex.exec(content)) !== null) {
    pushViolation(file, content, m.index, type);
    if (m.index === regex.lastIndex) regex.lastIndex++;
  }
}

function scanFile(file) {
  const content = fs.readFileSync(file, "utf-8");

  // 1) Hardcoded SEO dateModified prop literals
  scanPattern(
    file,
    content,
    /<SEO\b[^>]*\bdateModified\s*=\s*(?:"[^"]+"|'[^']+')/g,
    "SEO dateModified literal is forbidden (use centralized route lastmod)"
  );

  // 2) Fake freshness via current date generation in schema/object usage
  scanPattern(
    file,
    content,
    /\bdateModified\s*:\s*new\s+Date\s*\(/g,
    "Dynamic current-date freshness is forbidden"
  );

  // 3) Fake freshness in UI labels
  scanPattern(
    file,
    content,
    /Opdateret\s*\{\s*new Date\s*\(/g,
    "Dynamic current-date freshness label is forbidden"
  );
}

walk(SRC_DIR);

if (violations.length > 0) {
  console.error("\n⚠️ SEO guardrails found freshness-pattern violations:\n");
  for (const v of violations) {
    console.error(`- ${v.file}:${v.line}`);
    console.error(`  ${v.type}`);
    if (v.snippet) console.error(`  ${v.snippet}`);
  }
  console.error(`\nTotal violations: ${violations.length}\n`);

  if (process.env.STRICT_SEO_GUARDRAILS === "1") {
    console.error("STRICT_SEO_GUARDRAILS=1 → failing build.\n");
    process.exit(1);
  }

  console.error("Non-strict mode → continuing build (set STRICT_SEO_GUARDRAILS=1 to enforce hard fail).\n");
  process.exit(0);
}

console.log("✅ SEO guardrails passed: no manual date drift patterns found.");