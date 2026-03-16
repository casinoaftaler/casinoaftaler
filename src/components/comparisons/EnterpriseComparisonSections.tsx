import type { EnterpriseComparisonSection } from "@/lib/comparisonEnterpriseBuilder";

export function EnterpriseComparisonSections({ sections }: { sections: EnterpriseComparisonSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.title} className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">{section.title}</h2>
          {section.paragraphs.map((paragraph, index) => (
            <p key={`${section.title}-${index}`} className="mb-4 leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
          <div className="rounded-lg border border-border bg-muted/30 p-5">
            <p className="mb-2 font-semibold">Kort takeaway</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{section.takeaway}</p>
          </div>
        </section>
      ))}
    </>
  );
}

export default EnterpriseComparisonSections;
