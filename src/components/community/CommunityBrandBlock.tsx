import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "@/styles/community-micro.css";

export const CommunityBrandBlock = forwardRef<HTMLElement>(function CommunityBrandBlock(_props, ref) {
  return (
    <section ref={ref} className="community-panel-brand mt-12 rounded-xl p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="flex gap-5 shrink-0">
          <Link to="/forfatter/jonas" className="flex flex-col items-center gap-2 group">
            <img
              src="/jonas-avatar.webp"
              alt="Jonas – medstifter af Casinoaftaler.dk"
              className="h-32 w-32 rounded-full object-cover object-top ring-2 ring-primary/30 transition-all group-hover:ring-primary/60"
              loading="lazy"
              fetchPriority="low"
              width={128}
              height={128}
            />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Jonas</span>
          </Link>
          <Link to="/forfatter/kevin" className="flex flex-col items-center gap-2 group">
            <img
              src="/kevin-avatar.webp"
              alt="Kevin – medstifter af Casinoaftaler.dk"
              className="h-32 w-32 rounded-full object-cover ring-2 ring-primary/30 transition-all group-hover:ring-primary/60"
              loading="lazy"
              fetchPriority="low"
              width={128}
              height={128}
            />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Kevin</span>
          </Link>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-foreground mb-2">
            🚀 Skabt af spillere – for spillere
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Casinoaftaler Community er udviklet af Jonas og Kevin, som også dokumenterer vores bonus hunts live.
            Målet er fuld gennemsigtighed, real data og ansvarligt spil.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">✔ Uafhængige analyser</span>
            <span className="flex items-center gap-1.5">✔ Live dokumentation</span>
            <span className="flex items-center gap-1.5">✔ Opdateret løbende</span>
            <span className="flex items-center gap-1.5">✔ Fokus på ansvarligt spil</span>
          </div>
          <Link
            to="/om"
            className="community-panel-btn inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
          >
            👉 Mød teamet bag Casinoaftaler
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
});
