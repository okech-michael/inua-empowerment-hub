import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Download, FileText } from "lucide-react";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications — INUA VIJANA" },
      { name: "description", content: "Research reports, policy briefs and toolkits from INUA VIJANA." },
    ],
  }),
  component: Publications,
});

const pubs = [
  { type: "Research", year: "2026", title: "The State of Youth Employment in East Africa" },
  { type: "Policy Brief", year: "2026", title: "Financing Youth-led Climate Innovation" },
  { type: "Toolkit", year: "2026", title: "Community Mentorship Playbook" },
  { type: "Research", year: "2026", title: "Digital Skills Gap Report: 12 Countries" },
  { type: "Policy Brief", year: "2026", title: "Civic Engagement and First-time Voters" },
  { type: "Toolkit", year: "2026", title: "Founder's Guide to Fundraising in Africa" },
];

function Publications() {
  return (
    <>
      <PageHero
        eyebrow="Publications"
        title="Research, briefs and toolkits."
        description="Open-access research to inform practitioners, policymakers and the youth we serve."
      />

      <section className="py-24">
        <div className="container-page grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pubs.map((p) => (
            <a key={p.title} href="#" className="group p-8 rounded-3xl border border-brand-navy/5 hover:border-brand-green/30 hover:shadow-xl hover:-translate-y-1 transition-all bg-white">
              <div className="flex items-start justify-between mb-6">
                <FileText className="h-8 w-8 text-brand-green" />
                <Download className="h-5 w-5 text-brand-navy/30 group-hover:text-brand-green transition-colors" />
              </div>
              <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-widest mb-3">
                <span className="text-brand-green">{p.type}</span>
                <span className="text-brand-navy/40">{p.year}</span>
              </div>
              <h3 className="text-lg font-bold leading-snug group-hover:text-brand-green transition-colors">{p.title}</h3>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
