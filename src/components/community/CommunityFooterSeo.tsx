import { ReactNode, useMemo } from "react";
import { useAntiFootprint } from "@/hooks/useAntiFootprint";
import { CommunitySeoSections } from "./CommunitySeoSections";
import { RelatedGuides } from "@/components/RelatedGuides";
import { CommunityBrandBlock } from "./CommunityBrandBlock";
import { AuthorBio } from "@/components/AuthorBio";

interface CommunityFooterSeoProps {
  currentPath: string;
  author?: "jonas" | "kevin" | "ajse" | "niklas" | "frederik";
  /** Extra sections inserted before the rotated block (e.g. page-specific SEO text, FAQ) */
  before?: ReactNode;
  /** Extra sections inserted after rotated block but before BrandBlock+AuthorBio */
  after?: ReactNode;
  maxRelatedLinks?: number;
}

/**
 * Anti-footprint footer block shared across all community pages.
 * Rotates the order of CommunitySeoSections and RelatedGuides per page
 * while keeping BrandBlock → AuthorBio always last (per style guide).
 */
export function CommunityFooterSeo({
  currentPath,
  author = "kevin",
  before,
  after,
  maxRelatedLinks = 4,
}: CommunityFooterSeoProps) {
  const { pick } = useAntiFootprint();

  // Two possible orderings of the rotatable sections
  const order = pick(["seo-first", "guides-first"] as const);

  const seoSections = useMemo(() => <CommunitySeoSections />, []);
  const relatedGuides = useMemo(
    () => <RelatedGuides currentPath={currentPath} maxLinks={maxRelatedLinks} />,
    [currentPath, maxRelatedLinks]
  );

  return (
    <div className="space-y-8 mt-8">
      {before}
      {order === "seo-first" ? (
        <>
          {seoSections}
          {relatedGuides}
        </>
      ) : (
        <>
          {relatedGuides}
          {seoSections}
        </>
      )}
      {after}
      <CommunityBrandBlock />
      <AuthorBio author={author} showCommunity={false} />
    </div>
  );
}
