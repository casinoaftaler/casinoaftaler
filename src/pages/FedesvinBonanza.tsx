import "@/styles/bonanza-animations.css";
import "@/styles/gates-animations.css";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { BonanzaSlotGame } from "@/components/slots/BonanzaSlotGame";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Gamepad2, Candy } from "lucide-react";
import { LiveBigWins } from "@/components/slots/LiveBigWins";
import slotCasinoCardBg from "@/assets/slots/slot-casino-card-bg.png";

const GAME_ID = "fedesvin-bonanza";

type LoadingPhase = 'loading' | 'intro' | 'ready';

export default function FedesvinBonanza() {
  const { user, loading } = useAuth();
  const { data: siteSettings } = useSiteSettings();
  const { data: casinos } = useCasinos();
  const isMobile = useIsMobile();

  useSlotSoundLoader(GAME_ID);

  const {
    isSessionActive, isBlockedByOtherDevice, otherDeviceInfo,
    timeSinceOtherActive, isLoading: sessionLoading,
    takeOverSession, refreshSession
  } = useSlotSession(GAME_ID);
  const { scale } = useSlotScale({
    baseWidth: 1400,
    baseHeight: 1120,
    headerHeight: 72,
    safetyPadding: 16,
    minScale: 0.2,
  });
  const { isLocked, hasAccess, isLoading: accessLoading, isVerifying, error: accessError, verifyPassword } = useSlotPageAccess(GAME_ID);

  const [loadingPhase, setLoadingPhase] = useState<LoadingPhase>('loading');

  useEffect(() => { sessionStorage.removeItem('slot_initialized'); }, []);

  const handleLoadingComplete = useCallback(() => setLoadingPhase('intro'), []);
  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('slot_initialized', 'true');
    setLoadingPhase('ready');
  }, []);

  const backgroundImage = siteSettings?.fedesvin_bonanza_background_image || '';
  const topCasino = casinos?.find(c => c.is_active) || null;

  useEffect(() => { return () => { slotSounds.stopMusic(); }; }, []);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;
    const previousHtmlOverscroll = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
      document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;
    };
  }, []);

  const PageBackground = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100 via-rose-50 to-fuchsia-100 -z-10" />
      {backgroundImage && (
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10" style={{ backgroundImage: `url(${backgroundImage})`, filter: 'brightness(1.0) saturate(0.9)' }} />
      )}
      <div className="absolute inset-0 bg-white/25 -z-10" />
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
        gameName="Fedesvin Bonanza"
      />
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        <PageBackground />
        <div className="container py-16">
          <div className="max-w-md mx-auto text-center space-y-6 bg-card/80 backdrop-blur-sm p-8 rounded-xl border border-pink-500/20">
            <div className="h-20 w-20 mx-auto rounded-full bg-pink-500/20 flex items-center justify-center">
              <Candy className="h-10 w-10 text-pink-400" />
            </div>
            <h1 className="text-2xl font-bold">Log ind for at spille</h1>
            <p className="text-muted-foreground">
              Du skal være logget ind for at spille Fedesvin Bonanza.
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
    <div className="h-[calc(100svh-4rem)] max-h-[calc(100svh-4rem)] relative flex flex-col overflow-hidden">
      <SEO
        title="Fedesvin Bonanza – Gratis Spilleautomat | Casinoaftaler"
        description="Spil Fedesvin Bonanza gratis hos Casinoaftaler. Tumble-mekanik, multiplier-bomber og free spins i candy-tema."
        noindex
      />
      <LiveBigWins theme="candy" />
      <PageBackground />

      <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-20">
        <Button
          asChild variant="ghost" size="sm"
          className="text-pink-300/80 hover:text-pink-300 hover:bg-pink-500/10 gap-1.5 h-7 px-2 text-xs sm:h-8 sm:px-3 sm:text-sm"
        >
          <Link to="/community/slots">
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Tilbage til spil</span>
          </Link>
        </Button>
      </div>

      {isMobile ? (
        /* ── MOBILE: native width, no CSS transform scaling ── */
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="w-full px-1">
            <SlotPageLayout sidePanel={null}>
              <BonanzaSlotGame gameId={GAME_ID} isMobile />
            </SlotPageLayout>
          </div>
        </div>
      ) : (
        /* ── DESKTOP: CSS transform scaling ── */
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <div
              className="slot-viewport-container"
              style={{
                width: '1280px',
                height: '1120px',
                transform: `scale(${scale})`,
                marginTop: `${-(1120 * (1 - scale)) / 2}px`,
                marginBottom: `${-(1120 * (1 - scale)) / 2}px`,
                marginLeft: `${-(1280 * (1 - scale)) / 2}px`,
                marginRight: `${-(1280 * (1 - scale)) / 2}px`,
              }}
            >
              <SlotPageLayout sidePanel={sidePanelContent}>
                <BonanzaSlotGame gameId={GAME_ID} />
              </SlotPageLayout>
            </div>
          </div>
      )}
    </div>
  );
}
