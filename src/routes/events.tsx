import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Calendar, MapPin } from "lucide-react";
import eventConference from "@/assets/event-conference.jpg";
import storyWorkshop from "@/assets/story-workshop.jpg";
import storyGraduation from "@/assets/story-graduation.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — INUA VIJANA" },
      { name: "description", content: "Upcoming and past events across the INUA VIJANA network." },
    ],
  }),
  component: Events,
});

const upcoming = [
  { date: "Mar 12, 2026", title: "Africa Youth Innovation Summit", loc: "Nairobi · Kenya", image: eventConference, tag: "Conference" },
  { date: "Apr 4, 2026", title: "Green Ventures Pitch Day", loc: "Kigali · Rwanda", image: storyWorkshop, tag: "Pitch Day" },
  { date: "May 22, 2026", title: "Digital Skills Bootcamp", loc: "Kampala · Uganda", image: storyGraduation, tag: "Bootcamp" },
];

const past = [
  { date: "Nov 2025", title: "Continental Assembly", loc: "Addis Ababa" },
  { date: "Sep 2025", title: "Founders Cohort 4 Demo Day", loc: "Nairobi" },
  { date: "Jul 2025", title: "Girls in STEM Camp", loc: "Accra" },
  { date: "May 2025", title: "Alumni Reunion", loc: "Kigali" },
];

function Events() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Where the network gathers."
        description="Summits, pitch days, bootcamps and community gatherings across the continent."
      />

      <section className="py-24">
        <div className="container-page">
          <h2 className="text-3xl font-extrabold tracking-tight mb-12">Upcoming</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {upcoming.map((e) => (
              <a key={e.title} href="#" className="group">
                <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-6">
                  <img src={e.image} alt={e.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-brand-green mb-2">{e.tag}</div>
                <h3 className="text-xl font-bold group-hover:text-brand-green transition-colors">{e.title}</h3>
                <div className="mt-3 flex flex-col gap-1 text-sm text-brand-navy/60">
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {e.date}</span>
                  <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {e.loc}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-surface">
        <div className="container-page">
          <h2 className="text-3xl font-extrabold tracking-tight mb-12">Past events</h2>
          <div className="space-y-3">
            {past.map((e) => (
              <div key={e.title} className="p-6 rounded-2xl bg-white flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <span className="text-xs uppercase tracking-widest font-bold text-brand-navy/40 w-20">{e.date}</span>
                  <h3 className="font-bold">{e.title}</h3>
                </div>
                <span className="text-sm text-brand-navy/60">{e.loc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
