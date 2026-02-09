import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function SpillehalPromoSection() {
  return (
    <section 
      className="relative overflow-hidden py-10 md:py-12 text-white"
      style={{
        background: 'linear-gradient(135deg, hsl(250 45% 28%), hsl(260 50% 25%) 50%, hsl(220 50% 28%))',
      }}
    >
      {/* Subtle ambient glow - very soft */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(ellipse, hsl(260 60% 55% / 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          {/* Text content */}
          <div className="flex-1 text-center md:text-left max-w-2xl">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 tracking-tight">
              Ugentlige præmier & turneringer på vores spilmaskiner
            </h2>
            
            <p className="text-sm md:text-base text-white/70 max-w-lg">
              Spil eksklusive slots i vores Spillehal og konkurrér i ugentlige turneringer med rigtige præmier.
            </p>
          </div>
          
          {/* CTA */}
          <div className="flex-shrink-0">
            <Button 
              asChild 
              size="lg" 
              className="gap-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              <Link to="/slot-machine">
                Gå til Spillehal
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
