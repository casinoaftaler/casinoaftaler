import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

const providerRoutes: Record<string, string> = {
  "NetEnt": "/spiludviklere/netent",
  "Pragmatic Play": "/spiludviklere/pragmatic-play",
  "Evolution Gaming": "/spiludviklere/evolution-gaming",
  "Relax Gaming": "/spiludviklere/relax-gaming",
  "Play'n GO": "/spiludviklere/play-n-go",
  "Hacksaw Gaming": "/spiludviklere/hacksaw-gaming",
  "Nolimit City": "/spiludviklere/nolimit-city",
  "ELK Studios": "/spiludviklere/elk-studios",
  "Yggdrasil": "/spiludviklere/yggdrasil",
  "Microgaming": "/spiludviklere/microgaming",
  "Red Tiger": "/spiludviklere/red-tiger",
  "Big Time Gaming": "/spiludviklere/big-time-gaming",
};

interface QuickFactsProvidersProps {
  providers: string[];
  logoUrl?: string | null;
  casinoName?: string;
}

export function QuickFactsProviders({ providers, logoUrl, casinoName }: QuickFactsProvidersProps) {
  if (!providers.length) return null;

  return (
    <div className="mt-4 rounded-lg border border-border p-3">
      <p className="text-xs text-muted-foreground uppercase mb-2 flex items-center justify-center gap-1.5">
        <Gamepad2 className="h-3.5 w-3.5" />
        Spiludbydere
      </p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {providers.map((name) => {
          const route = providerRoutes[name];
          if (route) {
            return (
              <Link
                key={name}
                to={route}
                className="inline-block rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {name}
              </Link>
            );
          }
          return (
            <span
              key={name}
              className="inline-block rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

interface QuickFactsLogoProps {
  logoUrl?: string | null;
  casinoName?: string;
}

export function QuickFactsLogo({ logoUrl, casinoName }: QuickFactsLogoProps) {
  if (!logoUrl) return null;

  return (
    <img
      src={logoUrl}
      alt={casinoName ? `${casinoName} logo` : "Casino logo"}
      className="h-10 w-auto object-contain md:h-12"
    />
  );
}
