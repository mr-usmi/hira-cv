import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Globe, Glasses } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'skills', label: t.navSkills },
    { id: 'experience', label: t.navExperience },
    { id: 'interactive', label: t.navInteractive },
    { id: 'education', label: t.navEducation },
    { id: 'contact', label: t.navContact },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset slightly to account for the sticky navbar
      const yOffset = -70; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        {/* Logo with Glasses Icon */}
        <div className="navbar-logo" onClick={() => handleNavClick('hero')}>
          <span className="logo-icon-container">
            <Glasses className="logo-glasses-icon" size={24} />
          </span>
          <span className="logo-text">Hira.optics</span>
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <button onClick={() => handleNavClick(item.id)} className="nav-btn-link">
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Actions (Toggles) */}
        <div className="navbar-actions">
          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage} 
            className="navbar-icon-btn lang-btn" 
            title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            aria-label="Toggle language"
          >
            <Globe size={18} />
            <span className="lang-text-container">
              <span className={`lang-option ${language === 'es' ? 'active' : ''}`}>ES</span>
              <span className="lang-separator">/</span>
              <span className={`lang-option ${language === 'en' ? 'active' : ''}`}>EN</span>
            </span>
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="navbar-icon-btn theme-btn" 
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Hamburger Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="navbar-icon-btn hamburger-btn"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-drawer ${isOpen ? 'open' : ''}`}>
        <ul className="mobile-menu-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <button 
                onClick={() => handleNavClick(item.id)} 
                className="mobile-nav-btn-link"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .navbar-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.25rem 2rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .navbar-container.scrolled {
          padding: 0.75rem 2rem;
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--glass-border);
          box-shadow: 0 4px 30px rgba(236, 72, 153, 0.05);
        }

        .navbar-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          font-family: var(--font-friendly);
          font-size: 1.45rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-primary);
        }

        .logo-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-pink);
          transition: transform 0.3s ease;
        }

        .navbar-logo:hover .logo-icon-container {
          transform: rotate(15deg) scale(1.1);
        }

        .logo-glasses-icon {
          stroke-width: 2.5;
        }

        .logo-text {
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-pink) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .navbar-links {
          display: none;
          list-style: none;
          gap: 1.75rem;
          align-items: center;
        }

        .nav-btn-link {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: color var(--transition-fast), transform var(--transition-fast);
          position: relative;
          padding: 0.25rem 0;
        }

        .nav-btn-link::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: 0;
          left: 0;
          background: var(--accent-gradient);
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }

        .nav-btn-link:hover {
          color: var(--accent-pink);
        }

        .nav-btn-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .navbar-icon-btn {
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 0.5rem;
          border-radius: 9999px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        [data-theme='dark'] .navbar-icon-btn {
          background: rgba(255, 255, 255, 0.05);
        }

        .navbar-icon-btn:hover {
          border-color: var(--accent-pink);
          background-color: var(--badge-bg);
          color: var(--accent-pink);
          transform: scale(1.05);
        }

        .lang-btn {
          gap: 0.4rem;
          padding: 0.5rem 0.85rem;
          border-radius: 9999px;
        }

        .lang-text-container {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.02em;
          font-family: var(--font-friendly);
        }

        .lang-option {
          opacity: 0.4;
          transition: opacity var(--transition-fast), color var(--transition-fast);
        }

        .lang-option.active {
          opacity: 1;
          color: var(--accent-pink);
        }

        .lang-separator {
          opacity: 0.2;
        }

        .hamburger-btn {
          display: flex;
        }

        .mobile-menu-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: var(--bg-primary);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(-100%);
          opacity: 0;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s linear;
          pointer-events: none;
        }

        .mobile-menu-drawer.open {
          transform: translateY(0);
          opacity: 0.98;
          pointer-events: all;
        }

        .mobile-menu-links {
          list-style: none;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-nav-btn-link {
          background: none;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-friendly);
          font-size: 1.6rem;
          font-weight: 700;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .mobile-nav-btn-link:hover {
          color: var(--accent-pink);
        }

        @media (min-width: 992px) {
          .navbar-links {
            display: flex;
          }
          .hamburger-btn {
            display: none;
          }
          .mobile-menu-drawer {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};
