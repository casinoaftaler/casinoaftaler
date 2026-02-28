import { Link } from "react-router-dom";
import { Video } from "lucide-react";

const SITE_URL = "https://casinoaftaler.dk";

export function BonusHuntHostCard() {
  return (
    <section className="rounded-xl border border-border/50 bg-card p-5 community-card cursor-default">
      <div className="flex items-start gap-4">
        <img
          src="/kevin-avatar.webp"
          alt="Kevin – Bonus Hunt vært hos Casinoaftaler.dk"
          className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
          loading="lazy"
        />
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4 text-primary shrink-0" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Vært for denne bonus hunt
            </span>
          </div>
          <h3 className="text-sm font-bold text-foreground">Kevin</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Kevin streamer og dokumenterer live bonus hunts og tester løbende danske casinoer
            for bonusvilkår, gennemsnitlig multiplikator og reel performance. Alle hunts
            arkiveres med fuld gennemsigtighed.
          </p>
          <Link
            to="/forfatter/kevin"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium pt-1"
          >
            → Se alle bonus hunts med Kevin
          </Link>
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
            worksFor: {
              "@type": "Organization",
              name: "Casinoaftaler.dk",
              url: SITE_URL,
            },
            sameAs: ["https://www.twitch.tv/casinoaftaler"],
          }),
        }}
      />
    </section>
  );
}
