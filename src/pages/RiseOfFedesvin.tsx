import { useState, useCallback, useEffect } from "react";
import { slotSounds } from "@/lib/slotSoundEffects";
import { SlotGame } from "@/components/slots/SlotGame";
import { SlotLeaderboard } from "@/components/slots/SlotLeaderboard";
import { SlotPromoSlider } from "@/components/slots/SlotPromoSlider";
import { SlotLoadingScreen } from "@/components/slots/SlotLoadingScreen";
import { SlotIntroScreen } from "@/components/slots/SlotIntroScreen";
import { SlotSessionGate } from "@/components/slots/SlotSessionGate";
import { SlotPageLayout } from "@/components/slots/SlotPageLayout";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSlotSession } from "@/hooks/useSlotSession";
import { useCasinos } from "@/hooks/useCasinos";
import { useViewportScaling } from "@/hooks/useViewportScaling";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import defaultSlotBackground from "@/assets/slots/slot-background.jpg";
import slotCasinoCardBg from "@/assets/slots/slot-casino-card-bg.png";

const GAME_ID = "rise-of-fedesvin";

type LoadingPhase = 'loading' | 'intro' | 'ready';

export default function RiseOfFedesvin() {
  const { user, loading } = useAuth();
  const { data: siteSettings } = useSiteSettings();
  const { data: casinos } = useCasinos();
  
  const { 
    isSessionActive, 
    isBlockedByOtherDevice, 
    otherDeviceInfo, 
    timeSinceOtherActive,
    isLoading: sessionLoading,
    takeOverSession,
    refreshSession 
  } = useSlotSession();
  const { scale, shouldScale, showTitle } = useViewportScaling();
  
  const [loadingPhase, setLoadingPhase] = useState<LoadingPhase>('loading');
  
  useEffect(() => {
    sessionStorage.removeItem('slot_initialized');
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setLoadingPhase('intro');
  }, []);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('slot_initialized', 'true');
    setLoadingPhase('ready');
  }, []);
  
  const backgroundImage = siteSettings?.slot_background_image || defaultSlotBackground;
  const topCasino = casinos?.find(c => c.is_active) || null;

  useEffect(() => {
    return () => {
      slotSounds.stopMusic();
    };
  }, []);

  const PageBackground = () => (
    <>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 -z-10" />
      {/* Purple/mystical overlay for Rise of Fedesvin */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-indigo-900/20 -z-10" />
    </>
  );

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        <PageBackground />
        <div className="container py-8 flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Indlæser...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        <PageBackground />
        <div className="container py-16">
          <div className="max-w-md mx-auto text-center space-y-6 bg-card/80 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20">
            <div className="h-20 w-20 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center">
              <Gamepad2 className="h-10 w-10 text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold">Log ind for at spille</h1>
            <p className="text-muted-foreground">
              Du skal være logget ind for at spille Rise of Fedesvin og optjene point til ranglisten.
            </p>
            <Button asChild size="lg" className="bg-[#9146FF] hover:bg-[#772ce8]">
              <Link to="/auth">Log ind med Twitch</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (sessionLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        <PageBackground />
        <div className="container py-8 flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Indlæser...</div>
        </div>
      </div>
    );
  }

  if (isBlockedByOtherDevice) {
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

  if (loadingPhase === 'loading') {
    return <SlotLoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (loadingPhase === 'intro') {
    return <SlotIntroScreen onStart={handleIntroComplete} />;
  }

  const sidePanelContent = (
    <>
      <SlotLeaderboard />
      {topCasino && (
        <SlotPromoSlider casino={topCasino} backgroundImage={slotCasinoCardBg} />
      )}
    </>
  );

  return (
    <div className="min-h-[calc(100dvh-4rem)] relative flex flex-col">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 -z-10" />
      <div className="fixed inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-indigo-900/15 -z-10" />

      <div className="absolute top-3 left-3 z-20">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-purple-300/80 hover:text-purple-300 hover:bg-purple-500/10 gap-1.5"
        >
          <Link to="/community/slots">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Tilbage til spil</span>
          </Link>
        </Button>
      </div>
      
      <div className="flex items-start justify-center pt-2 sm:pt-4">
        <div 
          className="slot-viewport-container w-full"
          style={{
            transform: shouldScale ? `scale(${scale})` : undefined,
          }}
        >
          <div className="px-1 xs:px-2 sm:px-4 mx-auto w-fit">
            <SlotPageLayout sidePanel={sidePanelContent}>
              {showTitle && (
                <div className="slot-title-container flex justify-center -mt-14 mb-0">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-100 to-purple-300 drop-shadow-lg animate-[title-entrance_0.8s_ease-out_forwards]">
                    Rise of Fedesvin
                  </h1>
                </div>
              )}

              <SlotGame gameId={GAME_ID} />
            </SlotPageLayout>
          </div>
        </div>
      </div>

      <div className="xl:hidden flex justify-center px-4 pb-6 pt-2">
        <div className="w-full max-w-sm space-y-4">
          {topCasino && (
            <SlotPromoSlider casino={topCasino} backgroundImage={slotCasinoCardBg} />
          )}
          <SlotLeaderboard />
        </div>
      </div>
    </div>
  );
}
