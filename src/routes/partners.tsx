import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners & Donors — INUA VIJANA" },
      { name: "description", content: "The international institutions, corporates and universities partnering with INUA VIJANA." },
    ],
  }),
  component: Partners,
});

const partners = {
  International: ["UNICEF", "UNDP", "USAID", "GIZ", "UN Women", "FCDO"],
  Foundations: ["Mastercard Foundation", "Ford Foundation", "Rockefeller Foundation", "Open Society", "MacArthur", "Aga Khan"],
  Corporate: ["Safaricom", "MTN Group", "Equity Group", "KCB", "Standard Bank", "Ecobank"],
  Universities: ["Strathmore University", "University of Nairobi", "Makerere University", "University of Cape Town", "Ashesi University", "Kigali Institute"],
};

function Partners() {
  return (
    <>
      <PageHero
        eyebrow="Partners & Donors"
        title="Building the network, together."
        description="280+ institutions across five continents partner with INUA VIJANA to build the next generation of African leaders."
      />

      <section className="py-24">
        <div className="container-page space-y-16">
          {Object.entries(partners).map(([cat, items]) => (
            <div key={cat}>
              <h2 className="text-xs uppercase tracking-[0.2em] font-extrabold text-brand-green mb-8">{cat}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {items.map((name) => (
                  <div key={name} className="aspect-video rounded-2xl bg-brand-surface border border-brand-navy/5 grid place-items-center hover:border-brand-green/30 transition-colors">
                    <span className="font-extrabold text-brand-navy/60 text-center px-4 text-sm">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-brand-navy text-white">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">Become a partner.</h2>
            <p className="mt-6 text-white/60 text-lg leading-relaxed">
              From co-designing programmes to sponsoring cohorts, there are many ways to partner. Our team will build the right engagement for you.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Link to="/contact" className="px-8 py-4 rounded-full bg-brand-yellow text-brand-navy font-bold uppercase tracking-wider text-sm hover:brightness-110">Contact partnerships</Link>
            <Link to="/about/reports" className="px-8 py-4 rounded-full border border-white/25 text-white font-bold uppercase tracking-wider text-sm hover:bg-white/10">Read our reports</Link>
          </div>
        </div>
      </section>
    </>
  );
}
