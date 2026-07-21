import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Linkedin, Mail } from "lucide-react";
import portraitMale from "@/assets/portrait-male.jpg";
import portraitFemale from "@/assets/portrait-female.jpg";

export const Route = createFileRoute("/about/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership & Governance — INUA VIJANA" },
      { name: "description", content: "Meet the board, executive team and regional coordinators leading INUA VIJANA." },
    ],
  }),
  component: Leadership,
});

const leaders = [
  { name: "Dr. Amina Okoro", role: "Executive Director", bio: "Former UNDP Africa youth advisor. PhD, London School of Economics.", image: portraitFemale },
  { name: "James Mwangi", role: "Board Chair", bio: "20 years leading development finance across East and West Africa.", image: portraitMale },
  { name: "Grace Uwimana", role: "Director of Programs", bio: "Architect of the Green Venture Fund. Rhodes Scholar, Oxford.", image: portraitFemale },
  { name: "Samuel Kimani", role: "Chief Financial Officer", bio: "CPA. Previously with KPMG East Africa's non-profit practice.", image: portraitMale },
  { name: "Nia Adeyemi", role: "Regional Director, West Africa", bio: "Founding member of the Lagos Youth Innovation Hub.", image: portraitFemale },
  { name: "Daniel Owusu", role: "Director of Partnerships", bio: "Built partnerships with UNICEF, USAID, and Mastercard Foundation.", image: portraitMale },
];

function Leadership() {
  return (
    <>
      <PageHero
        eyebrow="Leadership & Governance"
        title="The people leading the network."
        description="Our governance is anchored by a diverse board of directors and executive team drawn from development finance, academia and youth-led enterprise."
      />

      <section className="py-24">
        <div className="container-page">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((l) => (
              <div key={l.name} className="group">
                <div className="overflow-hidden rounded-3xl aspect-[4/5] mb-6 bg-brand-surface">
                  <img
                    src={l.image}
                    alt={l.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-green mb-2">{l.role}</div>
                <h3 className="text-2xl font-bold">{l.name}</h3>
                <p className="mt-2 text-sm text-brand-navy/60 leading-relaxed">{l.bio}</p>
                <div className="mt-4 flex gap-3">
                  <a href="#" className="size-9 grid place-items-center rounded-full bg-brand-surface hover:bg-brand-green hover:text-white transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href="#" className="size-9 grid place-items-center rounded-full bg-brand-surface hover:bg-brand-green hover:text-white transition-colors">
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-surface">
        <div className="container-page grid md:grid-cols-3 gap-8">
          {[
            { title: "Board of Directors", body: "9 independent directors overseeing strategy, ethics, and financial stewardship." },
            { title: "Executive Team", body: "12 senior leaders driving programmes, operations, and partnerships across the network." },
            { title: "Regional Coordinators", body: "45 coordinators embedded in local communities across our 12 partner countries." },
          ].map((c) => (
            <div key={c.title} className="p-8 rounded-3xl bg-white">
              <h3 className="text-xl font-extrabold">{c.title}</h3>
              <p className="mt-3 text-brand-navy/60">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
