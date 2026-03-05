import { useState, useRef, useCallback } from "react";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, SITE_URL, JONAS_SAME_AS } from "@/lib/seo";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { CasinoCard } from "@/components/CasinoCard";
import { CASINO_SCORES } from "@/lib/reviewScoring";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  CalendarDays,
  BookOpen,
  Gamepad2,
  Star,
  Tv,
  Heart,
  Zap,
  Trophy,
  Users,
  MapPin,
  ShieldCheck,
  Landmark,
  Phone,
  Play,
  Scale,
  ArrowRight,
  CheckCircle2,
  BadgeCheck,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import jonasImage from "@/assets/jonas-forfatter.webp";

const FEATURED_SLUGS = ["spildansknu", "spilleautomaten", "campobet"];

const casinoDescriptions: Record<string, { title: string; link: string }> = {
  spildansknu: {
    title: "SpilDanskNu",
    link: "/casino-anmeldelser/spildansknu",
  },
  spilleautomaten: {
    title: "Spilleautomaten",
    link: "/casino-anmeldelser/spilleautomaten",
  },
  campobet: {
    title: "Campobet",
    link: "/casino-anmeldelser/campobet",
  },
};

const faqs = [
  {
    question: "Hvem er Jonas / Fedesvinsejer?",
    answer:
      "Jonas er grundlæggeren af Casinoaftaler.dk og en dansk casino-streamer på Twitch. Han er kendt for sin energiske streamingstil, sit engagerede community og sin kat Fedesvin.",
  },
  {
    question: "Hvornår streamer Jonas?",
    answer:
      "Jonas streamer primært om aftenen fra kl. 20-21 og frem på Twitch. Hold øje med kanalen for de nyeste opdateringer.",
  },
  {
    question: "Hvad er Jonas' største gevinst?",
    answer:
      "Jonas' største slotgevinst er 12.278x på Sugar Rush 1000 – et øjeblik der er blevet legendarisk i community'et.",
  },
  {
    question: "Hvilke casinoer anbefaler Jonas?",
    answer:
      "Jonas foretrækker casinoer med no-sticky bonusser og et bredt spiludvalg. Se hans anbefalinger direkte her på Casinoaftaler.dk.",
  },
];

