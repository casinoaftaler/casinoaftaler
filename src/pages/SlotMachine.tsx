import { SlotGame } from "@/components/slots/SlotGame";
import { SlotLeaderboard } from "@/components/slots/SlotLeaderboard";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import defaultSlotBackground from "@/assets/slots/slot-background.jpg";
import defaultTitleImage from "@/assets/slots/book-of-fedesvin-title.png";

export default function SlotMachine() {
  const { user, loading } = useAuth();
  const { data: siteSettings } = useSiteSettings();
  
  const titleImage = siteSettings?.slot_title_image || defaultTitleImage;
  const backgroundImage = siteSettings?.slot_background_image || defaultSlotBackground;

  if (loading) {
    return (
      <div className="min-h-screen relative">
        {/* Full page background */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
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
          style={{ backgroundImage: `url(${backgroundImage})` }}
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
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {/* Gradient overlay for readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80 -z-10" />
      
      <div className="container py-2 space-y-2">
        {/* Title Image with glow animation */}
        <div className="flex justify-center -mt-2">
          <img 
            src={titleImage} 
            alt="Book of Fedesvin" 
            className="w-full max-w-xs h-auto animate-[glow_3s_ease-in-out_infinite]"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.5)) drop-shadow(0 0 40px rgba(251,191,36,0.3)) drop-shadow(0 0 60px rgba(251,191,36,0.2))'
            }}
          />
        </div>

        <p className="text-center text-xs text-muted-foreground">
          100 gratis spins dagligt • Ekspanderende symboler i bonus
        </p>

        {/* Centered slot machine with leaderboard below on mobile, side on desktop */}
        <div className="flex flex-col items-center gap-4">
          <SlotGame />
          <div className="w-full max-w-sm lg:hidden">
            <SlotLeaderboard />
          </div>
        </div>
        
        {/* Desktop: Floating leaderboard on the left side */}
        <div className="hidden xl:block fixed left-4 top-32 w-64 z-40 max-h-[calc(100vh-10rem)] overflow-y-auto">
          <SlotLeaderboard />
        </div>
      </div>
    </div>
  );
}
