import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SITE_URL } from "@/lib/seo";
import { TrendingUp } from "lucide-react";

interface PopularSlot {
  slot_name: string;
  slug: string | null;
  provider: string;
  rtp: number | null;
  bonus_count: number;
}

export function usePopularSlots() {
  return useQuery({
    queryKey: ["homepage-popular-slots"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slot_catalog")
        .select("slot_name, slug, provider, rtp, bonus_count")
        .not("slug", "is", null)
        .order("bonus_count", { ascending: false })
        .limit(20);
      if (error) throw error;
      return (data ?? []) as PopularSlot[];
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function buildPopularSlotsSchema(slots: PopularSlot[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Populære Spillemaskiner",
    numberOfItems: slots.length,
    itemListElement: slots.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Thing",
        name: s.slot_name,
        url: `${SITE_URL}/slot-katalog/${s.slug}`,
      },
    })),
  };
}

export function HomepagePopularSlots() {
  const { data: slots, isLoading } = usePopularSlots();

  if (isLoading || !slots?.length) return null;

  return (
    <section className="container py-8 md:py-12">
      <h2 className="mb-2 text-2xl font-bold flex items-center gap-2">
        <span aria-hidden="true">🔥</span>
        Populære Spillemaskiner
      </h2>
      <p className="mb-6 text-muted-foreground">
        De mest spillede spillemaskiner fra vores community – baseret på bonus hunt data og aktivitet.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {slots.map((slot) => (
          <Link
            key={slot.slug}
            to={`/slot-katalog/${slot.slug}`}
            className="group rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/40 hover:bg-accent/30"
          >
            <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {slot.slot_name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{slot.provider}</p>
            {slot.rtp && (
              <p className="text-xs text-muted-foreground">RTP: {slot.rtp}%</p>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link
          to="/slot-database"
          className="text-sm text-primary hover:underline font-medium"
        >
          Udforsk hele slot-databasen →
        </Link>
      </div>

      <noscript>
        <ul>
          {slots.map((slot) => (
            <li key={slot.slug}>
              <a href={`/slot-katalog/${slot.slug}`}>
                {slot.slot_name} – {slot.provider}
                {slot.rtp ? ` (RTP: ${slot.rtp}%)` : ""}
              </a>
            </li>
          ))}
        </ul>
      </noscript>
    </section>
  );
}
