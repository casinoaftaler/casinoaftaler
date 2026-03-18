import fs from "fs";
import path from "path";
import { getApprovedDynamicDateModifiedPatternsForFile } from "../src/lib/seoDatePolicy.js";

const ROOT = process.cwd();
const SCAN_DIRS = [path.join(ROOT, "src"), path.join(ROOT, "scripts")];

const IGNORE_DIRS = new Set(["node_modules", "dist", ".git"]);
const FILE_EXT = /\.(ts|tsx|mjs)$/;

/** @typedef {{file: string; line: number; type: string; snippet: string}} Violation */

/** @type {Violation[]} */
const violations = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;

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

function scanDateModifiedGovernance(file, originalContent, content, relativeFile) {
  if (relativeFile === path.join("src", "lib", "seo.ts")) return;

  const allowedPatterns = APPROVED_DYNAMIC_DATE_MODIFIED[relativeFile] || [];
  const regex = /\bdateModified\s*:\s*[^,\n}]+|\bdateModified\s*=\s*\{[^}]+\}/g;
  let m;

  while ((m = regex.exec(content)) !== null) {
    const snippet = m[0];
    const handledByLiteralRules = /["']\d{4}-\d{2}-\d{2}|new\s+Date\s*\(|getTodayDanish\s*\(/.test(snippet);
    const centralizedStatic = /routeLastmod|homepageDateModified/.test(snippet);
    const approvedDynamic = allowedPatterns.some((pattern) => pattern.test(snippet));

    if (!handledByLiteralRules && !centralizedStatic && !approvedDynamic) {
      pushViolation(
        file,
        originalContent,
        m.index,
        allowedPatterns.length > 0
          ? "Unapproved dateModified expression in approved dynamic SEO file"
          : "dateModified must come from centralized route lastmod or an approved dynamic backend source"
      );
    }

    if (m.index === regex.lastIndex) regex.lastIndex++;
  }
}

function scanFile(file) {
  const originalContent = fs.readFileSync(file, "utf-8");
  const content = stripComments(originalContent);
  const relativeFile = path.relative(ROOT, file);

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
    /<AuthorMetaBar\b[^>]*\bdate\s*=/g,
    "AuthorMetaBar date prop is forbidden (remove legacy date ownership from UI)"
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

  scanDateModifiedGovernance(file, originalContent, content, relativeFile);

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
    /Matematisk Analyse\s+–\s+(?:januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)\s+\d{4}/gi,
    "Hardcoded dated analysis badge is forbidden"
  );

  scanPattern(
    file,
    originalContent,
    content,
    /Opdateret\s*\{\s*new Date\s*\(/g,
    "Dynamic current-date freshness label is forbidden"
  );

  if (relativeFile === path.join("src", "lib", "seoRoutes.ts")) {
    scanPattern(
      file,
      originalContent,
      content,
      /\bgetTodayDanish\s*\(/g,
      "seoRoutes.ts must not generate artificial lastmod values dynamically"
    );
  }

  if (relativeFile === path.join("scripts", "generate-sitemap.ts")) {
    scanPattern(
      file,
      originalContent,
      content,
      /\bbuildDate\b/g,
      "Build-time sitemap must not fall back to generated dates; every route needs explicit lastmod"
    );
  }
}

for (const dir of SCAN_DIRS) {
  walk(dir);
}

if (violations.length > 0) {
  console.error("\n⚠️ SEO guardrails found freshness-pattern violations:\n");
  for (const v of violations) {
    console.error(`- ${v.file}:${v.line}`);
    console.error(`  ${v.type}`);
    if (v.snippet) console.error(`  ${v.snippet}`);
  }
  console.error(`\nTotal violations: ${violations.length}\n`);
  process.exit(1);
}

console.log("✅ SEO guardrails passed: no manual date drift patterns found.");
