/**
 * Generates a static sitemap.xml in public/ from the central seoRoutes registry.
 * Run: npx tsx scripts/generate-sitemap.ts
 * Also runs automatically via the Vite plugin at build time.
 */
import { seoRoutes } from "../src/lib/seoRoutes";
import fs from "fs";
import path from "path";

const SITE_URL = "https://casinoaftaler.dk";

const missingLastmod = seoRoutes.filter((route) => !route.lastmod);

if (missingLastmod.length > 0) {
  throw new Error(
    `Missing explicit lastmod in seoRoutes for: ${missingLastmod
      .map((route) => route.path)
      .join(", ")}`
  );
}

const urls = seoRoutes.map((route) => {
  const loc = route.path === "/" ? SITE_URL + "/" : SITE_URL + route.path;
  const lastmod = `${route.lastmod}T12:00:00+01:00`;

  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

const outPath = path.resolve(__dirname, "../public/sitemap.xml");
fs.writeFileSync(outPath, sitemap, "utf-8");
console.log(`✅ sitemap.xml generated in public/ with ${seoRoutes.length} URLs`);
