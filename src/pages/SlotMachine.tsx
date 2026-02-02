import { SlotGame } from "@/components/slots/SlotGame";
import { SlotLeaderboard } from "@/components/slots/SlotLeaderboard";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";

export default function SlotMachine() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Indlæser...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="h-20 w-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Gamepad2 className="h-10 w-10 text-primary" />
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
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
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
  );
}
