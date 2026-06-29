import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';
import { WaveDivider } from './WaveDivider';

export const Education: React.FC = () => {
  const { t, language } = useLanguage();

  const eduItems = [
    {
      key: 'degree',
      type: 'university',
      icon: <GraduationCap size={22} />,
      color: 'var(--accent-pink)'
    },
    {
      key: 'vocational',
      type: 'fp',
      icon: <GraduationCap size={22} />,
      color: 'var(--accent-teal)'
    },
    {
      key: 'highschool',
      type: 'highschool',
      icon: <GraduationCap size={22} />,
      color: 'var(--accent-peach)'
    }
  ];

  const certifications = [
    {
      titleEs: 'Curso de Especialización en Contactología Avanzada',
      titleEn: 'Specialization Course in Advanced Contactology',
      issuer: 'UPC Gabinete Clínico'
    },
    {
      titleEs: 'Taller de Biselado de Precisión y Montaje al Aire',
      titleEn: 'Precision Edging and Rimless Glazing Workshop',
      issuer: 'Centre Universitari de la Visió'
    }
  ];

  return (
    <section id="education" className="education-section">
      <WaveDivider color="var(--bg-secondary)" />
      
      <div className="bg-glow-pink"></div>
      
      <div className="container education-container">
        <div className="section-header">
          <h2>{t.eduTitle}</h2>
          <p>{t.eduSubtitle}</p>
        </div>

        <div className="grid-2 education-grid">
          {/* Academic Column */}
          <div className="edu-col">
            <h3 className="col-heading">
              <GraduationCap size={24} className="col-title-icon pink-color" />
              {language === 'es' ? 'Estudios Académicos' : 'Academic Degrees'}
            </h3>

            <div className="edu-cards-list">
              {eduItems.map((item) => {
                const details = t.education[item.key as keyof typeof t.education];
                return (
                  <div key={item.key} className="edu-card glass-card">
                    <div 
                      className="edu-card-icon"
                      style={{ 
                        backgroundColor: 'var(--bg-tertiary)',
                        color: item.color,
                        borderColor: item.color
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="edu-card-details">
                      <span className="edu-period">
                        <Calendar size={12} />
                        {details.period}
                      </span>
                      <h4 className="edu-title-text">{details.title}</h4>
                      <p className="edu-school-text">{details.school}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="cert-col">
            <h3 className="col-heading">
              <Award size={24} className="col-title-icon teal-color" />
              {language === 'es' ? 'Certificaciones' : 'Certifications'}
            </h3>

            <div className="cert-cards-list">
              {certifications.map((cert, index) => {
                const title = language === 'es' ? cert.titleEs : cert.titleEn;
                return (
                  <div key={index} className="cert-card glass-card">
                    <div className="cert-badge-icon">
                      <BookOpen size={24} />
                    </div>
                    <div className="cert-card-details">
                      <h4 className="cert-title-text">{title}</h4>
                      <p className="cert-issuer-text">{cert.issuer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <WaveDivider flip color="var(--bg-secondary)" />

      <style>{`
        .education-section {
          background-color: var(--bg-secondary);
          z-index: 5;
        }

        .education-container {
          position: relative;
          z-index: 10;
        }

        .education-grid {
          align-items: start;
        }

        .col-heading {
          font-size: 1.45rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 2rem;
          font-family: var(--font-friendly);
          color: var(--text-primary);
        }

        .pink-color { color: var(--accent-pink); }
        .teal-color { color: var(--accent-teal); }

        .edu-cards-list, .cert-cards-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        /* Education Card styles */
        .edu-card {
          display: flex;
          gap: 1.25rem;
          padding: 1.5rem;
          background: var(--bg-primary);
          border-radius: 20px;
          align-items: flex-start;
        }

        .edu-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid;
          flex-shrink: 0;
        }

        .edu-card-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          text-align: left;
        }

        .edu-period {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .edu-title-text {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
          font-family: var(--font-friendly);
        }

        .edu-school-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        /* Certifications Card styles */
        .cert-card {
          display: flex;
          gap: 1.25rem;
          padding: 1.5rem;
          background: var(--bg-primary);
          border-radius: 20px;
          align-items: center;
        }

        .cert-badge-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: rgba(13, 148, 136, 0.1);
          color: var(--accent-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 2px dashed rgba(13, 148, 136, 0.3);
        }

        [data-theme='dark'] .cert-badge-icon {
          background-color: rgba(45, 212, 191, 0.1);
          color: var(--accent-teal);
        }

        .cert-card-details {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          text-align: left;
        }

        .cert-title-text {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
          font-family: var(--font-friendly);
        }

        .cert-issuer-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
      `}</style>
    </section>
  );
};
