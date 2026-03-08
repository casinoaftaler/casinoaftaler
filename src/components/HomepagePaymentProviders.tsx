import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Gamepad2 } from "lucide-react";

export function HomepagePaymentSection() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder på Danske Online Casinoer</h2>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Valget af betalingsmetode påvirker din samlede oplevelse på et online casino. Hurtige ind- og udbetalinger er afgørende, og i 2026 har danske spillere adgang til et bredt udvalg af sikre løsninger. Vi har testet og gennemgået alle de mest populære metoder i vores{" "}
        <Link to="/betalingsmetoder" className="text-primary hover:underline font-medium">komplette guide til betalingsmetoder</Link>.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {[
          { name: "MobilePay", to: "/betalingsmetoder/mobilepay" },
          { name: "Trustly", to: "/betalingsmetoder/trustly" },
          { name: "Visa/Mastercard", to: "/betalingsmetoder/visa-mastercard" },
          { name: "Apple Pay", to: "/betalingsmetoder/apple-pay" },
          { name: "PayPal", to: "/betalingsmetoder/paypal" },
          { name: "Skrill", to: "/betalingsmetoder/skrill" },
          { name: "Revolut", to: "/betalingsmetoder/revolut" },
          { name: "Paysafecard", to: "/betalingsmetoder/paysafecard" },
          { name: "Zimpler", to: "/betalingsmetoder/zimpler" },
          { name: "Bankoverførsel", to: "/betalingsmetoder/bankoverforsler" },
        ].map((pm) => (
          <Link
            key={pm.name}
            to={pm.to}
            className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            <CreditCard className="h-4 w-4 text-primary flex-shrink-0" />
            {pm.name}
          </Link>
        ))}
      </div>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        De fleste online casinoer tilbyder øjeblikkelige indbetalinger, men udbetalingstider varierer afhængigt af metode. E-wallets som{" "}
        <Link to="/betalingsmetoder/skrill" className="text-primary hover:underline font-medium">Skrill</Link>
        {" "}og{" "}
        <Link to="/betalingsmetoder/paypal" className="text-primary hover:underline font-medium">PayPal</Link>
        {" "}tilbyder typisk de hurtigste udbetalinger (0-24 timer), mens{" "}
        <Link to="/betalingsmetoder/bankoverforsler" className="text-primary hover:underline font-medium">bankoverførsler</Link>
        {" "}kan tage 1-3 hverdage.
      </p>
    </section>
  );
}

export function HomepageProviderSection() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-3xl font-bold">Spiludviklere bag Online Casino-spil</h2>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Kvaliteten af dit online casino afhænger i høj grad af de{" "}
        <Link to="/spiludviklere" className="text-primary hover:underline font-medium">spiludviklere</Link>
        , der står bag spillene. Anerkendte udviklere garanterer fair gameplay med certificerede RNG-systemer, høj grafisk kvalitet og innovative mekanikker.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {[
          { name: "NetEnt", to: "/spiludviklere/netent" },
          { name: "Pragmatic Play", to: "/spiludviklere/pragmatic-play" },
          { name: "Play'n GO", to: "/spiludviklere/play-n-go" },
          { name: "Evolution Gaming", to: "/spiludviklere/evolution-gaming" },
          { name: "Hacksaw Gaming", to: "/spiludviklere/hacksaw-gaming" },
          { name: "Nolimit City", to: "/spiludviklere/nolimit-city" },
          { name: "Relax Gaming", to: "/spiludviklere/relax-gaming" },
          { name: "Big Time Gaming", to: "/spiludviklere/big-time-gaming" },
          { name: "Red Tiger", to: "/spiludviklere/red-tiger" },
          { name: "ELK Studios", to: "/spiludviklere/elk-studios" },
          { name: "Yggdrasil", to: "/spiludviklere/yggdrasil" },
          { name: "Microgaming", to: "/spiludviklere/microgaming" },
        ].map((provider) => (
          <Link
            key={provider.name}
            to={provider.to}
            className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            <Gamepad2 className="h-4 w-4 text-primary flex-shrink-0" />
            {provider.name}
          </Link>
        ))}
      </div>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        Når du vælger et online casino, bør du altid tjekke, hvilke udviklere der er repræsenteret. Et bredt udvalg sikrer adgang til mange spiltyper, temaer og volatilitetsniveauer. Læs mere i vores{" "}
        <Link to="/spiludviklere" className="text-primary hover:underline font-medium">komplette guide til spiludviklere</Link>.
      </p>
    </section>
  );
}
