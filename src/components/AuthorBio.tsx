import { Link } from "react-router-dom";
import { ShieldCheck as GpwaShield } from "lucide-react";
import { ExternalLink, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommunityPromoSection } from "@/components/CommunityPromoSection";
import { SourceCitations } from "@/components/SourceCitations";
import jonasImage from "@/assets/jonas-forfatter.webp";
import kevinImage from "@/assets/kevin-forfatter.webp";
import ajseImage from "@/assets/ajse-avatar.webp";
import niklasImage from "@/assets/niklas-forfatter.webp";
import frederikImage from "@/assets/frederik-forfatter.webp";

interface AuthorBioProps {
  author?: "jonas" | "kevin" | "ajse" | "niklas" | "frederik";
  /** Set to false if CommunityPromoSection is already rendered elsewhere on the page */
  showCommunity?: boolean;
}

const authorData = {
  jonas: {
    name: "Jonas",
    image: jonasImage,
    alt: "Jonas – Grundlægger af Casinoaftaler.dk",
    link: "/forfatter/jonas",
    badge: "Grundlægger & indholdsansvarlig",
    role: "Grundlægger af Casinoaftaler.dk & Casino-streamer",
    bio: "Jonas er grundlægger af Casinoaftaler.dk og har streamet online casino i over 4 år. Med daglig erfaring fra slots og live casino deler han ærlige anmeldelser og opdateret viden om det danske casinomarked.",
    socials: [
      { href: "https://www.twitch.tv/fedesvinsejer", label: "Twitch" },
      { href: "https://www.youtube.com/@fedesvinsejer", label: "YouTube" },
      { href: "https://discord.gg/ZD4YdSeY", label: "Discord" },
      { href: "https://www.instagram.com/jonastheill", label: "Instagram" },
      { href: "https://www.linkedin.com/in/casinoaftaler-dk-5782203b1/", label: "LinkedIn" },
      { href: "https://x.com/casinoaftaler", label: "X" },
      { href: "https://www.snapchat.com/@fedesvinsejer", label: "Snapchat" },
    ],
  },
  kevin: {
    name: "Kevin",
    image: kevinImage,
    alt: "Kevin – Medansvarlig hos Casinoaftaler.dk",
    link: "/forfatter/kevin",
    badge: "Casino-streamer & IT medansvarlig",
    role: "IT Medansvarlig hos Casinoaftaler.dk & Casino-streamer",
    bio: "Kevin er IT medansvarlig hos Casinoaftaler.dk og har streamet online casino i over 3 år. Med sin rolige og afslappede stil bidrager han til community, indhold og udvikling af platformen.",
    socials: [
      { href: "https://www.twitch.tv/kevinsylence", label: "Twitch" },
      { href: "https://www.youtube.com/@KevinSylence", label: "YouTube" },
      { href: "https://www.instagram.com/kevinsylence/", label: "Instagram" },
      { href: "https://www.linkedin.com/in/kevin-s%C3%B8rensen-76308819b/", label: "LinkedIn" },
      { href: "https://x.com/KevinSylence", label: "X" },
    ],
  },
  ajse: {
    name: "Ajse",
    image: ajseImage,
    alt: "Ajse – Juridisk redaktør hos Casinoaftaler.dk",
    link: "/forfatter/ajse",
    badge: "Juridisk redaktør & casinoanalytiker",
    role: "Juridisk redaktør hos Casinoaftaler.dk",
    bio: "Ajse er juridisk redaktør hos Casinoaftaler.dk med særligt fokus på dansk spillelovgivning, regulering og ansvarligt spil. Hun kombinerer sit jurastudie med daglig analyse af den danske casinobranche.",
    socials: [
      { href: "https://www.linkedin.com/in/ajse-serifovski-587b25278/", label: "LinkedIn" },
      { href: "https://www.instagram.com/serifoaaa/", label: "Instagram" },
    ],
  },
  niklas: {
    name: "Niklas",
    image: niklasImage,
    alt: "Niklas – Finansøkonom & forsikringsekspert hos Casinoaftaler.dk",
    link: "/forfatter/niklas",
    badge: "Finansøkonom & forsikringsekspert",
    role: "Finansøkonom & forsikringsekspert hos Casinoaftaler.dk",
    bio: "Niklas er finansøkonom og forsikringsekspert hos Casinoaftaler.dk med fokus på bonusøkonomi, EV-analyse, casino og skat samt finansiel risikostyring.",
    socials: [
      { href: "https://www.linkedin.com/in/niclas-finscet-hansen/", label: "LinkedIn" },
    ],
  },
  frederik: {
    name: "Frederik",
    image: frederikImage,
    alt: "Frederik Merkel – Streamer hos Casinoaftaler.dk",
    link: "/forfatter/frederik",
    badge: "Casino-streamer & bonustester",
    role: "Fast streamer hos Casinoaftaler.dk",
    bio: "Frederik er fast streamer hos Casinoaftaler.dk med fokus på test af casino bonusser og underholdende live gameplay. Hans energiske streamingstil og smittende humør gør ham til en favorit i community'et.",
    socials: [
      { href: "https://www.youtube.com/@MerkelSpins", label: "YouTube" },
      { href: "https://www.twitch.tv/fedesvinsejer", label: "Twitch" },
      { href: "https://www.instagram.com/frederikmerkel/", label: "Instagram" },
      { href: "https://www.linkedin.com/in/frederik-merkel-a64481345", label: "LinkedIn" },
      { href: "https://x.com/frederikmerkelj", label: "X" },
    ],
  },
} as const;

export function AuthorBio({ author = "jonas", showCommunity = true }: AuthorBioProps) {
  const data = authorData[author];

  return (
    <>
      {showCommunity && <CommunityPromoSection />}
      <section className="my-10" aria-label="Om forfatteren">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:text-left">
            {/* Profile image */}
            <Link to={data.link} className="shrink-0 group" aria-label={`Se ${data.name}' forfatterprofil`}>
              <img
                src={data.image}
                alt={data.alt}
                className="h-44 w-44 rounded-full object-cover object-top ring-2 ring-border group-hover:ring-primary transition-colors"
                loading="lazy"
                fetchPriority="low"
                width={176}
                height={176}
              />
            </Link>

            {/* Text content */}
            <div className="flex-1 space-y-3">
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Link
                    to={data.link}
                    className="text-lg font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {data.name}
                  </Link>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {data.badge}
                  </span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {data.role}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {data.bio}
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <GpwaShield className="h-3 w-3 text-primary" />
                Casinoaftaler.dk er en{" "}
                <a
                  href="https://certify.gpwa.org/verify/casinoaftaler.dk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80"
                >
                  GPWA-godkendt
                </a>{" "}
                affiliate platform.{" "}
                <Link to="/om" className="text-primary underline hover:text-primary/80">
                  Læs mere
                </Link>
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button asChild variant="outline" size="sm">
                  <Link to={data.link}>Se fuld profil</Link>
                </Button>
                {data.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <SourceCitations />
      </section>
    </>
  );
}
