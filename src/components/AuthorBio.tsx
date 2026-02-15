import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import jonasImage from "@/assets/jonas-forfatter.png";

export function AuthorBio() {
  return (
    <section className="my-10" aria-label="Om forfatteren">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
          {/* Profile image */}
          <Link to="/forfatter" className="shrink-0 group" aria-label="Se Jonas' forfatterprofil">
            <img
              src={jonasImage}
              alt="Jonas – Grundlægger af Casinoaftaler.dk"
              className="h-56 w-56 rounded-full object-cover object-top ring-2 ring-border group-hover:ring-primary transition-colors"
              loading="lazy"
              width={224}
              height={224}
            />
          </Link>

          {/* Text content */}
          <div className="flex-1 space-y-2">
            <div>
              <Link
                to="/forfatter"
                className="text-lg font-bold text-foreground hover:text-primary transition-colors"
              >
                Jonas
              </Link>
              <p className="text-sm font-medium text-muted-foreground">
                Grundlægger af Casinoaftaler.dk &amp; Casino-streamer
              </p>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Jonas er grundlægger af Casinoaftaler.dk og har streamet online casino i over 4 år.
              Med daglig erfaring fra slots og live casino deler han ærlige anmeldelser og opdateret
              viden om det danske casinomarked.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button asChild variant="outline" size="sm">
                <Link to="/forfatter">Se fuld profil</Link>
              </Button>
              <a
                href="https://www.twitch.tv/fedesvinsejer"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                Twitch
              </a>
              <a
                href="https://www.instagram.com/jonastheill"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/jonas.theill/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
