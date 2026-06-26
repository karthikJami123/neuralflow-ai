import { useEffect, useRef } from 'react';

interface CurrencyDetails {
  symbol: string;
  rate: number;
}

interface TierDetails {
  base: number;
}

interface PricingMatrix {
  tiers: {
    starter: TierDetails;
    pro: TierDetails;
    enterprise: TierDetails;
  };
  currencies: {
    USD: CurrencyDetails;
    INR: CurrencyDetails;
    EUR: CurrencyDetails;
  };
  annualMultiplier: number;
}

const PRICING_MATRIX: PricingMatrix = {
  tiers: {
    starter: { base: 29 },
    pro: { base: 79 },
    enterprise: { base: 249 }
  },
  currencies: {
    USD: { symbol: '$', rate: 1 },
    INR: { symbol: '₹', rate: 83.5 },
    EUR: { symbol: '€', rate: 0.92 }
  },
  annualMultiplier: 0.8
};

export const Pricing = () => {
  // DOM refs for direct text updates (no parent re-renders)
  const starterPriceRef = useRef<HTMLSpanElement>(null);
  const proPriceRef = useRef<HTMLSpanElement>(null);
  const enterprisePriceRef = useRef<HTMLSpanElement>(null);

  const starterPeriodLabelRef = useRef<HTMLSpanElement>(null);
  const proPeriodLabelRef = useRef<HTMLSpanElement>(null);
  const enterprisePeriodLabelRef = useRef<HTMLSpanElement>(null);

  // Switch selection tracking (mutable refs)
  const billingCycleRef = useRef<'monthly' | 'annual'>('monthly');
  const currencyRef = useRef<'USD' | 'INR' | 'EUR'>('USD');

  // DOM refs for manually style-toggling buttons
  const btnMonthlyRef = useRef<HTMLButtonElement>(null);
  const btnAnnualRef = useRef<HTMLButtonElement>(null);
  const btnUsdRef = useRef<HTMLButtonElement>(null);
  const btnInrRef = useRef<HTMLButtonElement>(null);
  const btnEurRef = useRef<HTMLButtonElement>(null);

  // Compute and inject values
  const updatePricingDOM = () => {
    const billing = billingCycleRef.current;
    const currency = currencyRef.current;
    
    const isAnnual = billing === 'annual';
    const currencyInfo = PRICING_MATRIX.currencies[currency];
    const multiplier = isAnnual ? PRICING_MATRIX.annualMultiplier : 1;
    const periodText = isAnnual ? 'Billed annually (20% off)' : 'Billed monthly';

    // Calculate rates exactly as requested: Math.round(tier.base * currency.rate * (isAnnual ? 0.8 : 1))
    const starterRate = Math.round(PRICING_MATRIX.tiers.starter.base * currencyInfo.rate * multiplier);
    const proRate = Math.round(PRICING_MATRIX.tiers.pro.base * currencyInfo.rate * multiplier);
    const enterpriseRate = Math.round(PRICING_MATRIX.tiers.enterprise.base * currencyInfo.rate * multiplier);

    // Apply directly to text nodes (isolated, zero React component re-renders)
    if (starterPriceRef.current) {
      starterPriceRef.current.textContent = `${currencyInfo.symbol}${starterRate}`;
    }
    if (proPriceRef.current) {
      proPriceRef.current.textContent = `${currencyInfo.symbol}${proRate}`;
    }
    if (enterprisePriceRef.current) {
      enterprisePriceRef.current.textContent = `${currencyInfo.symbol}${enterpriseRate}`;
    }

    // Apply period label updates
    if (starterPeriodLabelRef.current) starterPeriodLabelRef.current.textContent = periodText;
    if (proPeriodLabelRef.current) proPeriodLabelRef.current.textContent = periodText;
    if (enterprisePeriodLabelRef.current) enterprisePeriodLabelRef.current.textContent = periodText;
  };

  const handleBillingToggle = (cycle: 'monthly' | 'annual') => {
    if (billingCycleRef.current === cycle) return;
    billingCycleRef.current = cycle;

    // Apply micro-interaction classes directly (150ms transitions)
    const activeClasses = ['bg-[#FFC801]', 'text-[#172B36]'];
    const inactiveClasses = ['text-[#D9E8E2]', 'hover:text-[#F1F6F4]'];

    if (cycle === 'monthly') {
      activeClasses.forEach(c => btnMonthlyRef.current?.classList.add(c));
      inactiveClasses.forEach(c => btnMonthlyRef.current?.classList.remove(c));
      
      activeClasses.forEach(c => btnAnnualRef.current?.classList.remove(c));
      inactiveClasses.forEach(c => btnAnnualRef.current?.classList.add(c));
    } else {
      activeClasses.forEach(c => btnAnnualRef.current?.classList.add(c));
      inactiveClasses.forEach(c => btnAnnualRef.current?.classList.remove(c));
      
      activeClasses.forEach(c => btnMonthlyRef.current?.classList.remove(c));
      inactiveClasses.forEach(c => btnMonthlyRef.current?.classList.add(c));
    }

    updatePricingDOM();
  };

  const handleCurrencyToggle = (currency: 'USD' | 'INR' | 'EUR') => {
    if (currencyRef.current === currency) return;
    currencyRef.current = currency;

    const btns = {
      USD: btnUsdRef.current,
      INR: btnInrRef.current,
      EUR: btnEurRef.current,
    };

    const activeClasses = ['bg-[#FFC801]/10', 'text-[#FFC801]', 'border-[#FFC801]/30'];
    const inactiveClasses = ['text-[#D9E8E2]', 'hover:text-[#F1F6F4]', 'border-transparent'];

    Object.entries(btns).forEach(([key, btn]) => {
      if (!btn) return;
      if (key === currency) {
        activeClasses.forEach(c => btn.classList.add(c));
        inactiveClasses.forEach(c => btn.classList.remove(c));
      } else {
        activeClasses.forEach(c => btn.classList.remove(c));
        inactiveClasses.forEach(c => btn.classList.add(c));
      }
    });

    updatePricingDOM();
  };

  // Perform initial calculation on mount
  useEffect(() => {
    updatePricingDOM();
  }, []);

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 relative">
      <div className="absolute top-[10%] left-[50%] -translate-x-[50%] -z-10 h-[40rem] w-[40rem] rounded-full bg-[#FFC801]/5 blur-[120px] pointer-events-none" aria-hidden="true" />
      
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 className="font-mono text-3xl font-bold tracking-tight text-[#F1F6F4] sm:text-5xl">
          Scale-Ready Transparent Pricing
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#D9E8E2]">
          No hidden fees or unexpected bandwidth adjustments. Choose the plan matching your pipeline scale.
        </p>

        {/* Switchers Container */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Billing Switcher (150ms transitions) */}
          <div className="flex rounded-lg border border-white/5 bg-[#114C5A] p-1">
            <button
              ref={btnMonthlyRef}
              type="button"
              onClick={() => handleBillingToggle('monthly')}
              className="rounded-md px-4 py-2 text-xs font-semibold bg-[#FFC801] text-[#172B36] transition-all duration-[150ms] ease-out focus:outline-none"
            >
              Monthly Billing
            </button>
            <button
              ref={btnAnnualRef}
              type="button"
              onClick={() => handleBillingToggle('annual')}
              className="rounded-md px-4 py-2 text-xs font-semibold text-[#D9E8E2] hover:text-[#F1F6F4] transition-all duration-[150ms] ease-out focus:outline-none"
            >
              Annual Billing (20% off)
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="flex rounded-lg border border-white/5 bg-[#114C5A] p-1">
            <button
              ref={btnUsdRef}
              type="button"
              onClick={() => handleCurrencyToggle('USD')}
              className="rounded-md border border-[#FFC801]/30 bg-[#FFC801]/10 px-3.5 py-1.5 text-xs font-semibold text-[#FFC801] transition-all duration-[150ms] ease-out focus:outline-none"
            >
              USD ($)
            </button>
            <button
              ref={btnInrRef}
              type="button"
              onClick={() => handleCurrencyToggle('INR')}
              className="rounded-md border border-transparent px-3.5 py-1.5 text-xs font-semibold text-[#D9E8E2] hover:text-[#F1F6F4] transition-all duration-[150ms] ease-out focus:outline-none"
            >
              INR (₹)
            </button>
            <button
              ref={btnEurRef}
              type="button"
              onClick={() => handleCurrencyToggle('EUR')}
              className="rounded-md border border-transparent px-3.5 py-1.5 text-xs font-semibold text-[#D9E8E2] hover:text-[#F1F6F4] transition-all duration-[150ms] ease-out focus:outline-none"
            >
              EUR (€)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
        {/* Tier 1: Starter */}
        <article className="brand-card pricing-card flex flex-col justify-between p-8 rounded-xl border border-white/10 bg-[#114C5A]">
          <div>
            <h3 className="font-mono text-lg font-semibold text-[#F1F6F4]">Starter</h3>
            <p className="mt-2 text-xs text-[#D9E8E2]">Perfect for developer sandboxes and prototype workflows.</p>
            
            {/* Price node wrapper - Empty default to prevent React flash */}
            <div className="my-6 flex items-baseline gap-1.5">
              <span 
                ref={starterPriceRef} 
                className="font-mono text-4xl font-extrabold text-[#F1F6F4] tracking-tight"
              />
              <span className="text-sm font-medium text-[#D9E8E2]">/mo</span>
            </div>
            
            <span 
              ref={starterPeriodLabelRef} 
              className="text-xs text-[#D9E8E2]/70 font-medium block h-4"
            />
            
            <hr className="my-6 border-white/5" />
            
            <ul className="flex flex-col gap-4 text-sm text-[#D9E8E2]" aria-label="Starter features list">
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#FFC801] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Up to 10,000 monthly events
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#FFC801] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                1 Active ingestion pipeline
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#FFC801] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Community Discord support
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <a
              href="#pricing"
              className="flex w-full items-center justify-center rounded-lg bg-[#FFC801] py-3 text-center text-sm font-semibold text-[#172B36] transition-all duration-[150ms] ease-out hover:bg-[#FF9932] active:scale-[0.98]"
            >
              Get Started
            </a>
          </div>
        </article>

        {/* Tier 2: Pro (Featured) */}
        <article className="brand-card pricing-card pro-card-glow relative flex flex-col justify-between p-8 rounded-xl border border-[#FFC801] bg-[#114C5A]/80 shadow-xl">
          <div className="absolute top-0 right-8 -translate-y-[50%] rounded-full bg-[#FFC801] px-3.5 py-1 text-[10px] font-bold text-[#172B36] uppercase tracking-wider">
            Most Popular
          </div>
          <div>
            <h3 className="font-mono text-lg font-semibold text-[#F1F6F4]">Pro</h3>
            <p className="mt-2 text-xs text-[#D9E8E2]">Designed for scaling operations and production-grade stacks.</p>
            
            {/* Price node wrapper - Empty default to prevent React flash */}
            <div className="my-6 flex items-baseline gap-1.5">
              <span 
                ref={proPriceRef} 
                className="font-mono text-5xl font-extrabold text-[#F1F6F4] tracking-tight"
              />
              <span className="text-sm font-medium text-[#D9E8E2]">/mo</span>
            </div>
            
            <span 
              ref={proPeriodLabelRef} 
              className="text-xs text-[#D9E8E2]/70 font-medium block h-4"
            />
            
            <hr className="my-6 border-white/5" />
            
            <ul className="flex flex-col gap-4 text-sm text-[#D9E8E2]" aria-label="Pro features list">
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#FFC801] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Up to 500,000 monthly events
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#FFC801] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                5 Active ingestion pipelines
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#FFC801] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Cognitive schema mapping
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#FFC801] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                24/7 Priority chat support
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <a
              href="#pricing"
              className="flex w-full items-center justify-center rounded-lg bg-[#FFC801] py-3 text-center text-sm font-semibold text-[#172B36] shadow-lg transition-all duration-[150ms] ease-out hover:bg-[#FF9932] active:scale-[0.98]"
            >
              Start Pro Trial
            </a>
          </div>
        </article>

        {/* Tier 3: Enterprise */}
        <article className="brand-card pricing-card flex flex-col justify-between p-8 rounded-xl border border-white/10 bg-[#114C5A]">
          <div>
            <h3 className="font-mono text-lg font-semibold text-[#F1F6F4]">Enterprise</h3>
            <p className="mt-2 text-xs text-[#D9E8E2]">Customized deployments needing end-to-end security enclaves.</p>
            
            {/* Price node wrapper - Empty default to prevent React flash */}
            <div className="my-6 flex items-baseline gap-1.5">
              <span 
                ref={enterprisePriceRef} 
                className="font-mono text-4xl font-extrabold text-[#F1F6F4] tracking-tight"
              />
              <span className="text-sm font-medium text-[#D9E8E2]">/mo</span>
            </div>
            
            <span 
              ref={enterprisePeriodLabelRef} 
              className="text-xs text-[#D9E8E2]/70 font-medium block h-4"
            />
            
            <hr className="my-6 border-white/5" />
            
            <ul className="flex flex-col gap-4 text-sm text-[#D9E8E2]" aria-label="Enterprise features list">
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#FFC801] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Unlimited monthly events
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#FFC801] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Unlimited active pipelines
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#FFC801] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Dedicated Zero-Trust Enclaves
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <a
              href="#pricing"
              className="flex w-full items-center justify-center rounded-lg bg-[#FFC801] py-3 text-center text-sm font-semibold text-[#172B36] transition-all duration-[150ms] ease-out hover:bg-[#FF9932] active:scale-[0.98]"
            >
              Contact Relations
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};
