import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import vitePrerender from "vite-plugin-prerender";

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
      const buildDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD fallback

      const urls = seoRoutes.map((route) => {
        const loc = route.path === "/" ? SITE_URL + "/" : SITE_URL + route.path;
        const lastmod = route.lastmod || buildDate;
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

/**
 * Top SEO routes to prerender at build-time (priority >= 0.8).
 * Community, auth, profile, admin, shop pages are intentionally excluded.
 * These must match React Router paths exactly.
 */
const PRERENDER_ROUTES = [
  // Forside
  "/",
  // Casino Anmeldelser
  "/casino-anmeldelser",
  "/nye-casinoer",
  "/nye-casinoer/2026",
  "/nye-casinoer/dansk-licens",
  "/nye-casinoer/uden-rofus",
  "/nye-casinoer/hurtig-udbetaling",
  "/nye-casinoer/bonus-uden-indbetaling",
  "/nye-casinoer/trustly",
  "/nye-casinoer/mitid",
  "/nye-casinoer/lav-wagering",
  "/nye-casinoer/bedste",
  "/top-10-casino-online",
  "/casino-anmeldelser/spilleautomaten",
  "/casino-anmeldelser/campobet",
  "/casino-anmeldelser/betinia",
  "/casino-anmeldelser/swift-casino",
  "/casino-anmeldelser/luna-casino",
  "/casino-anmeldelser/spildansknu",
  "/casino-anmeldelser/danske-spil",
  "/casino-anmeldelser/comeon",
  "/casino-anmeldelser/getlucky",
  "/casino-anmeldelser/mr-green",
  "/casino-anmeldelser/videoslots",
  "/casino-anmeldelser/leovegas",
  "/casino-anmeldelser/betano",
  "/casino-anmeldelser/unibet",
  "/casino-anmeldelser/bet365",
  // Casino Spil
  "/live-casino",
  "/live-casino/blackjack",
  "/live-casino/roulette",
  "/casinospil",
  "/casinospil/spillemaskiner",
  "/casinospil/spillemaskiner/hoej-rtp",
  "/casinospil/spillemaskiner/bonus-buys",
  "/casinospil/spillemaskiner/sweet-bonanza",
  "/casinospil/spillemaskiner/book-of-dead",
  "/casinospil/spillemaskiner/gates-of-olympus",
  "/casinospil/blackjack",
  "/casinospil/roulette",
  "/casinospil/poker",
  // Bonus Guides
  "/casino-bonus",
  "/velkomstbonus",
  "/free-spins",
  "/omsaetningskrav",
  "/bonus-uden-indbetaling",
  "/bonus-uden-omsaetningskrav",
  "/no-sticky-bonus",
  // Casino Guides
  "/casinoer/hurtig-udbetaling",
  "/casinoer/hoej-rtp",
  "/licenserede-casinoer",
  "/casino-licenser",
  "/saadan-tester-vi-casinoer",
  // Info & Trust
  "/om",
  "/forfatter/jonas",
  "/forfatter/kevin",
  "/ansvarligt-spil",
  "/spillemyndigheden",
  "/redaktionel-politik",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemapPlugin(),
    mode === "production" &&
      vitePrerender({
        staticDir: path.join(__dirname, "dist"),
        routes: PRERENDER_ROUTES,
        // Use Puppeteer renderer (headless Chromium) for accurate CSR output
        renderer: new vitePrerender.PuppeteerRenderer({
          // Inject a custom document event that pages dispatch when ready.
          // Falls back to a 5 s timeout if the event never fires.
          renderAfterDocumentEvent: "prerender-ready",
          timeout: 8000,
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        }),
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
