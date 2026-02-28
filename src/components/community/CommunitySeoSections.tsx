import { BonusHuntTopCasinos } from "@/components/bonus-hunt/BonusHuntTopCasinos";
import { BonusHuntCommunityLinks } from "@/components/bonus-hunt/BonusHuntCommunityLinks";
import { BonusHuntLatestNews } from "@/components/bonus-hunt/BonusHuntLatestNews";

/**
 * Shared SEO bridge sections used across community pages to link
 * community traffic → money pages / SEO content.
 */
export function CommunitySeoSections() {
  return (
    <div className="space-y-8 mt-8">
      <BonusHuntTopCasinos />
      <BonusHuntCommunityLinks />
      <BonusHuntLatestNews />
    </div>
  );
}