/** Static list of Jonas' articles for the "Artikler skrevet af Jonas" section */
const jonasArticles = [
  // Hub-sider
  { title: "Bedste Casino Bonus i Danmark 2026", path: "/casino-bonus", category: "Guide", date: "17-02-2026", readTime: "12 min.", excerpt: "Komplet overblik over de bedste casino bonusser hos danske online casinoer." },
  { title: "Nye Casinoer i Danmark 2026", path: "/nye-casinoer", category: "Guide", date: "16-02-2026", readTime: "12 min.", excerpt: "Vi tester og anmelder de nyeste danske online casinoer løbende." },
  { title: "Casinospil – Komplet Guide", path: "/casinospil", category: "Guide", date: "13-02-2026", readTime: "10 min.", excerpt: "Overblik over alle casinospil – slots, bordspil, live casino og mere." },
  { title: "Live Casino Guide", path: "/live-casino", category: "Guide", date: "11-02-2026", readTime: "15 min.", excerpt: "Oplev live dealers og ægte casinostemning fra din sofa." },
  { title: "Casino Anmeldelser", path: "/casino-anmeldelser", category: "Guide", date: "14-02-2026", readTime: "18 min.", excerpt: "Alle vores dybdegående casino-anmeldelser samlet ét sted." },
  { title: "Top 10 Casino Online", path: "/top-10-casino-online", category: "Guide", date: "13-02-2026", readTime: "12 min.", excerpt: "De 10 bedste online casinoer i Danmark – testet og rangeret." },
  { title: "Sådan Tester Vi Casinoer", path: "/saadan-tester-vi-casinoer", category: "Guide", date: "15-02-2026", readTime: "8 min.", excerpt: "Vores metode og kriterier for casino-anmeldelser." },
  // Casino Bonus cluster
  { title: "Omsætningskrav Forklaret", path: "/omsaetningskrav", category: "Guide", date: "17-02-2026", readTime: "9 min.", excerpt: "Forstå omsætningskrav og lær at vælge bonusser med lave krav." },
  { title: "No Sticky Bonus Guide", path: "/no-sticky-bonus", category: "Guide", date: "17-02-2026", readTime: "7 min.", excerpt: "Alt om no-sticky bonusser og hvorfor de er populære blandt spillere." },
  { title: "Velkomstbonus Guide 2026", path: "/velkomstbonus", category: "Guide", date: "17-02-2026", readTime: "8 min.", excerpt: "Find de bedste velkomstbonusser og forstå vilkår og betingelser." },
  { title: "Free Spins Guide", path: "/free-spins", category: "Guide", date: "11-02-2026", readTime: "12 min.", excerpt: "Alt om free spins – typer, vilkår og de bedste tilbud." },
  { title: "Bonus Uden Indbetaling", path: "/bonus-uden-indbetaling", category: "Guide", date: "17-02-2026", readTime: "7 min.", excerpt: "Få casino bonus helt uden at indsætte penge – se aktuelle tilbud." },
  { title: "Bonus Uden Omsætningskrav", path: "/bonus-uden-omsaetningskrav", category: "Guide", date: "11-02-2026", readTime: "10 min.", excerpt: "Find bonusser uden omsætningskrav hos danske casinoer." },
  { title: "Indskudsbonus Guide", path: "/indskudsbonus", category: "Guide", date: "11-02-2026", readTime: "12 min.", excerpt: "Alt om indskudsbonusser – typer, vilkår og de bedste tilbud." },
  { title: "Sticky Bonus Guide", path: "/sticky-bonus", category: "Guide", date: "11-02-2026", readTime: "12 min.", excerpt: "Forstå sticky bonusser og forskellen til no-sticky." },
  // Casinospil guides
  { title: "Blackjack Regler & Guide", path: "/casinospil/blackjack", category: "Guide", date: "02-03-2026", readTime: "40 min.", excerpt: "Komplet guide til blackjack regler, strategi og varianter." },
  { title: "Amerikansk Blackjack Guide", path: "/casinospil/blackjack/amerikansk-blackjack", category: "Guide", date: "02-03-2026", readTime: "12 min.", excerpt: "Regler, strategi og forskelle for amerikansk blackjack." },
  { title: "Europæisk Blackjack Guide", path: "/casinospil/blackjack/europaeisk-blackjack", category: "Guide", date: "02-03-2026", readTime: "12 min.", excerpt: "Europæisk blackjack – regler, no-peek og strategi." },
  { title: "Double Exposure Blackjack", path: "/casinospil/blackjack/double-exposure-blackjack", category: "Guide", date: "02-03-2026", readTime: "10 min.", excerpt: "Double Exposure – begge dealerkort synlige, tilpasset strategi." },
  { title: "Spanish 21 Guide", path: "/casinospil/blackjack/spanish-21", category: "Guide", date: "02-03-2026", readTime: "11 min.", excerpt: "Spanish 21 – liberale regler, bonusudbetalinger og strategi." },
  { title: "Martingale System", path: "/casinospil/blackjack/martingale-system", category: "Guide", date: "02-03-2026", readTime: "10 min.", excerpt: "Martingale-systemet forklaret – dobling ved tab i blackjack." },
  { title: "Fibonacci System", path: "/casinospil/blackjack/fibonacci-system", category: "Guide", date: "02-03-2026", readTime: "10 min.", excerpt: "Fibonacci-systemet – progressiv betting baseret på talrækken." },
  { title: "D'Alembert System", path: "/casinospil/blackjack/dalembert-system", category: "Guide", date: "02-03-2026", readTime: "10 min.", excerpt: "D'Alembert-systemet – forsigtig progressiv strategi til blackjack." },
  { title: "Roulette Regler & Guide", path: "/casinospil/roulette", category: "Guide", date: "15-02-2026", readTime: "10 min.", excerpt: "Lær roulette regler, væddemålstyper og varianter." },
  { title: "Fransk Roulette Guide", path: "/casinospil/roulette/fransk-roulette", category: "Guide", date: "02-03-2026", readTime: "11 min.", excerpt: "Fransk roulette – La Partage, En Prison og lav husfordel." },
  { title: "Amerikansk Roulette Guide", path: "/casinospil/roulette/amerikansk-roulette", category: "Guide", date: "02-03-2026", readTime: "10 min.", excerpt: "Amerikansk roulette – dobbelt nul, odds og strategier." },
  { title: "Labouchere Roulette System", path: "/casinospil/roulette/labouchere-roulette", category: "Guide", date: "02-03-2026", readTime: "10 min.", excerpt: "Labouchere-systemet – avanceret progressiv roulette-strategi." },
  { title: "D'Alembert Roulette System", path: "/casinospil/roulette/dalembert-roulette", category: "Guide", date: "02-03-2026", readTime: "10 min.", excerpt: "D'Alembert-systemet anvendt til roulette – forsigtig progression." },
  { title: "Poker Guide", path: "/casinospil/poker", category: "Guide", date: "02-03-2026", readTime: "38 min.", excerpt: "Komplet guide til online poker hos danske casinoer." },
  { title: "Texas Hold'em Guide", path: "/casinospil/poker/texas-holdem", category: "Guide", date: "02-03-2026", readTime: "14 min.", excerpt: "Texas Hold'em – regler, positioner og strategier." },
  { title: "Omaha Poker Guide", path: "/casinospil/poker/omaha", category: "Guide", date: "02-03-2026", readTime: "12 min.", excerpt: "Omaha Poker – fire hulkort, pot-limit og strategi." },
  { title: "Video Poker Guide", path: "/casinospil/poker/video-poker", category: "Guide", date: "02-03-2026", readTime: "12 min.", excerpt: "Video poker – Jacks or Better, Deuces Wild og RTP-analyse." },
  { title: "Poker Strategi Guide", path: "/casinospil/poker/strategi", category: "Guide", date: "02-03-2026", readTime: "13 min.", excerpt: "Pokerstrategi – odds, position, bluffing og bankroll management." },
  { title: "Three Card Poker Guide", path: "/casinospil/poker/three-card-poker", category: "Guide", date: "02-03-2026", readTime: "11 min.", excerpt: "Three Card Poker – regler, Pair Plus og optimal strategi." },
  { title: "Caribbean Stud Poker Guide", path: "/casinospil/poker/caribbean-stud", category: "Guide", date: "02-03-2026", readTime: "11 min.", excerpt: "Caribbean Stud Poker – regler, progressiv jackpot og strategi." },
  { title: "Craps Guide", path: "/casinospil/craps", category: "Guide", date: "15-02-2026", readTime: "9 min.", excerpt: "Lær craps regler, væddemål og strategi for begyndere." },
  { title: "Online Lotteri Guide", path: "/casinospil/online-lotteri", category: "Guide", date: "15-02-2026", readTime: "7 min.", excerpt: "Alt om online lotteri hos danske casinoer og operatører." },
  { title: "Game Shows Guide", path: "/casinospil/game-shows", category: "Guide", date: "15-02-2026", readTime: "8 min.", excerpt: "Oplev live game shows som Crazy Time og Dream Catcher." },
  { title: "Spillemaskiner Guide", path: "/casinospil/spillemaskiner", category: "Guide", date: "15-02-2026", readTime: "12 min.", excerpt: "Alt om online spillemaskiner – typer, RTP og tips." },
  { title: "Spillemaskiner med Høj RTP", path: "/casinospil/spillemaskiner/hoej-rtp", category: "Guide", date: "15-02-2026", readTime: "10 min.", excerpt: "Find de bedste spillemaskiner med høj tilbagebetalingsprocent." },
  // Slot guides (Jonas)
  { title: "Book of Dead – Komplet Guide", path: "/casinospil/spillemaskiner/book-of-dead", category: "Slot Guide", date: "18-02-2026", readTime: "24 min.", excerpt: "Alt om Book of Dead – RTP, volatilitet, free spins og strategi." },
  { title: "Razor Shark – Komplet Guide", path: "/casinospil/spillemaskiner/razor-shark", category: "Slot Guide", date: "18-02-2026", readTime: "24 min.", excerpt: "Razor Shark – Mystery Stacks, Nudge & Reveal og volatilitetsanalyse." },
  { title: "Gates of Olympus – Komplet Guide", path: "/casinospil/spillemaskiner/gates-of-olympus", category: "Slot Guide", date: "18-02-2026", readTime: "26 min.", excerpt: "Gates of Olympus – multiplikator-mekanik, RTP og free spins strategi." },
  { title: "Sweet Bonanza – Komplet Guide", path: "/casinospil/spillemaskiner/sweet-bonanza", category: "Slot Guide", date: "18-02-2026", readTime: "25 min.", excerpt: "Sweet Bonanza – tumble-mekanik, multiplikatorer og ante bet." },
  { title: "Dead or Alive 2 – Komplet Guide", path: "/casinospil/spillemaskiner/dead-or-alive-2", category: "Slot Guide", date: "18-02-2026", readTime: "26 min.", excerpt: "Dead or Alive 2 – sticky wilds, tre free spins-modi og volatilitet." },
  { title: "Bonanza Megaways – Komplet Guide", path: "/casinospil/spillemaskiner/bonanza", category: "Slot Guide", date: "18-02-2026", readTime: "22 min.", excerpt: "Bonanza Megaways – den originale Megaways-slot analyseret." },
  { title: "Legacy of Dead – Komplet Guide", path: "/casinospil/spillemaskiner/legacy-of-dead", category: "Slot Guide", date: "18-02-2026", readTime: "19 min.", excerpt: "Legacy of Dead – expanding symbols, free spins og RTP-analyse." },
  { title: "Eye of Horus – Komplet Guide", path: "/casinospil/spillemaskiner/eye-of-horus", category: "Slot Guide", date: "18-02-2026", readTime: "18 min.", excerpt: "Eye of Horus – egyptisk tema, free spins og symbol-opgraderinger." },
  { title: "Money Train 3 – Komplet Guide", path: "/casinospil/spillemaskiner/money-train-3", category: "Slot Guide", date: "18-02-2026", readTime: "20 min.", excerpt: "Money Train 3 – Respin-feature, persistente symboler og max win." },
  { title: "The Dog House – Komplet Guide", path: "/casinospil/spillemaskiner/the-dog-house", category: "Slot Guide", date: "18-02-2026", readTime: "18 min.", excerpt: "The Dog House – sticky wilds, multiplikatorer og free spins." },
  { title: "Sugar Rush – Komplet Guide", path: "/casinospil/spillemaskiner/sugar-rush", category: "Slot Guide", date: "18-02-2026", readTime: "18 min.", excerpt: "Sugar Rush – cluster pays, multiplikatorer og volatilitetsanalyse." },
  // Live Casino guides (Jonas)
  { title: "Live Blackjack Guide", path: "/live-casino/live-blackjack", category: "Guide", date: "18-02-2026", readTime: "22 min.", excerpt: "Komplet guide til live blackjack – regler, strategi og de bedste borde." },
  { title: "Live Roulette Guide", path: "/live-casino/live-roulette", category: "Guide", date: "18-02-2026", readTime: "20 min.", excerpt: "Alt om live roulette – varianter, odds og de bedste udbydere." },
  { title: "Live Baccarat Guide", path: "/live-casino/live-baccarat", category: "Guide", date: "18-02-2026", readTime: "18 min.", excerpt: "Live baccarat – regler, strategi og squeeze-funktioner." },
  { title: "Lightning Roulette Guide", path: "/live-casino/lightning-roulette", category: "Guide", date: "18-02-2026", readTime: "18 min.", excerpt: "Lightning Roulette – lyn-multiplikatorer, RTP og strategi." },
  { title: "Monopoly Live Guide", path: "/live-casino/monopoly-live", category: "Guide", date: "18-02-2026", readTime: "18 min.", excerpt: "Monopoly Live – game show med bonusrunder og Mr. Monopoly." },
  // Nye Casinoer cluster
  { title: "Nye Casinoer 2026 – Komplet Liste", path: "/nye-casinoer/2026", category: "Guide", date: "17-02-2026", readTime: "14 min.", excerpt: "Alle nye danske casinoer lanceret i 2026 – testet og vurderet." },
  { title: "Bedste Nye Casinoer", path: "/nye-casinoer/bedste", category: "Guide", date: "16-02-2026", readTime: "14 min.", excerpt: "Vores topvalg blandt nye casinoer i Danmark 2026." },
  { title: "Nye Casinoer med Dansk Licens", path: "/nye-casinoer/dansk-licens", category: "Guide", date: "16-02-2026", readTime: "15 min.", excerpt: "Nye casinoer med officiel dansk spillelicens fra Spillemyndigheden." },
  { title: "Nye Casinoer med MitID", path: "/nye-casinoer/mitid", category: "Guide", date: "16-02-2026", readTime: "8 min.", excerpt: "Nye casinoer med hurtig MitID-verifikation." },
  { title: "Nye Casinoer med Hurtig Udbetaling", path: "/nye-casinoer/hurtig-udbetaling", category: "Guide", date: "16-02-2026", readTime: "10 min.", excerpt: "Nye casinoer med de hurtigste udbetalingstider i Danmark." },
  { title: "Nye Casinoer med Lav Wagering", path: "/nye-casinoer/lav-wagering", category: "Guide", date: "16-02-2026", readTime: "10 min.", excerpt: "Find nye casinoer med lave omsætningskrav på bonusser." },
  { title: "Nye Casinoer med Trustly", path: "/nye-casinoer/trustly", category: "Guide", date: "16-02-2026", readTime: "8 min.", excerpt: "Nye casinoer med Trustly som betalingsmetode." },
  { title: "Nye Casinoer Uden ROFUS", path: "/nye-casinoer/uden-rofus", category: "Guide", date: "16-02-2026", readTime: "14 min.", excerpt: "Information om nye casinoer uden ROFUS-registrering." },
  { title: "Nye Casinoer med Bonus Uden Indbetaling", path: "/nye-casinoer/bonus-uden-indbetaling", category: "Guide", date: "16-02-2026", readTime: "9 min.", excerpt: "Nye casinoer der tilbyder bonus uden indbetaling." },
  { title: "Nye vs. Etablerede Casinoer", path: "/nye-casinoer/vs-etablerede", category: "Guide", date: "16-02-2026", readTime: "11 min.", excerpt: "Sammenligning af nye og etablerede casinoer i Danmark." },
  // Casinoer cluster
  { title: "Casinoer med Hurtig Udbetaling", path: "/casinoer/hurtig-udbetaling", category: "Guide", date: "17-02-2026", readTime: "22 min.", excerpt: "Find casinoer med de hurtigste udbetalinger i Danmark." },
  { title: "Casinoer med Høj RTP", path: "/casinoer/hoej-rtp", category: "Guide", date: "17-02-2026", readTime: "22 min.", excerpt: "Casinoer med de bedste tilbagebetalingsprocenter." },
  { title: "Crypto Casino Guide", path: "/casinoer/crypto-casino", category: "Guide", date: "17-02-2026", readTime: "22 min.", excerpt: "Alt om kryptovaluta-casinoer, Bitcoin-betalinger og sikkerhed." },
  { title: "Licenserede Casinoer", path: "/casino-licenser", category: "Guide", date: "17-02-2026", readTime: "22 min.", excerpt: "Komplet liste over casinoer med dansk licens." },
  { title: "VR Casinoer Guide", path: "/casinoer/vr-casinoer", category: "Guide", date: "01-02-2026", readTime: "21 min.", excerpt: "Alt om virtual reality casinoer og fremtidens spiloplevelse." },
  { title: "Mobil Casinoer Guide", path: "/casinoer/mobil-casinoer", category: "Guide", date: "01-02-2026", readTime: "22 min.", excerpt: "De bedste mobilvenlige casinoer i Danmark." },
  { title: "Spil Casino for Sjov", path: "/casinoer/spil-casino-for-sjov", category: "Guide", date: "01-02-2026", readTime: "21 min.", excerpt: "Prøv casinospil gratis uden risiko – komplet guide." },
  { title: "Casino og Skat Guide", path: "/casinoer/casino-og-skat", category: "Guide", date: "01-02-2026", readTime: "22 min.", excerpt: "Alt om skat på casinogevinster i Danmark." },
  // Anmeldelser
  { title: "SpilDanskNu Anmeldelse", path: "/casino-anmeldelser/spildansknu", category: "Anmeldelse", date: "13-02-2026", readTime: "14 min.", excerpt: "Dybdegående anmeldelse af SpilDanskNu med bonus, spil og brugeroplevelse." },
  { title: "Spilleautomaten Anmeldelse", path: "/casino-anmeldelser/spilleautomaten", category: "Anmeldelse", date: "13-02-2026", readTime: "12 min.", excerpt: "Anmeldelse af Spilleautomaten med 3.000+ spil og hurtige udbetalinger." },
  { title: "Campobet Anmeldelse", path: "/casino-anmeldelser/campobet", category: "Anmeldelse", date: "17-02-2026", readTime: "9 min.", excerpt: "Campobet kombinerer casino og sportsbetting under dansk licens." },
  { title: "Betinia Anmeldelse", path: "/casino-anmeldelser/betinia", category: "Anmeldelse", date: "13-02-2026", readTime: "18 min.", excerpt: "Betinia – moderne casino med stærkt bonusprogram." },
  { title: "Swift Casino Anmeldelse", path: "/casino-anmeldelser/swift-casino", category: "Anmeldelse", date: "13-02-2026", readTime: "15 min.", excerpt: "Swift Casino – hurtige udbetalinger og moderne design." },
  { title: "Luna Casino Anmeldelse", path: "/casino-anmeldelser/luna-casino", category: "Anmeldelse", date: "13-02-2026", readTime: "16 min.", excerpt: "Luna Casino – unikt tema og solidt spiludvalg." },
  { title: "bet365 Casino Anmeldelse", path: "/casino-anmeldelser/bet365", category: "Anmeldelse", date: "17-02-2026", readTime: "18 min.", excerpt: "Er bet365 det bedste allround casino i Danmark? Vi tester alt." },
  { title: "Betano Anmeldelse", path: "/casino-anmeldelser/betano", category: "Anmeldelse", date: "17-02-2026", readTime: "19 min.", excerpt: "Betano – nyt dansk casino med fokus på sport og casino." },
  { title: "Danske Spil Anmeldelse", path: "/casino-anmeldelser/danske-spil", category: "Anmeldelse", date: "15-02-2026", readTime: "22 min.", excerpt: "Danske Spil Casino – Danmarks største spiludbyder testet." },
  { title: "ComeOn Anmeldelse", path: "/casino-anmeldelser/comeon", category: "Anmeldelse", date: "15-02-2026", readTime: "18 min.", excerpt: "ComeOn Casino – sport og casino samlet under ét tag." },
  { title: "GetLucky Anmeldelse", path: "/casino-anmeldelser/getlucky", category: "Anmeldelse", date: "15-02-2026", readTime: "17 min.", excerpt: "GetLucky Casino – moderne design og hurtigt spil." },
  { title: "Mr Green Anmeldelse", path: "/casino-anmeldelser/mr-green", category: "Anmeldelse", date: "15-02-2026", readTime: "20 min.", excerpt: "Mr Green – dansk licens, flot design og gamification-features." },
  { title: "Mr Vegas Anmeldelse", path: "/casino-anmeldelser/mr-vegas", category: "Anmeldelse", date: "15-02-2026", readTime: "18 min.", excerpt: "Mr Vegas Casino – adventure-tema med loyalitetsprogram." },
  { title: "LeoVegas Anmeldelse", path: "/casino-anmeldelser/leovegas", category: "Anmeldelse", date: "15-02-2026", readTime: "20 min.", excerpt: "LeoVegas – mobilcasino med bredt spiludvalg og dansk licens." },
  { title: "Expekt Anmeldelse", path: "/casino-anmeldelser/expekt", category: "Anmeldelse", date: "15-02-2026", readTime: "17 min.", excerpt: "Expekt – sport og casino med nordisk fokus." },
  { title: "888 Casino Anmeldelse", path: "/casino-anmeldelser/888-casino", category: "Anmeldelse", date: "15-02-2026", readTime: "19 min.", excerpt: "888 Casino – internationalt brand med dansk licens." },
  { title: "Unibet Anmeldelse", path: "/casino-anmeldelser/unibet", category: "Anmeldelse", date: "15-02-2026", readTime: "20 min.", excerpt: "Komplet anmeldelse af Unibet – casino, sports og poker samlet." },
  { title: "Royal Casino Anmeldelse", path: "/casino-anmeldelser/royal-casino", category: "Anmeldelse", date: "15-02-2026", readTime: "19 min.", excerpt: "Royal Casino – dansk casino med fokus på luksus og kvalitet." },
  { title: "Maria Casino Anmeldelse", path: "/casino-anmeldelser/maria-casino", category: "Anmeldelse", date: "15-02-2026", readTime: "18 min.", excerpt: "Maria Casino – klassisk dansk online casino med bredt udvalg." },
  { title: "Kapow Casino Anmeldelse", path: "/casino-anmeldelser/kapow-casino", category: "Anmeldelse", date: "15-02-2026", readTime: "17 min.", excerpt: "Kapow Casino – nyt dansk casino med frisk design." },
  { title: "NordicBet Anmeldelse", path: "/casino-anmeldelser/nordicbet", category: "Anmeldelse", date: "15-02-2026", readTime: "18 min.", excerpt: "NordicBet – nordisk sportsbook med stærkt casino og dansk licens." },
  { title: "One Casino Anmeldelse", path: "/casino-anmeldelser/one-casino", category: "Anmeldelse", date: "15-02-2026", readTime: "16 min.", excerpt: "One Casino – simpelt og brugervenligt online casino." },
  { title: "Spilnu Anmeldelse", path: "/casino-anmeldelser/spilnu", category: "Anmeldelse", date: "15-02-2026", readTime: "17 min.", excerpt: "Spilnu – bingo og casino under Danske Spil-koncernen." },
  { title: "Stake Casino Anmeldelse", path: "/casino-anmeldelser/stake-casino", category: "Anmeldelse", date: "15-02-2026", readTime: "18 min.", excerpt: "Stake Casino – crypto-casino med stor spilflade." },
  { title: "Casinostuen Anmeldelse", path: "/casino-anmeldelser/casinostuen", category: "Anmeldelse", date: "17-02-2026", readTime: "16 min.", excerpt: "Casinostuen – klassisk dansk casino med fokus på spilleautomater." },
  { title: "PokerStars Anmeldelse", path: "/casino-anmeldelser/pokerstars", category: "Anmeldelse", date: "17-02-2026", readTime: "19 min.", excerpt: "PokerStars – verdens største pokersite med dansk licens." },
  { title: "bwin Anmeldelse", path: "/casino-anmeldelser/bwin", category: "Anmeldelse", date: "15-02-2026", readTime: "17 min.", excerpt: "bwin – sport og casino fra en af Europas største operatører." },
  { title: "MarathonBet Anmeldelse", path: "/casino-anmeldelser/marathonbet", category: "Anmeldelse", date: "15-02-2026", readTime: "16 min.", excerpt: "MarathonBet – konkurrencedygtige odds og casino-supplement." },
  { title: "Videoslots Anmeldelse", path: "/casino-anmeldelser/videoslots", category: "Anmeldelse", date: "02-03-2026", readTime: "18 min.", excerpt: "Videoslots – 5.000+ spil, Battle of Slots og dansk licens." },
  // Bonus-cluster
  { title: "Reload Bonus Guide", path: "/reload-bonus", category: "Guide", date: "02-03-2026", readTime: "8 min.", excerpt: "Alt om reload bonusser – hvad de er og de bedste tilbud." },
  { title: "Cashback Bonus Guide", path: "/cashback-bonus", category: "Guide", date: "02-03-2026", readTime: "8 min.", excerpt: "Cashback bonusser forklaret – få penge retur på dine tab." },
  // Andre hub-sider
  { title: "Casinoer – Komplet Oversigt", path: "/casinoer", category: "Guide", date: "02-03-2026", readTime: "15 min.", excerpt: "Komplet oversigt over alle anbefalede danske online casinoer." },
  { title: "Free Spins i Dag", path: "/free-spins-i-dag", category: "Guide", date: "02-03-2026", readTime: "6 min.", excerpt: "Dagligt opdaterede free spins tilbud hos danske casinoer." },
];

