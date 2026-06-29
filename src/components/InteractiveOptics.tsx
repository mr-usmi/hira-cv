import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Eye, Sparkles, AlertCircle, Sparkle } from 'lucide-react';

export const InteractiveOptics: React.FC = () => {
  const { t } = useLanguage();
  const [sph, setSph] = useState<number>(0);
  const [cyl, setCyl] = useState<number>(0);
  const [isCorrected, setIsCorrected] = useState<boolean>(true);

  // Formatted string helper
  const formatValue = (val: number) => {
    if (val === 0) return '0.00';
    return (val > 0 ? '+' : '') + val.toFixed(2);
  };

  // Determine simulated blur level (CSS blur px)
  const getBlurValue = () => {
    if (isCorrected) return 0;
    
    // Calculate blur based on absolute values of SPH and CYL
    const totalAmetropia = Math.abs(sph) + Math.abs(cyl) * 0.8;
    if (totalAmetropia === 0) return 0;
    
    // Scale blur between 1px and 12px
    return Math.min(12, 1 + totalAmetropia * 1.8);
  };

  // Check if we need thinning
  const needsThinning = Math.abs(sph) > 3.00 || Math.abs(cyl) > 2.00;

  return (
    <section id="interactive" className="interactive-section">
      <div className="bg-glow-pink"></div>
      <div className="bg-glow-teal"></div>

      <div className="container interactive-container">
        <div className="section-header">
          <h2>{t.interactiveTitle}</h2>
          <p>{t.interactiveSubtitle}</p>
        </div>

        <div className="grid-2 interactive-grid">
          {/* Left Panel: Sliders & Controls */}
          <div className="control-panel glass-card">
            <h3 className="interactive-card-title">
              <Sparkle size={20} className="card-title-icon pink-color" />
              {t.prescriptionDecoderTitle}
            </h3>
            <p className="interactive-card-sub">{t.prescriptionDecoderSubtitle}</p>

            <div className="sliders-container">
              {/* SPH Slider */}
              <div className="slider-group">
                <div className="slider-header">
                  <label className="slider-label">{t.sphLabel}</label>
                  <span className="slider-value-badge" style={{ backgroundColor: sph === 0 ? 'var(--text-muted)' : sph > 0 ? 'var(--accent-peach)' : 'var(--accent-pink)' }}>
                    {formatValue(sph)} Dioptrías
                  </span>
                </div>
                <input
                  type="range"
                  min="-6.00"
                  max="6.00"
                  step="0.25"
                  value={sph}
                  onChange={(e) => setSph(parseFloat(e.target.value))}
                  className="prescription-slider"
                />
                <p className="slider-help-text">{t.sphHelp}</p>
              </div>

              {/* CYL Slider */}
              <div className="slider-group">
                <div className="slider-header">
                  <label className="slider-label">{t.cylLabel}</label>
                  <span className="slider-value-badge" style={{ backgroundColor: cyl === 0 ? 'var(--text-muted)' : 'var(--accent-teal)' }}>
                    {formatValue(cyl)} Dioptrías
                  </span>
                </div>
                <input
                  type="range"
                  min="-4.00"
                  max="0.00"
                  step="0.25"
                  value={cyl}
                  onChange={(e) => setCyl(parseFloat(e.target.value))}
                  className="prescription-slider"
                />
                <p className="slider-help-text">{t.cylHelp}</p>
              </div>
            </div>

            {/* Simulated Toggle */}
            <div className="toggle-container">
              <span className="toggle-label">{t.simulateVision}</span>
              <button 
                onClick={() => setIsCorrected(!isCorrected)} 
                className={`custom-toggle-btn ${isCorrected ? 'active-corrected' : 'active-blurry'}`}
              >
                <span className="toggle-knob"></span>
                <span className="toggle-text-inside">
                  {isCorrected ? t.applyCorrection.slice(0, 18) + '...' : t.simulateVision.slice(0, 18) + '...'}
                </span>
              </button>
            </div>
          </div>

          {/* Right Panel: Translation Output & Simulated Vision Preview */}
          <div className="result-panel glass-card">
            <h3 className="interactive-card-title">
              <Eye size={22} className="card-title-icon teal-color" />
              {isCorrected ? t.viewCorrectedText : t.viewBlurryText}
            </h3>

            {/* Simulated vision screen */}
            <div className="vision-screen-wrapper">
              <div 
                className="vision-scene"
                style={{ filter: `blur(${getBlurValue()}px)`, transition: 'filter 0.3s ease' }}
              >
                <div className="vision-content">
                  <p className="vision-large-text">HIRA KHAN</p>
                  <p className="vision-medium-text">Óptica Optometrista</p>
                  <p className="vision-small-text">Cuidando de tu salud visual con mucho amor ✿</p>
                </div>
              </div>
            </div>

            {/* Translation Output Details */}
            <div className="prescription-analysis">
              {sph === 0 && cyl === 0 ? (
                <div className="analysis-empty">
                  <AlertCircle size={20} className="empty-icon" />
                  <p><strong>{t.normalVisionTitle}:</strong> ¡Felicidades! Tienes una visión perfecta y no necesitas corrección esférica o astigmática.</p>
                </div>
              ) : (
                <div className="analysis-details">
                  {/* Sphere details */}
                  {sph !== 0 && (
                    <div className="analysis-item">
                      <div className="analysis-bullet" style={{ backgroundColor: sph > 0 ? 'var(--accent-peach)' : 'var(--accent-pink)' }}></div>
                      <div className="analysis-text-wrapper">
                        <span className="analysis-title">
                          {sph > 0 ? t.hyperopiaTitle : t.myopiaTitle} ({formatValue(sph)} SPH):
                        </span>
                        <p className="analysis-desc">
                          {sph > 0 ? t.sphExplainPos : t.sphExplainNeg}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Cylinder details */}
                  {cyl !== 0 && (
                    <div className="analysis-item">
                      <div className="analysis-bullet" style={{ backgroundColor: 'var(--accent-teal)' }}></div>
                      <div className="analysis-text-wrapper">
                        <span className="analysis-title">
                          {t.astigmatismTitle} ({formatValue(cyl)} CYL):
                        </span>
                        <p className="analysis-desc">{t.cylExplain}</p>
                      </div>
                    </div>
                  )}

                  {/* Recommendation Card */}
                  <div className="hira-rec-card">
                    <div className="hira-rec-header">
                      <Sparkles size={16} className="hira-rec-icon" />
                      <span>{t.hiraRecommendation}</span>
                    </div>
                    <ul className="hira-rec-list">
                      <li>✿ {needsThinning ? t.recThinning : t.recStandard}</li>
                      <li>✿ {t.recAntiReflective}</li>
                      {Math.abs(sph) > 0.5 && (
                        <li>✿ {t.recBlueLight}</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .interactive-section {
          background-color: var(--bg-primary);
          padding-top: 5rem;
          padding-bottom: 5rem;
        }

        .interactive-container {
          position: relative;
          z-index: 10;
        }

        .interactive-grid {
          align-items: stretch;
        }

        .interactive-card-title {
          font-size: 1.45rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.5rem;
          font-family: var(--font-friendly);
          color: var(--text-primary);
        }

        .pink-color { color: var(--accent-pink); }
        .teal-color { color: var(--accent-teal); }

        .interactive-card-sub {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          text-align: left;
        }

        /* Control Panel Sliders */
        .control-panel {
          padding: 2.25rem;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          border-radius: 24px;
        }

        .sliders-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }

        .slider-group {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          text-align: left;
        }

        .slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .slider-label {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-friendly);
        }

        .slider-value-badge {
          font-size: 0.8rem;
          font-weight: 700;
          color: #ffffff;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
        }

        .prescription-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 5px;
          background: var(--bg-tertiary);
          outline: none;
          margin: 10px 0;
        }

        .prescription-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--accent-pink);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(236, 72, 153, 0.4);
          transition: transform 0.1s ease;
        }

        .prescription-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        .slider-help-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        /* Custom Toggle Switch */
        .toggle-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
          margin-top: auto;
        }

        @media (min-width: 576px) {
          .toggle-container {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .toggle-label {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-secondary);
          font-family: var(--font-friendly);
        }

        .custom-toggle-btn {
          position: relative;
          width: 200px;
          height: 40px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          outline: none;
          overflow: hidden;
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .active-corrected {
          background-color: var(--accent-teal);
        }

        .active-blurry {
          background-color: var(--accent-pink);
        }

        .toggle-knob {
          position: absolute;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          top: 4px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .active-corrected .toggle-knob {
          transform: translateX(80px);
        }

        .active-blurry .toggle-knob {
          transform: translateX(-80px);
        }

        .toggle-text-inside {
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          z-index: 10;
          font-family: var(--font-friendly);
        }

        /* Result Panel */
        .result-panel {
          padding: 2.25rem;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          border-radius: 24px;
        }

        .vision-screen-wrapper {
          width: 100%;
          background: #ffffff;
          border: 4px solid var(--text-primary);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.05);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 140px;
        }

        [data-theme='dark'] .vision-screen-wrapper {
          background: #faf7f2; /* keep visual chart contrast for realism */
        }

        .vision-scene {
          width: 100%;
          text-align: center;
        }

        .vision-content {
          color: #111111;
        }

        .vision-large-text {
          font-size: 2.25rem;
          font-weight: 900;
          letter-spacing: 0.15em;
          line-height: 1.1;
        }

        .vision-medium-text {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .vision-small-text {
          font-size: 0.85rem;
          font-weight: 600;
          color: #555555;
        }

        /* Prescription Analysis Output */
        .prescription-analysis {
          text-align: left;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .analysis-empty {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem;
          background: var(--bg-primary);
          border-radius: 16px;
          border: 1px solid var(--border-color);
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .empty-icon {
          color: var(--accent-teal);
          flex-shrink: 0;
        }

        .analysis-details {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .analysis-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .analysis-bullet {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-top: 0.4rem;
          flex-shrink: 0;
        }

        .analysis-text-wrapper {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .analysis-title {
          font-weight: 700;
          color: var(--text-primary);
          display: block;
          margin-bottom: 0.15rem;
          font-family: var(--font-friendly);
        }

        /* Hira Recommendation Card */
        .hira-rec-card {
          margin-top: 1rem;
          background: var(--bg-tertiary);
          border-radius: 20px;
          padding: 1.5rem;
          border: 1.5px solid var(--border-color);
        }

        .hira-rec-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          color: var(--accent-pink);
          font-size: 1.05rem;
          margin-bottom: 0.75rem;
          font-family: var(--font-friendly);
        }

        .hira-rec-icon {
          animation: pulseEffect 2s infinite alternate;
        }

        @keyframes pulseEffect {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }

        .hira-rec-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
};
