import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function SpillehalPromoSection() {
  return (
    <section 
      className="relative overflow-hidden py-16 md:py-20 text-white"
      style={{
        background: 'linear-gradient(135deg, hsl(250 60% 20%), hsl(260 70% 18%) 40%, hsl(220 70% 20%))',
      }}
    >
      {/* Decorative glow elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(260 80% 50% / 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute right-1/4 top-0 w-[300px] h-[300px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(210 80% 60% / 0.5) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div 
          className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, hsl(280 70% 50% / 0.4) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content - left side */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white/90 mb-6 border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
              </span>
              Ugentlige turneringer
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight leading-tight">
              Ugentlige præmier & turneringer på vores spilmaskiner
            </h2>
            
            <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed max-w-xl">
              Spil eksklusive slots i vores Spillehal og konkurrér i ugentlige turneringer med rigtige præmier.
            </p>
            
            <Button 
              asChild 
              size="lg" 
              className="gap-2 text-base px-8 py-6 bg-white text-slate-900 hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
            >
              <Link to="/slot-machine">
                Gå til Spillehal
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Abstract visual - right side */}
          <div className="hidden lg:flex items-center justify-center flex-shrink-0">
            <div className="relative w-80 h-80">
              {/* Rotating glow ring */}
              <div 
                className="absolute inset-0 rounded-full opacity-60"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, hsl(260 80% 60% / 0.4), transparent, hsl(210 80% 60% / 0.4), transparent)',
                  animation: 'spin 20s linear infinite',
                }}
              />
              
              {/* Inner glow */}
              <div 
                className="absolute inset-8 rounded-full"
                style={{
                  background: 'radial-gradient(circle, hsl(260 70% 50% / 0.3) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              
              {/* Center orb */}
              <div 
                className="absolute inset-16 rounded-full border border-white/20"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, hsl(260 60% 40% / 0.8), hsl(230 60% 25% / 0.6))',
                  boxShadow: '0 0 60px hsl(260 80% 50% / 0.3), inset 0 0 30px hsl(260 80% 70% / 0.2)',
                }}
              />
              
              {/* Floating particles */}
              <div 
                className="absolute top-12 left-8 w-3 h-3 rounded-full bg-white/40"
                style={{ animation: 'float 4s ease-in-out infinite' }}
              />
              <div 
                className="absolute bottom-16 right-12 w-2 h-2 rounded-full bg-white/30"
                style={{ animation: 'float 5s ease-in-out infinite 1s' }}
              />
              <div 
                className="absolute top-1/3 right-6 w-2.5 h-2.5 rounded-full bg-white/25"
                style={{ animation: 'float 6s ease-in-out infinite 0.5s' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-15px) translateX(3px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
