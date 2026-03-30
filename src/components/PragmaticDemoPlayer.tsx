import { useState } from "react";
import { Play, Maximize2, Minimize2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PragmaticDemoPlayerProps {
  gameId: string;
  slotName: string;
  /** Compact mode hides some chrome for embed contexts */
  compact?: boolean;
}

const DEMO_BASE_URL = "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do";

function buildDemoUrl(gameId: string): string {
  const params = new URLSearchParams({
    lang: "da",
    cur: "DKK",
    gameSymbol: gameId,
    jurisdiction: "99",
    lobbyUrl: window.location.origin,
  });
  return `${DEMO_BASE_URL}?${params.toString()}`;
}

export function PragmaticDemoPlayer({ gameId, slotName, compact = false }: PragmaticDemoPlayerProps) {
  const [loaded, setLoaded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  if (!gameId) return null;

  const containerClass = fullscreen
    ? "fixed inset-0 z-50 bg-background flex flex-col"
    : "";

  return (
    <div className={containerClass}>
      <Card className={`overflow-hidden ${fullscreen ? "rounded-none border-0 flex-1 flex flex-col" : ""}`}>
        {!compact && (
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              Prøv {slotName} Gratis
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">Demo</Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFullscreen(!fullscreen)}
                className="h-8 w-8"
              >
                {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
        )}
        <CardContent className={`p-0 ${fullscreen ? "flex-1" : ""}`}>
          {!loaded && !error && (
            <div className="flex flex-col items-center justify-center py-16 gap-4 bg-muted/30">
              <Play className="h-12 w-12 text-primary" />
              <p className="text-muted-foreground text-sm">Klar til at indlæse demo...</p>
              <Button onClick={() => setLoaded(true)} variant="cta" size="lg">
                Start Gratis Demo
              </Button>
              <p className="text-xs text-muted-foreground max-w-md text-center">
                Spil med fiktive penge – ingen registrering krævet. Demo leveret af Pragmatic Play.
              </p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 bg-muted/30">
              <AlertTriangle className="h-10 w-10 text-destructive" />
              <p className="text-muted-foreground text-sm">Demoen kunne ikke indlæses</p>
              <Button onClick={() => { setError(false); setLoaded(true); }} variant="outline" size="sm">
                Prøv igen
              </Button>
            </div>
          )}

          {loaded && !error && (
            <div className={`relative w-full ${fullscreen ? "h-full" : ""}`} style={fullscreen ? undefined : { paddingBottom: "56.25%" }}>
              <iframe
                src={buildDemoUrl(gameId)}
                title={`${slotName} Gratis Demo`}
                className="absolute inset-0 w-full h-full border-0"
                allow="autoplay; fullscreen"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                loading="lazy"
                onError={() => setError(true)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {!compact && !fullscreen && (
        <p className="mt-2 text-xs text-muted-foreground text-center">
          ⚠️ Demo-versionen bruger fiktive penge og er kun til underholdning. <a href="/ansvarligt-spil" className="text-primary hover:underline">Spil ansvarligt</a>.
          18+ | Leveret via vores <a href="/pragmatic-play-partner" className="text-primary hover:underline">Pragmatic Play partnerskab</a>.
        </p>
      )}

      {fullscreen && (
        <div className="p-2 flex justify-end bg-muted border-t">
          <Button variant="outline" size="sm" onClick={() => setFullscreen(false)}>
            <Minimize2 className="h-4 w-4 mr-1" /> Luk fuldskærm
          </Button>
        </div>
      )}
    </div>
  );
}
