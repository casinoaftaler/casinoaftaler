import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { FAQSection } from "@/components/FAQSection";
import { buildArticleSchema, SITE_URL } from "@/lib/seo";
import { glossaryTerms, getTermsByLetter, getGlossaryLetters } from "@/data/glossaryTerms";
import { Search, BookOpen, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
      <article className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="8 min" />
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Casino Ordbog</h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Din komplette guide til alle vigtige casino-begreber. Fra RTP og volatilitet til wagering og free spins — vi forklarer hvert begreb på dansk med konkrete eksempler.
          </p>
        </header>

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
      </article>
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
