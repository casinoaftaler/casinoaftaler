import { Link } from "react-router-dom";
import { Video, ExternalLink, Trophy, Radio, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const SITE_URL = "https://casinoaftaler.dk";

export function BonusHuntHostCard() {
  return (
    <section className="relative overflow-hidden rounded-xl border border-primary/15 p-5 md:p-6 community-card cursor-default"
      style={{
        background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--primary) / 0.06) 50%, hsl(var(--card)) 100%)",
      }}
    >
      {/* Spotlight behind avatar */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 h-28 w-28 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

      <div className="relative flex items-center gap-5">
        {/* Avatar with glow ring */}
        <div className="shrink-0">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-primary/20 blur-md" />
            <img
              src="/kevin-avatar.webp"
              alt="Kevin – Bonus Hunt vært hos Casinoaftaler.dk"
              className="relative h-20 w-20 rounded-full object-cover ring-2 ring-primary/30"
              loading="lazy"
            />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Video className="h-3 w-3" />
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="min-w-0 space-y-2.5 flex-1">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-foreground">Kevin</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                <Radio className="h-2.5 w-2.5" /> Vært
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Bonus Hunt vært hos Casinoaftaler.dk
            </p>
          </div>

          {/* Mini stats */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Video className="h-3 w-3 text-primary/70" /> Live siden 2024
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="h-3 w-3 text-primary/70" /> Dokumenterede hunts
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3 text-primary/70" /> Twitch community
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            Streamer og dokumenterer live bonus hunts – tester danske casinoer for bonusvilkår, gennemsnitlig multiplikator og reel performance med fuld gennemsigtighed.
          </p>

          <div className="flex items-center gap-2 pt-0.5">
            <Button variant="outline" size="sm" className="h-7 text-xs px-3" asChild>
              <Link to="/forfatter/kevin">Se alle hunts</Link>
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs px-3 gap-1.5" asChild>
              <a href="https://www.twitch.tv/casinoaftaler" target="_blank" rel="noopener noreferrer">
                Twitch <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${SITE_URL}/forfatter/kevin#person`,
            name: "Kevin",
            jobTitle: "Bonus Hunt vært",
            url: `${SITE_URL}/forfatter/kevin`,
            image: `${SITE_URL}/kevin-avatar.webp`,
            worksFor: { "@type": "Organization", name: "Casinoaftaler.dk", url: SITE_URL },
            sameAs: ["https://www.twitch.tv/casinoaftaler"],
          }),
        }}
      />
    </section>
  );
}
