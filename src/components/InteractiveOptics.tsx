import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Glasses, Heart } from 'lucide-react';

type FaceShape = 'round' | 'oval' | 'square' | 'heart';
type FrameId = 'none' | 'cateye' | 'round' | 'square' | 'flower';

export const InteractiveOptics: React.FC = () => {
  const { t } = useLanguage();
  const [selectedShape, setSelectedShape] = useState<FaceShape>('round');
  const [selectedFrame, setSelectedFrame] = useState<FrameId>('cateye');

  // Frames data and SVGs
  const frames = [
    { 
      id: 'none' as FrameId, 
      label: t.frameNone,
      color: 'var(--text-muted)',
      svg: null 
    },
    { 
      id: 'cateye' as FrameId, 
      label: t.frameCatEye,
      color: '#ec4899',
      svg: (
        <svg viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="4">
          <path d="M10,20 C10,20 40,5 75,20 C75,20 85,50 45,50 C15,50 10,20 10,20 Z" stroke="#ec4899" fill="rgba(236,72,153,0.15)" />
          <path d="M190,20 C190,20 160,5 125,20 C125,20 115,50 155,50 C185,50 190,20 190,20 Z" stroke="#ec4899" fill="rgba(236,72,153,0.15)" />
          <path d="M75,22 C85,15 115,15 125,22" stroke="#ec4899" />
          <path d="M10,20 L2,10 L15,12 Z" fill="#ec4899" stroke="none" />
          <path d="M190,20 L198,10 L185,12 Z" fill="#ec4899" stroke="none" />
        </svg>
      )
    },
    { 
      id: 'round' as FrameId, 
      label: t.frameRound,
      color: '#fbbf24',
      svg: (
        <svg viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="3">
          <circle cx="45" cy="30" r="24" stroke="#fbbf24" fill="rgba(250,204,21,0.1)" />
          <circle cx="155" cy="30" r="24" stroke="#fbbf24" fill="rgba(250,204,21,0.1)" />
          <path d="M69,30 C79,22 121,22 131,30" stroke="#fbbf24" />
          <path d="M21,30 L10,30" stroke="#fbbf24" />
          <path d="M179,30 L190,30" stroke="#fbbf24" />
        </svg>
      )
    },
    { 
      id: 'square' as FrameId, 
      label: t.frameSquare,
      color: '#1f2937',
      svg: (
        <svg viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="5">
          <rect x="15" y="10" width="60" height="40" rx="8" stroke="#1f2937" fill="rgba(31,41,55,0.1)" />
          <rect x="125" y="10" width="60" height="40" rx="8" stroke="#1f2937" fill="rgba(31,41,55,0.1)" />
          <path d="M75,22 L125,22" stroke="#1f2937" />
        </svg>
      )
    },
    { 
      id: 'flower' as FrameId, 
      label: t.frameFlower,
      color: '#f472b6',
      svg: (
        <svg viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="45" cy="30" r="16" stroke="#f472b6" fill="rgba(244,114,182,0.2)" strokeWidth="3" />
          <circle cx="45" cy="10" r="5" fill="#f472b6" stroke="none" />
          <circle cx="45" cy="50" r="5" fill="#f472b6" stroke="none" />
          <circle cx="25" cy="30" r="5" fill="#f472b6" stroke="none" />
          <circle cx="65" cy="30" r="5" fill="#f472b6" stroke="none" />
          <circle cx="31" cy="16" r="5" fill="#facc15" stroke="none" />
          <circle cx="59" cy="44" r="5" fill="#facc15" stroke="none" />
          <circle cx="31" cy="44" r="5" fill="#facc15" stroke="none" />
          <circle cx="59" cy="16" r="5" fill="#facc15" stroke="none" />
          <circle cx="155" cy="30" r="16" stroke="#f472b6" fill="rgba(244,114,182,0.2)" strokeWidth="3" />
          <circle cx="155" cy="10" r="5" fill="#f472b6" stroke="none" />
          <circle cx="155" cy="50" r="5" fill="#f472b6" stroke="none" />
          <circle cx="135" cy="30" r="5" fill="#f472b6" stroke="none" />
          <circle cx="175" cy="30" r="5" fill="#f472b6" stroke="none" />
          <circle cx="141" cy="16" r="5" fill="#facc15" stroke="none" />
          <circle cx="169" cy="44" r="5" fill="#facc15" stroke="none" />
          <circle cx="141" cy="44" r="5" fill="#facc15" stroke="none" />
          <circle cx="169" cy="16" r="5" fill="#facc15" stroke="none" />
          <path d="M69,30 C79,25 121,25 131,30" stroke="#f472b6" strokeWidth="4" />
        </svg>
      )
    }
  ];

  // Face shapes list
  const faceShapes = [
    { id: 'round' as FaceShape, label: t.faceRound, matchingFrame: 'cateye' as FrameId, rec: t.recRound },
    { id: 'oval' as FaceShape, label: t.faceOval, matchingFrame: 'square' as FrameId, rec: t.recOval },
    { id: 'square' as FaceShape, label: t.faceSquare, matchingFrame: 'round' as FrameId, rec: t.recSquare },
    { id: 'heart' as FaceShape, label: t.faceHeart, matchingFrame: 'flower' as FrameId, rec: t.recHeart },
  ];

  const handleShapeSelect = (shapeId: FaceShape, matchingFrame: FrameId) => {
    setSelectedShape(shapeId);
    setSelectedFrame(matchingFrame);
  };

  const activeShapeData = faceShapes.find(s => s.id === selectedShape);

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
          {/* Left Panel: Recommendations & Face Shapes */}
          <div className="shape-finder-panel glass-card">
            <h3 className="interactive-card-title">
              <Heart size={22} className="card-title-icon pink-color" />
              {t.faceShapePrompt}
            </h3>

            <div className="shape-selectors-grid">
              {faceShapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => handleShapeSelect(shape.id, shape.matchingFrame)}
                  className={`shape-select-btn ${selectedShape === shape.id ? 'active' : ''}`}
                >
                  {shape.label}
                </button>
              ))}
            </div>

            {/* Recommendation Box */}
            <div className="recommendation-box">
              <h4 className="rec-box-title">
                <Sparkles size={16} className="rec-title-icon" />
                {t.recHeading}
              </h4>
              <p className="rec-text">{activeShapeData?.rec}</p>
            </div>
            
            {/* Try-on manual overrides */}
            <div className="manual-frame-override">
              <h4 className="override-title">{t.tryonHeading}:</h4>
              <div className="override-btns">
                {frames.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => setSelectedFrame(frame.id)}
                    className={`override-select-btn ${selectedFrame === frame.id ? 'active' : ''}`}
                    style={{ borderColor: frame.color }}
                  >
                    {frame.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Try-On Portrait Visualizer */}
          <div className="tryon-visualizer-panel glass-card">
            <h3 className="interactive-card-title">
              <Glasses size={24} className="card-title-icon teal-color" />
              {t.tryonHeading}
            </h3>
            <p className="interactive-card-sub">{t.tryonSub}</p>

            <div className="tryon-canvas-container">
              <div className="portrait-frame">
                <img 
                  src="/profile.png" 
                  alt="Hira Portrait" 
                  className="portrait-image" 
                />
                
                {/* SVG Overlay Glasses */}
                {selectedFrame !== 'none' && (
                  <div className={`glasses-overlay-container overlay-${selectedFrame}`}>
                    {frames.find(f => f.id === selectedFrame)?.svg}
                  </div>
                )}
              </div>
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
          margin-bottom: 1.25rem;
          font-family: var(--font-friendly);
          color: var(--text-primary);
        }

        .pink-color { color: var(--accent-pink); }
        .teal-color { color: var(--accent-teal); }

        /* Left Panel Style Finder */
        .shape-finder-panel {
          padding: 2.25rem;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          border-radius: 24px;
        }

        .shape-selectors-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        .shape-select-btn {
          background: var(--bg-primary);
          border: 2px solid var(--border-color);
          color: var(--text-secondary);
          padding: 0.8rem;
          border-radius: 16px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          font-family: var(--font-friendly);
          transition: all var(--transition-fast);
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }

        .shape-select-btn:hover {
          transform: translateY(-2px);
          border-color: var(--accent-pink);
          color: var(--text-primary);
        }

        .shape-select-btn.active {
          border-color: var(--accent-pink);
          background-color: var(--bg-tertiary);
          color: var(--accent-pink);
          box-shadow: 0 6px 15px rgba(236, 72, 153, 0.12);
        }

        /* Recommendation Box */
        .recommendation-box {
          background: var(--bg-primary);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px dashed var(--border-color);
          text-align: left;
          margin-bottom: 2rem;
          flex-grow: 1;
        }

        .rec-box-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--accent-pink);
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-friendly);
        }

        .rec-title-icon {
          animation: spinPulse 3s linear infinite;
        }

        @keyframes spinPulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }

        .rec-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Manual Override selectors */
        .manual-frame-override {
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
          text-align: left;
        }

        .override-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .override-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .override-select-btn {
          background: var(--bg-primary);
          border: 2px solid var(--border-color);
          color: var(--text-secondary);
          padding: 0.4rem 0.8rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          font-family: var(--font-friendly);
          transition: all var(--transition-fast);
        }

        .override-select-btn:hover {
          transform: translateY(-2px);
          color: var(--text-primary);
        }

        .override-select-btn.active {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          border-width: 2px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        /* Right Panel try-on */
        .tryon-visualizer-panel {
          padding: 2.25rem;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 24px;
        }

        .tryon-canvas-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 280px;
        }

        .portrait-frame {
          position: relative;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(236,72,153,0.15);
          border: 6px solid var(--bg-primary);
        }

        .portrait-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 35%;
        }

        /* Glasses Overlay */
        .glasses-overlay-container {
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

        .overlay-cateye { width: 112px; left: 69px; top: 88px; }
        .overlay-round { width: 110px; left: 70px; top: 87px; }
        .overlay-square { width: 114px; left: 68px; top: 89px; }
        .overlay-flower { width: 116px; left: 67px; top: 88px; }
      `}</style>
    </section>
  );
};
