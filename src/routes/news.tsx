import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import storyGraduation from "@/assets/story-graduation.jpg";
import storyWorkshop from "@/assets/story-workshop.jpg";
import eventConference from "@/assets/event-conference.jpg";
import programTech from "@/assets/program-tech.jpg";
import programLeadership from "@/assets/program-leadership.jpg";
import programClimate from "@/assets/program-climate.jpg";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — INUA VIJANA" },
      { name: "description", content: "The latest news, press releases and updates from the INUA VIJANA network." },
    ],
  }),
  component: News,
});

const articles = [
  { image: storyGraduation, tag: "Press Release", date: "Oct 15, 2026", title: "INUA VIJANA announces $12M expansion into West Africa" },
  { image: storyWorkshop, tag: "Impact", date: "Sep 28, 2026", title: "Community Health Corps reaches 50,000 beneficiaries in initial rollout" },
  { image: eventConference, tag: "Event", date: "Sep 10, 2026", title: "4,000 delegates convene at Africa Youth Assembly 2026" },
  { image: programTech, tag: "Partnership", date: "Aug 22, 2026", title: "Partnership with Mastercard Foundation for Digital Excellence Hubs" },
  { image: programLeadership, tag: "Announcement", date: "Jul 30, 2026", title: "Civic Leadership Academy welcomes inaugural fellows" },
  { image: programClimate, tag: "Grants", date: "Jul 15, 2026", title: "Green Venture Fund deploys $2.1M to its first cohort startups" },
];

function News() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="What's new in the network."
        description="Stories, announcements, and press releases from across INUA VIJANA."
      />

      <section className="py-24">
        <div className="container-page grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((a, i) => (
            <a key={i} href="#" className="group">
              <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-6">
                <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex items-center gap-3 mb-3 text-[10px] font-extrabold uppercase tracking-widest">
                <span className="text-brand-green">{a.tag}</span>
                <span className="text-brand-navy/40">{a.date}</span>
              </div>
              <h3 className="text-xl font-bold leading-snug group-hover:text-brand-green transition-colors">{a.title}</h3>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
