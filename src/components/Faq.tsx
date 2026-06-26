import { useState } from 'react';
import { ChevronDown, ChevronUp } from './Icons';

interface FaqItem {
  question: string;
  answer: string;
}

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqData: FaqItem[] = [
    {
      question: "How does SynapseFlow AI handle real-time data streams?",
      answer: "SynapseFlow AI processes high-throughput real-time streams using a sub-millisecond serialization engine that handles payloads with structural validation on input hooks."
    },
    {
      question: "What currencies and billing cycles are supported?",
      answer: "We support USD ($), INR (₹), and EUR (€) with custom regional multipliers, offering both Monthly and Annual billing frequencies (the latter at 20% off)."
    },
    {
      question: "Is my data secure with Zero-Trust Enclaves?",
      answer: "Yes. Raw data payloads are processed inside cryptographically isolated enclaves, preventing unauthorized systems or administrators from reading cleartext data."
    },
    {
      question: "Can I switch plans anytime?",
      answer: "Absolutely. You can dynamically adjust your plan tier or transition from monthly to annual billing cycles at any time."
    },
    {
      question: "What frameworks and languages does SynapseFlow AI support?",
      answer: "We offer native SDK libraries for Node.js, Go, Python, and Rust, alongside standard JSON webhooks for serverless and cloud service integrations."
    }
  ];

  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-24 border-t border-white/5 reveal">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 className="font-mono text-3xl font-bold tracking-tight text-[#F1F6F4] sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-base text-[#D9E8E2]">
          Everything you need to know about the platform, security, and pricing.
        </p>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-4">
        {faqData.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <article
              key={idx}
              className={`rounded-lg border transition-all duration-[150ms] ease-out ${
                isOpen 
                  ? 'border-[#FFC801] bg-[#114C5A]/30 shadow-md' 
                  : 'border-white/5 bg-[#114C5A]'
              }`}
            >
              {/* Question Header Button */}
              <button
                type="button"
                onClick={() => handleToggle(idx)}
                className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${idx}`}
                id={`faq-tab-${idx}`}
              >
                <h3 className="font-mono text-base font-semibold text-[#F1F6F4]">
                  {item.question}
                </h3>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-[#FFC801]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#D9E8E2]" />
                )}
              </button>

              {/* Collapsible Answer Body (350ms ease-in-out CSS Transition) */}
              <div
                id={`faq-panel-${idx}`}
                role="tabpanel"
                aria-labelledby={`faq-tab-${idx}`}
                className={`grid transition-all duration-[350ms] ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-1">
                    <p className="text-sm leading-relaxed text-[#D9E8E2]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
