import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import storyGraduation from "@/assets/story-graduation.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — INUA VIJANA" },
      { name: "description", content: "Who we are, our history and what makes INUA VIJANA different." },
    ],
  }),
  component: About,
});

const timeline = [
  { year: "2014", title: "Founded in Nairobi", desc: "A collective of ten young graduates commits to peer-to-peer mentorship." },
  { year: "2017", title: "First national programme", desc: "Digital literacy training reaches 5,000 students across Kenya." },
  { year: "2019", title: "Regional expansion", desc: "Offices open in Kampala and Kigali; partnerships with UNICEF and USAID." },
  { year: "2022", title: "Green Venture Fund launched", desc: "$4M seed capital deployed to 120 youth-led climate startups." },
  { year: "2026", title: "Continental network", desc: "45,000+ youth empowered across 12 African countries." },
];

const values = [
  { title: "Youth first", desc: "We center the voices, ideas and leadership of young Africans in everything we do." },
  { title: "Radical transparency", desc: "Public reporting, open financials and independently-audited outcomes." },
  { title: "Local ownership", desc: "Programmes are designed with — not for — the communities they serve." },
  { title: "Long-term impact", desc: "We measure success in careers built and communities changed, not events held." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A network built by youth, for youth."
        description="Since 2014, INUA VIJANA has grown from a small collective of ten graduates in Nairobi into a Pan-African network reaching 12 countries. Our story is one of ambition, discipline and community."
      />

      <section className="py-24">
        <div className="container-page grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <img src={storyGraduation} alt="Community moment" loading="lazy" className="rounded-3xl w-full aspect-[4/3] object-cover" />
          </div>
          <div className="lg:col-span-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Who we are</h2>
            <p className="mt-6 text-lg text-brand-navy/60 leading-relaxed">
              INUA VIJANA (Swahili for "lift up the youth") is an independent
              non-profit registered in Kenya, with regional offices in Uganda,
              Rwanda, Tanzania and Ghana. We combine training, seed capital,
              mentorship and advocacy to remove the barriers young Africans face
              on the path to meaningful work and civic leadership.
            </p>
            <p className="mt-4 text-lg text-brand-navy/60 leading-relaxed">
              Our work is funded by a mix of institutional partners, corporate
              sponsors and individual donors. Every dollar is tracked and reported
              in our public annual reports.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-surface">
        <div className="container-page">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-16">Our journey</h2>
          <div className="relative border-l-2 border-brand-green/20 pl-8 md:pl-12 space-y-12">
            {timeline.map((t) => (
              <div key={t.year} className="relative">
                <div className="absolute -left-[42px] md:-left-[54px] top-1 size-4 rounded-full bg-brand-green ring-4 ring-brand-surface" />
                <div className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-green">{t.year}</div>
                <h3 className="mt-2 text-2xl font-bold">{t.title}</h3>
                <p className="mt-2 text-brand-navy/60 max-w-2xl">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <div className="max-w-2xl mb-16">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-green">What guides us</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">Our core values</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.title} className="p-10 rounded-3xl border border-brand-navy/5 bg-white hover:border-brand-green/30 transition-colors">
                <h3 className="text-2xl font-bold">{v.title}</h3>
                <p className="mt-4 text-brand-navy/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap gap-4">
            <Link to="/about/leadership" className="px-6 py-3 rounded-full bg-brand-green text-white font-bold text-sm uppercase tracking-wider hover:brightness-110">Meet our leadership</Link>
            <Link to="/about/reports" className="px-6 py-3 rounded-full border border-brand-navy/10 font-bold text-sm uppercase tracking-wider hover:bg-brand-navy/5">Read our annual reports</Link>
          </div>
        </div>
      </section>
    </>
  );
}
