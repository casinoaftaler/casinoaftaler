import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";

const linkClass = "text-primary underline hover:text-primary/80";

export interface EnterpriseReferenceLink {
  label: string;
  to: string;
}

export interface EnterpriseComparisonProfile {
  name: string;
  slug: string;
  brandArchetype: string;
  bonusDetail: string;
  catalogDetail: string;
  paymentDetail: string;
  payoutDetail: string;
  mobileDetail: string;
  loyaltyDetail: string;
  trustDetail: string;
  specialFeature: string;
}

export interface EnterpriseComparisonTopic {
  title: string;
  userIntent: string;
  marketAngle: string;
  casinoAEdge: string;
  casinoBEdge: string;
  operationalDifference: string;
  retentionAngle: string;
  antiFit: string;
  decisionSignal: string;
  takeaway: string;
  references?: EnterpriseReferenceLink[];
}

export interface EnterpriseComparisonSection {
  title: string;
  paragraphs: ReactNode[];
  takeaway: string;
}

const sectionOpeners = [
  "Det første lag i denne duel er vigtigt, fordi",
  "Set fra et enterprise-SEO og brugerfit-perspektiv er pointen, at",
  "Hvis man skærer al kampagnestøj væk, står én ting tilbage:",
  "I praksis er dette et af de områder, hvor fejlmatch opstår hyppigst, fordi",
  "Når sammenligningen bliver konkret i stedet for generisk, kan man se at",
];

const decisionOpeners = [
  "Den mest praktiske beslutningsregel er derfor enkel:",
  "På beslutningsniveau bør du tænke sådan her:",
  "Hvis man omsætter analysen til et reelt valg, bliver modellen denne:",
  "Den operative konklusion i netop dette lag er derfor:",
  "Det mest brugbare filter for spilleren er i sidste ende dette:",
];

function renderReferenceLinks(references?: EnterpriseReferenceLink[]) {
  if (!references?.length) {
    return null;
  }

  return (
    <>
      Hvis du vil gå et niveau dybere, er de mest relevante guider herfra{" "}
      {references.map((reference, index) => (
        <Fragment key={reference.to}>
          {index > 0 && (index === references.length - 1 ? " og " : ", ")}
          <Link to={reference.to} className={linkClass}>
            {reference.label}
          </Link>
        </Fragment>
      ))}
      .
    </>
  );
}

export function buildEnterpriseComparisonSections({
  casinoA,
  casinoB,
  topics,
}: {
  casinoA: EnterpriseComparisonProfile;
  casinoB: EnterpriseComparisonProfile;
  topics: EnterpriseComparisonTopic[];
}): EnterpriseComparisonSection[] {
  return topics.map((topic, index) => {
    const opener = sectionOpeners[index % sectionOpeners.length];
    const decisionOpener = decisionOpeners[index % decisionOpeners.length];
    const referenceLinks = renderReferenceLinks(topic.references);

    return {
      title: topic.title,
      takeaway: topic.takeaway,
      paragraphs: [
        (
          <>
            {opener} når brugere søger på {casinoA.name} vs {casinoB.name}, er intentionen sjældent bred research. De fleste er allerede nået forbi spørgsmålet om, hvorvidt begge brands er lovlige eller brugbare, og prøver i stedet at forstå {topic.userIntent}. {topic.marketAngle} {casinoA.name} går ind i dette felt som {casinoA.brandArchetype}, mens {casinoB.name} møder det som {casinoB.brandArchetype}. Derfor handler forskellen ikke kun om et enkelt tal i toppen af siden, men om hvilket produkt der reducerer mest friktion i den måde, spilleren faktisk bevæger sig gennem sine sessioner på.
          </>
        ),
        (
          <>
            På bonus- og onboarding-niveau bliver kontrasten mere praktisk end dramatisk. {casinoA.name} bygger sin værdi på {casinoA.bonusDetail}, og i denne kontekst er fordelen især, at {topic.casinoAEdge}. {casinoB.name} svarer igen med {casinoB.bonusDetail}, hvor styrken ligger i, at {topic.casinoBEdge}. For spilleren betyder det, at samme budget kan føles meget forskelligt afhængigt af, hvor hurtigt man kommer fra indbetaling til relevante spil, og hvor nemt det er at fortsætte, stoppe eller skifte retning uden at momentum går tabt.
          </>
        ),
        (
          <>
            Selve produktoplevelsen afgøres dog først rigtigt i laget efter velkomstteksten. {casinoA.name} står stærkest, når fokus ligger på {casinoA.catalogDetail} og {casinoA.specialFeature}. {casinoB.name} er stærkere, når spilleren lægger vægt på {casinoB.catalogDetail} og {casinoB.specialFeature}. {topic.operationalDifference} Det er netop her, at to brands med relativt ens bonusvilkår kan skabe to helt forskellige oplevelser: det ene føles som et præcist værktøj til en kendt opgave, mens det andet føles som en bredere ramme for flere mulige scenarier.
          </>
        ),
        (
          <>
            Over tid får drift og rutiner endnu større betydning end førstehåndsindtrykket. {casinoA.name} tilbyder {casinoA.paymentDetail}, {casinoA.payoutDetail} og {casinoA.mobileDetail}. {casinoB.name} matcher med {casinoB.paymentDetail}, {casinoB.payoutDetail} og {casinoB.mobileDetail}. {topic.retentionAngle} Når man vurderer en comparison-side på enterprise-niveau, er det disse gentagne mikrooplevelser – indbetaling, spilvalg, filterbrug, kampagner, hævning og tilbagevenden dagen efter – der afgør, om et brand føles som et naturligt hjem eller bare som endnu en konto i mængden.
          </>
        ),
        (
          <>
            Det er også derfor, anti-fit er lige så vigtigt som styrker. {topic.antiFit} Mange spillere vælger forkert, fordi de vurderer ud fra overskrifter og ikke ud fra faktisk adfærd. Hvis du sjældent bruger de funktioner, der udgør et brands største fordel, bliver selv et stærkt casino til et middelmådigt match. Omvendt kan et mere fokuseret brand levere højere tilfredshed, hvis det passer præcist til det mønster, du vender tilbage med uge efter uge.
          </>
        ),
        (
          <>
            {decisionOpener} {topic.decisionSignal} {casinoA.name} har i denne linse sin største styrke i {casinoA.loyaltyDetail} og {casinoA.trustDetail}. {casinoB.name} vinder mest, når værdien måles på {casinoB.loyaltyDetail} og {casinoB.trustDetail}. {referenceLinks} Det rigtige valg er derfor ikke nødvendigvis det brand, der ser mest imponerende ud i et enkelt datapunkt, men det brand der fjerner mest modstand i netop dette scenarie.
          </>
        ),
      ],
    };
  });
}
