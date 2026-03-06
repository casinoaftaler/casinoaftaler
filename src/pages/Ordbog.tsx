import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { FAQSection } from "@/components/FAQSection";
import { buildArticleSchema, SITE_URL } from "@/lib/seo";
import { glossaryTerms, getTermsByLetter, getGlossaryLetters } from "@/data/glossaryTerms";
import { Search, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ordbogHero from "@/assets/heroes/ordbog-hero.jpg";

const ORDBOG_FAQS = [
  { question: "Hvad er en casino ordbog?", answer: "En casino ordbog er en samling af definitioner og forklaringer af de mest almindelige begreber inden for online casino, spillemaskiner og bonusser." },
  { question: "Hvad er den vigtigste term at kende?", answer: "RTP (Return to Player) er nok den vigtigste. Den fortæller dig den langsigtede tilbagebetalingsprocent. Jo højere RTP, desto bedre statistisk chance." },
  { question: "Hvad er forskellen på RTP og volatilitet?", answer: "RTP angiver den langsigtede tilbagebetalingsprocent, mens volatilitet beskriver hvordan gevinsterne fordeler sig — hyppige små gevinster (lav) vs. sjældne store gevinster (høj)." },
  { question: "Hvad betyder wagering?", answer: "Wagering (omsætningskrav) er det antal gange, du skal omsætte en bonus, før du kan udbetale. F.eks. 30x wagering på 100 kr. = 3.000 kr. i omsætning." },
];

const definedTermSetSchema = {
  "@type": "DefinedTermSet",
  "@id": `${SITE_URL}/ordbog#termset`,
  name: "Casino Ordbog",
  description: "Komplet ordbog over casinobegreber: RTP, wagering, volatilitet, free spins og mere.",
  url: `${SITE_URL}/ordbog`,
  hasDefinedTerm: glossaryTerms.map((t) => ({
    "@type": "DefinedTerm",
    "@id": `${SITE_URL}/ordbog/${t.slug}#term`,
    name: t.title,
    description: t.shortDefinition,
    url: `${SITE_URL}/ordbog/${t.slug}`,
  })),
};

const articleSchema = buildArticleSchema({
  headline: "Casino Ordbog – Alle Vigtige Casino-begreber",
  description: "Komplet ordbog over casinobegreber med 15 definitioner.",
  url: `${SITE_URL}/ordbog`,
  datePublished: "2026-03-06",
  dateModified: "2026-03-06",
});

const Ordbog = () => {
  const { pathname } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const termsByLetter = useMemo(() => getTermsByLetter(), []);
  const allLetters = useMemo(() => getGlossaryLetters(), []);

  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return glossaryTerms.filter(
      (t) => t.title.toLowerCase().includes(q) || t.shortDefinition.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <>
      <SEO
        title="Casino Ordbog – Alle Casino-begreber"
        description="Komplet casino ordbog med forklaringer af RTP, wagering, volatilitet, free spins, house edge og 10+ andre vigtige begreber. Alt forklaret på dansk."
        jsonLd={[articleSchema, definedTermSetSchema] as Record<string, unknown>[]}
      />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${ordbogHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              {glossaryTerms.length} begreber
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casino Ordbog
            </h1>
            <p className="text-lg text-white/80">
              Din komplette guide til alle vigtige casino-begreber. Fra RTP og volatilitet til wagering og free spins — vi forklarer hvert begreb på dansk med konkrete eksempler.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="8 min" />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={ordbogHero}
            alt="Casino ordbog – opslagsbog med terninger, chips og spillekort på et mørkt bord med lilla og teal belysning"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Søg i ordbogen (f.eks. RTP, wagering)..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 mb-8 text-sm text-muted-foreground">
          <Badge variant="secondary">{glossaryTerms.length} begreber</Badge>
          <span>Opdateret løbende</span>
        </div>

        {!filteredTerms && (
          <nav className="flex flex-wrap gap-2 mb-8" aria-label="Alfabetisk navigation">
            {allLetters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-card border border-border text-sm font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {letter}
              </a>
            ))}
          </nav>
        )}

        {filteredTerms && (
          <div className="space-y-4 mb-12">
            <p className="text-sm text-muted-foreground">
              {filteredTerms.length} resultat{filteredTerms.length !== 1 ? "er" : ""} for &quot;{searchQuery}&quot;
            </p>
            {filteredTerms.length === 0 && (
              <p className="text-muted-foreground py-8 text-center">Ingen begreber matchede din søgning.</p>
            )}
            {filteredTerms.map((term) => (
              <TermCard key={term.slug} term={term} />
            ))}
          </div>
        )}

        {!filteredTerms && (
          <div className="space-y-10 mb-12">
            {allLetters.map((letter) => (
              <section key={letter} id={`letter-${letter}`}>
                <h2 className="text-2xl font-bold text-primary mb-4 border-b border-border pb-2">{letter}</h2>
                <div className="space-y-4">
                  {termsByLetter[letter]?.map((term) => (
                    <TermCard key={term.slug} term={term} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <FAQSection title="Ofte Stillede Spørgsmål om Casino-begreber" faqs={ORDBOG_FAQS} />
        <RelatedGuides currentPath={pathname} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

function TermCard({ term }: { term: { slug: string; title: string; shortDefinition: string; category?: string } }) {
  return (
    <Card className="group hover:border-primary/50 transition-colors">
      <CardContent className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Link to={`/ordbog/${term.slug}`} className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {term.title}
              </Link>
              {term.category && <Badge variant="outline" className="text-xs shrink-0">{term.category}</Badge>}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{term.shortDefinition}</p>
          </div>
          <Link to={`/ordbog/${term.slug}`} className="shrink-0 mt-1 text-muted-foreground group-hover:text-primary transition-colors" aria-label={`Læs mere om ${term.title}`}>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default Ordbog;
