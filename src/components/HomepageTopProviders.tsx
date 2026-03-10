import { Link } from "react-router-dom";
import { Cpu } from "lucide-react";

const PROVIDERS = [
  { name: "Pragmatic Play", slug: "pragmatic-play" },
  { name: "NetEnt", slug: "netent" },
  { name: "Play'n GO", slug: "play-n-go" },
  { name: "Hacksaw Gaming", slug: "hacksaw-gaming" },
  { name: "Big Time Gaming", slug: "big-time-gaming" },
  { name: "Microgaming", slug: "microgaming" },
  { name: "Nolimit City", slug: "nolimit-city" },
  { name: "Evolution Gaming", slug: "evolution-gaming" },
  { name: "ELK Studios", slug: "elk-studios" },
  { name: "Yggdrasil", slug: "yggdrasil" },
  { name: "Relax Gaming", slug: "relax-gaming" },
  { name: "Red Tiger", slug: "red-tiger" },
  { name: "IGT", slug: "igt" },
] as const;

export function HomepageTopProviders() {
  return (
    <section className="container py-8 md:py-12">
      <h2 className="mb-2 text-2xl font-bold flex items-center gap-2">
        <Cpu className="h-6 w-6 text-primary" />
        Top Slot Udviklere
      </h2>
      <p className="mb-6 text-muted-foreground">
        Udforsk spillemaskiner fra de mest populære spiludviklere – hver med unikke funktioner, RTP og volatilitet.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {PROVIDERS.map((provider) => (
          <Link
            key={provider.slug}
            to={`/spillemaskiner/${provider.slug}`}
            className="group rounded-xl border border-border bg-card p-4 text-center transition-colors hover:border-primary/40 hover:bg-accent/30"
          >
            <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
              {provider.name}
            </p>
          </Link>
        ))}
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