const expertiseItems = [
  { icon: CalendarDays, label: "4+ års erfaring med online casino" },
  { icon: CheckCircle2, label: "Testet 50+ danske casinoer" },
  { icon: FileText, label: "Speciale i bonusvilkår & omsætningskrav" },
  { icon: Tv, label: "Aktiv Twitch-streamer siden 2021" },
  { icon: ShieldCheck, label: "Fokus på ansvarligt spil" },
];

/** Person JSON-LD schema for Jonas – canonical definition matching buildPersonEntity */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/forfatter/jonas#person`,
  name: "Jonas Theill",
  alternateName: "Fedesvinsejer",
  url: `${SITE_URL}/forfatter/jonas`,
  image: `${SITE_URL}/jonas-avatar.webp`,
  jobTitle: "Casino Bonus Ekspert",
  knowsAbout: ["online casino", "iGaming", "casino bonus", "spillemaskiner", "RTP", "ansvarligt spil"],
  nationality: { "@type": "Country", name: "Denmark" },
  worksFor: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Casinoaftaler.dk",
    url: SITE_URL,
  },
  memberOf: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
  },
  sameAs: JONAS_SAME_AS,
  description:
    "Jonas er grundlæggeren af Casinoaftaler.dk og en af Danmarks mest engagerende casino-streamere med over 4 års erfaring.",
};


