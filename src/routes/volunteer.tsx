import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Check } from "lucide-react";
import storyWorkshop from "@/assets/story-workshop.jpg";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer — INUA VIJANA" },
      { name: "description", content: "Join our volunteer network as a mentor, trainer, event coordinator or ambassador." },
    ],
  }),
  component: Volunteer,
});

function Volunteer() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        title="Give your time. Multiply your impact."
        description="Our volunteers are the backbone of the network — professionals, alumni and community members giving what they know."
      />

      <section className="py-24">
        <div className="container-page grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Ways to volunteer</h2>
            <div className="mt-10 space-y-6">
              {[
                { title: "Mentor", desc: "1-hour monthly sessions with a fellow or scholar." },
                { title: "Trainer", desc: "Deliver technical training in your area of expertise." },
                { title: "Event Coordinator", desc: "Help run summits, bootcamps and community gatherings." },
                { title: "Ambassador", desc: "Represent INUA VIJANA in your city or workplace." },
              ].map((v) => (
                <div key={v.title} className="flex gap-4">
                  <div className="size-10 shrink-0 grid place-items-center rounded-full bg-brand-green/10 text-brand-green">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{v.title}</h3>
                    <p className="text-brand-navy/60 text-sm mt-1">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <img src={storyWorkshop} alt="Volunteer workshop" loading="lazy" className="mt-12 rounded-3xl w-full aspect-[4/3] object-cover" />
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="p-10 rounded-3xl bg-brand-surface border border-brand-navy/5"
          >
            <h3 className="text-2xl font-extrabold">Apply to volunteer</h3>
            <p className="mt-2 text-sm text-brand-navy/60">Applications reviewed on a rolling basis.</p>
            <div className="mt-8 space-y-4">
              <Field label="Full name" type="text" />
              <Field label="Email" type="email" />
              <Field label="Country" type="text" />
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-brand-navy/60">Volunteer role</label>
                <select className="mt-2 w-full px-5 py-3 rounded-xl border border-brand-navy/10 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30">
                  <option>Mentor</option>
                  <option>Trainer</option>
                  <option>Event Coordinator</option>
                  <option>Ambassador</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-brand-navy/60">Why do you want to volunteer?</label>
                <textarea rows={4} className="mt-2 w-full px-5 py-3 rounded-xl border border-brand-navy/10 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30" />
              </div>
              <button type="submit" className="w-full px-6 py-4 bg-brand-green text-white rounded-full font-bold uppercase tracking-wider text-sm hover:brightness-110 transition-all">Submit application</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest font-bold text-brand-navy/60">{label}</label>
      <input type={type} className="mt-2 w-full px-5 py-3 rounded-xl border border-brand-navy/10 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30" />
    </div>
  );
}
