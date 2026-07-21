import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Calendar, Heart, Users } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import programTech from "@/assets/program-tech.jpg";
import programLeadership from "@/assets/program-leadership.jpg";
import programClimate from "@/assets/program-climate.jpg";
import programEntrepreneur from "@/assets/program-entrepreneur.jpg";
import programEducation from "@/assets/program-education.jpg";
import programHealth from "@/assets/program-health.jpg";
import storyWorkshop from "@/assets/story-workshop.jpg";
import storyGraduation from "@/assets/story-graduation.jpg";
import portraitFemale from "@/assets/portrait-female.jpg";
import eventConference from "@/assets/event-conference.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INUA VIJANA — Youth Empowerment Network" },
      {
        name: "description",
        content:
          "Empowering Africa's youth through leadership, digital skills, entrepreneurship, climate action, health, education and civic engagement.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "45k+", label: "Youth Empowered" },
  { value: "12", label: "Partner Countries" },
  { value: "$8.4M", label: "Grant Funding" },
  { value: "280+", label: "Corporate Partners" },
];

const programs = [
  {
    tag: "Technology",
    title: "Digital Excellence Hubs",
    desc: "Advanced cloud computing, AI and software engineering training for graduates across the region.",
    image: programTech,
  },
  {
    tag: "Governance",
    title: "Civic Leadership Academy",
    desc: "Preparing the next generation of public servants with ethical governance and policy frameworks.",
    image: programLeadership,
  },
  {
    tag: "Sustainability",
    title: "Green Venture Fund",
    desc: "Seed funding and technical support for youth-led climate adaptation and clean energy startups.",
    image: programClimate,
  },
  {
    tag: "Entrepreneurship",
    title: "Founders Accelerator",
    desc: "Mentorship, capital and networks for early-stage youth-led businesses across East Africa.",
    image: programEntrepreneur,
  },
  {
    tag: "Education",
    title: "Scholars Programme",
    desc: "Full scholarships and academic mentorship for underserved secondary and tertiary students.",
    image: programEducation,
  },
  {
    tag: "Health",
    title: "Community Health Corps",
    desc: "Training young community health workers to deliver preventative care in rural districts.",
    image: programHealth,
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[92vh] min-h-[640px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Young African professionals collaborating in a modern workspace"
            className="w-full h-full object-cover animate-slow-zoom"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/60 to-brand-navy/20" />
        </div>

        <div className="container-page relative z-10 w-full">
          <div className="max-w-3xl animate-reveal">
            <span className="inline-block px-4 py-1.5 bg-brand-yellow/20 text-brand-yellow text-[11px] font-extrabold uppercase tracking-[0.2em] rounded-full mb-6 backdrop-blur-sm">
              Empowering African Youth
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.02] tracking-tight text-balance">
              Leadership <br />
              <span className="text-brand-yellow">Redefined.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/90 leading-relaxed max-w-xl text-pretty">
              We connect young leaders with the resources, mentorship, and global
              networks required to drive sustainable development across the continent.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/programs"
                className="px-8 py-4 bg-white text-brand-navy font-bold rounded-full hover:bg-brand-yellow transition-all hover:-translate-y-0.5"
              >
                Explore Our Programs
              </Link>
              <Link
                to="/about/reports"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/25 text-white font-bold rounded-full hover:bg-white/20 transition-all"
              >
                Read Annual Report
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-brand-surface border-b border-brand-navy/5">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-5xl md:text-6xl font-extrabold text-brand-green tracking-tight">
                  {s.value}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-brand-navy/70 font-bold mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-32">
        <div className="container-page grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-green">
              Our Mission
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-balance">
              Bridging the gap between potential and opportunity.
            </h2>
            <p className="mt-8 text-lg text-brand-navy/80 leading-relaxed">
              INUA VIJANA is more than an organization; it is a movement dedicated
              to unlocking the inherent creativity and leadership of African youth.
              Through systematic intervention and community-led projects, we
              transform passion into professional excellence.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 font-bold text-brand-green border-b-2 border-brand-green/20 hover:border-brand-green pb-1 transition-colors"
            >
              Learn more about our launch story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src={portraitFemale}
                alt="Young African leader"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-brand-yellow -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-32 bg-brand-surface">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-green">
                Featured Programs
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
                Pillars of Impact
              </h2>
              <p className="mt-4 text-brand-navy/60 leading-relaxed">
                Our multi-disciplinary approach targets the most critical barriers
                to youth success in the 21st-century global economy.
              </p>
            </div>
            <Link
              to="/programs"
              className="text-brand-green font-bold border-b-2 border-brand-green/20 hover:border-brand-green pb-1 transition-colors self-start"
            >
              View all initiatives →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((p) => (
              <Link
                key={p.title}
                to="/programs"
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-2xl mb-6 aspect-[4/5] bg-brand-navy/5">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[2px] bg-brand-yellow" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-navy/40">
                    {p.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-bold group-hover:text-brand-green transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-brand-navy/60 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Story */}
      <section className="py-32">
        <div className="container-page">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="relative group overflow-hidden rounded-3xl">
                <img
                  src={storyGraduation}
                  alt="Graduation ceremony"
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 p-10 md:p-14 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-transparent text-white">
                  <span className="text-brand-yellow font-extrabold uppercase text-[11px] tracking-[0.2em]">
                    Featured Story
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold mt-4 mb-4 max-w-2xl leading-tight">
                    How the Class of 2026 built Kenya's fastest-growing fintech
                    for the unbanked.
                  </h3>
                  <Link
                    to="/impact"
                    className="inline-flex items-center gap-2 text-sm font-bold border-b border-white/40 pb-1 hover:border-brand-yellow hover:text-brand-yellow transition-colors"
                  >
                    Read the full profile <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-8">
              <Link to="/impact" className="group">
                <div className="overflow-hidden rounded-2xl aspect-video mb-4">
                  <img
                    src={storyWorkshop}
                    alt="Community workshop"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-xl font-bold group-hover:text-brand-green transition-colors">
                  Empowering the Rift Valley
                </h4>
                <p className="mt-2 text-sm text-brand-navy/60">
                  A look into our local community development program in rural
                  districts.
                </p>
              </Link>
              <Link to="/impact" className="group">
                <div className="overflow-hidden rounded-2xl aspect-video mb-4">
                  <img
                    src={eventConference}
                    alt="Annual conference"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-xl font-bold group-hover:text-brand-green transition-colors">
                  Africa Youth Assembly 2026
                </h4>
                <p className="mt-2 text-sm text-brand-navy/60">
                  4,000 delegates. 12 countries. One vision for the continent's
                  future.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-32 bg-brand-surface">
        <div className="container-page">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-green">
                What's Next
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
                Upcoming events
              </h2>
            </div>
            <Link
              to="/events"
              className="text-brand-green font-bold border-b-2 border-brand-green/20 hover:border-brand-green pb-1"
            >
              All events →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                date: "MAR 12",
                title: "Africa Youth Innovation Summit",
                loc: "Nairobi · Kenya",
              },
              {
                date: "APR 04",
                title: "Green Ventures Pitch Day",
                loc: "Kigali · Rwanda",
              },
              {
                date: "MAY 22",
                title: "Digital Skills Bootcamp",
                loc: "Kampala · Uganda",
              },
            ].map((e) => (
              <Link
                key={e.title}
                to="/events"
                className="group bg-white p-8 rounded-2xl border border-brand-navy/5 hover:border-brand-green/30 hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-3 text-brand-green font-extrabold text-sm mb-6">
                  <Calendar className="h-4 w-4" />
                  <span className="uppercase tracking-widest">{e.date} · 2026</span>
                </div>
                <h3 className="text-xl font-bold leading-snug group-hover:text-brand-green transition-colors">
                  {e.title}
                </h3>
                <p className="mt-3 text-sm text-brand-navy/50 uppercase tracking-widest font-semibold">
                  {e.loc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Row */}
      <section className="py-16 border-y border-brand-navy/5">
        <div className="container-page">
          <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-navy/40 mb-10">
            Trusted by leading institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-6 opacity-60">
            {["UNICEF", "USAID", "Mastercard Foundation", "World Vision", "Ford Foundation", "UNDP"].map(
              (name) => (
                <span
                  key={name}
                  className="text-xl md:text-2xl font-extrabold tracking-tight text-brand-navy/50"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-brand-navy text-white overflow-hidden relative">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-green/30 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-blue/20 blur-3xl" aria-hidden />
        <div className="container-page relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                Ready to shape the{" "}
                <span className="text-brand-yellow">future?</span>
              </h2>
              <p className="mt-8 text-xl text-white/60 leading-relaxed max-w-lg">
                Whether you are a donor, a partner, or a young person ready to lead,
                there is a place for you in our network.
              </p>
              <div className="mt-12 grid sm:grid-cols-2 gap-4">
                <Link
                  to="/partners"
                  className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all group"
                >
                  <Heart className="h-5 w-5 text-brand-yellow mb-4" />
                  <div className="text-brand-yellow font-extrabold mb-2">For Partners</div>
                  <p className="text-sm text-white/50 mb-4">
                    Join our ecosystem of 280+ international organizations.
                  </p>
                  <span className="text-sm font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Collaborate with us <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link
                  to="/join"
                  className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all group"
                >
                  <Users className="h-5 w-5 text-brand-green-light mb-4" />
                  <div className="text-brand-green-light font-extrabold mb-2">For Youth</div>
                  <p className="text-sm text-white/50 mb-4">
                    Apply for fellowships, grants, and training opportunities.
                  </p>
                  <span className="text-sm font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Join the network <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-brand-green/20 blur-3xl rounded-full" aria-hidden />
              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                <img
                  src={portraitFemale}
                  alt="Testimonial portrait"
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-transparent">
                  <p className="italic text-lg text-white/90 mb-4 leading-relaxed">
                    "INUA VIJANA didn't just give me a grant — they gave me a global
                    perspective on how to scale my impact."
                  </p>
                  <div className="font-extrabold">Amina Okoro</div>
                  <div className="text-xs text-white/50 uppercase tracking-widest font-semibold">
                    Founder, AgriConnect · 2026 Fellow
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Stay in the loop
            </h2>
            <p className="mt-4 text-brand-navy/60">
              Monthly updates on our programs, impact stories, and youth
              opportunities. No spam, ever.
            </p>
            <form
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 px-5 py-4 rounded-full border border-brand-navy/10 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-brand-navy text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-brand-green transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
