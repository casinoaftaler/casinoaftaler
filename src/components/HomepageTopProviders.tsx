import { Link } from "react-router-dom";

/* ─── Logo imports (Vite static) ─── */
const providerLogos = import.meta.glob<{ default: string }>(
  "/src/assets/providers/*.{webp,png,jpg}",
  { eager: true }
);

const PROVIDERS = [
  { name: "Pragmatic Play", slug: "pragmatic-play", logo: "/src/assets/providers/pragmatic-play.webp" },
  { name: "NetEnt", slug: "netent", logo: "/src/assets/providers/netent.webp" },
  { name: "Play'n GO", slug: "play-n-go", logo: "/src/assets/providers/play-n-go.webp" },
  { name: "Hacksaw Gaming", slug: "hacksaw-gaming", logo: "/src/assets/providers/hacksaw-gaming.webp" },
  { name: "Big Time Gaming", slug: "big-time-gaming", logo: "/src/assets/providers/big-time-gaming.webp" },
  { name: "Microgaming", slug: "microgaming", logo: "/src/assets/providers/microgaming.webp" },
  { name: "Nolimit City", slug: "nolimit-city", logo: "/src/assets/providers/nolimit-city.webp" },
  { name: "Evolution Gaming", slug: "evolution-gaming", logo: "/src/assets/providers/evolution-gaming.webp" },
  { name: "ELK Studios", slug: "elk-studios", logo: "/src/assets/providers/elk-studios.webp" },
  { name: "Yggdrasil", slug: "yggdrasil", logo: "/src/assets/providers/yggdrasil.webp" },
  { name: "Relax Gaming", slug: "relax-gaming", logo: "/src/assets/providers/relax-gaming.webp" },
  { name: "Red Tiger", slug: "red-tiger", logo: "/src/assets/providers/red-tiger.webp" },
  { name: "IGT", slug: "igt" },
] as const;

export function HomepageTopProviders() {
  return (
    <section className="container py-8 md:py-12">
      <h2 className="mb-2 text-2xl font-bold flex items-center gap-2">
        <span aria-hidden="true">⚙️</span>
        Top Slot Udviklere
      </h2>
      <p className="mb-6 text-muted-foreground">
        Udforsk spillemaskiner fra de mest populære spiludviklere – hver med unikke funktioner, RTP og volatilitet.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {PROVIDERS.map((provider) => {
          const logoSrc = 'logo' in provider ? providerLogos[provider.logo]?.default : undefined;
          return (
            <Link
              key={provider.slug}
              to={`/spillemaskiner/${provider.slug}`}
              className="group relative flex items-center justify-center rounded-xl border border-border bg-card p-4 h-16 transition-all duration-150 hover:border-primary/40 hover:bg-accent/30 hover:shadow-[0_0_16px_-4px_hsl(var(--primary)/0.3)]"
            >
              {logoSrc ? (
                <>
                  <img
                    src={logoSrc}
                    alt={provider.name}
                    className="h-10 max-w-[85%] object-contain"
                    loading="lazy"
                  />
                  <span className="absolute inset-x-0 -bottom-0.5 text-center text-[10px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity truncate px-1">
                    {provider.name}
                  </span>
                </>
              ) : (
                <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                  {provider.name}
                </p>
              )}
            </Link>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <Link
          to="/casinospil/spillemaskiner"
          className="text-sm text-primary hover:underline font-medium"
        >
          Se alle spiludviklere →
        </Link>
      </div>

      <noscript>
        <ul>
          {PROVIDERS.map((provider) => (
            <li key={provider.slug}>
              <a href={`/spillemaskiner/${provider.slug}`}>{provider.name}</a>
            </li>
          ))}
        </ul>
      </noscript>
    </section>
  );
}
