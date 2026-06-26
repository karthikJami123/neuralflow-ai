import { useEffect, useRef } from 'react';

interface CurrencyConfig {
  symbol: string;
  rate: number;
}

interface BillingConfig {
  multiplier: number;
  periodText: string;
}

interface PricingConfig {
  baseRates: {
    starter: number;
    pro: number;
    enterprise: number;
  };
  currency: {
    USD: CurrencyConfig;
    INR: CurrencyConfig;
    EUR: CurrencyConfig;
  };
  billing: {
    monthly: BillingConfig;
    annual: BillingConfig;
  };
}

const pricingConfig: PricingConfig = {
  baseRates: {
    starter: 29,
    pro: 79,
    enterprise: 249,
  },
  currency: {
    USD: { symbol: '$', rate: 1.0 },
    INR: { symbol: '₹', rate: 82.0 },
    EUR: { symbol: '€', rate: 0.92 },
  },
  billing: {
    monthly: { multiplier: 1.0, periodText: 'Billed monthly' },
    annual: { multiplier: 0.8, periodText: 'Billed annually (20% off)' },
  },
};

export const Pricing = () => {
  // Price DOM refs
  const starterPriceRef = useRef<HTMLSpanElement>(null);
  const proPriceRef = useRef<HTMLSpanElement>(null);
  const enterprisePriceRef = useRef<HTMLSpanElement>(null);

  // Billing period helper label refs
  const starterPeriodLabelRef = useRef<HTMLSpanElement>(null);
  const proPeriodLabelRef = useRef<HTMLSpanElement>(null);
  const enterprisePeriodLabelRef = useRef<HTMLSpanElement>(null);

  // Active selections (stored in refs to prevent React state trigger)
  const billingCycleRef = useRef<'monthly' | 'annual'>('monthly');
  const currencyRef = useRef<'USD' | 'INR' | 'EUR'>('USD');

  // Switcher DOM elements refs for direct class manipulation
  const btnMonthlyRef = useRef<HTMLButtonElement>(null);
  const btnAnnualRef = useRef<HTMLButtonElement>(null);
  const btnUsdRef = useRef<HTMLButtonElement>(null);
  const btnInrRef = useRef<HTMLButtonElement>(null);
  const btnEurRef = useRef<HTMLButtonElement>(null);

  // Core update function utilizing vanilla DOM manipulations
  const updatePricingDOM = () => {
    const billing = billingCycleRef.current;
    const currency = currencyRef.current;
    
    const currencyInfo = pricingConfig.currency[currency];
    const billingMult = pricingConfig.billing[billing].multiplier;
    const periodText = pricingConfig.billing[billing].periodText;

    // Calculate rates
    const starterRate = Math.round(pricingConfig.baseRates.starter * currencyInfo.rate * billingMult);
    const proRate = Math.round(pricingConfig.baseRates.pro * currencyInfo.rate * billingMult);
    const enterpriseRate = Math.round(pricingConfig.baseRates.enterprise * currencyInfo.rate * billingMult);

    // Apply directly to text nodes
    if (starterPriceRef.current) {
      starterPriceRef.current.textContent = `${currencyInfo.symbol}${starterRate}`;
    }
    if (proPriceRef.current) {
      proPriceRef.current.textContent = `${currencyInfo.symbol}${proRate}`;
    }
    if (enterprisePriceRef.current) {
      enterprisePriceRef.current.textContent = `${currencyInfo.symbol}${enterpriseRate}`;
    }

    // Apply period description updates
    if (starterPeriodLabelRef.current) starterPeriodLabelRef.current.textContent = periodText;
    if (proPeriodLabelRef.current) proPeriodLabelRef.current.textContent = periodText;
    if (enterprisePeriodLabelRef.current) enterprisePeriodLabelRef.current.textContent = periodText;
  };

  const handleBillingToggle = (cycle: 'monthly' | 'annual') => {
    if (billingCycleRef.current === cycle) return;
    billingCycleRef.current = cycle;

    // Update buttons active styles directly via DOM classes (isolated micro-interactions)
    const activeClasses = ['bg-primary', 'text-white', 'shadow-md', 'shadow-primary/20'];
    const inactiveClasses = ['text-text-secondary', 'hover:text-white'];

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

    const activeClasses = ['bg-white/10', 'text-white', 'border-white/20'];
    const inactiveClasses = ['text-text-secondary', 'hover:text-white', 'border-transparent'];

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
      <div className="absolute top-[10%] left-[50%] -translate-x-[50%] -z-10 h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-[120px] pointer-events-none" aria-hidden="true" />
      
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Scale-Ready Transparent Pricing
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
          No hidden fees or unexpected bandwidth adjustments. Choose the plan matching your pipeline scale.
        </p>

        {/* Switchers Container */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Billing Switcher (150ms transitions) */}
          <div className="flex rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md">
            <button
              ref={btnMonthlyRef}
              type="button"
              onClick={() => handleBillingToggle('monthly')}
              className="rounded-full px-4 py-2 text-xs font-semibold bg-primary text-white shadow-md shadow-primary/20 transition-all duration-150 ease-out focus:outline-none"
            >
              Monthly Billing
            </button>
            <button
              ref={btnAnnualRef}
              type="button"
              onClick={() => handleBillingToggle('annual')}
              className="rounded-full px-4 py-2 text-xs font-semibold text-text-secondary hover:text-white transition-all duration-150 ease-out focus:outline-none"
            >
              Annual Billing (20% off)
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="flex rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md">
            <button
              ref={btnUsdRef}
              type="button"
              onClick={() => handleCurrencyToggle('USD')}
              className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-150 ease-out focus:outline-none"
            >
              USD ($)
            </button>
            <button
              ref={btnInrRef}
              type="button"
              onClick={() => handleCurrencyToggle('INR')}
              className="rounded-full border border-transparent px-3.5 py-1.5 text-xs font-semibold text-text-secondary hover:text-white transition-all duration-150 ease-out focus:outline-none"
            >
              INR (₹)
            </button>
            <button
              ref={btnEurRef}
              type="button"
              onClick={() => handleCurrencyToggle('EUR')}
              className="rounded-full border border-transparent px-3.5 py-1.5 text-xs font-semibold text-text-secondary hover:text-white transition-all duration-150 ease-out focus:outline-none"
            >
              EUR (€)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
        {/* Tier 1: Starter */}
        <article className="glow-card flex flex-col justify-between p-8 rounded-2xl border border-white/10 bg-black/40">
          <div>
            <h3 className="font-display text-lg font-semibold text-white">Starter</h3>
            <p className="mt-2 text-xs text-text-secondary">Perfect for developer sandboxes and prototype workflows.</p>
            
            {/* Price node wrapper - Empty default to prevent React flash */}
            <div className="my-6 flex items-baseline gap-1.5">
              <span 
                ref={starterPriceRef} 
                className="font-display text-4xl font-extrabold text-white tracking-tight"
              />
              <span className="text-sm font-medium text-text-secondary">/mo</span>
            </div>
            
            <span 
              ref={starterPeriodLabelRef} 
              className="text-xs text-text-secondary/70 font-medium block h-4"
            />
            
            <hr className="my-6 border-white/5" />
            
            <ul className="flex flex-col gap-4 text-sm text-text-secondary" aria-label="Starter features list">
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Up to 10,000 monthly events
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                1 Active ingestion pipeline
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Community Discord support
              </li>
              <li className="flex items-center gap-3 text-text-secondary/40">
                <svg className="h-4 w-4 text-text-secondary/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Zero-Trust enclaves
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <a
              href="#pricing"
              className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 py-3 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98]"
            >
              Get Started
            </a>
          </div>
        </article>

        {/* Tier 2: Pro (Featured) */}
        <article className="glow-card relative flex flex-col justify-between p-8 rounded-2xl border-2 border-primary bg-gradient-to-b from-[#110d3a] to-[#040316] shadow-xl shadow-primary/10">
          <div className="absolute top-0 right-8 -translate-y-[50%] rounded-full bg-primary px-3.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
            Most Popular
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-white">Pro</h3>
            <p className="mt-2 text-xs text-text-secondary">Designed for scaling operations and production-grade stacks.</p>
            
            {/* Price node wrapper - Empty default to prevent React flash */}
            <div className="my-6 flex items-baseline gap-1.5">
              <span 
                ref={proPriceRef} 
                className="font-display text-5xl font-extrabold text-white tracking-tight"
              />
              <span className="text-sm font-medium text-text-secondary">/mo</span>
            </div>
            
            <span 
              ref={proPeriodLabelRef} 
              className="text-xs text-text-secondary/70 font-medium block h-4"
            />
            
            <hr className="my-6 border-white/5" />
            
            <ul className="flex flex-col gap-4 text-sm text-text-secondary" aria-label="Pro features list">
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Up to 500,000 monthly events
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                5 Active ingestion pipelines
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Cognitive schema mapping
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                24/7 Priority chat support
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <a
              href="#pricing"
              className="flex w-full items-center justify-center rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98]"
            >
              Start Pro Trial
            </a>
          </div>
        </article>

        {/* Tier 3: Enterprise */}
        <article className="glow-card flex flex-col justify-between p-8 rounded-2xl border border-white/10 bg-black/40">
          <div>
            <h3 className="font-display text-lg font-semibold text-white">Enterprise</h3>
            <p className="mt-2 text-xs text-text-secondary">Customized deployments needing end-to-end security enclaves.</p>
            
            {/* Price node wrapper - Empty default to prevent React flash */}
            <div className="my-6 flex items-baseline gap-1.5">
              <span 
                ref={enterprisePriceRef} 
                className="font-display text-4xl font-extrabold text-white tracking-tight"
              />
              <span className="text-sm font-medium text-text-secondary">/mo</span>
            </div>
            
            <span 
              ref={enterprisePeriodLabelRef} 
              className="text-xs text-text-secondary/70 font-medium block h-4"
            />
            
            <hr className="my-6 border-white/5" />
            
            <ul className="flex flex-col gap-4 text-sm text-text-secondary" aria-label="Enterprise features list">
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Unlimited monthly events
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Unlimited active pipelines
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Dedicated Zero-Trust Enclaves
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                SLA guarantees + dedicated support
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <a
              href="#pricing"
              className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 py-3 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98]"
            >
              Contact Relations
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};
