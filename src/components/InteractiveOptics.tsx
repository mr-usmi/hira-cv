import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Eye, Sparkles, RefreshCw } from 'lucide-react';

export const InteractiveOptics: React.FC = () => {
  const { t } = useLanguage();
  const [selectedFrame, setSelectedFrame] = useState<string>('none');
  const [visionMode, setVisionMode] = useState<string>('myopia'); // myopia, normal
  const [selectedLens, setSelectedLens] = useState<string>('none'); // none, minus2, minus4
  const [userGuess, setUserGuess] = useState<string>('');
  const [guessChecked, setGuessChecked] = useState<boolean>(false);
  const [guessResult, setGuessResult] = useState<boolean>(false);

  // Frames data
  const frames = [
    { id: 'none', labelEs: 'Sin Gafas', labelEn: 'No Glasses' },
    { 
      id: 'cateye', 
      labelEs: 'Cat-Eye Rosa', 
      labelEn: 'Pink Cat-Eye',
      color: '#ec4899',
      svg: (
        <svg viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="4">
          {/* Left Lens Frame */}
          <path d="M10,20 C10,20 40,5 75,20 C75,20 85,50 45,50 C15,50 10,20 10,20 Z" stroke="#ec4899" fill="rgba(236,72,153,0.15)" />
          {/* Right Lens Frame */}
          <path d="M190,20 C190,20 160,5 125,20 C125,20 115,50 155,50 C185,50 190,20 190,20 Z" stroke="#ec4899" fill="rgba(236,72,153,0.15)" />
          {/* Bridge */}
          <path d="M75,22 C85,15 115,15 125,22" stroke="#ec4899" />
          {/* Left Wing Accent */}
          <path d="M10,20 L2,10 L15,12 Z" fill="#ec4899" stroke="none" />
          {/* Right Wing Accent */}
          <path d="M190,20 L198,10 L185,12 Z" fill="#ec4899" stroke="none" />
        </svg>
      )
    },
    { 
      id: 'round', 
      labelEs: 'Retro Dorado', 
      labelEn: 'Retro Gold',
      color: '#fbbf24',
      svg: (
        <svg viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="3">
          {/* Left Lens Frame */}
          <circle cx="45" cy="30" r="24" stroke="#fbbf24" fill="rgba(250,204,21,0.1)" />
          {/* Right Lens Frame */}
          <circle cx="155" cy="30" r="24" stroke="#fbbf24" fill="rgba(250,204,21,0.1)" />
          {/* Bridge */}
          <path d="M69,30 C79,22 121,22 131,30" stroke="#fbbf24" />
          {/* Temples joint */}
          <path d="M21,30 L10,30" stroke="#fbbf24" />
          <path d="M179,30 L190,30" stroke="#fbbf24" />
        </svg>
      )
    },
    { 
      id: 'square', 
      labelEs: 'Hipster Negro', 
      labelEn: 'Black Hipster',
      color: '#1f2937',
      svg: (
        <svg viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="5">
          {/* Left Lens Frame */}
          <rect x="15" y="10" width="60" height="40" rx="8" stroke="#1f2937" fill="rgba(31,41,55,0.1)" />
          {/* Right Lens Frame */}
          <rect x="125" y="10" width="60" height="40" rx="8" stroke="#1f2937" fill="rgba(31,41,55,0.1)" />
          {/* Bridge */}
          <path d="M75,22 L125,22" stroke="#1f2937" />
        </svg>
      )
    },
    { 
      id: 'flower', 
      labelEs: 'Flor Alegre', 
      labelEn: 'Floral Fun',
      color: '#f472b6',
      svg: (
        <svg viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Left Flower */}
          <circle cx="45" cy="30" r="16" stroke="#f472b6" fill="rgba(244,114,182,0.2)" strokeWidth="3" />
          {/* Petals Left */}
          <circle cx="45" cy="10" r="5" fill="#f472b6" stroke="none" />
          <circle cx="45" cy="50" r="5" fill="#f472b6" stroke="none" />
          <circle cx="25" cy="30" r="5" fill="#f472b6" stroke="none" />
          <circle cx="65" cy="30" r="5" fill="#f472b6" stroke="none" />
          <circle cx="31" cy="16" r="5" fill="#facc15" stroke="none" />
          <circle cx="59" cy="44" r="5" fill="#facc15" stroke="none" />
          <circle cx="31" cy="44" r="5" fill="#facc15" stroke="none" />
          <circle cx="59" cy="16" r="5" fill="#facc15" stroke="none" />
          
          {/* Right Flower */}
          <circle cx="155" cy="30" r="16" stroke="#f472b6" fill="rgba(244,114,182,0.2)" strokeWidth="3" />
          {/* Petals Right */}
          <circle cx="155" cy="10" r="5" fill="#f472b6" stroke="none" />
          <circle cx="155" cy="50" r="5" fill="#f472b6" stroke="none" />
          <circle cx="135" cy="30" r="5" fill="#f472b6" stroke="none" />
          <circle cx="175" cy="30" r="5" fill="#f472b6" stroke="none" />
          <circle cx="141" cy="16" r="5" fill="#facc15" stroke="none" />
          <circle cx="169" cy="44" r="5" fill="#facc15" stroke="none" />
          <circle cx="141" cy="44" r="5" fill="#facc15" stroke="none" />
          <circle cx="169" cy="16" r="5" fill="#facc15" stroke="none" />
          
          {/* Bridge */}
          <path d="M69,30 C79,25 121,25 131,30" stroke="#f472b6" strokeWidth="4" />
        </svg>
      )
    }
  ];

  // Visual acuity chart guesses
  const checkGuess = (letter: string) => {
    setUserGuess(letter);
    setGuessChecked(true);
    // Row 5 in Snellen is "P E C F D" -> Letter is D at the end, or let's say "D" is the answer
    if (letter === 'D') {
      setGuessResult(true);
    } else {
      setGuessResult(false);
    }
  };

  const resetGuess = () => {
    setUserGuess('');
    setGuessChecked(false);
    setGuessResult(false);
  };

  // Determine blur level based on options selected
  const getChartBlur = () => {
    if (visionMode === 'normal') return 0;
    
    // Vision is blurry by default in myopia mode
    if (selectedLens === 'minus4') {
      return 0; // Fully corrected
    } else if (selectedLens === 'minus2') {
      return 2; // Under-corrected (semi-blurry)
    } else {
      return 6; // Blurry
    }
  };

  return (
    <section id="interactive" className="interactive-section">
      <div className="bg-glow-pink"></div>
      <div className="bg-glow-gold"></div>

      <div className="container interactive-container">
        <div className="section-header">
          <h2>{t.interactiveTitle}</h2>
          <p>{t.interactiveSubtitle}</p>
        </div>

        <div className="grid-2 interactive-grid">
          {/* Left Column: Virtual Try-On */}
          <div className="tryon-container glass-card">
            <h3 className="interactive-card-title">
              <Sparkles size={20} className="card-title-icon pink-color" />
              {t.tryonHeading}
            </h3>
            <p className="interactive-card-sub">{t.tryonSub}</p>

            <div className="tryon-canvas">
              {/* Picture frame */}
              <div className="tryon-picture-wrapper">
                <img 
                  src="/profile.png" 
                  alt="Hira portrait for Try-on" 
                  className="tryon-bg-portrait" 
                />
                
                {/* Dynamically Overlay Glasses */}
                {selectedFrame !== 'none' && (
                  <div className={`glasses-overlay-element overlay-${selectedFrame}`}>
                    {frames.find(f => f.id === selectedFrame)?.svg}
                  </div>
                )}
              </div>
            </div>

            {/* Selectors */}
            <div className="tryon-selectors">
              {frames.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrame(frame.id)}
                  className={`frame-select-btn ${selectedFrame === frame.id ? 'active' : ''}`}
                  style={{ borderColor: frame.color }}
                >
                  {t.contactSendBtn.includes('Enviar') ? frame.labelEs : frame.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Snellen Vision Simulator */}
          <div className="vision-test-container glass-card">
            <h3 className="interactive-card-title">
              <Eye size={20} className="card-title-icon teal-color" />
              {t.chartHeading}
            </h3>
            <p className="interactive-card-sub">{t.chartSub}</p>

            <div className="vision-test-layout">
              {/* Lens Selection Tool */}
              <div className="lens-rack">
                <button
                  onClick={() => { setSelectedLens('none'); setVisionMode('myopia'); }}
                  className={`lens-rack-btn ${selectedLens === 'none' && visionMode === 'myopia' ? 'active-lens' : ''}`}
                >
                  <span className="lens-handle handle-red"></span>
                  <span className="lens-label">Ojo (Sin Lente)</span>
                </button>
                <button
                  onClick={() => { setSelectedLens('minus2'); setVisionMode('myopia'); }}
                  className={`lens-rack-btn ${selectedLens === 'minus2' ? 'active-lens' : ''}`}
                >
                  <span className="lens-handle handle-blue"></span>
                  <span className="lens-label">-2.00 D</span>
                </button>
                <button
                  onClick={() => { setSelectedLens('minus4'); setVisionMode('myopia'); }}
                  className={`lens-rack-btn ${selectedLens === 'minus4' ? 'active-lens' : ''}`}
                >
                  <span className="lens-handle handle-teal"></span>
                  <span className="lens-label">-4.00 D (Foco)</span>
                </button>
                <button
                  onClick={() => { setSelectedLens('none'); setVisionMode('normal'); }}
                  className={`lens-rack-btn ${visionMode === 'normal' ? 'active-lens' : ''}`}
                >
                  <span className="lens-handle handle-gold"></span>
                  <span className="lens-label">Visión Normal</span>
                </button>
              </div>

              {/* Snellen chart */}
              <div className="snellen-chart-wrapper">
                <div 
                  className="snellen-container"
                  style={{ filter: `blur(${getChartBlur()}px)`, transition: 'filter 0.4s ease' }}
                >
                  <div className="snellen-row r1">E</div>
                  <div className="snellen-row r2">F P</div>
                  <div className="snellen-row r3">T O Z</div>
                  <div className="snellen-row r4">L P E D</div>
                  <div className="snellen-row r5">P E C F D</div>
                </div>
                
                {/* Virtual refractive error indicator */}
                {getChartBlur() > 0 && (
                  <div className="refractive-badge blur-badge">
                    Myopia (Borrosa)
                  </div>
                )}
                {getChartBlur() === 0 && (
                  <div className="refractive-badge focus-badge">
                    Corrected (Enfocado)
                  </div>
                )}
              </div>
            </div>

            {/* Interactivity: Guess the letter on Row 5 */}
            <div className="guess-acuity-section">
              <p className="guess-prompt">¿Cuál es la última letra de la fila 5 (Fila de menor tamaño)?</p>
              
              {!guessChecked ? (
                <div className="guess-btn-group">
                  {['F', 'D', 'P', 'Z'].map((letter) => (
                    <button 
                      key={letter}
                      onClick={() => checkGuess(letter)}
                      className="guess-btn btn-secondary"
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="guess-result-alert">
                  {guessResult ? (
                    <p className="result-text success-text">
                      🎉 ¡Correcto! Es la letra <strong>D</strong>. Tienes una excelente agudeza visual.
                    </p>
                  ) : (
                    <p className="result-text error-text">
                      ❌ Incorrecto (Marcaste la {userGuess}). Inténtalo de nuevo o aplica la lente correctora para enfocar.
                    </p>
                  )}
                  <button onClick={resetGuess} className="reset-btn">
                    <RefreshCw size={14} />
                    Probar de nuevo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .interactive-section {
          background-color: var(--bg-primary);
        }

        .interactive-container {
          position: relative;
          z-index: 10;
        }

        .interactive-grid {
          align-items: stretch;
        }

        .interactive-card-title {
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-family: var(--font-friendly);
        }

        .pink-color { color: var(--accent-pink); }
        .teal-color { color: var(--accent-teal); }

        .interactive-card-sub {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        /* Try-on Styling */
        .tryon-container {
          padding: 2.25rem;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
        }

        .tryon-canvas {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.5rem;
          min-height: 280px;
        }

        .tryon-picture-wrapper {
          position: relative;
          width: 250px;
          height: 250px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          border: 4px solid var(--bg-primary);
        }

        .tryon-bg-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 35%;
        }

        /* Overlay Glasses Coordinates */
        .glasses-overlay-element {
          position: absolute;
          width: 108px;
          height: 32px;
          left: 71px;
          top: 89px;
          pointer-events: none;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: applyGlasses 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes applyGlasses {
          0% {
            transform: scale(1.6) translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        /* Customize placement if needed for specific designs */
        .overlay-cateye {
          width: 112px;
          left: 69px;
          top: 88px;
        }

        .overlay-round {
          width: 110px;
          left: 70px;
          top: 87px;
        }

        .overlay-square {
          width: 114px;
          left: 68px;
          top: 89px;
        }

        .overlay-flower {
          width: 116px;
          left: 67px;
          top: 88px;
        }

        .tryon-selectors {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }

        .frame-select-btn {
          background: var(--bg-primary);
          border: 2px solid var(--border-color);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          font-family: var(--font-friendly);
          transition: all var(--transition-fast);
        }

        .frame-select-btn:hover {
          transform: translateY(-2px);
          color: var(--text-primary);
        }

        .frame-select-btn.active {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          border-width: 2px;
        }

        /* Vision Test Styling */
        .vision-test-container {
          padding: 2.25rem;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
        }

        .vision-test-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        @media (min-width: 576px) {
          .vision-test-layout {
            grid-template-columns: 0.4fr 0.6fr;
          }
        }

        .lens-rack {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }

        @media (min-width: 576px) {
          .lens-rack {
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
          }
        }

        .lens-rack-btn {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.6rem 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
          font-family: var(--font-friendly);
          transition: all var(--transition-fast);
          flex: 1 1 120px;
        }

        @media (min-width: 576px) {
          .lens-rack-btn {
            flex: none;
          }
        }

        .lens-rack-btn:hover {
          background: var(--bg-tertiary);
          border-color: var(--accent-teal);
          color: var(--text-primary);
        }

        .lens-rack-btn.active-lens {
          border: 2px solid var(--accent-teal);
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .lens-handle {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: inline-block;
        }

        .handle-red { background-color: var(--accent-pink); }
        .handle-blue { background-color: var(--accent-peach); }
        .handle-teal { background-color: var(--accent-teal); }
        .handle-gold { background-color: var(--accent-gold); }

        .snellen-chart-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .snellen-row {
          font-weight: 900;
          letter-spacing: 0.15em;
          text-align: center;
          margin-bottom: 0.2rem;
          color: #000000;
        }

        /* Snellen rows fonts sizing for correct scale representation */
        .r1 { font-size: 2.2rem; line-height: 1; }
        .r2 { font-size: 1.5rem; line-height: 1; }
        .r3 { font-size: 1.1rem; line-height: 1; }
        .r4 { font-size: 0.8rem; line-height: 1; }
        .r5 { font-size: 0.55rem; line-height: 1; letter-spacing: 0.2em; }

        .refractive-badge {
          position: absolute;
          bottom: 10px;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
        }

        .blur-badge {
          background-color: rgba(236,72,153,0.15);
          color: var(--accent-pink);
          border: 1px solid rgba(236,72,153,0.3);
        }

        .focus-badge {
          background-color: rgba(13,148,136,0.15);
          color: var(--accent-teal);
          border: 1px solid rgba(13,148,136,0.3);
        }

        /* Guess Section */
        .guess-acuity-section {
          background: var(--bg-primary);
          padding: 1.25rem;
          border-radius: 16px;
          border: 1px solid var(--border-color);
          text-align: center;
        }

        .guess-prompt {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .guess-btn-group {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }

        .guess-btn {
          width: 45px;
          height: 40px;
          padding: 0;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          font-family: var(--font-friendly);
        }

        .guess-result-alert {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .result-text {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .success-text { color: var(--accent-teal); }
        .error-text { color: var(--accent-pink); }

        .reset-btn {
          background: none;
          border: none;
          color: var(--accent-pink);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .reset-btn:hover {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
};
