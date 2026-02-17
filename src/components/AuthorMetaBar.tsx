import { Link } from "react-router-dom";
import { CalendarDays, BookOpen, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import jonasImage from "@/assets/jonas-forfatter.png";
import kevinImage from "@/assets/kevin-forfatter.png";

const authorConfig = {
  jonas: { name: "Jonas", image: jonasImage, alt: "Jonas – Fedesvinsejer", link: "/forfatter/jonas" },
  kevin: { name: "Kevin", image: kevinImage, alt: "Kevin – Casino-streamer", link: "/forfatter/kevin" },
} as const;

interface AuthorMetaBarProps {
  author: "jonas" | "kevin" | "redaktionen";
  date: string;
  readTime: string;
  showFactCheck?: boolean;
  showVerified?: boolean;
  showAffiliateDisclaimer?: boolean;
}

export function AuthorMetaBar({ author, date, readTime, showFactCheck = true, showVerified = false, showAffiliateDisclaimer = true }: AuthorMetaBarProps) {
  const authorInfo = author !== "redaktionen" ? authorConfig[author] : null;

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-y-3 text-sm text-muted-foreground">
        {/* Left side: author + date + read time */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <span>Skrevet af:</span>
            {authorInfo ? (
              <Link to={authorInfo.link} className="flex items-center gap-1.5 group">
                <img
                  src={authorInfo.image}
                  alt={authorInfo.alt}
                  className="h-6 w-6 rounded-full object-cover object-top ring-1 ring-border group-hover:ring-primary transition-colors"
                />
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {authorInfo.name}
                </span>
              </Link>
            ) : (
              <span className="font-medium text-foreground">Casinoaftaler Redaktionen</span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>
              Opdateret: <span className="font-medium text-foreground">{date}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>
              Læsetid: <span className="font-medium text-foreground">{readTime}</span>
            </span>
          </div>
          {showVerified && (
            <div className="flex items-center gap-1.5 opacity-85">
              <CheckCircle className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm text-muted-foreground">Verificeret ekspertprofil</span>
            </div>
          )}
        </div>

        {/* Right side: fact-check badge */}
        {showFactCheck && (
          <div className="flex items-center gap-2">
            <Badge className="bg-green-600 hover:bg-green-700 text-white gap-1">
              <CheckCircle className="h-3.5 w-3.5" />
              Faktatjekket
            </Badge>
            {author === "jonas" ? (
              <Link to="/forfatter/kevin" className="flex items-center gap-1.5 group">
                <span>Af:</span>
                <img
                  src={kevinImage}
                  alt="Kevin – Casino-streamer & IT Medansvarlig"
                  className="h-6 w-6 rounded-full object-cover object-top ring-1 ring-border group-hover:ring-primary transition-colors"
                />
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  Kevin
                </span>
              </Link>
            ) : author === "kevin" || author === "redaktionen" ? (
              <Link to="/forfatter/jonas" className="flex items-center gap-1.5 group">
                <span>Af:</span>
                <img
                  src={jonasImage}
                  alt="Jonas – Fedesvinsejer"
                  className="h-6 w-6 rounded-full object-cover object-top ring-1 ring-border group-hover:ring-primary transition-colors"
                />
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  Jonas
                </span>
              </Link>
            ) : null}
          </div>
        )}
      </div>
      {showAffiliateDisclaimer && (
        <p className="mb-8 text-xs text-muted-foreground italic">
          Denne side indeholder affiliate-links. Vi modtager provision, hvis du opretter en konto via vores links – det påvirker ikke vores vurdering.{" "}
          <Link to="/forretningsmodel" className="underline hover:text-primary">Læs mere</Link>.
        </p>
      )}
      {!showAffiliateDisclaimer && <div className="mb-6" />}
    </>
  );
}
