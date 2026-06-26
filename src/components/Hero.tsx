export const Hero = () => {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 grid-pattern opacity-60" aria-hidden="true" />
      
      {/* Glowing Mesh Gradients */}
      <div className="absolute top-[20%] left-[20%] -z-10 h-72 w-72 rounded-full bg-primary/20 blur-[120px] animate-glow-1" aria-hidden="true" />
      <div className="absolute bottom-[20%] right-[20%] -z-10 h-72 w-72 rounded-full bg-secondary/15 blur-[120px] animate-glow-2" aria-hidden="true" />

      {/* Decorative SVG Pattern */}
      <div className="absolute inset-x-0 top-0 -z-10 flex justify-center overflow-hidden pointer-events-none" aria-hidden="true">
        <svg className="h-[40rem] w-[80rem] flex-none stroke-white/5 [mask-image:radial-gradient(ellipse_at_top,white,transparent)]" viewBox="0 0 1152 700">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse" x="50%">
              <path d="M.5 40V.5H40" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" strokeWidth="0" />
        </svg>
      </div>

      {/* Hero Content Container */}
      <div className="mx-auto max-w-4xl flex flex-col items-center">
        {/* Banner Announcement */}
        <div className="mb-6 flex animate-fade-in items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
          NeuralFlow AI v2.0 is now live
        </div>

        {/* Hero Title (Single H1) */}
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.1]">
          Automate Data Flows with{' '}
          <span className="bg-gradient-to-r from-primary via-fuchsia-400 to-secondary bg-clip-text text-transparent glow-text">
            Cognitive Intelligence
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-2xl text-lg text-text-secondary md:text-xl leading-relaxed">
          The ultimate developer-first platform to stream, structure, clean, and sync complex datasets in real time. Powered by self-healing AI schematics.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#pricing"
            className="group relative flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary/20 transition-all duration-200 hover:bg-primary/90 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Free Integration
            <svg
              className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="#features"
            className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore Capabilities
          </a>
        </div>

        {/* Micro Dashboard UI Mockup */}
        <div className="relative mt-16 w-full max-w-5xl rounded-2xl border border-white/10 bg-[#06041a]/60 p-2 shadow-2xl shadow-primary/10 backdrop-blur-2xl">
          <div className="rounded-xl border border-white/5 bg-[#0b0824]/90 p-4 sm:p-6 text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="rounded bg-white/5 px-3 py-1 text-xs text-text-secondary">
                pipeline_config.json
              </div>
            </div>
            
            <pre className="overflow-x-auto font-mono text-xs sm:text-sm text-text-secondary leading-relaxed p-2">
              <code>
{`{
  "platform": "NeuralFlow AI",
  "pipeline": "enterprise-data-stream",
  "status": "active",
  "cognitive_mapping": {
    "auto_schema_repair": true,
    "latency_ms": 1.4,
    "throughput_events_sec": 842000
  },
  "enclave_encryption": "AES-256-GCM"
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
