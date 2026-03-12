import { Gamepad2, ShieldCheck, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { PROVIDER_HUB_SLUGS } from "@/lib/providerHubContent";

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
  "Yggdrasil Gaming": "/spiludviklere/yggdrasil",
  "Microgaming": "/spiludviklere/microgaming",
  "Red Tiger": "/spiludviklere/red-tiger",
  "Red Tiger Gaming": "/spiludviklere/red-tiger",
  "Big Time Gaming": "/spiludviklere/big-time-gaming",
};

/** Maps provider display names to their /spillemaskiner/ hub slugs */
const providerHubSlugs: Record<string, string> = {
  "NetEnt": "netent",
  "Pragmatic Play": "pragmatic-play",
  "Evolution Gaming": "evolution-gaming",
  "Relax Gaming": "relax-gaming",
  "Play'n GO": "play-n-go",
  "Hacksaw Gaming": "hacksaw-gaming",
  "Nolimit City": "nolimit-city",
  "ELK Studios": "elk-studios",
  "Yggdrasil": "yggdrasil",
  "Microgaming": "microgaming",
  "Red Tiger": "red-tiger",
  "Big Time Gaming": "big-time-gaming",
  "IGT": "igt",
};

interface QuickFactsProvidersProps {
  providers: string[];
  logoUrl?: string | null;
  casinoName?: string;
}

export function QuickFactsProviders({ providers }: QuickFactsProvidersProps) {
  if (!providers.length) return null;

  // Find providers that have a /spillemaskiner/ hub page
  const hubProviders = providers
    .map((name) => ({ name, slug: providerHubSlugs[name] }))
    .filter((p) => p.slug && PROVIDER_HUB_SLUGS.includes(p.slug));

  return (
    <>
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

      {/* Provider data hub links → /spillemaskiner/ */}
      {hubProviders.length > 0 && (
        <div className="mt-2 rounded-lg border border-border p-3">
          <p className="text-xs text-muted-foreground uppercase mb-2 flex items-center justify-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5" />
            Slot-kataloger
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {hubProviders.slice(0, 4).map(({ name, slug }) => (
              <Link
                key={slug}
                to={`/spillemaskiner/${slug}`}
                className="inline-block rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {name} Slots
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

interface QuickFactsLicenseProps {
  licenseId: string;
  authority?: string;
}

export function QuickFactsLicense({ licenseId, authority = "Spillemyndigheden" }: QuickFactsLicenseProps) {
  return (
    <div className="mt-4 rounded-lg border border-border p-3">
      <p className="text-xs text-muted-foreground uppercase mb-2 flex items-center justify-center gap-1.5">
        <ShieldCheck className="h-3.5 w-3.5" />
        Licensverifikation
      </p>
      <div className="flex items-center justify-center gap-2 text-sm">
        <span className="font-medium text-foreground">Dansk licens #{licenseId}</span>
        <span className="text-muted-foreground">–</span>
        <a
          href="https://www.spillemyndigheden.dk/tilladelsesindehavere"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary underline hover:text-primary/80 text-xs"
        >
          Verificér hos {authority} →
        </a>
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
