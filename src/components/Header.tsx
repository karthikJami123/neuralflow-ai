import { useState } from 'react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#172B36]/90 backdrop-blur-md transition-all duration-150">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <a 
          href="/" 
          className="flex items-center gap-2 font-mono text-xl font-bold tracking-tight text-[#F1F6F4] focus:outline-none"
          aria-label="NeuralFlow AI Home"
        >
          <svg
            className="h-7 w-7 text-[#FFC801] animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span className="font-mono tracking-tight text-[#F1F6F4]">
            NeuralFlow<span className="text-[#FFC801] font-extrabold">AI</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          <a
            href="#features"
            className="text-sm font-medium text-[#D9E8E2] transition-colors duration-150 ease-out hover:text-[#FFC801]"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-[#D9E8E2] transition-colors duration-150 ease-out hover:text-[#FFC801]"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium text-[#D9E8E2] transition-colors duration-150 ease-out hover:text-[#FFC801]"
          >
            Testimonials
          </a>
        </nav>

        {/* Action Button (Yellow bg, dark text) */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#pricing"
            className="rounded-lg bg-[#FFC801] px-5 py-2 text-sm font-semibold text-[#172B36] transition-all duration-150 ease-out hover:bg-[#FF9932] hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Free
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 text-[#D9E8E2] transition-all duration-150 ease-out hover:bg-white/5 md:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle Navigation Menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-350 ease-in-out border-b border-white/5 bg-[#172B36]/95 backdrop-blur-lg ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-4 px-6 py-6" aria-label="Mobile Navigation Drawer">
          <a
            href="#features"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-medium text-[#D9E8E2] transition-colors duration-150 ease-out hover:text-[#FFC801]"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-medium text-[#D9E8E2] transition-colors duration-150 ease-out hover:text-[#FFC801]"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-medium text-[#D9E8E2] transition-colors duration-150 ease-out hover:text-[#FFC801]"
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 w-full text-center rounded-lg bg-[#FFC801] py-2.5 text-base font-semibold text-[#172B36] transition-all duration-150 ease-out hover:bg-[#FF9932]"
          >
            Start Free
          </a>
        </nav>
      </div>
    </header>
  );
};
