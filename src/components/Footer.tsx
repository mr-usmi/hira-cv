import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Glasses, FileText, ArrowUp, Flower } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-top">
          {/* Logo & Info */}
          <div className="footer-info">
            <div className="footer-logo">
              <Glasses size={22} className="footer-logo-icon" />
              <span>Hira.optics</span>
            </div>
            <p className="footer-description">{t.footerDesc}</p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">{t.footerSections}</h4>
            <ul className="footer-links-list">
              <li><a href="#about">{t.navAbout}</a></li>
              <li><a href="#skills">{t.navSkills}</a></li>
              <li><a href="#experience">{t.navExperience}</a></li>
              <li><a href="#interactive">{t.navInteractive}</a></li>
              <li><a href="#education">{t.navEducation}</a></li>
            </ul>
          </div>

          {/* CV Download Action */}
          <div className="footer-download-col">
            <h4 className="footer-col-title">CV Document</h4>
            <p className="footer-cv-text">{t.footerCVDesc}</p>
            <a 
              href="/HIRA KHAN ASLAM CV.pdf" 
              download="HIRA KHAN ASLAM CV.pdf"
              className="btn btn-primary footer-cv-btn"
            >
              <FileText size={16} />
              {t.heroCVBtn}
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {currentYear} Hira Khan Aslam. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>

          <button onClick={handleScrollTop} className="scroll-top-btn" title="Back to Top">
            <ArrowUp size={18} />
          </button>
        </div>
        
        {/* Cute background decoration */}
        <div className="footer-decor-flower">
          <Flower size={120} />
        </div>
      </div>

      <style>{`
        .footer-section {
          background-color: var(--bg-tertiary);
          border-top: 1px solid var(--border-color);
          padding: 4.5rem 0 2rem 0;
          position: relative;
          overflow: hidden;
        }

        .footer-container {
          position: relative;
          z-index: 10;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
        }

        @media (min-width: 768px) {
          .footer-top {
            grid-template-columns: 1.5fr 1fr 1.2fr;
          }
        }

        .footer-info {
          text-align: left;
        }

        .footer-logo {
          font-family: var(--font-friendly);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .footer-logo-icon {
          color: var(--accent-pink);
          stroke-width: 2.5;
        }

        .footer-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 320px;
        }

        /* Links Col */
        .footer-links-col {
          text-align: left;
        }

        .footer-col-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
          font-family: var(--font-friendly);
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links-list a {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 600;
          transition: color var(--transition-fast);
        }

        .footer-links-list a:hover {
          color: var(--accent-pink);
        }

        /* Download Col */
        .footer-download-col {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-cv-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }

        .footer-cv-btn {
          padding: 0.7rem 1.4rem;
          font-size: 0.9rem;
        }

        /* Footer Bottom */
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
        }

        .copyright-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .scroll-top-btn {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
          transition: all var(--transition-fast);
        }

        .scroll-top-btn:hover {
          background-color: var(--accent-pink);
          border-color: var(--accent-pink);
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(236, 72, 153, 0.25);
        }

        /* Backgound Decorative Big Flower */
        .footer-decor-flower {
          position: absolute;
          bottom: -35px;
          right: -35px;
          color: var(--border-color);
          opacity: 0.5;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
    </footer>
  );
};
