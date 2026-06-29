import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Heart, Users, Eye, Sparkles } from 'lucide-react';
import { WaveDivider } from './WaveDivider';

export const About: React.FC = () => {
  const { t, language } = useLanguage();

  const stats = [
    { id: 1, icon: <Award size={24} />, value: '4+', label: language === 'es' ? 'Años Experiencia' : 'Years Experience' },
    { id: 2, icon: <Users size={24} />, value: '1K+', label: language === 'es' ? 'Exámenes Visuales' : 'Visual Examinations' },
    { id: 3, icon: <Heart size={24} />, value: '5', label: language === 'es' ? 'Idiomas Hablados' : 'Languages Spoken' },
    { id: 4, icon: <Sparkles size={24} />, value: '100%', label: language === 'es' ? 'Trato Cercano' : 'Patient Care' },
  ];

  return (
    <section id="about" className="about-section">
      <WaveDivider color="var(--bg-secondary)" />
      
      <div className="bg-glow-teal"></div>
      
      <div className="container about-container">
        <div className="section-header">
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutSubtitle}</p>
        </div>

        <div className="grid-2 about-grid">
          {/* Left Column: Stats & Vision Accent */}
          <div className="about-left-col">
            <div className="stats-grid">
              {stats.map((stat) => (
                <div key={stat.id} className="stat-card glass-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
            
            {/* Playful optical-art lens representation */}
            <div className="lens-graphic-card glass-card">
              <div className="lens-circle">
                <Eye size={48} className="lens-eye-icon" />
                <div className="lens-shine"></div>
              </div>
              <div className="lens-info">
                <h4>{t.aboutHighlightOptics}</h4>
                <p>{t.aboutHighlightText}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Core Info */}
          <div className="about-right-col">
            <div className="bio-card glass-card">
              <p className="bio-paragraph highlight-first">
                {t.aboutText1}
              </p>
              
              <p className="bio-paragraph">
                {t.aboutText2}
              </p>
              
              <p className="bio-paragraph">
                {t.aboutText3}
              </p>

              <div className="highlights-list">
                <div className="highlight-item">
                  <div className="highlight-bullet bullet-pink"></div>
                  <div>
                    <strong>{t.aboutHighlight1Title}:</strong> {t.aboutHighlight1Desc}
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-bullet bullet-teal"></div>
                  <div>
                    <strong>{t.aboutHighlight2Title}:</strong> {t.aboutHighlight2Desc}
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-bullet bullet-gold"></div>
                  <div>
                    <strong>{t.aboutHighlight3Title}:</strong> {t.aboutHighlight3Desc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WaveDivider flip color="var(--bg-secondary)" />

      <style>{`
        .about-section {
          background-color: var(--bg-secondary);
          z-index: 5;
        }

        .about-container {
          position: relative;
          z-index: 10;
        }

        .about-grid {
          align-items: stretch;
        }

        /* Stats Grid styles */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          padding: 1.5rem 1.25rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--bg-primary);
          border-radius: 20px;
        }

        .stat-icon {
          color: var(--accent-pink);
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        /* Lens Graphic Design */
        .lens-graphic-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%);
          border-radius: 20px;
        }

        .lens-circle {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(45,212,191,0.2) 0%, rgba(236,72,153,0.1) 100%);
          border: 3px solid var(--accent-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-teal);
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(13, 148, 136, 0.15);
          flex-shrink: 0;
        }

        .lens-eye-icon {
          animation: lensFloat 4s ease-in-out infinite;
        }

        .lens-shine {
          position: absolute;
          top: 5px;
          right: 5px;
          width: 25px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: rotate(25deg);
        }

        @keyframes lensFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-4px) scale(1.05); }
        }

        .lens-info h4 {
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
          font-family: var(--font-friendly);
        }

        .lens-info p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Bio card styling */
        .bio-card {
          padding: 2.25rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: var(--bg-primary);
        }

        .bio-paragraph {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 1.5rem;
        }

        .bio-paragraph.highlight-first::first-letter {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent-pink);
          float: left;
          font-family: var(--font-friendly);
          line-height: 0.8;
          margin-right: 0.5rem;
          margin-top: 0.2rem;
        }

        .highlights-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
          border-top: 1px dashed var(--border-color);
          padding-top: 1.5rem;
        }

        .highlight-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .highlight-bullet {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-top: 0.4rem;
          flex-shrink: 0;
        }

        .bullet-pink { background-color: var(--accent-pink); }
        .bullet-teal { background-color: var(--accent-teal); }
        .bullet-gold { background-color: var(--accent-gold); }
      `}</style>
    </section>
  );
};
