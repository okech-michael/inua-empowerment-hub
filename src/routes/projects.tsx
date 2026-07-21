import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import programTech from "@/assets/program-tech.jpg";
import programClimate from "@/assets/program-climate.jpg";
import programEntrepreneur from "@/assets/program-entrepreneur.jpg";
import programLeadership from "@/assets/program-leadership.jpg";
import programHealth from "@/assets/program-health.jpg";
import programEducation from "@/assets/program-education.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — INUA VIJANA" },
      { name: "description", content: "Explore active, completed and upcoming projects across the INUA VIJANA network." },
    ],
  }),
  component: Projects,
});

type Status = "All" | "Ongoing" | "Completed" | "Upcoming";

const projects = [
  { title: "Rift Valley Digital Bootcamp", country: "Kenya", status: "Ongoing", image: programTech, budget: "$420k" },
  { title: "Kigali Solar Startups Cohort", country: "Rwanda", status: "Ongoing", image: programClimate, budget: "$1.2M" },
  { title: "Kampala Founders Sprint", country: "Uganda", status: "Ongoing", image: programEntrepreneur, budget: "$680k" },
  { title: "Youth Assembly 2024", country: "Kenya", status: "Completed", image: programLeadership, budget: "$210k" },
  { title: "Community Health Corps Pilot", country: "Tanzania", status: "Completed", image: programHealth, budget: "$540k" },
  { title: "Girls in STEM Initiative", country: "Ghana", status: "Upcoming", image: programEducation, budget: "$300k" },
];

function Projects() {
  const [filter, setFilter] = useState<Status>("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.status === filter);

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Where our programs meet the ground."
        description="Filter by status to explore ongoing, completed and upcoming projects across the network."
      />

      <section className="py-16 border-b border-brand-navy/5">
        <div className="container-page flex flex-wrap gap-2">
          {(["All", "Ongoing", "Completed", "Upcoming"] as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                filter === s
                  ? "bg-brand-navy text-white"
                  : "bg-brand-surface text-brand-navy/60 hover:bg-brand-navy/10"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-page grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <div key={p.title} className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-6 aspect-[4/3] bg-brand-surface">
                <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                  p.status === "Ongoing" ? "bg-brand-green/10 text-brand-green" :
                  p.status === "Completed" ? "bg-brand-navy/10 text-brand-navy" :
                  "bg-brand-yellow/20 text-yellow-800"
                }`}>{p.status}</span>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-navy/40">{p.country}</span>
              </div>
              <h3 className="text-xl font-bold group-hover:text-brand-green transition-colors">{p.title}</h3>
              <p className="mt-2 text-sm text-brand-navy/60">Budget · {p.budget}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
