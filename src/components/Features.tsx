import { useState, useEffect, useRef } from 'react';
import { 
  Cog8Tooth, 
  Cube16Solid, 
  ChartPie, 
  LinkIcon, 
  SearchIcon, 
  ArrowPath, 
  ChevronDown 
} from './Icons';

interface FeatureItem {
  title: string;
  badge: string;
  description: string;
  icon: (className?: string) => React.ReactNode;
  graphic: React.ReactNode;
}

export const Features = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number>(0);

  // Active index ref to avoid desktop hover re-renders
  const activeIndexRef = useRef<number>(0);
  
  // DOM refs to manually add/remove styles on bento cards without re-renders
  const bentoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateBentoStyles = (idx: number) => {
    bentoRefs.current.forEach((ref, i) => {
      if (!ref) return;
      if (i === idx) {
        ref.classList.add('border-[#FFC801]', 'bg-[#114C5A]/40', 'scale-[1.01]');
        ref.classList.remove('border-white/5', 'bg-[#114C5A]');
      } else {
        ref.classList.remove('border-[#FFC801]', 'bg-[#114C5A]/40', 'scale-[1.01]');
        ref.classList.add('border-white/5', 'bg-[#114C5A]');
      }
    });
  };

  useEffect(() => {
    // Detect mobile breakpoint using ResizeObserver
    const observer = new ResizeObserver(() => {
      const isCurrentlyMobile = window.innerWidth < 768;
      setIsMobile((prev) => {
        if (prev !== isCurrentlyMobile) {
          // Context transfer on resize: sync mobileOpenIndex from activeIndexRef.current
          if (isCurrentlyMobile) {
            setMobileOpenIndex(activeIndexRef.current);
          }
          return isCurrentlyMobile;
        }
        return prev;
      });
    });
    
    observer.observe(document.documentElement);

    // Initial styling for bento
    if (!isMobile) {
      updateBentoStyles(activeIndexRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  const handleBentoHover = (idx: number) => {
    activeIndexRef.current = idx;
    updateBentoStyles(idx);
  };

  const handleAccordionToggle = (idx: number) => {
    const newIdx = mobileOpenIndex === idx ? -1 : idx;
    setMobileOpenIndex(newIdx);
    if (newIdx !== -1) {
      activeIndexRef.current = newIdx;
    }
  };

  const featuresList: FeatureItem[] = [
    {
      title: 'Cognitive Data Ingestion',
      badge: 'Ingestion Engine',
      description: 'Ingest unstructured data streams through dynamic endpoints with automated payload sanitization.',
      icon: (className) => <Cog8Tooth className={className} />,
      graphic: (
        <div className="relative flex h-28 w-full items-center justify-center overflow-hidden rounded bg-black/40 border border-white/5">
          <svg className="w-full h-full p-2 text-[#FFC801]/40 stroke-current" viewBox="0 0 200 80" fill="none" strokeWidth="1.5">
            <path d="M10 20 H70 Q80 20 90 40 T110 60 H190" className="animate-pulse" />
            <path d="M10 40 H70 Q80 40 90 40 T110 40 H190" />
            <path d="M10 60 H70 Q80 60 90 40 T110 20 H190" className="animate-pulse" />
            <circle cx="70" cy="20" r="3" fill="#FFC801" />
            <circle cx="70" cy="40" r="3" fill="#FFC801" />
            <circle cx="70" cy="60" r="3" fill="#FFC801" />
            <circle cx="90" cy="40" r="4" fill="#FF9932" className="animate-ping" />
            <circle cx="90" cy="40" r="3.5" fill="#FF9932" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Self-Healing Schemas',
      badge: 'Dynamic Adaptation',
      description: 'AI-driven mapping detects downstream structural changes and updates target schemas dynamically.',
      icon: (className) => <Cube16Solid className={className} />,
      graphic: (
        <div className="relative flex h-28 w-full items-center justify-center rounded bg-black/40 border border-white/5 p-3">
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#D9E8E2] w-full">
            <div className="rounded border border-white/10 bg-white/5 p-1.5">
              <span className="text-[#FF9932]"># source_data</span>
              <div>id: uuid</div>
              <div className="text-red-400">email: string</div>
            </div>
            <div className="rounded border border-[#FFC801]/20 bg-[#FFC801]/5 p-1.5 flex flex-col justify-between">
              <span className="text-[#FFC801]"># schema_synced</span>
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
      description: 'Confidential hardware computing shields datasets during transformations, preventing unauthorized access.',
      icon: (className) => <ChartPie className={className} />,
      graphic: (
        <div className="relative flex h-28 w-full items-center justify-center rounded bg-black/40 border border-white/5">
          <div className="relative h-14 w-14 rounded-full border border-[#FFC801]/30 bg-[#FFC801]/5 flex items-center justify-center">
            <ChartPie className="h-6 w-6 text-[#FFC801] animate-pulse" />
            <div className="absolute inset-0 rounded-full border border-dashed border-[#FFC801]/20 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>
      ),
    },
    {
      title: 'Real-Time Outlier Alerting',
      badge: 'Anomaly Detection',
      description: 'Stream cleaning engines flag logical structural inconsistencies and statistical outliers.',
      icon: (className) => <SearchIcon className={className} />,
      graphic: (
        <div className="relative flex h-28 w-full items-center justify-center rounded bg-black/40 border border-white/5">
          <svg className="w-full h-full p-2 text-white/20 stroke-current" viewBox="0 0 200 80" fill="none" strokeWidth="1.5">
            <path d="M20 10 V70 H190" />
            <circle cx="40" cy="50" r="3" fill="#FFC801" fillOpacity="0.6" />
            <circle cx="60" cy="55" r="3" fill="#FFC801" fillOpacity="0.6" />
            <circle cx="80" cy="45" r="3" fill="#FFC801" fillOpacity="0.6" />
            <circle cx="100" cy="52" r="3" fill="#FFC801" fillOpacity="0.6" />
            <circle cx="110" cy="20" r="5" fill="#FF9932" className="animate-ping" />
            <circle cx="110" cy="20" r="4.5" fill="#FF9932" />
            <path d="M110 30 V25" stroke="#FF9932" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Semantic Entity Resolution',
      badge: 'De-Duplication',
      description: 'Deduplicate consumer and business entities by combining vector embeddings with fuzzy-logic.',
      icon: (className) => <LinkIcon className={className} />,
      graphic: (
        <div className="relative flex h-28 w-full items-center justify-center rounded bg-black/40 border border-white/5 p-2">
          <div className="flex items-center gap-3 w-full max-w-[80%] font-mono text-[9px]">
            <div className="flex-1 rounded border border-white/5 bg-white/5 p-1 text-center truncate">
              Johnathan Doe
            </div>
            <ArrowPath className="h-4 w-4 text-[#FF9932] shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
            <div className="flex-1 rounded border border-[#FFC801]/20 bg-[#FFC801]/5 p-1 text-center truncate">
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
      icon: (className) => <ArrowPath className={className} />,
      graphic: (
        <div className="relative flex h-28 w-full items-center justify-center rounded bg-black/40 border border-white/5">
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded border border-[#FFC801]/30 bg-[#FFC801]/5 flex items-center justify-center text-[10px] text-[#FFC801] font-bold">AWS</div>
            <div className="h-8 w-8 rounded border border-[#FF9932]/30 bg-[#FF9932]/5 flex items-center justify-center text-[10px] text-[#FF9932] font-bold">GCP</div>
            <div className="h-8 w-8 rounded border border-white/20 bg-white/5 flex items-center justify-center text-[10px] text-[#F1F6F4] font-bold">SF</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 className="font-mono text-3xl font-bold tracking-tight text-[#F1F6F4] sm:text-5xl">
          Engineered for Modern Data Architecture
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#D9E8E2]">
          Eliminate manual transformations, prevent ingestion failures, and secure data end-to-end.
        </p>
      </div>

      {/* Responsive Layout Switch */}
      {isMobile ? (
        /* Touch-Friendly Accordion for Mobile */
        <div className="flex flex-col gap-4" role="tablist" aria-label="Feature Tabs mobile">
          {featuresList.map((feature, idx) => {
            const isOpen = mobileOpenIndex === idx;
            return (
              <article
                key={idx}
                className={`rounded-xl border transition-all duration-[150ms] ease-out ${
                  isOpen 
                    ? 'border-[#FFC801] bg-[#114C5A]/60 shadow-lg' 
                    : 'border-white/5 bg-[#114C5A]'
                }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => handleAccordionToggle(idx)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`feature-panel-${idx}`}
                  id={`feature-tab-${idx}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors duration-[150ms] ease-out ${
                      isOpen ? 'border-[#FFC801]/30 bg-[#FFC801]/10' : 'border-white/5 bg-white/5'
                    }`}>
                      {feature.icon(`h-6 w-6 ${isOpen ? 'text-[#FFC801]' : 'text-[#D9E8E2]'}`)}
                    </span>
                    <h3 className="font-mono text-base font-semibold text-[#F1F6F4]">
                      {feature.title}
                    </h3>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-[350ms] ease-in-out ${isOpen ? 'rotate-180 text-[#FFC801]' : 'text-[#D9E8E2]'}`} />
                </button>

                {/* Accordion Body using Pure CSS Grid transition (350ms duration) */}
                <div
                  id={`feature-panel-${idx}`}
                  role="tabpanel"
                  aria-labelledby={`feature-tab-${idx}`}
                  className={`grid transition-all duration-[350ms] ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
                      <p className="text-sm leading-relaxed text-[#D9E8E2]">
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
        /* Bento Grid for Desktop (no hover re-renders) */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuresList.map((feature, idx) => {
            let colSpan = 'md:col-span-1';
            if (idx === 0 || idx === 3 || idx === 4) {
              colSpan = 'md:col-span-2';
            }

            return (
              <div
                key={idx}
                ref={(el) => { bentoRefs.current[idx] = el; }}
                onMouseEnter={() => handleBentoHover(idx)}
                className={`brand-card flex flex-col justify-between p-8 rounded-2xl cursor-default ${colSpan}`}
              >
                <article className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/5 bg-white/5">
                        {feature.icon("h-6 w-6 text-[#FFC801]")}
                      </span>
                      <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-semibold text-[#D9E8E2] uppercase tracking-wider">
                        {feature.badge}
                      </span>
                    </div>
                    
                    <h3 className="font-mono text-xl font-bold text-[#F1F6F4] mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#D9E8E2] mb-8">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    {feature.graphic}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
