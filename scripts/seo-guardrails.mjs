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

  // 1) Legacy manual modified date in SEO component usage
  scanPattern(
    file,
    content,
    /<SEO[\s\S]*?\bdateModified\s*=/g,
    "SEO dateModified prop is forbidden (use centralized route lastmod)"
  );

  // 2) Legacy manual modified date in article schema builder
  scanPattern(
    file,
    content,
    /buildArticleSchema\s*\(\s*\{[\s\S]*?\bdateModified\s*:/g,
    "buildArticleSchema dateModified is forbidden (use centralized route lastmod)"
  );

  // 3) Legacy manual date in meta bar
  scanPattern(
    file,
    content,
    /<AuthorMetaBar[\s\S]*?\bdate\s*=/g,
    "AuthorMetaBar date prop is forbidden (auto-resolved centrally)"
  );

  // 4) Fake freshness in UI labels
  scanPattern(
    file,
    content,
    /Opdateret\s*\{\s*new Date\(/g,
    "Dynamic current-date freshness label is forbidden"
  );
}

walk(SRC_DIR);

if (violations.length > 0) {
  console.error("\n❌ SEO guardrails failed. Found forbidden freshness patterns:\n");
  for (const v of violations) {
    console.error(`- ${v.file}:${v.line}`);
    console.error(`  ${v.type}`);
    if (v.snippet) console.error(`  ${v.snippet}`);
  }
  console.error(`\nTotal violations: ${violations.length}\n`);
  process.exit(1);
}

console.log("✅ SEO guardrails passed: no manual date drift patterns found.");
