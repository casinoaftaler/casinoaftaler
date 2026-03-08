import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

const SITE_URL = "https://casinoaftaler.dk";

/**
 * Vite plugin that generates sitemap.xml at build time
 * from the central SEO routes registry.
 */
function sitemapPlugin(): Plugin {
  return {
    name: "generate-sitemap",
    apply: "build",
    async closeBundle() {
      // Dynamic import so it only runs at build time
      const { seoRoutes } = await import("./src/lib/seoRoutes");
      // ISO 8601 with CET/CEST timezone offset (+01:00 / +02:00)
      const now = new Date();
      const buildDateISO = toDanishISO(now);

      const urls = seoRoutes.map((route) => {
        const loc = route.path === "/" ? SITE_URL + "/" : SITE_URL + route.path;
        // Convert YYYY-MM-DD lastmod to full ISO 8601 with Danish timezone
        const lastmod = route.lastmod
          ? `${route.lastmod}T12:00:00+01:00`
          : buildDateISO;
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
      const outDir = path.resolve(__dirname, "dist");
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap, "utf-8");
      console.log(`✅ sitemap.xml generated with ${seoRoutes.length} URLs`);
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
  // Determine offset: CET = +01:00, CEST = +02:00
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
    sourcemap: true,
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
