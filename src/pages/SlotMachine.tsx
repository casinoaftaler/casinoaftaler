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
import { SlotPageLayout } from "@/components/slots/SlotPageLayout";
import { SlotPageLockGate } from "@/components/slots/SlotPageLockGate";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSlotSoundLoader } from "@/hooks/useSlotSoundLoader";
import { useSlotPageAccess } from "@/hooks/useSlotPageAccess";

import { useSlotSession } from "@/hooks/useSlotSession";
import { useCasinos } from "@/hooks/useCasinos";
import { useSlotScale } from "@/hooks/useSlotScale";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import defaultSlotBackground from "@/assets/slots/slot-background.jpg";



import slotCasinoCardBg from "@/assets/slots/slot-casino-card-bg.png";

type LoadingPhase = 'loading' | 'intro' | 'ready';

export default function SlotMachine() {
  const { user, loading } = useAuth();
  const { data: siteSettings } = useSiteSettings();
  const { data: casinos } = useCasinos();
  const isMobile = useIsMobile();
  const { hasAccess, isLoading: accessLoading, isVerifying, verifyPassword, error: accessError } = useSlotPageAccess("book-of-fedesvin");
  
  // Load custom sound files at page level so they're ready for intro screen music
  useSlotSoundLoader("book-of-fedesvin");
  
  const { 
    isSessionActive, 
    isBlockedByOtherDevice, 
    otherDeviceInfo, 
    timeSinceOtherActive,
    isLoading: sessionLoading,
    takeOverSession,
    refreshSession 
  } = useSlotSession("book-of-fedesvin");
  const { scale } = useSlotScale({
    baseWidth: 1880,
    baseHeight: 1120,
    headerHeight: 72,
    safetyPadding: 16,
    minScale: 0.2,
  });
  
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

  // Background component for reuse
  const PageBackground = () => (
    <>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 -z-10" />
    </>
  );

  // 1. Show loading while checking auth or access
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

  // 2. Show lock gate if page is locked and user doesn't have access
  if (!hasAccess) {
    return (
      <SlotPageLockGate
        backgroundImage={backgroundImage}
        onVerify={verifyPassword}
        error={accessError}
        isVerifying={isVerifying}
        gameName="Book of Fedesvin"
      />
    );
  }

  // 3. Show login prompt if not logged in
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        <PageBackground />
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

  // 4. Show session loading/gate for authenticated users
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

  // 5. Show loading screen for authenticated users with access
  if (loadingPhase === 'loading') {
    return <SlotLoadingScreen onComplete={handleLoadingComplete} />;
  }

  // 6. Show intro screen
  if (loadingPhase === 'intro') {
    return <SlotIntroScreen onStart={handleIntroComplete} />;
  }

  // Side panel content for desktop
  const sidePanelContent = null;

  // 7. Show the game
  return (
    <div className="min-h-[calc(100dvh-4rem)] relative flex flex-col">
      <SEO
        title="Book of Fedesvin – Gratis Spilleautomat | Casinoaftaler"
        description="Spil Book of Fedesvin gratis hos Casinoaftaler. Egyptisk-tema spilleautomat med expanding symbols, free spins og bonusrunder. Optjen point og klatr på ranglisten."
        noindex
      />
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 -z-10" />

      {/* Back button */}
      <div className="absolute top-3 left-3 z-20">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-amber-300/80 hover:text-amber-300 hover:bg-amber-500/10 gap-1.5"
        >
          <Link to="/community/slots">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Tilbage til spil</span>
          </Link>
        </Button>
      </div>
      
      {/* Scaled game area - only the game itself is scaled */}
      <div className="xl:flex-1 flex items-start justify-center overflow-hidden">
        <div 
          className="slot-viewport-container"
          style={{
            width: '1280px',
            transform: shouldScale 
              ? `translate(${parseInt(siteSettings?.['slot_offset_x_book-of-fedesvin'] || '0', 10)}px, ${parseInt(siteSettings?.['slot_offset_y_book-of-fedesvin'] || '0', 10)}px) scale(${scale})`
              : `translate(${parseInt(siteSettings?.['slot_offset_x_book-of-fedesvin'] || '0', 10)}px, ${parseInt(siteSettings?.['slot_offset_y_book-of-fedesvin'] || '0', 10)}px)`,
          }}
        >
          <SlotPageLayout sidePanel={sidePanelContent} sidePanelGap={parseInt(siteSettings?.slot_sidepanel_gap || "24", 10)}>
            <SlotGame />
          </SlotPageLayout>
        </div>
      </div>

    </div>
  );
}
