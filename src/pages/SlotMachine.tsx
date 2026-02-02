import { SlotGame } from "@/components/slots/SlotGame";
import { SlotLeaderboard } from "@/components/slots/SlotLeaderboard";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import slotBackground from "@/assets/slots/slot-background.jpg";
import bookOfFedesvinTitle from "@/assets/slots/book-of-fedesvin-title.png";

export default function SlotMachine() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen relative">
        {/* Full page background */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{ backgroundImage: `url(${slotBackground})` }}
        />
        <div className="fixed inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90 -z-10" />
        
        <div className="container py-8 flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Indlæser...</div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen relative">
      {/* Full page Egyptian temple background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${slotBackground})` }}
      />
      {/* Gradient overlay for readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80 -z-10" />
      
      <div className="container py-8 space-y-8">
        {/* Title Image with glow animation */}
        <div className="flex justify-center">
          <img 
            src={bookOfFedesvinTitle} 
            alt="Book of Fedesvin" 
            className="w-full max-w-xl h-auto animate-[glow_3s_ease-in-out_infinite]"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.5)) drop-shadow(0 0 40px rgba(251,191,36,0.3)) drop-shadow(0 0 60px rgba(251,191,36,0.2))'
            }}
          />
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            100 gratis spins dagligt • Ekspanderende symboler i bonus
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,320px]">
          <SlotGame />
          <SlotLeaderboard />
        </div>
      </div>
    </div>
  );
}
