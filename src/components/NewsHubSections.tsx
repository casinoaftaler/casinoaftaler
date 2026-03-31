import { Link } from "react-router-dom";

/**
 * Evergreen structured content sections for the /casino-nyheder hub page.
 * Each section has 150-250 words of unique text with strategic internal links.
 */
export function NewsHubSections() {
  return (
    <div className="grid gap-8 md:grid-cols-2 mb-12">
      {/* Regulering */}
      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-bold mb-3">Regulering i Danmark 2026</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
          <p>
            Det danske spillemarked er blandt de strengest regulerede i Europa. <Link to="/spillemyndigheden" className="text-primary hover:underline">Spillemyndigheden</Link> fører 
            løbende tilsyn med alle licenserede operatører og stiller krav til alt fra bonusvilkår til hvidvaskforebyggelse. I 2026 ser vi 
            skærpede regler for markedsføring af gambling og strengere krav til KYC-procedurer (Know Your Customer).
          </p>
          <p>
            For danske spillere betyder dette højere sikkerhed og mere gennemsigtige vilkår. Nye operatører skal opfylde omfattende 
            dokumentationskrav for at opnå <Link to="/casino-licenser" className="text-primary hover:underline">dansk licens</Link>, mens eksisterende 
            licenshavere løbende evalueres. Vi analyserer hver reguleringsændring og vurderer, hvad den konkret betyder for din spiloplevelse 
            på <Link to="/casino-anmeldelser" className="text-primary hover:underline">danske online casinoer</Link>.
          </p>
        </div>
      </section>

      {/* Nye casino-lanceringer */}
      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-bold mb-3">Nye Casino-lanceringer</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
          <p>
            Det danske marked tiltrækker fortsat nye operatører, der ønsker at etablere sig under Spillemyndighedens licenssystem. 
            Hver ny lancering bringer typisk konkurrencedygtige <Link to="/casino-bonus" className="text-primary hover:underline">velkomstbonusser</Link> og 
            moderne spiludvalg – men kvaliteten varierer markant mellem operatørerne.
          </p>
          <p>
            Vores nyhedsdækning vurderer hver ny lancering objektivt: licensstatus, bonusvilkår, <Link to="/betalingsmetoder" className="text-primary hover:underline">betalingsmuligheder</Link> og 
            spiludvalg. Vi sammenligner systematisk med etablerede operatører, så du kan afgøre om et <Link to="/nye-casinoer" className="text-primary hover:underline">nyt casino</Link> reelt 
            tilbyder en bedre oplevelse end det eksisterende marked. Fokus er altid på konkrete data frem for markedsføringspåstande.
          </p>
        </div>
      </section>

      {/* Betalingstrends */}
      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-bold mb-3">Betalingstrends</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
          <p>
            Betalingslandskabet på danske casinoer udvikler sig hurtigt. Open banking-løsninger som <Link to="/betalingsmetoder/trustly" className="text-primary hover:underline">Trustly</Link> vinder 
            frem, mens <Link to="/betalingsmetoder/mobilepay" className="text-primary hover:underline">MobilePay</Link> fortsat er danskernes foretrukne 
            mobilbetalingsløsning til casino-indbetalinger.
          </p>
          <p>
            Vi dækker nye partnerskaber mellem casinoer og betalingsudbydere, ændringer i udbetalingstider og de seneste fintech-innovationer 
            der påvirker din mulighed for hurtige og sikre transaktioner. Trends som instant withdrawals og biometrisk autentificering via 
            <Link to="/betalingsmetoder/apple-pay" className="text-primary hover:underline">Apple Pay</Link> sætter nye standarder for 
            <Link to="/hurtig-udbetaling" className="text-primary hover:underline"> hurtige udbetalinger</Link> på det danske marked.
          </p>
        </div>
      </section>

      {/* Markedsudvikling */}
      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-bold mb-3">Markedsudvikling</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
          <p>
            Den danske iGaming-branche gennemgår betydelige strukturelle forandringer. Fusioner og opkøb mellem store operatører påvirker 
            spiludvalg og bonusvilkår, mens nye spiludbydere som <Link to="/spiludviklere/hacksaw-gaming" className="text-primary hover:underline">Hacksaw Gaming</Link> og 
            <Link to="/spiludviklere/nolimit-city" className="text-primary hover:underline"> Nolimit City</Link> udfordrer etablerede udviklere.
          </p>
          <p>
            Vores markedsanalyser fokuserer på de kommercielle kræfter der former dit casinovalg: priskonkurrence på bonusser, 
            teknologiske fremskridt inden for <Link to="/live-casino" className="text-primary hover:underline">live casino</Link> og den stigende 
            betydning af <Link to="/ansvarligt-spil" className="text-primary hover:underline">ansvarligt spil</Link>-værktøjer. Vi oversætter 
            branchedata til konkrete anbefalinger, så du altid træffer informerede valg.
          </p>
        </div>
      </section>
    </div>
  );
}
