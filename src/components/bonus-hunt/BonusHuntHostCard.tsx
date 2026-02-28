import { Link } from "react-router-dom";
import { Video, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KEVIN_SAME_AS } from "@/lib/seo";

const SITE_URL = "https://casinoaftaler.dk";

type SocialPlatform = {
  name: string;
  icon: string;
  match: string;
};

const PLATFORMS: SocialPlatform[] = [
  { name: "Twitch", icon: "twitch", match: "twitch.tv" },
  { name: "YouTube", icon: "youtube", match: "youtube.com" },
  { name: "X / Twitter", icon: "x", match: "x.com" },
  { name: "Instagram", icon: "instagram", match: "instagram.com" },
  { name: "LinkedIn", icon: "linkedin", match: "linkedin.com" },
];

function SocialIcon({ platform }: { platform: string }) {
  const size = "h-4 w-4";
  switch (platform) {
    case "twitch":
      return (
        <svg className={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "x":
      return (
        <svg className={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    default:
      return <ExternalLink className={size} />;
  }
}

function getActiveSocials() {
  return PLATFORMS.filter((p) =>
    KEVIN_SAME_AS.some((url) => url.includes(p.match))
  ).map((p) => ({
    ...p,
    url: KEVIN_SAME_AS.find((url) => url.includes(p.match))!,
  }));
}

export function BonusHuntHostCard() {
  const socials = getActiveSocials();

  return (
    <section className="rounded-xl border border-border/50 bg-card p-5 md:p-6">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <img
          src="/kevin-avatar.webp"
          alt="Kevin – Bonus Hunt vært hos Casinoaftaler.dk"
          className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-primary/20"
          loading="lazy"
        />

        {/* Info */}
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <Video className="h-3 w-3 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Vært
              </span>
            </div>
            <span className="flex items-center gap-1 text-[11px] text-green-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Live streamer
            </span>
          </div>

          <div>
            <Link to="/forfatter/kevin" className="text-base font-bold text-foreground hover:text-primary transition-colors">
              Kevin
            </Link>
            <p className="text-xs text-muted-foreground">
              Bonus Hunt vært & streamer
            </p>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Kevin streamer og dokumenterer live bonus hunts med fuld gennemsigtighed – fra indsats til resultat.
          </p>

          <div className="flex items-center gap-2.5 pt-1">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-primary hover:bg-primary/10"
              >
                <SocialIcon platform={s.icon} />
              </a>
            ))}
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
            sameAs: KEVIN_SAME_AS,
          }),
        }}
      />
    </section>
  );
}
