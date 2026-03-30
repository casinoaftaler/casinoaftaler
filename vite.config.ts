import { defineConfig, type Plugin } from "vite";
import path from "path";
import fs from "fs";

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

    const res: any = await fetch(url, {
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
      const publicDir = path.resolve(__dirname, "public");
      fs.mkdirSync(outDir, { recursive: true });
      fs.mkdirSync(publicDir, { recursive: true });

      const writeSitemapSnapshot = (filename: string, xml: string) => {
        fs.writeFileSync(path.join(outDir, filename), xml, "utf-8");
        fs.writeFileSync(path.join(publicDir, filename), xml, "utf-8");
      };

      // ── 1. sitemap.xml from seoRoutes (single source of truth for static routes) ──
      const { seoRoutes } = await import("./src/lib/seoRoutes");
      const now = new Date();
      const buildDateISO = toDanishISO(now);
      const missingLastmod = seoRoutes.filter((route) => !route.lastmod);

      if (missingLastmod.length > 0) {
        throw new Error(
          `Missing explicit lastmod in seoRoutes for: ${missingLastmod.map((route) => route.path).join(", ")}`
        );
      }

      const formatStaticLastmod = (lastmod: string) => `${lastmod}T12:00:00+01:00`;

      const staticUrls = seoRoutes.map((route) => {
        const loc = route.path === "/" ? SITE_URL + "/" : SITE_URL + route.path;
        const lastmod = formatStaticLastmod(route.lastmod!);
        return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
      });

      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.join("\n")}
</urlset>
`;
      writeSitemapSnapshot("sitemap.xml", sitemapXml);
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
          writeSitemapSnapshot("sitemap-slots.xml", slotSitemap);
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
          writeSitemapSnapshot("sitemap-articles.xml", articleSitemap);
          console.log(`✅ sitemap-articles.xml generated with ${articles.length} article URLs`);
        } else {
          console.warn("⚠️ No articles fetched – skipping sitemap-articles.xml");
        }
      } catch (err) {
        console.warn("⚠️ Failed to generate sitemap-articles.xml:", err);
      }

      // ── 4. sitemap-priority.xml (top money pages, priority ≥ 0.8) ──
      const priorityRoutes = seoRoutes.filter((r) => r.priority >= 0.9);
      if (priorityRoutes.length > 0) {
        const priorityUrls = priorityRoutes.map((route) => {
          const loc = route.path === "/" ? SITE_URL + "/" : SITE_URL + route.path;
          const lastmod = formatStaticLastmod(route.lastmod!);
          return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
        });

        const prioritySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${priorityUrls.join("\n")}
</urlset>
`;
        writeSitemapSnapshot("sitemap-priority.xml", prioritySitemap);
        console.log(`✅ sitemap-priority.xml generated with ${priorityRoutes.length} high-priority URLs`);
      }

      // ── 5. Generate slot-directory.html (crawl-bridge for orphan elimination) ──
      try {
        const dirSlots = await fetchAllRows<{ slot_name: string; slug: string | null }>(
          "slot_catalog",
          "slot_name,slug",
          "slot_name"
        );

        if (dirSlots.length > 0) {
          const grouped = new Map<string, { name: string; slug: string }[]>();
          const LETTERS = "#ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".split("");
          for (const l of LETTERS) grouped.set(l, []);

          for (const slot of dirSlots) {
            const s = slot.slug || slugifySlotName(slot.slot_name);
            const first = slot.slot_name.charAt(0).toUpperCase();
            const letter = /[A-ZÆØÅ]/.test(first) ? first : "#";
            const bucket = grouped.get(letter);
            if (bucket) bucket.push({ name: slot.slot_name, slug: s });
            else grouped.get("#")!.push({ name: slot.slot_name, slug: s });
          }

          const activeLettters = LETTERS.filter((l) => (grouped.get(l)?.length ?? 0) > 0);

          const letterNav = activeLettters
            .map((l) => `<a href="#letter-${l === "#" ? "num" : l}" style="display:inline-block;padding:4px 8px;margin:2px;background:#f0f0f0;border-radius:4px;text-decoration:none;color:#333;font-weight:600">${l}</a>`)
            .join("\n          ");

          const sections = activeLettters
            .map((l) => {
              const items = grouped.get(l)!;
              const links = items
                .map((item) => `        <li><a href="/slot-katalog/${item.slug}">${escapeXml(item.name)}</a></li>`)
                .join("\n");
              const id = l === "#" ? "num" : l;
              return `      <section id="letter-${id}">
        <h2>${l}</h2>
        <ul style="columns:2;column-gap:24px;list-style:none;padding:0">
${links}
        </ul>
      </section>`;
            })
            .join("\n\n");

          const directoryHtml = `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="${SITE_URL}/slot-directory.html">
  <title>Alle Spillemaskiner – Casinoaftaler.dk</title>
  <meta name="description" content="Komplet katalog over alle ${dirSlots.length.toLocaleString("da-DK")} spillemaskiner på Casinoaftaler.dk med links til detaljerede sider.">
  <style>body{font-family:system-ui,sans-serif;max-width:960px;margin:0 auto;padding:20px}a{color:#1a56db}h1{margin-bottom:8px}h2{margin-top:24px;border-bottom:1px solid #ddd;padding-bottom:4px}ul li{padding:2px 0}nav{margin:16px 0 24px}</style>
</head>
<body>
  <h1>Alle ${dirSlots.length.toLocaleString("da-DK")} Spillemaskiner</h1>
  <p>Komplet katalog over alle spillemaskiner i vores database med statistik fra bonus hunts.</p>

  <nav>
    <p><a href="/">Forside</a> · <a href="/slot-database">Slot Database</a> · <a href="/casinospil/spillemaskiner">Spillemaskiner</a> · <a href="/sitemap">Sitemap</a></p>
    <p style="margin-top:8px">Hop til bogstav:</p>
    <div>
          ${letterNav}
    </div>
  </nav>

${sections}

  <footer style="margin-top:40px;padding-top:16px;border-top:1px solid #ddd">
    <p><a href="/">Forside</a> · <a href="/slot-database">Slot Database</a> · <a href="/casinospil/spillemaskiner">Spillemaskiner Guide</a> · <a href="/casino-bonus">Casino Bonus</a> · <a href="/casino-anmeldelser">Casino Anmeldelser</a></p>
  </footer>
</body>
</html>`;

          fs.writeFileSync(path.join(outDir, "slot-directory.html"), directoryHtml, "utf-8");
          console.log(`✅ slot-directory.html generated with ${dirSlots.length} slot links`);
        }
      } catch (err) {
        console.warn("⚠️ Failed to generate slot-directory.html:", err);
      }

      // ── 6. sitemap-images.xml (focused: casino reviews + key pages only) ──
      try {
        const casinos = await fetchAllRows<{ slug: string; name: string; logo_url: string | null }>(
          "casinos",
          "slug,name,logo_url",
          "position",
          "is_active=eq.true"
        );

        // Map casino slugs to their seoRoutes review pages
        const reviewRoutes = seoRoutes.filter((r) => r.path.startsWith("/casino-anmeldelser/") && !r.path.includes("-vs-"));
        const vsRoutes = seoRoutes.filter((r) => r.path.includes("-vs-"));

        const imageUrls: string[] = [];

        // Casino review pages — each gets its logo
        for (const route of reviewRoutes) {
          const slug = route.path.replace("/casino-anmeldelser/", "");
          const casino = casinos.find((c) => c.slug === slug);
          if (!casino?.logo_url) continue;

          const casinoTitle = `${casino.name} Casino Logo – Dansk Anmeldelse`;
          const casinoCaption = `Officielt logo for ${casino.name}, anmeldt på Casinoaftaler.dk`;

          imageUrls.push(`  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <image:image>
      <image:loc>${escapeXml(casino.logo_url)}</image:loc>
      <image:title>${escapeXml(casinoTitle)}</image:title>
      <image:caption>${escapeXml(casinoCaption)}</image:caption>
    </image:image>
  </url>`);
        }

        // VS comparison pages — include both logos
        for (const route of vsRoutes) {
          const vsSlug = route.path.replace("/casino-anmeldelser/", "");
          const slugParts = vsSlug.split("-vs-");
          if (slugParts.length !== 2) continue;

          const images: string[] = [];
          for (const part of slugParts) {
            const casino = casinos.find((c) => c.slug === part);
            if (!casino?.logo_url) continue;
            images.push(`    <image:image>
      <image:loc>${escapeXml(casino.logo_url)}</image:loc>
      <image:title>${escapeXml(casino.name)} Logo</image:title>
      <image:caption>${escapeXml(`${casino.name} – sammenligning på Casinoaftaler.dk`)}</image:caption>
    </image:image>`);
          }

          if (images.length > 0) {
            imageUrls.push(`  <url>
    <loc>${SITE_URL}${route.path}</loc>
${images.join("\n")}
  </url>`);
          }
        }

        // Site brand assets on homepage
        imageUrls.push(`  <url>
    <loc>${SITE_URL}/</loc>
    <image:image>
      <image:loc>${SITE_URL}/icon-512x512.png</image:loc>
      <image:title>Casinoaftaler.dk – Uafhængig casino guide</image:title>
      <image:caption>Logo for Casinoaftaler.dk, Danmarks uafhængige casinoguide</image:caption>
    </image:image>
  </url>`);

        if (imageUrls.length > 0) {
          const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageUrls.join("\n")}
</urlset>
`;
          writeSitemapSnapshot("sitemap-images.xml", imageSitemap);
          console.log(`✅ sitemap-images.xml generated with ${imageUrls.length} URLs (focused, no slot catalog)`);
        }
      } catch (err) {
        console.warn("⚠️ Failed to generate sitemap-images.xml:", err);
      }

      // ── 7. sitemap-index.xml (all on same domain) ──
      const indexEntries = [
        `${SITE_URL}/sitemap.xml`,
        `${SITE_URL}/sitemap-priority.xml`,
        `${SITE_URL}/sitemap-slots.xml`,
        `${SITE_URL}/sitemap-articles.xml`,
        `${SITE_URL}/sitemap-images.xml`,
      ].filter((loc) => fs.existsSync(path.join(outDir, loc.split("/").pop()!)));

      const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexEntries.map((loc) => `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${buildDateISO}</lastmod>
  </sitemap>`).join("\n")}
</sitemapindex>
`;
      writeSitemapSnapshot("sitemap-index.xml", sitemapIndex);
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
          'vendor-supabase': ['@supabase/supabase-js'],
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
    sitemapPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
