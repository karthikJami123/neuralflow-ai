import { useState, useEffect, type ReactNode } from 'react';

interface FeatureItem {
  title: string;
  badge: string;
  description: string;
  icon: ReactNode;
  graphic: ReactNode;
}

export const Features = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Detect mobile breakpoint using ResizeObserver
    const observer = new ResizeObserver(() => {
      setIsMobile(window.innerWidth < 768);
    });
    
    observer.observe(document.documentElement);
    
    // Set initial state
    setIsMobile(window.innerWidth < 768);

    return () => {
      observer.disconnect();
    };
  }, []);

  const featuresList: FeatureItem[] = [
    {
      title: 'Cognitive Data Ingestion',
      badge: 'Ingestion Engine',
      description: 'Ingest unstructured data streams through dynamic endpoints with automated payload sanitization and sub-millisecond serialization.',
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
      graphic: (
        <div className="relative flex h-28 w-full items-center justify-center overflow-hidden rounded bg-black/40 border border-white/5">
          <svg className="w-full h-full p-2 text-primary/40 stroke-current" viewBox="0 0 200 80" fill="none" strokeWidth="1.5">
            {/* Stream lines */}
            <path d="M10 20 H70 Q80 20 90 40 T110 60 H190" className="animate-pulse" />
            <path d="M10 40 H70 Q80 40 90 40 T110 40 H190" />
            <path d="M10 60 H70 Q80 60 90 40 T110 20 H190" className="animate-pulse" />
            
            {/* Nodes */}
            <circle cx="70" cy="20" r="3" fill="#8b5cf6" />
            <circle cx="70" cy="40" r="3" fill="#8b5cf6" />
            <circle cx="70" cy="60" r="3" fill="#8b5cf6" />
            <circle cx="90" cy="40" r="4" fill="#06b6d4" className="animate-ping" />
            <circle cx="90" cy="40" r="3.5" fill="#06b6d4" />
            <circle cx="110" cy="20" r="3" fill="#8b5cf6" />
            <circle cx="110" cy="40" r="3" fill="#8b5cf6" />
            <circle cx="110" cy="60" r="3" fill="#8b5cf6" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Self-Healing Schemas',
      badge: 'Dynamic Adaptation',
      description: 'AI-driven mapping detects downstream structural changes and updates target schemas dynamically to avoid ingestion blockages.',
      icon: (
        <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      graphic: (
        <div className="relative flex h-28 w-full items-center justify-center rounded bg-black/40 border border-white/5 p-3">
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-text-secondary w-full">
            <div className="rounded border border-white/10 bg-white/5 p-1.5">
              <span className="text-secondary"># source_data</span>
              <div>id: uuid</div>
              <div className="text-red-400">email: string</div>
            </div>
            <div className="rounded border border-primary/20 bg-primary/5 p-1.5 flex flex-col justify-between">
              <span className="text-primary"># schema_synced</span>
              <div>id: uuid</div>
              <div className="text-green-400 animate-pulse">email_hash: sha256</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Zero-Trust Enclaves',
      badge: 'Secured Cryptography',
      description: 'Confidential hardware computing shields datasets during transformations, preventing cloud operators from accessing raw values.',
      icon: (
        <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      graphic: (
        <div className="relative flex h-28 w-full items-center justify-center rounded bg-black/40 border border-white/5">
          <div className="relative h-14 w-14 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center">
            <svg className="h-6 w-6 text-accent animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="absolute inset-0 rounded-full border border-dashed border-accent/20 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>
      ),
    },
    {
      title: 'Real-Time Outlier Alerting',
      badge: 'Anomaly Detection',
      description: 'Stream cleaning engines flag logical structural inconsistencies, data leaks, and statistical outliers before writing.',
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      graphic: (
        <div className="relative flex h-28 w-full items-center justify-center rounded bg-black/40 border border-white/5">
          <svg className="w-full h-full p-2 text-white/20 stroke-current" viewBox="0 0 200 80" fill="none" strokeWidth="1.5">
            {/* Scatter plot axis */}
            <path d="M20 10 V70 H190" />
            
            {/* Standard nodes */}
            <circle cx="40" cy="50" r="3" fill="#8b5cf6" fillOpacity="0.6" />
            <circle cx="60" cy="55" r="3" fill="#8b5cf6" fillOpacity="0.6" />
            <circle cx="80" cy="45" r="3" fill="#8b5cf6" fillOpacity="0.6" />
            <circle cx="100" cy="52" r="3" fill="#8b5cf6" fillOpacity="0.6" />
            <circle cx="120" cy="48" r="3" fill="#8b5cf6" fillOpacity="0.6" />
            <circle cx="140" cy="50" r="3" fill="#8b5cf6" fillOpacity="0.6" />
            
            {/* Anomaly node */}
            <circle cx="110" cy="20" r="5" fill="#ec4899" className="animate-ping" />
            <circle cx="110" cy="20" r="4.5" fill="#ec4899" />
            <path d="M110 30 V25" stroke="#ec4899" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Semantic Entity Resolution',
      badge: 'De-Duplication',
      description: 'Deduplicate consumer and business entities by combining vector embeddings with rapid fuzzy-logic matching algorithms.',
      icon: (
        <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      graphic: (
        <div className="relative flex h-28 w-full items-center justify-center rounded bg-black/40 border border-white/5 p-2">
          <div className="flex items-center gap-3 w-full max-w-[80%] font-mono text-[9px]">
            <div className="flex-1 rounded border border-white/5 bg-white/5 p-1 text-center truncate">
              Johnathan Doe
            </div>
            <svg className="h-4 w-4 text-secondary shrink-0 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <div className="flex-1 rounded border border-secondary/20 bg-secondary/5 p-1 text-center truncate">
              John Doe
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Multi-Cloud Replication',
      badge: 'Data Mirroring',
      description: 'Replicate processed payloads in real time across AWS Redshift, GCP BigQuery, and Snowflake databases in parallel.',
      icon: (
        <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      graphic: (
        <div className="relative flex h-28 w-full items-center justify-center rounded bg-black/40 border border-white/5">
          <div className="flex gap-4">
            {/* AWS Cloud Mock */}
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded border border-orange-500/30 bg-orange-500/5 flex items-center justify-center text-[10px] text-orange-400 font-bold">AWS</div>
            </div>
            {/* GCP Cloud Mock */}
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded border border-blue-500/30 bg-blue-500/5 flex items-center justify-center text-[10px] text-blue-400 font-bold">GCP</div>
            </div>
            {/* Snowflake Mock */}
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-center text-[10px] text-cyan-400 font-bold">SF</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Engineered for Modern Data Architecture
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
          Eliminate manual transformations, prevent ingestion failures, and secure data end-to-end.
        </p>
      </div>

      {/* Responsive Layout Toggle */}
      {isMobile ? (
        /* Touch-Friendly Accordion for Mobile */
        <div className="flex flex-col gap-4" role="tablist" aria-label="Feature Tabs mobile">
          {featuresList.map((feature, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <article
                key={idx}
                className={`rounded-xl border transition-all duration-300 ${
                  isOpen 
                    ? 'border-primary/40 bg-gradient-to-b from-[#0e0b2e] to-[#050414] shadow-lg shadow-primary/5' 
                    : 'border-white/10 bg-[#070517]'
                }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`feature-panel-${idx}`}
                  id={`feature-tab-${idx}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      isOpen ? 'border-primary/20 bg-primary/10' : 'border-white/5 bg-white/5'
                    }`}>
                      {feature.icon}
                    </span>
                    <h3 className="font-display text-base font-semibold text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <svg
                    className={`h-5 w-5 text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Accordion Body using Pure CSS Grid transition */}
                <div
                  id={`feature-panel-${idx}`}
                  role="tabpanel"
                  aria-labelledby={`feature-tab-${idx}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {feature.description}
                      </p>
                      <div className="w-full mt-2">
                        {feature.graphic}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Bento Grid for Desktop */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuresList.map((feature, idx) => {
            const isActive = activeIndex === idx;
            
            // Define custom spans for Bento layout
            // Row 1: col-span-2, col-span-1
            // Row 2: col-span-1, col-span-2
            // Row 3: col-span-2, col-span-1
            let colSpan = 'md:col-span-1';
            if (idx === 0 || idx === 3 || idx === 4) {
              colSpan = 'md:col-span-2';
            }

            return (
              <article
                key={idx}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`glow-card flex flex-col justify-between p-8 rounded-2xl cursor-default ${colSpan} ${
                  isActive ? 'border-primary/45 bg-[#0e0b30]/80 shadow-xl shadow-primary/10 scale-[1.01]' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      {feature.icon}
                    </span>
                    <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                      {feature.badge}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary mb-8">
                    {feature.description}
                  </p>
                </div>
                
                <div className="mt-auto pt-4">
                  {feature.graphic}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
