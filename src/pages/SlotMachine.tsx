import { SlotGame } from "@/components/slots/SlotGame";
import { SlotLeaderboard } from "@/components/slots/SlotLeaderboard";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import slotBackground from "@/assets/slots/slot-background.jpg";

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

  if (!user) {
    return (
      <div className="min-h-screen relative">
        {/* Full page background */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{ backgroundImage: `url(${slotBackground})` }}
        />
        <div className="fixed inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90 -z-10" />
        
        <div className="container py-16">
          <div className="max-w-md mx-auto text-center space-y-6 bg-card/80 backdrop-blur-sm p-8 rounded-xl border border-amber-500/20">
            <div className="h-20 w-20 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center">
              <Gamepad2 className="h-10 w-10 text-amber-500" />
            </div>
            <h1 className="text-2xl font-bold">Log ind for at spille</h1>
            <p className="text-muted-foreground">
              Du skal være logget ind for at spille på spillemaskinen og optjene point til ranglisten.
            </p>
            <Button asChild size="lg" className="bg-[#9146FF] hover:bg-[#772ce8]">
              <Link to="/auth">Log ind med Twitch</Link>
            </Button>
          </div>
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
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-lg">
            Community Slot Machine
          </h1>
          <p className="text-muted-foreground">
            Book of Ra-inspireret spillemaskine • 100 gratis spins dagligt
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
