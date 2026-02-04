import { useState, useCallback, useEffect } from "react";
import { SlotGame } from "@/components/slots/SlotGame";
import { SlotLeaderboard } from "@/components/slots/SlotLeaderboard";
import { SlotPageLockGate } from "@/components/slots/SlotPageLockGate";
import { SlotLoadingScreen } from "@/components/slots/SlotLoadingScreen";
import { SlotIntroScreen } from "@/components/slots/SlotIntroScreen";
import { SlotSessionGate } from "@/components/slots/SlotSessionGate";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSlotPageAccess } from "@/hooks/useSlotPageAccess";
import { useSlotSession } from "@/hooks/useSlotSession";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
import { Gamepad2, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import defaultSlotBackground from "@/assets/slots/slot-background.jpg";
import defaultTitleImage from "@/assets/slots/book-of-fedesvin-title.png";

type LoadingPhase = 'loading' | 'intro' | 'ready';

export default function SlotMachine() {
  const { user, loading } = useAuth();
  const { data: siteSettings } = useSiteSettings();
  const { isLocked, hasAccess, isLoading: accessLoading, error, verifyPassword } = useSlotPageAccess();
  const { 
    isSessionActive, 
    isBlockedByOtherDevice, 
    otherDeviceInfo, 
    timeSinceOtherActive,
    isLoading: sessionLoading,
    takeOverSession,
    refreshSession 
  } = useSlotSession();
  
  // Loading phase state - always start fresh (no session persistence)
  const [loadingPhase, setLoadingPhase] = useState<LoadingPhase>('loading');
  
  // Clear session flag on mount to ensure fresh start
  useEffect(() => {
    sessionStorage.removeItem('slot_initialized');
  }, []);
  
  // Leaderboard toggle state with localStorage persistence
  const [showLeaderboard, setShowLeaderboard] = useState(() => {
    return localStorage.getItem('slot-show-leaderboard') === 'true';
  });

  const toggleLeaderboard = () => {
    const newValue = !showLeaderboard;
    setShowLeaderboard(newValue);
    localStorage.setItem('slot-show-leaderboard', String(newValue));
  };

  const handleLoadingComplete = useCallback(() => {
    setLoadingPhase('intro');
  }, []);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('slot_initialized', 'true');
    setLoadingPhase('ready');
  }, []);
  
  const titleImage = siteSettings?.slot_title_image || defaultTitleImage;
  const backgroundImage = siteSettings?.slot_background_image || defaultSlotBackground;

  // Show loading screen first (before auth check)
  if (loadingPhase === 'loading') {
    return <SlotLoadingScreen onComplete={handleLoadingComplete} />;
  }

  // Show intro screen
  if (loadingPhase === 'intro') {
    return <SlotIntroScreen onStart={handleIntroComplete} />;
  }

  // Show loading while checking auth, access, and session
  if (loading || accessLoading || (user && sessionLoading)) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 -z-10" />
        
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

  // Show session gate if another device is actively playing
  if (user && isBlockedByOtherDevice) {
    return (
      <SlotSessionGate
        backgroundImage={backgroundImage}
        otherDeviceInfo={otherDeviceInfo}
        timeSinceActive={timeSinceOtherActive}
        isLoading={sessionLoading}
        onTakeOver={takeOverSession}
        onRefresh={refreshSession}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 -z-10" />
        
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 -z-10" />
      
      <div className="container px-2 sm:px-4">
        {/* Title Image with glow animation - no top spacing */}
        <div className="flex justify-center -mt-8 sm:-mt-10 md:-mt-12">
          <img 
            src={titleImage} 
            alt="Book of Fedesvin" 
            className="w-full max-w-[180px] xs:max-w-[240px] sm:max-w-sm md:max-w-md h-auto animate-[title-entrance_0.8s_ease-out_forwards,glow_3s_ease-in-out_0.8s_infinite]"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.5)) drop-shadow(0 0 40px rgba(251,191,36,0.3)) drop-shadow(0 0 60px rgba(251,191,36,0.2))'
            }}
          />
        </div>

        {/* Main content: Slot machine centered, leaderboard positioned beside it */}
        <div className="flex justify-center">
          {/* Centered wrapper for slot machine with relative positioning for leaderboard */}
          <div className="relative">
            {/* Desktop: Leaderboard positioned to the left - toggle button + conditional */}
            <div className="hidden xl:block absolute right-full mr-4 top-0 w-80" style={{ marginTop: '-50px' }}>
              <Button
                variant="ghost"
                onClick={toggleLeaderboard}
                className="w-full flex items-center justify-center gap-2 py-3 mb-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-500"
              >
                <Trophy className="h-4 w-4" />
                <span>{showLeaderboard ? "Skjul rangliste" : "Vis rangliste"}</span>
                {showLeaderboard ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
              
              {showLeaderboard && (
                <div className="max-h-[calc(100vh-14rem)] overflow-y-auto">
                  <SlotLeaderboard />
                </div>
              )}
            </div>
            
            {/* Slot machine - the true center piece */}
            <div className="flex flex-col items-center gap-1" style={{ marginTop: '-5px' }}>
              <SlotGame />
              
              {/* Mobile/Tablet: Collapsible Leaderboard */}
              <Collapsible 
                open={showLeaderboard} 
                onOpenChange={setShowLeaderboard}
                className="w-full max-w-sm xl:hidden"
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={toggleLeaderboard}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-500"
                  >
                    <Trophy className="h-4 w-4" />
                    <span>{showLeaderboard ? "Skjul rangliste" : "Vis rangliste"}</span>
                    {showLeaderboard ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                  <div className="pt-2">
                    <SlotLeaderboard />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}