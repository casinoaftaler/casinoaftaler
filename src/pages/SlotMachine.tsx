import { SlotGame } from "@/components/slots/SlotGame";
import { SlotLeaderboard } from "@/components/slots/SlotLeaderboard";
import { SpinsRemaining } from "@/components/slots/SpinsRemaining";
import { SlotPageLockGate } from "@/components/slots/SlotPageLockGate";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSlotPageAccess } from "@/hooks/useSlotPageAccess";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gamepad2, Loader2 } from "lucide-react";
import defaultSlotBackground from "@/assets/slots/slot-background.jpg";
import defaultTitleImage from "@/assets/slots/book-of-fedesvin-title.png";

export default function SlotMachine() {
  const { user, loading } = useAuth();
  const { data: siteSettings } = useSiteSettings();
  const { isLocked, hasAccess, isLoading: accessLoading, error, verifyPassword } = useSlotPageAccess();
  
  const titleImage = siteSettings?.slot_title_image || defaultTitleImage;
  const backgroundImage = siteSettings?.slot_background_image || defaultSlotBackground;

  // Show loading while checking auth and access
  if (loading || accessLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90 -z-10" />
        
        <div className="container py-8 flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Indlæser...</div>
        </div>
      </div>
    );
  }

  // Show password gate if page is locked and user doesn't have access
  if (isLocked && !hasAccess) {
    return (
      <SlotPageLockGate 
        backgroundImage={backgroundImage}
        onVerify={verifyPassword}
        error={error}
      />
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90 -z-10" />
        
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
    <div className="min-h-[calc(100vh-4rem)] relative overflow-x-hidden">
      {/* Background - absolute instead of fixed to not overlap header */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70 -z-10" />
      
      <div className="container px-2 sm:px-4 py-2 sm:py-4">
        {/* Title Image with glow animation */}
        <div className="flex justify-center">
          <img 
            src={titleImage} 
            alt="Book of Fedesvin" 
            className="w-full max-w-[200px] xs:max-w-[280px] sm:max-w-md md:max-w-xl h-auto animate-[title-entrance_0.8s_ease-out_forwards,glow_3s_ease-in-out_0.8s_infinite]"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.5)) drop-shadow(0 0 40px rgba(251,191,36,0.3)) drop-shadow(0 0 60px rgba(251,191,36,0.2))'
            }}
          />
        </div>

        {/* Main content: Leaderboard left, Slot machine center */}
        <div className="flex justify-center items-start gap-4 mt-2">
          {/* Desktop: Leaderboard on the left */}
          <div className="hidden xl:block w-64 flex-shrink-0 max-h-[calc(100vh-12rem)] overflow-y-auto">
            <SlotLeaderboard />
          </div>
          
          {/* Slot machine and mobile leaderboard */}
          <div className="flex flex-col items-center gap-2">
            <SlotGame />
            
            {/* Spins remaining */}
            <div className="w-full max-w-sm flex justify-center">
              <SpinsRemaining />
            </div>
            
            {/* Mobile/Tablet: Leaderboard below */}
            <div className="w-full max-w-sm xl:hidden">
              <SlotLeaderboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}