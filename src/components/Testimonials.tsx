interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export const Testimonials = () => {
  const testimonialsList: Testimonial[] = [
    {
      quote: "NeuralFlow AI cut our database integration times from weeks to under ten minutes. The cognitive schema self-repair feels like actual magic.",
      name: "Marcus Vance",
      role: "VP of Engineering",
      company: "DataPulse Systems",
      avatar: "MV"
    },
    {
      quote: "With strict compliance requirements, their Zero-Trust Enclaves allowed us to pipeline customer health telemetry safely. Uptime has been solid.",
      name: "Elena Rostova",
      role: "Head of Infrastructure",
      company: "MedCrypt Tech",
      avatar: "ER"
    },
    {
      quote: "The entity deduplication algorithm solved a year-long ledger reconciliation bug. Our operations team is finally sleeping at night.",
      name: "Siddharth Nair",
      role: "Lead Platform Architect",
      company: "NeoFin Solutions",
      avatar: "SN"
    }
  ];

  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-6 py-24 border-t border-white/5">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Trusted by High-Performance Teams
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
          See how engineers and architecture leads leverage NeuralFlow AI to simplify pipeline operational burdens.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {testimonialsList.map((t, idx) => (
          <article 
            key={idx} 
            className="glow-card flex flex-col justify-between p-8 rounded-2xl border border-white/10 bg-black/40"
          >
            {/* Quote */}
            <p className="text-base leading-relaxed text-text-primary italic mb-8">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author details */}
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-sm font-bold text-primary font-display" aria-hidden="true">
                {t.avatar}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {t.name}
                </h3>
                <p className="text-xs text-text-secondary">
                  {t.role}, <span className="text-primary font-medium">{t.company}</span>
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
