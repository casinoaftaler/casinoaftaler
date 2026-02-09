import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function SpillehalPromoSection() {
  return (
    <section className="py-6 md:py-8">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 md:p-6 rounded-xl bg-muted/50 border border-border/50">
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
              Ugentlige turneringer med rigtige præmier
            </h3>
            <p className="text-sm text-muted-foreground">
              Spil vores eksklusive slots og konkurrér om præmier i Spillehallen.
            </p>
          </div>
          
          <Button asChild variant="outline" size="sm" className="gap-1.5 flex-shrink-0">
            <Link to="/slot-machine">
              Gå til Spillehal
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
