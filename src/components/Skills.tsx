import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Eye, ShieldCheck, Wrench, Languages, Smile, CheckCircle } from 'lucide-react';

export const Skills: React.FC = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      id: 'optometry',
      title: t.skillsOptometry,
      icon: <Eye size={24} />,
      color: 'var(--accent-pink)',
      skills: [
        { name: 'Exámenes Visuales Completos', level: 95 },
        { name: 'Refracción Clínica y Cicloplegia', level: 95 },
        { name: 'Evaluación de Salud Ocular Básica', level: 90 },
        { name: 'Detección Temprana de Patologías', level: 85 }
      ]
    },
    {
      id: 'contactology',
      title: t.skillsContactology,
      icon: <ShieldCheck size={24} />,
      color: 'var(--accent-teal)',
      skills: [
        { name: 'Lentes de Contacto Blandas', level: 95 },
        { name: 'Lentes Permeables al Gas (RGP)', level: 85 },
        { name: 'Adaptaciones Especiales / Astigmatismo', level: 90 },
        { name: 'Instrucciones de Uso y Seguimiento', level: 100 }
      ]
    },
    {
      id: 'workshop',
      title: t.skillsWorkshop,
      icon: <Wrench size={24} />,
      color: 'var(--accent-peach)',
      skills: [
        { name: 'Biselado Manual y Automático', level: 95 },
        { name: 'Montaje en Ranurado y Al Aire', level: 90 },
        { name: 'Reparación y Soldadura de Monturas', level: 85 },
        { name: 'Control de Calidad del Acabado', level: 95 }
      ]
    },
    {
      id: 'languages',
      title: t.skillsLanguages,
      icon: <Languages size={24} />,
      color: 'var(--accent-pink)',
      customDisplay: (
        <div className="languages-display-grid">
          <div className="lang-item">
            <span className="lang-name">Castellano / Español</span>
            <span className="badge lang-badge badge-pink">{t.langNativo}</span>
          </div>
          <div className="lang-item">
            <span className="lang-name">Catalán</span>
            <span className="badge lang-badge badge-teal">{t.langBilingue}</span>
          </div>
          <div className="lang-item">
            <span className="lang-name">Urdu</span>
            <span className="badge lang-badge badge-gold">{t.langBilingue}</span>
          </div>
          <div className="lang-item">
            <span className="lang-name">Punjabi</span>
            <span className="badge lang-badge badge-peach">{t.langBilingue}</span>
          </div>
          <div className="lang-item">
            <span className="lang-name">Inglés</span>
            <span className="badge lang-badge badge-pink">{t.langAvanzado}</span>
          </div>
        </div>
      )
    },
    {
      id: 'instruments',
      title: t.skillsInstruments,
      icon: <CheckCircle size={24} />,
      color: 'var(--accent-teal)',
      skills: [
        { name: 'Foróptero Manual y Digital', level: 95 },
        { name: 'Retinoscopio y Oftalmoscopio', level: 90 },
        { name: 'Biomicroscopio (Lámpara de Hendidura)', level: 90 },
        { name: 'Tonómetro de Aire / Presión Ocular', level: 95 }
      ]
    },
    {
      id: 'soft',
      title: t.skillsSoft,
      icon: <Smile size={24} />,
      color: 'var(--accent-gold)',
      skills: [
        { name: 'Atención al Paciente y Empatía', level: 100 },
        { name: 'Comunicación y Resolución de Dudas', level: 95 },
        { name: 'Gestión y Control de Pedidos', level: 90 },
        { name: 'Trabajo en Equipo y Dinamismo', level: 95 }
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="bg-glow-pink"></div>
      <div className="bg-glow-gold"></div>

      <div className="container skills-container">
        <div className="section-header">
          <h2>{t.skillsTitle}</h2>
          <p>{t.skillsSubtitle}</p>
        </div>

        <div className="grid-3 skills-grid">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="skills-card glass-card">
              {/* Category Header */}
              <div className="skills-card-header" style={{ '--cat-color': cat.color } as React.CSSProperties}>
                <div className="skills-cat-icon">{cat.icon}</div>
                <h3 className="skills-cat-title">{cat.title}</h3>
              </div>

              {/* Category Skills */}
              <div className="skills-card-body">
                {cat.customDisplay ? (
                  cat.customDisplay
                ) : (
                  <ul className="skills-list">
                    {cat.skills?.map((skill, index) => (
                      <li key={index} className="skill-item">
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-percentage">{skill.level}%</span>
                        </div>
                        <div className="skill-bar-bg">
                          <div 
                            className="skill-bar-fill" 
                            style={{ 
                              width: `${skill.level}%`,
                              background: `linear-gradient(90deg, ${cat.color} 0%, var(--accent-peach) 100%)`
                            }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-section {
          background-color: var(--bg-primary);
        }

        .skills-container {
          position: relative;
          z-index: 10;
        }

        .skills-grid {
          align-items: stretch;
        }

        .skills-card {
          padding: 2rem;
          background: var(--bg-secondary);
          border-radius: 24px;
        }

        .skills-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }

        .skills-cat-icon {
          color: var(--cat-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .skills-cat-title {
          font-size: 1.25rem;
          color: var(--text-primary);
          font-family: var(--font-friendly);
        }

        .skills-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .skill-item {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .skill-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .skill-name {
          text-align: left;
        }

        .skill-bar-bg {
          width: 100%;
          height: 8px;
          background: var(--bg-tertiary);
          border-radius: 9999px;
          overflow: hidden;
        }

        .skill-bar-fill {
          height: 100%;
          border-radius: 9999px;
          transition: width 1s ease-out;
        }

        /* Custom languages layout styling */
        .languages-display-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .lang-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px dashed var(--border-color);
        }

        .lang-item:last-child {
          border-bottom: none;
        }

        .lang-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .lang-badge {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
        }

        .badge-pink {
          background-color: rgba(236, 72, 153, 0.1);
          color: var(--accent-pink);
          border-color: rgba(236, 72, 153, 0.2);
        }

        .badge-teal {
          background-color: rgba(13, 148, 136, 0.1);
          color: var(--accent-teal);
          border-color: rgba(13, 148, 136, 0.2);
        }

        .badge-gold {
          background-color: rgba(234, 179, 8, 0.1);
          color: var(--accent-gold);
          border-color: rgba(234, 179, 8, 0.2);
        }

        .badge-peach {
          background-color: rgba(251, 146, 60, 0.1);
          color: var(--accent-peach);
          border-color: rgba(251, 146, 60, 0.2);
        }
      `}</style>
    </section>
  );
};
