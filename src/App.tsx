import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Timeline } from './components/Timeline';
import { InteractiveOptics } from './components/InteractiveOptics';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  useEffect(() => {
    const handleScrollEffects = () => {
      // 1. Update Scroll Progress Bar
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      const progressBar = document.getElementById('scroll-progress-bar');
      if (progressBar) {
        progressBar.style.width = scrolled + '%';
      }
    };

    window.addEventListener('scroll', handleScrollEffects);
    // Trigger on initial load
    setTimeout(handleScrollEffects, 100);

    return () => window.removeEventListener('scroll', handleScrollEffects);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app-wrapper">
          <div id="scroll-progress-bar" className="scroll-progress-bar"></div>
          <Navbar />
          <main style={{ overflow: 'hidden' }}>
            <Hero />
            <About />
            <Skills />
            <Timeline />
            <InteractiveOptics />
            <Education />
            <Contact />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
