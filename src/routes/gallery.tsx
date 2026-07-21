import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/hero.jpg";
import storyGraduation from "@/assets/story-graduation.jpg";
import storyWorkshop from "@/assets/story-workshop.jpg";
import eventConference from "@/assets/event-conference.jpg";
import programTech from "@/assets/program-tech.jpg";
import programLeadership from "@/assets/program-leadership.jpg";
import programClimate from "@/assets/program-climate.jpg";
import programEducation from "@/assets/program-education.jpg";
import programEntrepreneur from "@/assets/program-entrepreneur.jpg";
import programHealth from "@/assets/program-health.jpg";
import portraitFemale from "@/assets/portrait-female.jpg";
import portraitMale from "@/assets/portrait-male.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Media Gallery — INUA VIJANA" },
      { name: "description", content: "Photos and videos from across the INUA VIJANA network." },
    ],
  }),
  component: Gallery,
});

const images = [
  { src: hero, span: "row-span-2 col-span-2" },
  { src: storyGraduation, span: "" },
  { src: storyWorkshop, span: "" },
  { src: eventConference, span: "col-span-2" },
  { src: programTech, span: "row-span-2" },
  { src: programLeadership, span: "" },
  { src: programClimate, span: "" },
  { src: programEducation, span: "" },
  { src: programEntrepreneur, span: "" },
  { src: portraitFemale, span: "" },
  { src: programHealth, span: "col-span-2" },
  { src: portraitMale, span: "" },
];

function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Media Gallery"
        title="A visual record of the movement."
        description="Photos and video from summits, bootcamps, communities and graduation ceremonies across the continent."
      />

      <section className="py-24">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[260px] gap-4">
            {images.map((img, i) => (
              <div key={i} className={`overflow-hidden rounded-2xl bg-brand-surface group ${img.span}`}>
                <img
                  src={img.src}
                  alt="Gallery"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
