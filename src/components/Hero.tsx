import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, FileText, Sparkles, Flower } from 'lucide-react';
import { FloatingFlowers } from './FloatingFlowers';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <FloatingFlowers />
      
      {/* Background blobs */}
      <div className="bg-glow-pink"></div>
      <div className="bg-glow-gold"></div>

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Hero Left Content */}
          <div className="hero-text-content">
            <div className="hero-badge-container">
              <span className="badge hero-badge">
                <Sparkles size={14} className="icon-pulse" />
                Optometrista Colegiada
              </span>
            </div>
            
            <h1 className="hero-title">
              {t.heroGreeting}
            </h1>
            
            <h2 className="hero-subtitle">
              <span className="gradient-text">{t.heroSubtitle}</span>
            </h2>
            
            <p className="hero-description">
              {t.heroDescription}
            </p>

            <div className="hero-actions">
              <button onClick={handleContactClick} className="btn btn-primary pulse-btn">
                <Mail size={18} />
                {t.heroContactBtn}
              </button>
              
              <a 
                href="/HIRA KHAN ASLAM CV.pdf" 
                download="HIRA KHAN ASLAM CV.pdf" 
                className="btn btn-secondary lens-glare"
              >
                <FileText size={18} />
                {t.heroCVBtn}
              </a>
            </div>
          </div>

          {/* Hero Right Media (Profile Picture with Floral Frame) */}
          <div className="hero-media-content">
            <div className="profile-frame-container">
              {/* Outer decorative ring */}
              <div className="profile-decor-ring ring-1"></div>
              <div className="profile-decor-ring ring-2"></div>
              
              {/* Floating decorative flowers */}
              <div className="decor-flower df-1">
                <Flower size={30} fill="#f472b6" color="#f472b6" />
              </div>
              <div className="decor-flower df-2">
                <Flower size={24} fill="#fdba74" color="#fdba74" />
              </div>
              
              {/* Profile Image Wrapper */}
              <div className="profile-image-wrapper">
                <img 
                  src="/profile.png" 
                  alt="Hira Khan Aslam" 
                  className="profile-img" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 8rem;
          padding-bottom: 5rem;
          background: linear-gradient(180deg, var(--bg-tertiary) 0%, var(--bg-primary) 100%);
        }

        .hero-container {
          position: relative;
          z-index: 10;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.2fr 0.8fr;
            gap: 2rem;
          }
        }

        .hero-text-content {
          text-align: center;
        }

        @media (min-width: 992px) {
          .hero-text-content {
            text-align: left;
          }
        }

        .hero-badge-container {
          margin-bottom: 1.25rem;
        }

        .hero-badge {
          background-color: rgba(236, 72, 153, 0.1);
          color: var(--accent-pink);
          border-color: rgba(236, 72, 153, 0.2);
        }

        .icon-pulse {
          animation: spinEffect 4s linear infinite;
        }

        @keyframes spinEffect {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .hero-title {
          font-size: 2.75rem;
          line-height: 1.15;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        @media (min-width: 576px) {
          .hero-title {
            font-size: 3.5rem;
          }
        }

        @media (min-width: 992px) {
          .hero-title {
            font-size: 4rem;
          }
        }

        .hero-subtitle {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 576px) {
          .hero-subtitle {
            font-size: 2.25rem;
          }
        }

        .hero-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 580px;
          margin: 0 auto 2.25rem auto;
          line-height: 1.7;
        }

        @media (min-width: 992px) {
          .hero-description {
            margin-left: 0;
            font-size: 1.15rem;
          }
        }

        .hero-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
          align-items: center;
        }

        @media (min-width: 576px) {
          .hero-actions {
            flex-direction: row;
          }
        }

        @media (min-width: 992px) {
          .hero-actions {
            justify-content: flex-start;
          }
        }

        /* Profile Picture Floral Frame styling */
        .hero-media-content {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .profile-frame-container {
          position: relative;
          width: 230px;
          height: 230px;
          margin: 1.5rem 0;
        }

        @media (max-width: 576px) {
          .ring-2 {
            display: none !important;
          }
          .ring-1 {
            top: -6px !important;
            left: -6px !important;
            right: -6px !important;
            bottom: -6px !important;
          }
        }

        @media (min-width: 576px) {
          .profile-frame-container {
            width: 320px;
            height: 320px;
          }
        }

        /* Decorative Rings */
        .profile-decor-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px dashed var(--accent-pink);
          opacity: 0.3;
          pointer-events: none;
        }

        .ring-1 {
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          animation: rotateClockwise 25s linear infinite;
        }

        .ring-2 {
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          border: 1px solid var(--accent-teal);
          opacity: 0.2;
          animation: rotateCounterClockwise 35s linear infinite;
        }

        @keyframes rotateClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes rotateCounterClockwise {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        /* Decorative Flowers */
        .decor-flower {
          position: absolute;
          z-index: 12;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.1));
          animation: floatFlowerIcon 5s ease-in-out infinite;
        }

        .df-1 {
          top: 10px;
          right: -10px;
          animation-delay: 0.5s;
        }

        .df-2 {
          bottom: 20px;
          left: -15px;
          animation-delay: 1.5s;
        }

        @keyframes floatFlowerIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(15deg); }
        }

        /* Image Wrapper */
        .profile-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 6px solid #ffffff;
          box-shadow: 0 15px 40px rgba(236, 72, 153, 0.2);
          z-index: 11;
        }

        [data-theme='dark'] .profile-image-wrapper {
          border-color: var(--bg-secondary);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }

        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          /* Center on Hira's face by adjusting object-position */
          object-position: 50% 35%;
          transition: transform 0.5s ease;
        }

        .profile-image-wrapper:hover .profile-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};
