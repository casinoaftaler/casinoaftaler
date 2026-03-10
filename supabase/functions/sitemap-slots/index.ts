import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://casinoaftaler.dk";

/**
 * Slugify a slot name the same way the frontend does.
 * Must match src/lib/slugify.ts → slugifySlotName()
 * SYNCED: 2026-03-09
 */
function slugifySlotName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[''""'"]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch all slots from catalog (paginated to handle >1000)
    const allSlots: { slot_name: string; updated_at: string; bonus_count: number }[] = [];
    let from = 0;
    const batchSize = 1000;

    while (true) {
      const { data, error } = await supabase
        .from("slot_catalog")
        .select("slot_name, updated_at, bonus_count")
        .order("slot_name")
        .range(from, from + batchSize - 1);

      if (error) throw error;
      if (data) allSlots.push(...data);
      if (!data || data.length < batchSize) break;
      from += batchSize;
    }

    // All pages have 2000+ words of generated content – include everything
    const indexableSlots = allSlots;

    const urls = indexableSlots.map((slot) => {
      const slug = slugifySlotName(slot.slot_name);
      const lastmod = new Date(slot.updated_at)
        .toISOString()
        .replace(/\.\d{3}Z$/, "+00:00");

      return `  <url>
    <loc>${SITE_URL}/slot-katalog/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (err) {
    console.error("Slots sitemap error:", err);
    return new Response("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
});
