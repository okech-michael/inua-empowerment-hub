import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Youth Opportunities — INUA VIJANA" },
      { name: "description", content: "Scholarships, fellowships, internships, jobs and innovation challenges from INUA VIJANA and partners." },
    ],
  }),
  component: Opportunities,
});

const items = [
  { type: "Scholarship", title: "Undergraduate Scholars Programme 2027", location: "Continental", deadline: "Mar 30, 2026" },
  { type: "Fellowship", title: "Civic Leadership Fellowship", location: "Nairobi · Kenya", deadline: "Apr 15, 2026" },
  { type: "Internship", title: "Programme Analyst Intern", location: "Kigali · Rwanda", deadline: "Apr 2, 2026" },
  { type: "Grant", title: "Green Venture Fund — Cohort 5", location: "Remote", deadline: "May 10, 2026" },
  { type: "Innovation", title: "Africa Youth Innovation Challenge", location: "Continental", deadline: "Jun 1, 2026" },
  { type: "Job", title: "Regional Coordinator, West Africa", location: "Accra · Ghana", deadline: "Rolling" },
  { type: "Training", title: "Digital Excellence Hub — Cloud Track", location: "Kampala · Uganda", deadline: "Apr 20, 2026" },
  { type: "Fellowship", title: "Journalism for Democracy Fellowship", location: "Continental", deadline: "May 5, 2026" },
];

function Opportunities() {
  return (
    <>
      <PageHero
        eyebrow="Youth Opportunities"
        title="Fully-funded scholarships, fellowships and jobs."
        description="Curated opportunities open to young Africans. All are fully-funded or paid unless noted."
      />

      <section className="py-24">
        <div className="container-page">
          <div className="space-y-4">
            {items.map((o) => (
              <a key={o.title} href="#" className="group grid md:grid-cols-12 gap-4 items-center p-6 md:p-8 rounded-2xl border border-brand-navy/5 hover:border-brand-green/30 hover:shadow-lg transition-all bg-white">
                <div className="md:col-span-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-brand-green/10 text-brand-green">{o.type}</span>
                </div>
                <div className="md:col-span-5">
                  <h3 className="text-lg md:text-xl font-bold group-hover:text-brand-green transition-colors">{o.title}</h3>
                </div>
                <div className="md:col-span-3 text-sm text-brand-navy/60">{o.location}</div>
                <div className="md:col-span-2 text-sm">
                  <div className="text-[10px] uppercase tracking-widest text-brand-navy/40 font-bold">Deadline</div>
                  <div className="font-bold">{o.deadline}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
