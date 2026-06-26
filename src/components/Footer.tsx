export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#172B36] py-16 text-[#D9E8E2]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <a 
              href="/" 
              className="flex items-center gap-2 font-mono text-xl font-bold tracking-tight text-[#F1F6F4] focus:outline-none"
              aria-label="NeuralFlow AI Home"
            >
              <svg
                className="h-6 w-6 text-[#FFC801]"
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
              <span>NeuralFlow<span className="text-[#FFC801] font-extrabold">AI</span></span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-[#D9E8E2]">
              Premium AI-driven data automation platform. Stream, parse, clean, and synchronize datasets in real-time.
            </p>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-sm font-semibold text-[#F1F6F4] tracking-wider uppercase">Product</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href="#features" className="hover:text-[#FFC801] transition-colors duration-[150ms] ease-out">Features</a></li>
              <li><a href="#pricing" className="hover:text-[#FFC801] transition-colors duration-[150ms] ease-out">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-[#FFC801] transition-colors duration-[150ms] ease-out">Testimonials</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-sm font-semibold text-[#F1F6F4] tracking-wider uppercase">Resources</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href="#" className="hover:text-[#FFC801] transition-colors duration-[150ms] ease-out">Documentation</a></li>
              <li><a href="#" className="hover:text-[#FFC801] transition-colors duration-[150ms] ease-out">API Reference</a></li>
              <li><a href="#" className="hover:text-[#FFC801] transition-colors duration-[150ms] ease-out">Status Board</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-sm font-semibold text-[#F1F6F4] tracking-wider uppercase">Company</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href="#" className="hover:text-[#FFC801] transition-colors duration-[150ms] ease-out">About Us</a></li>
              <li><a href="#" className="hover:text-[#FFC801] transition-colors duration-[150ms] ease-out">Security</a></li>
              <li><a href="#" className="hover:text-[#FFC801] transition-colors duration-[150ms] ease-out">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-[#D9E8E2]">
            &copy; {new Date().getFullYear()} NeuralFlow AI Inc. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <a href="https://github.com" className="text-[#D9E8E2] hover:text-[#FFC801] transition-colors duration-[150ms] ease-out" aria-label="GitHub Profile">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.646.64.699 1.026 1.592 1.026 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://twitter.com" className="text-[#D9E8E2] hover:text-[#FFC801] transition-colors duration-[150ms] ease-out" aria-label="Twitter Profile">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 18.43" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
