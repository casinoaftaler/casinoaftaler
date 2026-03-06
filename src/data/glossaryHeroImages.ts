/**
 * Hero image map for glossary term pages.
 * Each slug maps to its unique hero image import.
 */
import rtpHero from "@/assets/heroes/ordbog-rtp-hero.jpg";
import wageringHero from "@/assets/heroes/ordbog-wagering-hero.jpg";
import volatilitetHero from "@/assets/heroes/ordbog-volatilitet-hero.jpg";
import houseEdgeHero from "@/assets/heroes/ordbog-house-edge-hero.jpg";
import freeSpinsHero from "@/assets/heroes/ordbog-free-spins-hero.jpg";
import scatterHero from "@/assets/heroes/ordbog-scatter-hero.jpg";
import wildHero from "@/assets/heroes/ordbog-wild-hero.jpg";
import jackpotHero from "@/assets/heroes/ordbog-jackpot-hero.jpg";
import rngHero from "@/assets/heroes/ordbog-rng-hero.jpg";
import paylinesHero from "@/assets/heroes/ordbog-paylines-hero.jpg";
import bonusRundeHero from "@/assets/heroes/ordbog-bonus-runde-hero.jpg";
import multiplikatorHero from "@/assets/heroes/ordbog-multiplikator-hero.jpg";
import maxBetHero from "@/assets/heroes/ordbog-max-bet-hero.jpg";
import autoplayHero from "@/assets/heroes/ordbog-autoplay-hero.jpg";
import hitFrequencyHero from "@/assets/heroes/ordbog-hit-frequency-hero.jpg";
// Batch 2 hero images
import gambleFeatureHero from "@/assets/heroes/ordbog-gamble-feature-hero.jpg";
import cascadingWinsHero from "@/assets/heroes/ordbog-cascading-wins-hero.jpg";
import megawaysHero from "@/assets/heroes/ordbog-megaways-hero.jpg";
import buyBonusHero from "@/assets/heroes/ordbog-buy-bonus-hero.jpg";
import stickyBonusHero from "@/assets/heroes/ordbog-sticky-bonus-hero.jpg";
import bankrollManagementHero from "@/assets/heroes/ordbog-bankroll-management-hero.jpg";
import progressivJackpotHero from "@/assets/heroes/ordbog-progressiv-jackpot-hero.jpg";
import gevinstprocentHero from "@/assets/heroes/ordbog-gevinstprocent-hero.jpg";
import minimumIndbetalingHero from "@/assets/heroes/ordbog-minimum-indbetaling-hero.jpg";
import kycHero from "@/assets/heroes/ordbog-kyc-hero.jpg";
import mitidHero from "@/assets/heroes/ordbog-mitid-hero.jpg";
import gamificationHero from "@/assets/heroes/ordbog-gamification-hero.jpg";
import retriggerHero from "@/assets/heroes/ordbog-retrigger-hero.jpg";
import clusterPaysHero from "@/assets/heroes/ordbog-cluster-pays-hero.jpg";
import expandingWildHero from "@/assets/heroes/ordbog-expanding-wild-hero.jpg";
import ordbogHero from "@/assets/heroes/ordbog-hero.jpg";

export const glossaryHeroImages: Record<string, string> = {
  rtp: rtpHero,
  wagering: wageringHero,
  volatilitet: volatilitetHero,
  "house-edge": houseEdgeHero,
  "free-spins": freeSpinsHero,
  scatter: scatterHero,
  wild: wildHero,
  jackpot: jackpotHero,
  rng: rngHero,
  paylines: paylinesHero,
  "bonus-runde": bonusRundeHero,
  multiplikator: multiplikatorHero,
  "max-bet": maxBetHero,
  autoplay: autoplayHero,
  "hit-frequency": hitFrequencyHero,
  // Batch 2
  "gamble-feature": gambleFeatureHero,
  "cascading-wins": cascadingWinsHero,
  megaways: megawaysHero,
  "buy-bonus": buyBonusHero,
  "sticky-bonus-term": stickyBonusHero,
  "bankroll-management": bankrollManagementHero,
  "progressiv-jackpot": progressivJackpotHero,
  gevinstprocent: gevinstprocentHero,
  "minimum-indbetaling": minimumIndbetalingHero,
  kyc: kycHero,
  "mitid-casino": mitidHero,
  gamification: gamificationHero,
  retrigger: retriggerHero,
  "cluster-pays": clusterPaysHero,
  "expanding-wild": expandingWildHero,
};

/** Get hero image for a term slug, falls back to generic ordbog hero */
export function getGlossaryHero(slug: string): string {
  return glossaryHeroImages[slug] || ordbogHero;
}
