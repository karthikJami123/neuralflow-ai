import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';

function App() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.05 }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-[#D9E8E2] selection:bg-[#FFC801]/30 selection:text-[#F1F6F4]">
      {/* Semantic top-level layout wrapper */}
      <Header />
      
      <main id="main-content">
        <Hero />
        
        <div className="reveal">
          <StatsBar />
        </div>
        
        <div className="reveal">
          <Features />
        </div>
        
        <div className="reveal">
          <Pricing />
        </div>
        
        <div className="reveal">
          <Testimonials />
        </div>
        
        <div className="reveal">
          <Faq />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
