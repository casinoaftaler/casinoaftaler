import "@/styles/slot-animations.css";
import "@/styles/gates-animations.css";
import "@/styles/gates-intensity.css";
import "@/styles/gates-zeus.css";
import "@/styles/gates-bonus-intensity.css";
import { useState, useCallback, useEffect } from "react";
import { slotSounds } from "@/lib/slotSoundEffects";
import { SEO } from "@/components/SEO";

import { SlotLeaderboard } from "@/components/slots/SlotLeaderboard";
import { SlotPromoSlider } from "@/components/slots/SlotPromoSlider";
import { SlotLoadingScreen } from "@/components/slots/SlotLoadingScreen";
import { SlotIntroScreen } from "@/components/slots/SlotIntroScreen";
import { SlotSessionGate } from "@/components/slots/SlotSessionGate";
import { SlotPageLockGate } from "@/components/slots/SlotPageLockGate";
import { useSlotPageAccess } from "@/hooks/useSlotPageAccess";
import { SlotPageLayout } from "@/components/slots/SlotPageLayout";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSlotSoundLoader } from "@/hooks/useSlotSoundLoader";
import { useSlotSession } from "@/hooks/useSlotSession";
import { useCasinos } from "@/hooks/useCasinos";
import { useSlotScale } from "@/hooks/useSlotScale";
import { GatesSlotGame } from "@/components/slots/GatesSlotGame";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { LiveBigWins } from "@/components/slots/LiveBigWins";
import slotCasinoCardBg from "@/assets/slots/slot-casino-card-bg.png";

const GAME_ID = "gates-of-fedesvin";

type LoadingPhase = 'loading' | 'intro' | 'ready';

export default function GatesOfFedesvin() {
  const { user, loading, isAdmin } = useAuth();
  const { data: siteSettings } = useSiteSettings();
  const { data: casinos } = useCasinos();
  
  useSlotSoundLoader(GAME_ID);
  
  const { 
    isSessionActive, isBlockedByOtherDevice, otherDeviceInfo, 
    timeSinceOtherActive, isLoading: sessionLoading,
    takeOverSession, refreshSession 
  } = useSlotSession(GAME_ID);
  const { scale, shouldScale } = useSlotScale();
  const { isLocked, hasAccess, isLoading: accessLoading, isVerifying, error: accessError, verifyPassword } = useSlotPageAccess(GAME_ID);
  
  const [loadingPhase, setLoadingPhase] = useState<LoadingPhase>('loading');
  
  useEffect(() => { sessionStorage.removeItem('slot_initialized'); }, []);

  const handleLoadingComplete = useCallback(() => setLoadingPhase('intro'), []);
  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('slot_initialized', 'true');
    setLoadingPhase('ready');
  }, []);
  
  const backgroundImage = siteSettings?.gates_of_fedesvin_background_image || '';
  const topCasino = casinos?.find(c => c.is_active) || null;

  useEffect(() => { return () => { slotSounds.stopMusic(); }; }, []);

  const PageBackground = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-slate-950 to-blue-950 -z-10" />
      {backgroundImage && (
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10" style={{ backgroundImage: `url(${backgroundImage})` }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-indigo-900/20 -z-10" />
    </>
  );

  if (loading || accessLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        <PageBackground />
        <div className="container py-8 flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Indlæser...</div>
        </div>
      </div>
    );
  }

  if (isLocked && !hasAccess) {
    return (
      <SlotPageLockGate
        backgroundImage={backgroundImage}
        onVerify={verifyPassword}
        error={accessError}
        isVerifying={isVerifying}
        gameName="Gates of Fedesvin"
      />
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        <PageBackground />
        <div className="container py-16">
          <div className="max-w-md mx-auto text-center space-y-6 bg-card/80 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20">
            <div className="h-20 w-20 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center">
              <Gamepad2 className="h-10 w-10 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold">Log ind for at spille</h1>
            <p className="text-muted-foreground">
              Du skal være logget ind for at spille Gates of Fedesvin og optjene point til ranglisten.
            </p>
            <Button asChild size="lg" className="bg-[#9146FF] hover:bg-[#772ce8]">
              <Link to="/auth">Log ind med Twitch</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        <PageBackground />
        <div className="container py-16">
          <div className="max-w-md mx-auto text-center space-y-6 bg-card/80 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20">
            <div className="h-20 w-20 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center">
              <Gamepad2 className="h-10 w-10 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold">Kommer snart!</h1>
            <p className="text-muted-foreground">
              Gates of Fedesvin er under udvikling og vil snart være tilgængelig for alle spillere.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/community/slots">Tilbage til spillehallen</Link>
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
    return <SlotLoadingScreen onComplete={handleLoadingComplete} gameId={GAME_ID} />;
  }

  if (loadingPhase === 'intro') {
    return <SlotIntroScreen onStart={handleIntroComplete} gameId={GAME_ID} />;
  }

  const sidePanelContent = null;

  return (
    <div className="min-h-[calc(100dvh-4rem)] relative flex flex-col overflow-x-hidden">
      <SEO
        title="Gates of Fedesvin – Gratis Spilleautomat | Casinoaftaler"
        description="Spil Gates of Fedesvin gratis hos Casinoaftaler. Tumble-mekanik, multiplier-orbs og free spins. Optjen point og klatr på ranglisten."
        noindex
      />
      <LiveBigWins />
      <PageBackground />

      <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-20">
        <Button
          asChild variant="ghost" size="sm"
          className="text-blue-300/80 hover:text-blue-300 hover:bg-blue-500/10 gap-1.5 h-7 px-2 text-xs sm:h-8 sm:px-3 sm:text-sm"
        >
          <Link to="/community/slots">
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Tilbage til spil</span>
          </Link>
        </Button>
      </div>
      
      <div className="xl:flex-1 flex items-center justify-center overflow-hidden">
        <div 
          className="slot-viewport-container"
          style={{
            width: '1280px',
            transform: shouldScale 
              ? `scale(${scale})`
              : undefined,
          }}
        >
          <SlotPageLayout sidePanel={sidePanelContent}>
            <GatesSlotGame gameId={GAME_ID} />
          </SlotPageLayout>
        </div>
      </div>

    </div>
  );
}
