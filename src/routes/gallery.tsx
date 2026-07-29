import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { sitePhotos } from "@/lib/unsplash-images";

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
  { src: sitePhotos.galleryHero, span: "row-span-2 col-span-2" },
  { src: sitePhotos.galleryStory, span: "" },
  { src: sitePhotos.galleryWorkshop, span: "" },
  { src: sitePhotos.galleryConference, span: "col-span-2" },
  { src: sitePhotos.galleryTech, span: "row-span-2" },
  { src: sitePhotos.galleryLeadership, span: "" },
  { src: sitePhotos.galleryClimate, span: "" },
  { src: sitePhotos.galleryEducation, span: "" },
  { src: sitePhotos.galleryEntrepreneur, span: "" },
  { src: sitePhotos.galleryPortrait, span: "" },
  { src: sitePhotos.galleryHealth, span: "col-span-2" },
  { src: sitePhotos.galleryCommunity, span: "" },
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
