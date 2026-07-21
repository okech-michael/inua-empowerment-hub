import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import storyGraduation from "@/assets/story-graduation.jpg";
import storyWorkshop from "@/assets/story-workshop.jpg";
import portraitFemale from "@/assets/portrait-female.jpg";
import portraitMale from "@/assets/portrait-male.jpg";
import eventConference from "@/assets/event-conference.jpg";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact Stories — INUA VIJANA" },
      { name: "description", content: "Stories of the young Africans reshaping their communities through the INUA VIJANA network." },
    ],
  }),
  component: Impact,
});

function Impact() {
  return (
    <>
      <PageHero
        eyebrow="Impact Stories"
        title="Real people. Measurable change."
        description="Every number in our reports is a person, a family, a community. Meet a few of the young leaders shaping their own futures."
      />

      <section className="py-24">
        <div className="container-page">
          <Link to="/impact" className="group block relative rounded-3xl overflow-hidden">
            <img src={storyGraduation} alt="Featured story" loading="lazy" className="w-full aspect-[16/8] object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 p-10 md:p-16 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-transparent text-white">
              <span className="text-brand-yellow font-extrabold uppercase text-[11px] tracking-[0.2em]">Featured</span>
              <h3 className="mt-4 text-3xl md:text-5xl font-extrabold max-w-3xl leading-[1.1]">
                From village classroom to Silicon Valley — the class of 2026's improbable journey.
              </h3>
            </div>
          </Link>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { image: portraitFemale, tag: "Entrepreneurship", title: "Amina built Kenya's fastest-growing fintech for the unbanked." },
              { image: portraitMale, tag: "Climate", title: "How Samuel scaled solar micro-grids to 40 villages in 18 months." },
              { image: storyWorkshop, tag: "Civic", title: "The workshop that turned 500 first-time voters into local leaders." },
              { image: eventConference, tag: "Innovation", title: "Inside the Africa Youth Assembly: 4,000 delegates, one vision." },
              { image: portraitFemale, tag: "Health", title: "Community health corps reduces child mortality by 34% in Tanzania." },
              { image: storyGraduation, tag: "Education", title: "First-generation scholars: the graduates of 2026, in their own words." },
            ].map((s, i) => (
              <Link key={i} to="/impact" className="group">
                <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-6">
                  <img src={s.image} alt={s.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-brand-green mb-2">{s.tag}</div>
                <h3 className="text-xl font-bold leading-snug group-hover:text-brand-green transition-colors">{s.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-navy text-white">
        <div className="container-page grid md:grid-cols-4 gap-8 text-center md:text-left">
          {[
            { v: "94%", l: "Alumni employed within 6 months" },
            { v: "620+", l: "Youth-led businesses launched" },
            { v: "$42M", l: "Alumni-generated revenue" },
            { v: "34%", l: "Reduction in child mortality (pilot)" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-5xl font-extrabold text-brand-yellow">{s.v}</div>
              <div className="mt-3 text-[11px] uppercase tracking-widest text-white/60 font-bold">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
