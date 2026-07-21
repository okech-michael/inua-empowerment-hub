import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-brand-surface pt-24 pb-12 mt-24">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <Link to="/" className="text-xl font-extrabold tracking-tight flex items-center gap-3 mb-8">
              <img src="/favicon.jpg" alt="INUA VIJANA logo" className="h-9 w-9 rounded-full object-cover" />
              <span className="flex items-center gap-1.5">
                <span className="text-brand-green">INUA</span>
                <span className="text-brand-navy/70">VIJANA</span>
              </span>
            </Link>
            <p className="text-brand-navy/60 text-sm max-w-sm leading-relaxed mb-8">
              A youth empowerment network dedicated to unlocking the potential of
              Africa's most valuable asset: its young people.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href={Icon === Facebook ? "https://www.facebook.com/share/p/17TxKcGZ4H/" : "#"}
                  target={Icon === Facebook ? "_blank" : undefined}
                  rel={Icon === Facebook ? "noopener noreferrer" : undefined}
                  aria-label="Social link"
                  className="size-9 grid place-items-center rounded-full bg-white border border-brand-navy/5 text-brand-navy/60 hover:text-brand-green hover:border-brand-green/30 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Organization"
            links={[
              { label: "About Us", to: "/about" },
              { label: "Leadership", to: "/about/leadership" },
              { label: "Vision & Mission", to: "/about/vision" },
              { label: "Annual Reports", to: "/about/reports" },
            ]}
          />
          <FooterCol
            title="Programs"
            links={[
              { label: "Our Programs", to: "/programs" },
              { label: "Projects", to: "/projects" },
              { label: "Impact Stories", to: "/impact" },
              { label: "Opportunities", to: "/opportunities" },
            ]}
          />
          <FooterCol
            title="Get Involved"
            links={[
              { label: "Donate", to: "/donate" },
              { label: "Volunteer", to: "/volunteer" },
              { label: "Join Network", to: "/join" },
              { label: "Contact", to: "/contact" },
            ]}
          />
        </div>

        <div className="pt-12 border-t border-brand-navy/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-brand-navy/40 font-semibold">
          <p>© {new Date().getFullYear()} INUA VIJANA NETWORK. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-navy">Privacy Policy</a>
            <a href="#" className="hover:text-brand-navy">Terms</a>
            <a href="#" className="hover:text-brand-navy">Transparency</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div>
      <h4 className="font-bold text-xs uppercase tracking-widest mb-6 text-brand-navy">
        {title}
      </h4>
      <ul className="space-y-4 text-sm text-brand-navy/60">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="hover:text-brand-green transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
