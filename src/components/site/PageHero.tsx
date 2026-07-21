import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative bg-brand-surface border-b border-brand-navy/5 overflow-hidden">
      <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-brand-green/5 blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-yellow/10 blur-3xl" aria-hidden />
      <div className="container-page relative py-24 md:py-32">
        <div className="max-w-3xl animate-reveal">
          {eyebrow && (
            <span className="inline-block px-4 py-1.5 bg-brand-green/10 text-brand-green text-[11px] font-extrabold uppercase tracking-[0.2em] rounded-full mb-6">
              {eyebrow}
            </span>
          )}
          <h1 className="text-5xl md:text-6xl font-extrabold text-brand-navy leading-[1.05] tracking-tight text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-lg md:text-xl text-brand-navy/60 leading-relaxed max-w-2xl text-pretty">
              {description}
            </p>
          )}
          {children && <div className="mt-10">{children}</div>}
        </div>
      </div>
    </section>
  );
}
