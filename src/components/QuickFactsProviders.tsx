import { Gamepad2 } from "lucide-react";

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
        {providers.map((name) => (
          <span
            key={name}
            className="inline-block rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
          >
            {name}
          </span>
        ))}
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
