import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, MapPin, Copy, Check, ExternalLink, Phone } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hira.anwar40@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('631201822');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="bg-glow-pink"></div>
      <div className="bg-glow-teal"></div>

      <div className="container contact-container">
        <div className="section-header">
          <h2>{t.contactTitle}</h2>
          <p>{t.contactSubtitle}</p>
        </div>

        <div className="contact-content grid-2">
          {/* Left Side: General Info */}
          <div className="contact-info-panel">
            <h3 className="info-title">{t.contactDirectTitle}</h3>
            <p className="info-intro">{t.contactIntro}</p>

            <div className="location-card glass-card">
              <span className="location-icon-wrapper"><MapPin size={22} /></span>
              <div className="location-details">
                <h4>{t.contactLocationTitle}</h4>
                <p className="location-text">{t.contactLocationText}</p>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Cards */}
          <div className="contact-cards-panel">
            {/* Email Card */}
            <div className="contact-method-card glass-card">
              <div className="card-top">
                <span className="method-icon-wrapper mail-icon"><Mail size={24} /></span>
                <div className="method-meta">
                  <h4>Email</h4>
                  <span className="method-address">hira.anwar40@gmail.com</span>
                </div>
              </div>
              
              <div className="card-actions">
                <a 
                  href="mailto:hira.anwar40@gmail.com?subject=Contacto%20Portfolio" 
                  className="btn btn-primary method-btn"
                >
                  {t.contactMailBtn} <ExternalLink size={16} />
                </a>
                <button 
                  onClick={handleCopyEmail} 
                  className="btn btn-secondary method-btn copy-btn"
                  title={t.contactCopyBtn}
                >
                  {copiedEmail ? (
                    <>
                      <Check size={16} className="text-success-icon" /> {t.contactCopiedBtn}
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> {t.contactCopyBtn}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="contact-method-card glass-card">
              <div className="card-top">
                <span className="method-icon-wrapper phone-icon"><Phone size={24} /></span>
                <div className="method-meta">
                  <h4>{language === 'es' ? 'Teléfono' : 'Phone'}</h4>
                  <span className="method-address">+34 631 201 822</span>
                </div>
              </div>

              <div className="card-actions">
                <a 
                  href="tel:631201822" 
                  className="btn btn-primary method-btn phone-btn-gradient"
                >
                  {t.contactCallBtn} <ExternalLink size={16} />
                </a>
                <button 
                  onClick={handleCopyPhone} 
                  className="btn btn-secondary method-btn copy-btn"
                  title={t.contactCopyBtn}
                >
                  {copiedPhone ? (
                    <>
                      <Check size={16} className="text-success-icon" /> {t.contactCopiedBtn}
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> {language === 'es' ? 'Copiar Teléfono' : 'Copy Phone'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--bg-primary);
        }

        .contact-container {
          position: relative;
          z-index: 10;
        }

        .contact-info-panel {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          justify-content: center;
        }

        .info-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
          font-family: var(--font-friendly);
        }

        .info-intro {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        .location-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.5rem;
          width: 100%;
          border-color: var(--border-color);
          background: var(--bg-secondary);
        }

        .location-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--badge-bg);
          color: var(--accent-pink);
          border: 1px solid var(--badge-border);
        }

        .location-details h4 {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
        }

        .location-text {
          font-weight: 700;
          color: var(--text-primary);
          font-size: 1.05rem;
        }

        /* Contact Cards Panel */
        .contact-cards-panel {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        .contact-method-card {
          padding: 2rem;
          border-color: var(--border-color);
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: left;
          border-radius: 24px;
        }

        .contact-method-card:hover {
          border-color: var(--accent-pink);
        }

        .card-top {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .method-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          flex-shrink: 0;
        }

        .mail-icon {
          background-color: rgba(236, 72, 153, 0.1);
          color: var(--accent-pink);
          border-color: rgba(236, 72, 153, 0.2);
        }

        .phone-icon {
          background-color: rgba(13, 148, 136, 0.1);
          color: var(--accent-teal);
          border-color: rgba(13, 148, 136, 0.2);
        }

        .method-meta h4 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.15rem;
          font-family: var(--font-friendly);
        }

        .method-address {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 600;
          word-break: break-all;
        }

        .card-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .method-btn {
          flex: 1 1 calc(50% - 0.375rem);
          min-width: 140px;
          font-size: 0.9rem;
          padding: 0.7rem 1.2rem;
        }

        .phone-btn-gradient {
          background: var(--accent-gradient);
          box-shadow: 0 4px 15px rgba(236, 72, 153, 0.2);
        }

        .phone-btn-gradient:hover {
          background: var(--accent-gradient-hover);
          box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
        }

        .text-success-icon {
          color: var(--accent-teal);
          animation: pulse 1.2s ease;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  );
};
