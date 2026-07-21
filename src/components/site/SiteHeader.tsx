import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

type MenuItem = { label: string; to: string; description?: string };
type MegaMenu = { label: string; items: MenuItem[] };

const menus: MegaMenu[] = [
  {
    label: "About Us",
    items: [
      { label: "About INUA VIJANA", to: "/about", description: "Who we are and our history" },
      { label: "Vision, Mission & Values", to: "/about/vision", description: "What guides our work" },
      { label: "Leadership & Governance", to: "/about/leadership", description: "The people leading the network" },
      { label: "Annual Reports", to: "/about/reports", description: "Financials and impact reports" },
    ],
  },
  {
    label: "Programs",
    items: [
      { label: "Our Programs", to: "/programs", description: "Flagship initiatives" },
      { label: "Projects", to: "/projects", description: "Active field projects" },
      { label: "Impact Stories", to: "/impact", description: "Stories of transformation" },
      { label: "Youth Opportunities", to: "/opportunities", description: "Scholarships, fellowships, jobs" },
    ],
  },
  {
    label: "Get Involved",
    items: [
      { label: "Volunteer", to: "/volunteer", description: "Join our volunteer network" },
      { label: "Join the Network", to: "/join", description: "Become a member" },
      { label: "Donate", to: "/donate", description: "Support our mission" },
      { label: "Events", to: "/events", description: "Upcoming and past events" },
    ],
  },
  {
    label: "Media",
    items: [
      { label: "News", to: "/news", description: "Latest updates" },
      { label: "Publications", to: "/publications", description: "Research and reports" },
      { label: "Media Gallery", to: "/gallery", description: "Photos and videos" },
    ],
  },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-brand-navy/5 shadow-sm"
          : "bg-white/70 backdrop-blur-sm border-b border-transparent"
      }`}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="container-page h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="text-xl font-extrabold tracking-tight flex items-center gap-1.5">
            <span className="text-brand-green">INUA</span>
            <span className="text-brand-navy/70">VIJANA</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {menus.map((menu) => (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => setOpen(menu.label)}
              >
                <button
                  className="flex items-center gap-1 px-3 py-2 text-[13px] font-semibold uppercase tracking-widest text-brand-navy/70 hover:text-brand-green transition-colors"
                  aria-expanded={open === menu.label}
                >
                  {menu.label}
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>
            ))}
            <Link
              to="/partners"
              className="px-3 py-2 text-[13px] font-semibold uppercase tracking-widest text-brand-navy/70 hover:text-brand-green transition-colors"
            >
              Partners
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 text-[13px] font-semibold uppercase tracking-widest text-brand-navy/70 hover:text-brand-green transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/join"
            className="px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider text-brand-navy hover:bg-brand-navy/5 rounded-full transition-all"
          >
            Join the Network
          </Link>
          <Link
            to="/donate"
            className="px-6 py-2.5 bg-brand-green text-white text-[13px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-brand-green/20 hover:brightness-110 hover:-translate-y-0.5 transition-all"
          >
            Donate
          </Link>
        </div>

        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mega menu panel */}
      {open && (
        <div
          className="hidden lg:block absolute inset-x-0 top-full bg-white border-b border-brand-navy/5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => setOpen(open)}
        >
          <div className="container-page py-10">
            <div className="grid grid-cols-4 gap-8">
              {menus
                .find((m) => m.label === open)
                ?.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group block"
                    onClick={() => setOpen(null)}
                  >
                    <div className="text-base font-bold text-brand-navy group-hover:text-brand-green transition-colors">
                      {item.label}
                    </div>
                    {item.description && (
                      <p className="mt-2 text-sm text-brand-navy/60 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-brand-navy/5 bg-white">
          <div className="container-page py-6 space-y-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {menus.map((menu) => (
              <div key={menu.label}>
                <div className="text-[11px] font-bold uppercase tracking-widest text-brand-navy/40 mb-3">
                  {menu.label}
                </div>
                <div className="space-y-2">
                  {menu.items.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block text-base font-semibold text-brand-navy hover:text-brand-green"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-6 border-t border-brand-navy/5 flex flex-col gap-3">
              <Link
                to="/partners"
                className="text-base font-semibold text-brand-navy"
                onClick={() => setMobileOpen(false)}
              >
                Partners
              </Link>
              <Link
                to="/contact"
                className="text-base font-semibold text-brand-navy"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/donate"
                className="mt-2 px-6 py-3 bg-brand-green text-white text-sm font-bold uppercase tracking-wider rounded-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
