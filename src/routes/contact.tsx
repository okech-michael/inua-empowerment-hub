import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — INUA VIJANA" },
      { name: "description", content: "Get in touch with INUA VIJANA's headquarters or regional offices." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk."
        description="Reach our headquarters or one of our regional offices — we typically respond within two business days."
      />

      <section className="py-24">
        <div className="container-page grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            {[
              { icon: MapPin, title: "Headquarters", body: "Riverside Drive, Nairobi 00100, Kenya" },
              { icon: Phone, title: "Phone", body: "+254 (0) 20 000 0000" },
              { icon: Mail, title: "Email", body: "hello@inuavijana.org" },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-5">
                <div className="size-12 shrink-0 grid place-items-center rounded-full bg-brand-green/10 text-brand-green">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-brand-navy/40">{title}</h3>
                  <p className="mt-1 font-bold">{body}</p>
                </div>
              </div>
            ))}

            <div className="pt-8 border-t border-brand-navy/5">
              <h3 className="text-xs uppercase tracking-widest font-bold text-brand-navy/40 mb-4">Regional offices</h3>
              <div className="grid grid-cols-2 gap-4">
                {["Kampala", "Kigali", "Dar es Salaam", "Accra", "Lagos", "Addis Ababa"].map((c) => (
                  <div key={c} className="p-4 rounded-xl bg-brand-surface font-bold text-sm">{c}</div>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="lg:col-span-7 p-8 md:p-10 rounded-3xl bg-brand-surface space-y-5">
            <h3 className="text-2xl font-extrabold">Send us a message</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="First name" />
              <Field label="Last name" />
            </div>
            <Field label="Email" type="email" />
            <Field label="Organization" />
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-brand-navy/60">Message</label>
              <textarea rows={6} className="mt-2 w-full px-5 py-3 rounded-xl border border-brand-navy/10 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30" />
            </div>
            <button className="w-full md:w-auto px-8 py-4 bg-brand-green text-white rounded-full font-bold uppercase tracking-wider text-sm hover:brightness-110 transition-all">Send message</button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest font-bold text-brand-navy/60">{label}</label>
      <input type={type} className="mt-2 w-full px-5 py-3 rounded-xl border border-brand-navy/10 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/30" />
    </div>
  );
}
