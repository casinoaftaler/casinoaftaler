import { ShieldCheck, ExternalLink } from "lucide-react";

/**
 * Displays regulatory source citations for E-E-A-T trust signals.
 * Automatically included via AuthorBio on all content pages.
 */
export function SourceCitations() {
  return (
    <aside
      className="mt-6 rounded-lg border border-border bg-muted/30 p-4 md:p-5"
      aria-label="Kilder og regulering"
    >
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
        <h3 className="text-sm font-semibold text-foreground">
          Kilder &amp; Regulering
        </h3>
      </div>
      <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
        <li className="flex items-start gap-2">
          <ExternalLink className="h-3 w-3 mt-0.5 shrink-0" />
          <span>
            Licensoplysninger verificeret via{" "}
            <a
              href="https://www.spillemyndigheden.dk/tilladelser/tilladelsesindehavere"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
            >
              Spillemyndigheden – Tilladelsesindehavere
            </a>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <ExternalLink className="h-3 w-3 mt-0.5 shrink-0" />
          <span>
            Bonusregler reguleres af{" "}
            <a
              href="https://www.spillemyndigheden.dk/"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
            >
              Spillemyndigheden
            </a>{" "}
            i henhold til gældende bekendtgørelse om onlinekasino (BEK nr. 1494) – maks. 1.000 kr. bonus, 10x omsætningskrav
          </span>
        </li>
        <li className="flex items-start gap-2">
          <ExternalLink className="h-3 w-3 mt-0.5 shrink-0" />
          <span>
            RTP- og volatilitetsdata hentet fra spiludviklernes officielle specifikationer og{" "}
            <a
              href="https://www.spillemyndigheden.dk/"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
            >
              Spillemyndigheden.dk
            </a>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <ExternalLink className="h-3 w-3 mt-0.5 shrink-0" />
          <span>
            Ansvarligt spil-information fra{" "}
            <a
              href="https://www.stopspillet.dk/"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
            >
              StopSpillet.dk
            </a>{" "}
            (national hjælpelinje: 70 22 28 25)
          </span>
        </li>
      </ul>
      <p className="mt-3 text-[11px] text-muted-foreground/70">
        Alle anbefalinger på Casinoaftaler.dk omhandler udelukkende casinoer med gyldig dansk spillelicens.
        Indholdet er uafhængigt redaktionelt produceret.
      </p>
    </aside>
  );
}
