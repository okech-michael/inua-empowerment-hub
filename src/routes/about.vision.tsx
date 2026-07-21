import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Compass, Eye, Sparkles, Target } from "lucide-react";

export const Route = createFileRoute("/about/vision")({
  head: () => ({
    meta: [
      { title: "Vision, Mission & Values — INUA VIJANA" },
      { name: "description", content: "Our vision, mission and the values that guide INUA VIJANA's work." },
    ],
  }),
  component: Vision,
});

function Vision() {
  return (
    <>
      <PageHero
        eyebrow="Vision, Mission & Values"
        title="What we're building, and why it matters."
        description="A shared north star for a network spanning 12 countries and thousands of young leaders."
      />

      <section className="py-24">
        <div className="container-page grid md:grid-cols-2 gap-8">
          {[
            { icon: Eye, title: "Our Vision", body: "An Africa where every young person has the skills, capital and networks to shape their own future — and the future of the continent." },
            { icon: Target, title: "Our Mission", body: "To empower African youth through training, mentorship, seed funding and civic engagement, so they can lead sustainable development in their communities." },
            { icon: Compass, title: "Our Approach", body: "We combine institutional partnerships with grassroots ownership — pairing world-class training with locally-designed programmes." },
            { icon: Sparkles, title: "Our Promise", body: "Every programme is independently evaluated. Every dollar is publicly reported. Every graduate becomes part of a lifelong alumni network." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="p-10 rounded-3xl bg-brand-surface hover:bg-white hover:shadow-xl transition-all">
              <Icon className="h-8 w-8 text-brand-green mb-6" />
              <h2 className="text-2xl font-extrabold">{title}</h2>
              <p className="mt-4 text-brand-navy/60 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-brand-navy text-white">
        <div className="container-page max-w-4xl">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-yellow">Our commitment</span>
          <p className="mt-6 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-balance">
            "We measure success not by the number of workshops we run, but by the
            careers built, the businesses launched, and the communities changed."
          </p>
          <p className="mt-8 text-white/60 uppercase text-xs tracking-widest font-bold">— Our 2030 Strategic Plan</p>
        </div>
      </section>
    </>
  );
}
