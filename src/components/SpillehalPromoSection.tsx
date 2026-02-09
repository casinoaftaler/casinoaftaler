import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Trophy } from "lucide-react";

export function SpillehalPromoSection() {
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-border/50">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          
          <div className="relative flex flex-col lg:flex-row items-center gap-8 p-6 md:p-10">
            {/* Text content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                <Trophy className="h-4 w-4" />
                <span>Ugentlige turneringer</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Ugentlige præmier & turneringer på vores spilmaskiner
              </h2>
              
              <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-xl">
                Spil eksklusive slots i vores Spillehal og deltag i ugentlige turneringer med rigtige præmier.
              </p>
              
              <Button asChild size="lg" className="gap-2">
                <Link to="/slot-machine">
                  <Sparkles className="h-4 w-4" />
                  Gå til Spillehal
                </Link>
              </Button>
            </div>
            
            {/* Subtle visual element */}
            <div className="hidden lg:flex items-center justify-center flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
                <div className="relative flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/30">
                  <Trophy className="h-16 w-16 text-primary/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
