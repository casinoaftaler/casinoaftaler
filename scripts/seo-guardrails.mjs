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

function pushViolation(file, originalContent, index, type) {
  const line = lineAt(originalContent, index);
  const lineText = originalContent.split("\n")[line - 1]?.trim() || "";
  violations.push({
    file: path.relative(ROOT, file),
    line,
    type,
    snippet: lineText.slice(0, 160),
  });
}

function maskPreserveNewlines(match) {
  return match.replace(/[^\n]/g, " ");
}

function stripComments(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, maskPreserveNewlines)
    .replace(/(^|[^:])\/\/.*$/gm, (match, prefix) => `${prefix}${" ".repeat(Math.max(0, match.length - prefix.length))}`);
}

function scanPattern(file, originalContent, content, regex, type) {
  let m;
  while ((m = regex.exec(content)) !== null) {
    pushViolation(file, originalContent, m.index, type);
    if (m.index === regex.lastIndex) regex.lastIndex++;
  }
}

function scanFile(file) {
  const originalContent = fs.readFileSync(file, "utf-8");
  const content = stripComments(originalContent);

  scanPattern(
    file,
    originalContent,
    content,
    /<SEO\b[^>]*\bdateModified\s*=\s*(?:"[^"]+"|'[^']+')/g,
    "SEO dateModified literal is forbidden (use centralized route lastmod or approved runtime data)"
  );

  scanPattern(
    file,
    originalContent,
    content,
    /<AuthorMetaBar\b[^>]*\bdate\s*=\s*(?:"[^"]+"|'[^']+')/g,
    "AuthorMetaBar date literal is forbidden (remove legacy hardcoded date prop)"
  );

  scanPattern(
    file,
    originalContent,
    content,
    /\bdateModified\s*:\s*(?:"\d{4}-\d{2}-\d{2}(?:T[^"]*)?"|'\d{4}-\d{2}-\d{2}(?:T[^']*)?')/g,
    "Hardcoded dateModified literal is forbidden"
  );

  scanPattern(
    file,
    originalContent,
    content,
    /\bdateModified\s*:\s*new\s+Date\s*\(/g,
    "Dynamic current-date freshness is forbidden"
  );

  scanPattern(
    file,
    originalContent,
    content,
    /\bdateModified\s*:\s*getTodayDanish\s*\(/g,
    "Danish-today freshness is forbidden for SEO dateModified"
  );

  scanPattern(
    file,
    originalContent,
    content,
    /\bOpdateret i dag\b/gi,
    "Artificial 'updated today' label is forbidden"
  );

  scanPattern(
    file,
    originalContent,
    content,
    /Opdateret\s+(?:\d{1,2}\.\s*)?(?:januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)\s+\d{4}/gi,
    "Hardcoded freshness label is forbidden"
  );

  scanPattern(
    file,
    originalContent,
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