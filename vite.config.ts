import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

const SITE_URL = "https://casinoaftaler.dk";
const SUPABASE_URL = "https://zhpbqqhtgnblaugrqhqi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocGJxcWh0Z25ibGF1Z3JxaHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NDkxMzYsImV4cCI6MjA4MTIyNTEzNn0.RY7LmE9Cgms6_PDns8gc0jAxYPcK2zX8CRIx6oZ3uDE";

/** Slugify a slot name – must match src/lib/slugify.ts */
function slugifySlotName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[''""'"]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Escape XML special characters */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Fetch all rows from a Supabase table with pagination */
async function fetchAllRows<T>(
  table: string,
  select: string,
  orderBy: string,
  filters?: string
): Promise<T[]> {
  const allData: T[] = [];
  const batchSize = 1000;
  let from = 0;

  while (true) {
    let url = `${SUPABASE_URL}/rest/v1/${table}?select=${encodeURIComponent(select)}&order=${orderBy}&offset=${from}&limit=${batchSize}`;
    if (filters) url += `&${filters}`;

    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!res.ok) {
      console.warn(`⚠️ Failed to fetch ${table}: ${res.status} ${res.statusText}`);
      break;
    }

    const data = await res.json() as T[];
    allData.push(...data);
    if (data.length < batchSize) break;
    from += batchSize;
  }

  return allData;
}

/**
 * Vite plugin that generates all sitemap XML files at build time.
 * - sitemap.xml: from seoRoutes.ts (static pages)
 * - sitemap-slots.xml: from slot_catalog table (1600+ slots)
 * - sitemap-articles.xml: from casino_news table (all published articles)
 * - sitemap-index.xml: referencing all above on same domain
 */
function sitemapPlugin(): Plugin {
  return {
    name: "generate-sitemap",
    apply: "build",
    async closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      fs.mkdirSync(outDir, { recursive: true });

      // ── 1. sitemap.xml from seoRoutes + page_metadata (automated lastmod) ──
      const { seoRoutes } = await import("./src/lib/seoRoutes");
      const now = new Date();
      const buildDateISO = toDanishISO(now);

      // Fetch live lastmod dates from page_metadata (source of truth)
      const metadataMap = new Map<string, string>();
      try {
        const metaRows = await fetchAllRows<{ path: string; updated_at: string }>(
          "page_metadata",
          "path,updated_at",
          "path"
        );
        for (const row of metaRows) {
          metadataMap.set(row.path, row.updated_at);
        }
        console.log(`📅 Fetched ${metadataMap.size} lastmod dates from page_metadata`);
      } catch (err) {
        console.warn("⚠️ Could not fetch page_metadata – falling back to seoRoutes lastmod:", err);
      }

      const staticUrls = seoRoutes.map((route) => {
        const loc = route.path === "/" ? SITE_URL + "/" : SITE_URL + route.path;
        // Priority: 1) page_metadata.updated_at (live), 2) seoRoutes lastmod (hardcoded), 3) build date
        const dbDate = metadataMap.get(route.path);
        const lastmod = dbDate
          ? new Date(dbDate).toISOString().replace(/\.\d{3}Z$/, "+00:00")
          : route.lastmod
            ? `${route.lastmod}T12:00:00+01:00`
            : buildDateISO;
        return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`;
      });

      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.join("\n")}
</urlset>
`;
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemapXml, "utf-8");
      console.log(`✅ sitemap.xml generated with ${seoRoutes.length} URLs`);

      // ── 2. sitemap-slots.xml from slot_catalog ──
      try {
        const slots = await fetchAllRows<{ slot_name: string; slug: string | null; updated_at: string }>(
          "slot_catalog",
          "slot_name,slug,updated_at",
          "slot_name"
        );

        if (slots.length > 0) {
          const slotUrls = slots.map((slot) => {
            const s = slot.slug || slugifySlotName(slot.slot_name);
            const lastmod = new Date(slot.updated_at).toISOString().replace(/\.\d{3}Z$/, "+00:00");
            return `  <url>
    <loc>${SITE_URL}/slot-katalog/${s}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
          });

          const slotSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${slotUrls.join("\n")}
</urlset>
`;
          fs.writeFileSync(path.join(outDir, "sitemap-slots.xml"), slotSitemap, "utf-8");
          console.log(`✅ sitemap-slots.xml generated with ${slots.length} slot URLs`);
        } else {
          console.warn("⚠️ No slots fetched – skipping sitemap-slots.xml");
        }
      } catch (err) {
        console.warn("⚠️ Failed to generate sitemap-slots.xml:", err);
      }

      // ── 3. sitemap-articles.xml from casino_news ──
      try {
        const articles = await fetchAllRows<{ slug: string; title: string; published_at: string; updated_at: string; tags: string[] | null }>(
          "casino_news",
          "slug,title,published_at,updated_at,tags",
          "published_at.desc",
          "status=eq.published"
        );

        if (articles.length > 0) {
          const articleUrls = articles.map((article) => {
            const lastmod = new Date(article.updated_at || article.published_at)
              .toISOString()
              .replace(/\.\d{3}Z$/, "+00:00");
            return `  <url>
    <loc>${SITE_URL}/casino-nyheder/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
          });

          const articleSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${articleUrls.join("\n")}
</urlset>
`;
          fs.writeFileSync(path.join(outDir, "sitemap-articles.xml"), articleSitemap, "utf-8");
          console.log(`✅ sitemap-articles.xml generated with ${articles.length} article URLs`);
        } else {
          console.warn("⚠️ No articles fetched – skipping sitemap-articles.xml");
        }
      } catch (err) {
        console.warn("⚠️ Failed to generate sitemap-articles.xml:", err);
      }

      // ── 4. sitemap-index.xml (all on same domain) ──
      const indexEntries = [
        `${SITE_URL}/sitemap.xml`,
        `${SITE_URL}/sitemap-slots.xml`,
        `${SITE_URL}/sitemap-articles.xml`,
      ];

      const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexEntries.map((loc) => `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${buildDateISO}</lastmod>
  </sitemap>`).join("\n")}
</sitemapindex>
`;
      fs.writeFileSync(path.join(outDir, "sitemap-index.xml"), sitemapIndex, "utf-8");
      console.log(`✅ sitemap-index.xml generated with ${indexEntries.length} sub-sitemaps`);
    },
  };
}

/** Convert a Date to ISO 8601 string with Danish timezone offset */
function toDanishISO(date: Date): string {
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Copenhagen",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value || "00";
  const utcH = date.getUTCHours();
  const localH = parseInt(get("hour"), 10);
  let offset = localH - utcH;
  if (offset < 0) offset += 24;
  if (offset > 12) offset -= 24;
  const offsetStr = `+${String(offset).padStart(2, "0")}:00`;
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}${offsetStr}`;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-icons': ['lucide-react'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-charts': ['recharts'],
          'vendor-carousel': ['embla-carousel-react'],
          'vendor-dnd': ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
        },
      },
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
