import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  target: number;
  decimals?: number;
  duration?: number;
}

const Counter = ({ target, decimals = 0, duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Quadratic ease-out formula
            const easeProgress = progress * (2 - progress);
            const currentVal = easeProgress * target;
            setCount(currentVal);
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={elementRef} className="font-mono text-4xl sm:text-5xl font-extrabold text-[#FFC801]">
      {count.toFixed(decimals)}
    </span>
  );
};

export const StatsBar = () => {
  return (
    <section className="w-full bg-[#114C5A] py-12 px-6 border-y border-white/5 reveal">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
          {/* Stat 1 */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-baseline justify-center">
              <Counter target={10} decimals={0} />
              <span className="font-mono text-4xl sm:text-5xl font-extrabold text-[#FFC801]">M+</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-[#F1F6F4] uppercase tracking-wider">
              Events Processed
            </p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-baseline justify-center">
              <Counter target={99.9} decimals={1} />
              <span className="font-mono text-4xl sm:text-5xl font-extrabold text-[#FFC801]">%</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-[#F1F6F4] uppercase tracking-wider">
              Uptime Guarantee
            </p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-baseline justify-center">
              <Counter target={500} decimals={0} />
              <span className="font-mono text-4xl sm:text-5xl font-extrabold text-[#FFC801]">+</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-[#F1F6F4] uppercase tracking-wider">
              Enterprise Integrations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