const casinoReviewVideos = [
  { videoId: "_hHQkRwUzoU", title: "SpilDanskNu Anmeldelse", path: "/casino-anmeldelser/spildansknu", category: "Anmeldelse" },
  { videoId: "L5JtdRVTNwk", title: "Spilleautomaten Anmeldelse", path: "/casino-anmeldelser/spilleautomaten", category: "Anmeldelse" },
  { videoId: "s7S_GRsKfK4", title: "Campobet Anmeldelse", path: "/casino-anmeldelser/campobet", category: "Anmeldelse" },
  { videoId: "GyqEjKQiCJU", title: "Betinia Anmeldelse", path: "/casino-anmeldelser/betinia", category: "Anmeldelse" },
  { videoId: "BVYnQxwqHG0", title: "Swift Casino Anmeldelse", path: "/casino-anmeldelser/swift-casino", category: "Anmeldelse" },
  { videoId: "14tI5vWShvs", title: "Luna Casino Anmeldelse", path: "/casino-anmeldelser/luna-casino", category: "Anmeldelse" },
  { videoId: "vb5nT5UGk8c", title: "bet365 Casino Anmeldelse", path: "/casino-anmeldelser/bet365", category: "Anmeldelse" },
  { videoId: "Uu3NBZzt-Sk", title: "Betano Anmeldelse", path: "/casino-anmeldelser/betano", category: "Anmeldelse" },
  { videoId: "AuYbcBpBOxY", title: "Danske Spil Anmeldelse", path: "/casino-anmeldelser/danske-spil", category: "Anmeldelse" },
  { videoId: "tW_E0RmzSHg", title: "ComeOn Anmeldelse", path: "/casino-anmeldelser/comeon", category: "Anmeldelse" },
  { videoId: "N1MyxsYcmMk", title: "GetLucky Anmeldelse", path: "/casino-anmeldelser/getlucky", category: "Anmeldelse" },
  { videoId: "htCLh4TK6tA", title: "Mr Green Anmeldelse", path: "/casino-anmeldelser/mr-green", category: "Anmeldelse" },
  { videoId: "vSkzKvgZT_0", title: "Mr Vegas Anmeldelse", path: "/casino-anmeldelser/mr-vegas", category: "Anmeldelse" },
  { videoId: "8_nQyVEJEcU", title: "LeoVegas Anmeldelse", path: "/casino-anmeldelser/leovegas", category: "Anmeldelse" },
  { videoId: "TzSmePJgd84", title: "Expekt Anmeldelse", path: "/casino-anmeldelser/expekt", category: "Anmeldelse" },
  { videoId: "crhpDPocTrQ", title: "888 Casino Anmeldelse", path: "/casino-anmeldelser/888-casino", category: "Anmeldelse" },
  { videoId: "53m8Fk6tmw8", title: "Unibet Anmeldelse", path: "/casino-anmeldelser/unibet", category: "Anmeldelse" },
  { videoId: "6R3Zt_ABaAo", title: "Royal Casino Anmeldelse", path: "/casino-anmeldelser/royal-casino", category: "Anmeldelse" },
  { videoId: "o9m02b_cAnE", title: "Maria Casino Anmeldelse", path: "/casino-anmeldelser/maria-casino", category: "Anmeldelse" },
  { videoId: "xo9vTabQgE8", title: "Videoslots Anmeldelse", path: "/casino-anmeldelser/videoslots", category: "Anmeldelse" },
];

