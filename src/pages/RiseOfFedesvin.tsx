import "@/styles/slot-animations.css";
import { useState, useCallback, useEffect } from "react";
import { slotSounds } from "@/lib/slotSoundEffects";
import { SEO } from "@/components/SEO";

import { SlotGame } from "@/components/slots/SlotGame";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import defaultSlotBackground from "@/assets/slots/rise/background.jpg";


import slotCasinoCardBg from "@/assets/slots/slot-casino-card-bg.png";

const GAME_ID = "rise-of-fedesvin";

type LoadingPhase = 'loading' | 'intro' | 'ready';

export default function RiseOfFedesvin() {
  const { user, loading } = useAuth();
  const { data: siteSettings } = useSiteSettings();
  const { data: casinos } = useCasinos();
  const isMobile = useIsMobile();
  
  // Load custom sound files at page level so they're ready for intro screen music
  useSlotSoundLoader(GAME_ID);
  
  const { 
    isSessionActive, 
    isBlockedByOtherDevice, 
    otherDeviceInfo, 
    timeSinceOtherActive,
    isLoading: sessionLoading,
    takeOverSession,
    refreshSession 
  } = useSlotSession(GAME_ID);
  const { scale } = useSlotScale({
    baseWidth: 1880,
    baseHeight: 1120,
    headerHeight: 72,
    safetyPadding: 16,
    minScale: 0.2,
  });
  const { isLocked, hasAccess, isLoading: accessLoading, isVerifying, error: accessError, verifyPassword } = useSlotPageAccess(GAME_ID);
  
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
  
  const backgroundImage = siteSettings?.rise_of_fedesvin_background_image || defaultSlotBackground;
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
        gameName="Rise of Fedesvin"
      />
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        <SEO
          title="Rise of Fedesvin – Gratis Spilleautomat | Casinoaftaler"
          description="Spil Rise of Fedesvin gratis hos Casinoaftaler. Magisk tema med tryllekunstnere, drager og free spins. Optjen point og klatr på ranglisten."
          noindex
        />
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
    return <SlotLoadingScreen onComplete={handleLoadingComplete} gameId={GAME_ID} />;
  }

  if (loadingPhase === 'intro') {
    return <SlotIntroScreen onStart={handleIntroComplete} gameId={GAME_ID} />;
  }

  const sidePanelContent = null;

  return (
    <div className="min-h-[calc(100dvh-4rem)] relative flex flex-col overflow-x-hidden">
      <SEO
        title="Rise of Fedesvin – Gratis Spilleautomat | Casinoaftaler"
        description="Spil Rise of Fedesvin gratis hos Casinoaftaler. Magisk tema med tryllekunstnere, drager og free spins. Optjen point og klatr på ranglisten."
        noindex
      />
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-indigo-900/15 -z-10" />

      <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-20">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-purple-300/80 hover:text-purple-300 hover:bg-purple-500/10 gap-1.5 h-7 px-2 text-xs sm:h-8 sm:px-3 sm:text-sm"
        >
          <Link to="/community/slots">
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Tilbage til spil</span>
          </Link>
        </Button>
      </div>
      
      <div className="xl:flex-1 flex items-start justify-center overflow-hidden">
        <div 
          className="slot-viewport-container"
          style={{
            width: '1280px',
            transform: shouldScale 
              ? `translate(${parseInt(siteSettings?.['slot_offset_x_rise-of-fedesvin'] || '0', 10)}px, ${parseInt(siteSettings?.['slot_offset_y_rise-of-fedesvin'] || '0', 10)}px) scale(${scale})`
              : `translate(${parseInt(siteSettings?.['slot_offset_x_rise-of-fedesvin'] || '0', 10)}px, ${parseInt(siteSettings?.['slot_offset_y_rise-of-fedesvin'] || '0', 10)}px)`,
          }}
        >
          <SlotPageLayout sidePanel={sidePanelContent} sidePanelGap={parseInt(siteSettings?.rise_of_fedesvin_sidepanel_gap || "24", 10)}>
            <SlotGame gameId={GAME_ID} />
          </SlotPageLayout>
        </div>
      </div>

    </div>
  );
}
