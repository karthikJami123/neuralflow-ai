import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-bg text-[#D9E8E2] selection:bg-[#FFC801]/30 selection:text-[#F1F6F4]">
      {/* Semantic top-level layout wrapper */}
      <Header />
      
      <main id="main-content">
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
