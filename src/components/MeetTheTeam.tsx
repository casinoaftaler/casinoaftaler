import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const teamMembers = [
  {
    id: "jonas",
    name: "Jonas",
    role: "Grundlægger & Chefredaktør",
    image: "/jonas-avatar.webp",
    link: "/forfatter/jonas",
    description: "5+ års erfaring i den danske gambling-branche. Ansvarlig for alle casino-anmeldelser og bonusanalyser.",
  },
  {
    id: "kevin",
    name: "Kevin",
    role: "Casino-streamer & Spiludvikler",
    image: "/kevin-avatar.webp",
    link: "/forfatter/kevin",
    description: "Streamer slots live og udvikler community-spil i spillehallen. 4+ års erfaring med casino-streaming.",
  },
  {
    id: "ajse",
    name: "Ajse",
    role: "Juridisk Redaktør",
    image: "/ajse-avatar.webp",
    link: "/forfatter/ajse",
    description: "Specialiseret i dansk spillelovgivning, ROFUS og compliance. Faktatjekker licensforhold.",
  },
  {
    id: "niklas",
    name: "Niklas",
    role: "Finansøkonom & Analytiker",
    image: "/niklas-avatar.webp",
    link: "/forfatter/niklas",
    description: "Beregner EV, RTP-justeringer og bonusværdi med matematisk præcision.",
  },
  {
    id: "frederik",
    name: "Frederik",
    role: "Casino-streamer & Live-tester",
    image: "/frederik-avatar.webp",
    link: "/forfatter/frederik",
    description: "Tester bonusser og spillemaskiner live. Dokumenterer resultater i realtid.",
  },
];

export function MeetTheTeam() {
  return (
    <section className="py-12 md:py-16">
      <div>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-3">👥 Mød redaktionen bag Casinoaftaler</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Vores redaktion består af erfarne specialister inden for casino, jura og finans. Hvert teammedlem bidrager med unik ekspertise til vores anmeldelser.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {teamMembers.map((member) => (
            <Link
              key={member.id}
              to={member.link}
              className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/40 hover:shadow-md"
            >
              <img
                src={member.image}
                alt={member.name}
                width={80}
                height={80}
                loading="lazy"
                className="mb-4 h-20 w-20 rounded-full object-cover ring-2 ring-border transition-all group-hover:ring-primary/50"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="mb-2 text-xs font-medium text-primary">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {member.description}
              </p>
              <span className="mt-auto flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Se profil <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