function CasinoReviewVideosSection() {
  const [videoPage, setVideoPage] = useState(0);
  const VIDEOS_PER_PAGE = 8;
  const totalVideoPages = Math.ceil(casinoReviewVideos.length / VIDEOS_PER_PAGE);
  const visibleVideos = casinoReviewVideos.slice(videoPage * VIDEOS_PER_PAGE, (videoPage + 1) * VIDEOS_PER_PAGE);

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tv className="h-7 w-7 text-primary" />
          <h2 className="text-3xl font-bold">Casino Anmeldelse-videoer</h2>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground mr-2">
            {videoPage + 1} / {totalVideoPages}
          </span>
          <button
            onClick={() => setVideoPage((p) => Math.max(0, p - 1))}
            disabled={videoPage === 0}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Forrige videoer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setVideoPage((p) => Math.min(totalVideoPages - 1, p + 1))}
            disabled={videoPage >= totalVideoPages - 1}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Næste videoer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Jonas gennemgår hvert casino indefra – navigation, spiludvalg, bonusser og features. Se videoen og læs den fulde anmeldelse.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleVideos.map((video) => (
          <Link
            key={video.videoId}
            to={video.path}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              <img
                src={`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 shadow-lg">
                  <Play className="h-5 w-5 fill-primary-foreground text-primary-foreground ml-0.5" />
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-4">
              <Badge variant="secondary" className="w-fit text-xs">
                {video.category}
              </Badge>
              <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                {video.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Forfatter() {
  const { data: siteSettings } = useSiteSettings();
  const { data: casinos } = useCasinos();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const [articlePage, setArticlePage] = useState(0);
  const heroBackgroundImage = siteSettings?.hero_background;
  const ARTICLES_PER_PAGE = 8;
  const totalArticlePages = Math.ceil(jonasArticles.length / ARTICLES_PER_PAGE);
  const visibleArticles = jonasArticles.slice(
    articlePage * ARTICLES_PER_PAGE,
    (articlePage + 1) * ARTICLES_PER_PAGE
  );
  const prevArticlePage = useCallback(() => setArticlePage((p) => Math.max(0, p - 1)), []);
  const nextArticlePage = useCallback(() => setArticlePage((p) => Math.min(totalArticlePages - 1, p + 1)), [totalArticlePages]);

  const featuredCasinos = (casinos ?? []).filter((c) =>
    FEATURED_SLUGS.includes(c.slug)
  );

  const mapCasino = (casino: (typeof featuredCasinos)[0]) => ({
    id: casino.id,
    name: casino.name,
    slug: casino.slug,
    rating: CASINO_SCORES[casino.slug]?.total ?? Number(casino.rating),
    bonusTitle: casino.bonus_title,
    bonusAmount: casino.bonus_amount,
    bonusType: casino.bonus_type,
    wageringRequirements: casino.wagering_requirements,
    validity: casino.validity,
    minDeposit: casino.min_deposit,
    payoutTime: casino.payout_time,
    freeSpins: casino.free_spins,
    features: casino.features ?? [],
    pros: casino.pros ?? [],
    cons: casino.cons ?? [],
    description: casino.description ?? "",
    isRecommended: casino.is_recommended,
    isHot: casino.is_hot,
    logoUrl: casino.logo_url,
    affiliateUrl: casino.affiliate_url,
    gameProviders: casino.game_providers ?? [],
  });

  const faqJsonLd = buildFaqSchema(faqs);

  // All Jonas videos for schema
  const allJonasVideos = [
    // Guide videos
    { id: "WOowRz6hnH8", title: "Hvad er en No-Sticky Bonus?" },
    { id: "yUAcefgYfkc", title: "Hvad er en Sticky Bonus?" },
    { id: "q4jeGo9TPEk", title: "Hvad er Free Spins?" },
    { id: "3tXFTjmgdcE", title: "Hvad er omsætningskrav?" },
    { id: "oK5PvebkvGY", title: "Hvad er en Velkomstbonus?" },
    { id: "hMHHVA6vH0Y", title: "Hvad er en Indskudsbonus?" },
    { id: "7JQ3nFTasoQ", title: "Hvad er bonus uden omsætningskrav?" },
    { id: "XhbLda1HyOs", title: "Hvad er bonus uden indbetaling?" },
    // Casino review videos
    { id: "_hHQkRwUzoU", title: "SpilDanskNu Anmeldelse" },
    { id: "L5JtdRVTNwk", title: "Spilleautomaten Anmeldelse" },
    { id: "s7S_GRsKfK4", title: "Campobet Anmeldelse" },
    { id: "GyqEjKQiCJU", title: "Betinia Anmeldelse" },
    { id: "BVYnQxwqHG0", title: "Swift Casino Anmeldelse" },
    { id: "14tI5vWShvs", title: "Luna Casino Anmeldelse" },
    { id: "vb5nT5UGk8c", title: "bet365 Casino Anmeldelse" },
    { id: "Uu3NBZzt-Sk", title: "Betano Anmeldelse" },
    { id: "AuYbcBpBOxY", title: "Danske Spil Anmeldelse" },
    { id: "tW_E0RmzSHg", title: "ComeOn Anmeldelse" },
    { id: "N1MyxsYcmMk", title: "GetLucky Anmeldelse" },
    { id: "htCLh4TK6tA", title: "Mr Green Anmeldelse" },
    { id: "vSkzKvgZT_0", title: "Mr Vegas Anmeldelse" },
    { id: "8_nQyVEJEcU", title: "LeoVegas Anmeldelse" },
    { id: "TzSmePJgd84", title: "Expekt Anmeldelse" },
    { id: "crhpDPocTrQ", title: "888 Casino Anmeldelse" },
    { id: "53m8Fk6tmw8", title: "Unibet Anmeldelse" },
    { id: "6R3Zt_ABaAo", title: "Royal Casino Anmeldelse" },
    { id: "o9m02b_cAnE", title: "Maria Casino Anmeldelse" },
    { id: "xo9vTabQgE8", title: "Videoslots Anmeldelse" },
    // Highlights
    { id: "ZKDrnL7373o", title: "Jonas' bedste highlights" },
  ];

  const videoSchemas = allJonasVideos.map((v, i) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${SITE_URL}/forfatter/jonas#video-${i + 1}`,
    name: `${v.title} – Casinoaftaler.dk`,
    description: `Jonas gennemgår ${v.title.toLowerCase()} på Casinoaftaler.dk.`,
    thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`,
    uploadDate: "2026-02-18T12:00:00+01:00",
    duration: "PT2M",
    embedUrl: `https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`,
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Casinoaftaler.dk",
      url: SITE_URL,
    },
  }));

  return (
    <>
      <SEO
        title="Jonas – Forfatter & Grundlægger | Casinoaftaler.dk"
        description="Mød Jonas, grundlæggeren af Casinoaftaler.dk og casino-streamer på Twitch. Læs om hans baggrund, streamingstil og passion for casinospil."
        jsonLd={[faqJsonLd, personSchema, ...videoSchemas]}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">
                <User className="mr-1.5 h-3.5 w-3.5" />
                Forfatter
              </Badge>
              <Badge variant="secondary">
                <Tv className="mr-1.5 h-3.5 w-3.5" />
                Casino-streamer
              </Badge>
              <Badge variant="secondary">
                <Zap className="mr-1.5 h-3.5 w-3.5" />
                Grundlægger
              </Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Jonas – Fedesvinsejer
            </h1>
            <p className="text-lg text-white/80">
              Grundlægger af Casinoaftaler.dk, casino-streamer og community-skaber
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" date="17-02-2026" readTime="5 Min." showVerified />

        {/* Profile card */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={jonasImage}
                alt="Jonas – Fedesvinsejer, grundlægger af Casinoaftaler.dk"
                className="w-64 h-64 rounded-2xl object-cover object-top shadow-lg"
                loading="eager"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Om Jonas</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Alder</p>
                    <p className="text-sm font-medium">30 år</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Bopæl</p>
                    <p className="text-sm font-medium">Danmark</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Star className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Yndlingsslot</p>
                    <p className="text-sm font-medium">Wanted Dead & Alive</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Trophy className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Største gevinst</p>
                    <p className="text-sm font-medium">12.278x</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Heart className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Yndlingsmad</p>
                    <p className="text-sm font-medium">Skyr & Pizza</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Tv className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Platform</p>
                    <p className="text-sm font-medium">Twitch</p>
                  </div>
                </div>
              </div>
              {/* 5️⃣ Bio with internal authority links */}
              <p className="text-muted-foreground leading-relaxed">
                Jonas, bedre kendt som <strong>Fedesvinsejer</strong>, er grundlæggeren af Casinoaftaler.dk og en af Danmarks mest engagerende casino-streamere. 
                Med sin åbne stil, smittende energi og humor har han opbygget et aktivt og loyalt community, 
                der deler hans passion for{" "}
                <Link to="/casinospil" className="text-primary hover:underline">casinospil</Link> og underholdning.
                Hans ekspertise spænder fra dybdegående{" "}
                <Link to="/casino-bonus" className="text-primary hover:underline">bonusanalyser</Link> til{" "}
                <Link to="/ansvarligt-spil" className="text-primary hover:underline">ansvarligt spil</Link>, og han arbejder løbende på at styrke gennemsigtigheden i den danske casinoindustri.
                Læs mere om{" "}
                <Link to="/om" className="text-primary hover:underline">teamet bag Casinoaftaler.dk</Link> og{" "}
                <Link to="/saadan-tester-vi-casinoer" className="text-primary hover:underline">hvordan vi tester casinoer</Link>.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 2️⃣ Ekspertise & Erfaring */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2">
            <BadgeCheck className="h-7 w-7 text-primary" />
            Ekspertise & Erfaring
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expertiseItems.map((item) => (
              <Card
                key={item.label}
                className="group transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
              >
                <CardContent className="flex items-center gap-3 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Background */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            Baggrund og Motivation
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Han har streamet gambling i fire år – men for ham har det aldrig kun handlet om <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">slots</Link>. Det har handlet om energi, fællesskab og personlighed.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Mange lærte ham først at kende gennem hans kat, <strong>Fedesvin</strong>, som i dag stolt har sine helt egne to{" "}
            <a href="https://casinoaftaler.dk/community/slots" className="text-primary hover:underline">slotmaskiner</a>. Det siger meget om hans univers: Det må gerne være skørt, underholdende og lidt ud over det sædvanlige.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Tilbage i tiden var han medstifter af JPLiveSlots, som på rekordtid blev en af de største slotstreamere i Danmark. Det var en intens rejse med højt tempo, store ambitioner og et stærkt drive for at skabe noget unikt. Succesen kom hurtigt og gav ham både erfaring og troen på, at han kunne bygge noget endnu større.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Senere startede han projektet Casinoholdet sammen med to andre streamere. Endnu et ambitiøst kapitel i hans karriere. Men på et tidspunkt mærkede han tydeligt, at han ville fokusere fuldt ud på sin egen vision og sit eget brand. Derfor valgte han at gå solo.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det blev starten på <strong>Casinoaftaler.dk</strong> – et projekt, der i dag er i markant vækst. Her er der fokus på SEO, strategi og langsigtet udvikling, men vigtigst af alt: fællesskabet. Hans mål er at skabe et stærkt slot-community, hvor seerne fra streamen ikke blot kan finde og spille deres{" "}
            <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">yndlingsmaskiner</Link>, men også kommunikere med hinanden og tage Twitch-fællesskabet med videre.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Han er kendt for sine store råb, sine daglige grin og sine mange – til tider vilde – historier. Han holder sig ikke tilbage. Han er åben om sit liv og deler både op- og nedture med sit publikum. For ham handler streaming ikke kun om spil – det handler om relationer, ærlighed og om at turde være sig selv fuldt ud.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4 font-medium">
            Han bygger ikke bare en platform.<br />
            Han bygger et univers.<br />
            Og rejsen er langt fra slut.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Community & kendetegn */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Kendetegn og Fællesskab
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En fast bestanddel af Jonas' streams er katten <strong>Fedesvin</strong>, der efterhånden har opnået kultstatus 
            blandt seerne – ofte er der flere spørgsmål om kattens velbefindende end om Jonas selv! 
            Fællesskabet er præget af humor, god stemning og en åben dialog, hvor der tales om alt 
            fra <Link to="/casinospil" className="text-primary hover:underline">casinospil</Link> til hverdagens udfordringer.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Tv className="h-4 w-4 text-primary" />
                  Streamingstil
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Energisk og underholdende bonus hunts med masser af interaktion på{" "}
                <Link to="/live-casino" className="text-primary hover:underline">live casino</Link>{" "}
                og slots. Jonas streamer primært om aftenen fra kl. 20-21 og frem.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Gamepad2 className="h-4 w-4 text-primary" />
                  Spillepræferencer
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Foretrækker{" "}
                <Link to="/no-sticky-bonus" className="text-primary hover:underline">
                  no-sticky bonusser
                </Link>{" "}
                og spiller udelukkende for underholdningens skyld.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Star className="h-4 w-4 text-primary" />
                  Esport-fan
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Stor fan af Esport – især Counter-Strike, hvor han følger stort set alle turneringer. Udforsk hans{" "}
                <Link to="/highlights" className="text-primary hover:underline">bedste highlights</Link>.
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Jonas Top 3 Casinoer */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Jonas Top 3 Casinoer</h3>
          {featuredCasinos.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                {featuredCasinos.map((casino, index) => (
                  <CasinoCard
                    key={casino.id}
                    casino={mapCasino(casino)}
                    rank={1}
                    open={openCasinoId === casino.id}
                    onOpenChange={(open) =>
                      setOpenCasinoId(open ? casino.id : null)
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* SEO casino descriptions with internal links */}
          <div className="mt-8 space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/casino-anmeldelser/spildansknu" className="text-primary hover:underline">SpilDanskNu</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                SpilDanskNu er et af de mest populære danske online casinoer med et stærkt fokus på det danske marked. Med en dansk licens og et bredt udvalg af{" "}
                <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spilleautomater</Link>, bordspil og{" "}
                <Link to="/live-casino" className="text-primary hover:underline">live casino</Link> tilbyder de en tryg og underholdende spiloplevelse. Deres lave{" "}
                <Link to="/omsaetningskrav" className="text-primary hover:underline">omsætningskrav</Link> på kun 10x gør dem til et oplagt valg for danske spillere.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/casino-anmeldelser/spilleautomaten" className="text-primary hover:underline">Spilleautomaten</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Spilleautomaten er kendt for sit enorme spiludvalg og hurtige udbetalinger. Med over 3.000 spil fra førende udbydere som{" "}
                <Link to="/spiludviklere/netent" className="text-primary hover:underline">NetEnt</Link>,{" "}
                <Link to="/spiludviklere/pragmatic-play" className="text-primary hover:underline">Pragmatic Play</Link> og{" "}
                <Link to="/spiludviklere/play-n-go" className="text-primary hover:underline">Play'n GO</Link> er der altid noget nyt at udforske. Casinoet tilbyder en generøs{" "}
                <Link to="/velkomstbonus" className="text-primary hover:underline">velkomstbonus</Link> og en brugervenlig platform, der fungerer perfekt på både desktop og mobil.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/casino-anmeldelser/campobet" className="text-primary hover:underline">Campobet</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Campobet kombinerer casino og sportsbetting under ét tag, hvilket gør det til et alsidigt valg for spillere, der gerne vil have det hele samlet. Med en dansk licens, konkurrencedygtige{" "}
                <Link to="/casino-bonus" className="text-primary hover:underline">bonusser</Link> og et solidt{" "}
                <Link to="/live-casino" className="text-primary hover:underline">live casino</Link>-udbud leverer Campobet en komplet spiloplevelse til danske spillere.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 3️⃣ Artikler skrevet af Jonas – horizontal carousel */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-primary" />
              Artikler skrevet af Jonas
            </h2>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground mr-2">
                {articlePage + 1} / {totalArticlePages}
              </span>
              <button
                onClick={prevArticlePage}
                disabled={articlePage === 0}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Forrige artikler"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextArticlePage}
                disabled={articlePage >= totalArticlePages - 1}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Næste artikler"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {visibleArticles.map((article) => (
              <Link
                key={article.path}
                to={article.path}
                className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {article.date}
                  </span>
                </div>
                <h3 className="text-base font-semibold group-hover:text-primary transition-colors mb-1">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 🎬 YouTube guides af Jonas */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <Play className="h-7 w-7 text-primary fill-primary" />
            <h2 className="text-3xl font-bold">YouTube-guides af Jonas</h2>
          </div>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Jonas har produceret en serie af undervisningsvideoer, der forklarer de vigtigste begreber inden for casino-bonusser. Klik på en video for at læse den fulde guide.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              {
                videoId: "WOowRz6hnH8",
                title: "Hvad er en No-Sticky Bonus?",
                path: "/no-sticky-bonus",
                category: "Bonus",
              },
              {
                videoId: "yUAcefgYfkc",
                title: "Hvad er en Sticky Bonus?",
                path: "/sticky-bonus",
                category: "Bonus",
              },
              {
                videoId: "q4jeGo9TPEk",
                title: "Hvad er Free Spins?",
                path: "/free-spins",
                category: "Free Spins",
              },
              {
                videoId: "3tXFTjmgdcE",
                title: "Hvad er omsætningskrav?",
                path: "/omsaetningskrav",
                category: "Guide",
              },
              {
                videoId: "oK5PvebkvGY",
                title: "Hvad er en Velkomstbonus?",
                path: "/velkomstbonus",
                category: "Bonus",
              },
              {
                videoId: "hMHHVA6vH0Y",
                title: "Hvad er en Indskudsbonus?",
                path: "/indskudsbonus",
                category: "Bonus",
              },
              {
                videoId: "7JQ3nFTasoQ",
                title: "Hvad er bonus uden omsætningskrav?",
                path: "/bonus-uden-omsaetningskrav",
                category: "Bonus",
              },
              {
                videoId: "XhbLda1HyOs",
                title: "Hvad er bonus uden indbetaling?",
                path: "/bonus-uden-indbetaling",
                category: "Bonus",
              },
            ].map((video) => (
              <Link
                key={video.videoId}
                to={video.path}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 shadow-lg">
                      <Play className="h-5 w-5 fill-primary-foreground text-primary-foreground ml-0.5" />
                    </div>
                  </div>
                </div>
                {/* Info */}
                <div className="flex flex-1 flex-col gap-1.5 p-4">
                  <Badge variant="secondary" className="w-fit text-xs">
                    {video.category}
                  </Badge>
                  <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 🎬 Casino Anmeldelse-videoer af Jonas */}
        <CasinoReviewVideosSection />

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Play className="h-7 w-7 text-primary" />
            Bedste Highlights fra Jonas
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Se nogle af Jonas' mest ikoniske øjeblikke fra hans casino-streams – store gevinster, sjove reaktioner og ren underholdning.
          </p>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/ZKDrnL7373o"
                title="Jonas' bedste highlights – Casinoaftaler.dk"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Transparens & metode */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Transparens & metode
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Jonas' anmeldelser bygger på en dokumenteret testmetode og klare redaktionelle retningslinjer.
            Læs mere om vores tilgang til test, forretningsmodel og redaktionel politik.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/saadan-tester-vi-casinoer"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Sådan tester vi casinoer</h3>
                <p className="text-xs text-muted-foreground">Vores testmetode og vurderingskriterier</p>
              </div>
            </Link>
            <Link
              to="/forretningsmodel"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <Scale className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Forretningsmodel</h3>
                <p className="text-xs text-muted-foreground">Sådan finansieres Casinoaftaler.dk</p>
              </div>
            </Link>
            <Link
              to="/redaktionel-politik"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Redaktionel politik</h3>
                <p className="text-xs text-muted-foreground">Vores redaktionelle retningslinjer</p>
              </div>
            </Link>
          </div>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/forfatter/jonas" />

        <FAQSection title="Ofte stillede spørgsmål om Jonas" faqs={faqs} />

        <AuthorBio author="kevin" showCommunity={false} />
      </div>
    </>
  );
}
