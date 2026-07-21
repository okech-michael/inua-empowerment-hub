import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import programTech from "@/assets/program-tech.jpg";
import programLeadership from "@/assets/program-leadership.jpg";
import programClimate from "@/assets/program-climate.jpg";
import programEntrepreneur from "@/assets/program-entrepreneur.jpg";
import programEducation from "@/assets/program-education.jpg";
import programHealth from "@/assets/program-health.jpg";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Our Programs — INUA VIJANA" },
      { name: "description", content: "Explore INUA VIJANA's flagship programs across leadership, digital skills, entrepreneurship, climate action, education and health." },
    ],
  }),
  component: Programs,
});

const items = [
  { tag: "Leadership", title: "Civic Leadership Academy", desc: "A 12-month fellowship preparing young leaders for public service and civic engagement.", image: programLeadership },
  { tag: "Digital Skills", title: "Digital Excellence Hubs", desc: "Cloud computing, AI and software engineering training with direct pipelines to employers.", image: programTech },
  { tag: "Entrepreneurship", title: "Founders Accelerator", desc: "Seed capital, mentorship and go-to-market support for early-stage youth-led ventures.", image: programEntrepreneur },
  { tag: "Climate Action", title: "Green Venture Fund", desc: "Non-dilutive funding and technical assistance for clean energy and climate adaptation startups.", image: programClimate },
  { tag: "Education", title: "Scholars Programme", desc: "Full scholarships, academic tutoring and life-skills mentorship for underserved students.", image: programEducation },
  { tag: "Health", title: "Community Health Corps", desc: "Training and deploying young community health workers in underserved rural districts.", image: programHealth },
  { tag: "Innovation", title: "Youth Innovation Challenge", desc: "An annual continental competition awarding grants to the boldest youth-led solutions.", image: programTech },
  { tag: "Civic Engagement", title: "Voter Empowerment Initiative", desc: "Non-partisan civic education equipping first-time voters to shape their democracies.", image: programLeadership },
];

function Programs() {
  return (
    <>
      <PageHero
        eyebrow="Our Programs"
        title="Eight flagship programs. One shared mission."
        description="Every programme is designed with local communities, delivered by trained coordinators, and independently evaluated for impact."
      />

      <section className="py-24">
        <div className="container-page">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((p) => (
              <Link key={p.title} to="/projects" className="group">
                <div className="overflow-hidden rounded-2xl mb-6 aspect-[4/5] bg-brand-surface">
                  <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[2px] bg-brand-yellow" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-navy/40">{p.tag}</span>
                </div>
                <h3 className="text-2xl font-bold group-hover:text-brand-green transition-colors">{p.title}</h3>
                <p className="mt-3 text-brand-navy/60 text-sm leading-relaxed">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
