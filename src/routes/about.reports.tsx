import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Download, FileText } from "lucide-react";

export const Route = createFileRoute("/about/reports")({
  head: () => ({
    meta: [
      { title: "Annual Reports — INUA VIJANA" },
      { name: "description", content: "Read our annual reports, financial statements and strategic plans." },
    ],
  }),
  component: Reports,
});

const reports = [
  { year: "2025", title: "Annual Impact Report", size: "PDF · 12 MB", desc: "45,000 youth empowered, $8.4M deployed, 280+ partners." },
  { year: "2024", title: "Annual Impact Report", size: "PDF · 10 MB", desc: "Regional expansion into Ghana and Tanzania." },
  { year: "2023", title: "Annual Impact Report", size: "PDF · 9 MB", desc: "Launch of the Green Venture Fund and Digital Excellence Hubs." },
  { year: "2025", title: "Audited Financial Statements", size: "PDF · 4 MB", desc: "Independently audited by KPMG East Africa." },
  { year: "2025–2030", title: "Strategic Plan", size: "PDF · 6 MB", desc: "Our roadmap to reach 250,000 youth across 20 countries." },
  { year: "2024", title: "Governance Policies", size: "PDF · 2 MB", desc: "Anti-corruption, safeguarding and conflict-of-interest policies." },
];

function Reports() {
  return (
    <>
      <PageHero
        eyebrow="Annual Reports"
        title="Radical transparency, by design."
        description="Every year we publish detailed impact and financial reports. Every dollar is tracked, audited and reported."
      />

      <section className="py-24">
        <div className="container-page">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((r) => (
              <a
                key={r.title + r.year}
                href="#"
                className="group p-8 rounded-3xl border border-brand-navy/5 hover:border-brand-green/30 hover:-translate-y-1 hover:shadow-xl transition-all bg-white"
              >
                <div className="flex items-start justify-between mb-6">
                  <FileText className="h-8 w-8 text-brand-green" />
                  <Download className="h-5 w-5 text-brand-navy/30 group-hover:text-brand-green transition-colors" />
                </div>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-navy/40">{r.year}</div>
                <h3 className="mt-2 text-xl font-bold leading-snug group-hover:text-brand-green transition-colors">{r.title}</h3>
                <p className="mt-3 text-sm text-brand-navy/60">{r.desc}</p>
                <div className="mt-6 text-xs uppercase tracking-widest font-bold text-brand-navy/40">{r.size}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
