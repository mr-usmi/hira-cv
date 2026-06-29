import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Heart } from 'lucide-react';

export const InteractiveOptics: React.FC = () => {
  const { t } = useLanguage();
  const [sph, setSph] = useState<number>(-2.00);
  const [cyl, setCyl] = useState<number>(-0.50);

  // Generate range values for dropdowns (-6.00 to +6.00 for SPH, -4.00 to 0.00 for CYL in 0.25 steps)
  const generateRange = (min: number, max: number, step: number) => {
    const list = [];
    for (let val = min; val <= max; val += step) {
      list.push(val);
    }
    return list;
  };

  const sphRange = generateRange(-6.00, 6.00, 0.25);
  const cylRange = generateRange(-4.00, 0.00, 0.25);

  const formatValue = (val: number) => {
    if (val === 0) return '0.00';
    return (val > 0 ? '+' : '') + val.toFixed(2);
  };

  // Physics-based Thickness Calculation (for typical 50mm caliber lens)
  // Minus lenses (myopia) are thick at the edges and thin at the center (fixed at 1.0mm center)
  // Plus lenses (hyperopia) are thick at the center and thin at the edges (fixed at 1.0mm edge)
  const calculateThickness = (index: number) => {
    const absSph = Math.abs(sph);
    const absCyl = Math.abs(cyl);
    const totalPower = absSph + absCyl * 0.6; // Cyl contribution to total power

    // Standard thickness factor based on lens refractive index
    // Higher index bends light more efficiently -> thinner lens
    const indexFactor = 0.5 / (index - 1);

    if (sph <= 0) {
      // Minus Lens: Edge thickness is calculated, center is fixed at 1.0mm
      const edge = 1.0 + (totalPower * 1.5 * indexFactor);
      return { type: 'edge', value: parseFloat(edge.toFixed(1)) };
    } else {
      // Plus Lens: Center thickness is calculated, edge is fixed at 1.0mm
      const center = 1.0 + (totalPower * 1.5 * indexFactor);
      return { type: 'center', value: parseFloat(center.toFixed(1)) };
    }
  };

  const indexData = [
    { id: '1.5', name: t.indexStandard, index: 1.5, reduction: '0%', desc: t.standardDesc },
    { id: '1.6', name: t.indexThin, index: 1.6, reduction: '-20%', desc: t.thinDesc },
    { id: '1.67', name: t.indexSuperThin, index: 1.67, reduction: '-35%', desc: t.superThinDesc },
    { id: '1.74', name: t.indexUltraThin, index: 1.74, reduction: '-45%', desc: t.ultraThinDesc },
  ];

  // Determine Recommendation Badge
  const getRecommendation = (indexVal: number) => {
    const totalPower = Math.abs(sph) + Math.abs(cyl) * 0.8;

    if (totalPower <= 2.00) {
      if (indexVal === 1.5) return { text: 'Recomendada 🌟', class: 'rec-badge-primary' };
      return { text: 'Opcional', class: 'rec-badge-secondary' };
    } else if (totalPower > 2.00 && totalPower <= 4.00) {
      if (indexVal === 1.6) return { text: 'Recomendada 🌟', class: 'rec-badge-primary' };
      if (indexVal === 1.5) return { text: 'Muy Gruesa ⚠️', class: 'rec-badge-warning' };
      return { text: 'Opcional', class: 'rec-badge-secondary' };
    } else if (totalPower > 4.00 && totalPower <= 6.00) {
      if (indexVal === 1.67) return { text: 'Recomendada 🌟', class: 'rec-badge-primary' };
      if (indexVal === 1.5 || indexVal === 1.6) return { text: 'Muy Gruesa ⚠️', class: 'rec-badge-warning' };
      return { text: 'Opcional', class: 'rec-badge-secondary' };
    } else {
      if (indexVal === 1.74) return { text: 'Recomendada 🌟', class: 'rec-badge-primary' };
      if (indexVal === 1.67) return { text: 'Ideal Premium', class: 'rec-badge-success' };
      return { text: 'Muy Gruesa ⚠️', class: 'rec-badge-warning' };
    }
  };

  // Get Hira's custom optician frame advice based on values
  const getHiraAdvice = () => {
    const totalPower = Math.abs(sph) + Math.abs(cyl) * 0.8;
    if (sph === 0 && cyl === 0) {
      return '¡Tienes una visión perfecta! No necesitas cristales graduados, pero unas gafas con filtro de luz azul sin graduación te protegerán del cansancio de las pantallas.';
    }
    
    let advice = '';
    if (totalPower <= 2.00) {
      advice = 'Tu graduación es bajita. Te recomiendo monturas ligeras de metal o pasta fina. La lente estándar 1.5 es económica y te quedará genial.';
    } else if (totalPower > 2.00 && totalPower <= 4.00) {
      advice = 'Para evitar cristales con bordes visibles, una reducción de 1.6 es tu mejor opción. Combínala con una montura de acetato de tamaño medio para disimular el espesor.';
    } else {
      advice = 'Al tener una graduación moderada/alta, te aconsejo usar monturas redondas u ovaladas de acetato grueso y calibre pequeño. Las lentes 1.67 o 1.74 reducirán drásticamente los aros concéntricos y el efecto de ojo pequeño.';
    }

    if (Math.abs(cyl) >= 1.5) {
      advice += ' Además, dado tu astigmatismo, es vital un correcto centrado óptico en el taller para garantizar el eje correcto y evitar mareos.';
    }

    return advice;
  };

  // Draw 2D Lens SVG Profile representation
  const renderLensProfile = (thicknessVal: number) => {
    const isMinus = sph <= 0;
    
    // Scale thickness between 4px (thin) and 45px (thick) for the SVG rendering
    const minPx = 4;
    const maxPx = 40;
    const maxCalc = 8.0; // cap for thickness calculation scale
    
    const calculatedPx = minPx + (thicknessVal / maxCalc) * (maxPx - minPx);
    const renderThick = Math.min(maxPx, calculatedPx);

    if (isMinus) {
      // Minus: thin center (4px), thick edges (renderThick)
      // Path: Top curve bows downward, bottom curve bows upward
      return (
        <svg viewBox="0 0 160 50" className="lens-svg-draw">
          {/* Lens body */}
          <path 
            d={`M 10,2 C 50,15 110,15 150,2 L 150,${renderThick} C 110,${renderThick - 10} 50,${renderThick - 10} 10,${renderThick} Z`} 
            fill="rgba(13, 148, 136, 0.15)" 
            stroke="var(--accent-teal)" 
            strokeWidth="2.5" 
          />
          {/* Glare line */}
          <path d="M 30,12 C 45,16 55,16 65,14" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
        </svg>
      );
    } else {
      // Plus: thick center (renderThick), thin edges (4px)
      // Path: Top curve bows upward, bottom curve bows downward
      return (
        <svg viewBox="0 0 160 50" className="lens-svg-draw">
          {/* Lens body */}
          <path 
            d={`M 10,${renderThick - 4} C 50,2 110,2 150,${renderThick - 4} L 150,${renderThick} C 110,${renderThick + 4} 50,${renderThick + 4} 10,${renderThick} Z`} 
            fill="rgba(236, 72, 153, 0.15)" 
            stroke="var(--accent-pink)" 
            strokeWidth="2.5" 
          />
          {/* Glare line */}
          <path d="M 65,8 C 80,6 95,6 105,9" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
        </svg>
      );
    }
  };

  return (
    <section id="interactive" className="interactive-section">
      <div className="bg-glow-pink"></div>
      <div className="bg-glow-teal"></div>

      <div className="container interactive-container">
        <div className="section-header">
          <h2>{t.interactiveTitle}</h2>
          <p>{t.interactiveSubtitle}</p>
        </div>

        {/* Inputs selector panel */}
        <div className="optimizer-inputs-panel glass-card">
          <h3 className="inputs-title">
            <Sparkles size={22} className="title-icon pink-color" />
            {t.calculatorSubtitle}
          </h3>

          <div className="dropdowns-row">
            {/* SPH Dropdown */}
            <div className="select-group">
              <label className="select-label">{t.sphLabel}</label>
              <select 
                value={sph} 
                onChange={(e) => setSph(parseFloat(e.target.value))}
                className="custom-select"
              >
                {sphRange.map((val) => (
                  <option key={val} value={val}>
                    {formatValue(val)} D
                  </option>
                ))}
              </select>
            </div>

            {/* CYL Dropdown */}
            <div className="select-group">
              <label className="select-label">{t.cylLabel}</label>
              <select 
                value={cyl} 
                onChange={(e) => setCyl(parseFloat(e.target.value))}
                className="custom-select"
              >
                {cylRange.map((val) => (
                  <option key={val} value={val}>
                    {formatValue(val)} D
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Comparison Dashboard */}
        <h3 className="dashboard-section-title">{t.thicknessCompareTitle}</h3>
        <div className="grid-4 index-comparison-grid">
          {indexData.map((item) => {
            const result = calculateThickness(item.index);
            const badge = getRecommendation(item.index);

            return (
              <div key={item.id} className="index-card glass-card">
                {/* Badge indicator */}
                <span className={`recommendation-badge ${badge.class}`}>
                  {badge.text}
                </span>

                <h4 className="index-card-name">{item.name}</h4>
                <div className="index-badge-number">n = {item.index}</div>

                {/* SVG Visual profile */}
                <div className="lens-visual-container">
                  {renderLensProfile(result.value)}
                </div>

                {/* Technical data */}
                <div className="index-technical-details">
                  <div className="tech-row">
                    <span className="tech-label">
                      {result.type === 'edge' ? t.lensEdgeThickness : 'Espesor Centro'}:
                    </span>
                    <span className="tech-value">{result.value} mm</span>
                  </div>
                  <div className="tech-row">
                    <span className="tech-label">{t.reductionLabel}:</span>
                    <span className="tech-value reduction-percentage" style={{ color: item.reduction === '0%' ? 'var(--text-muted)' : 'var(--accent-teal)' }}>
                      {item.reduction}
                    </span>
                  </div>
                </div>

                <p className="index-desc-text">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Hira's Professional Advice Card */}
        <div className="hira-advice-card glass-card">
          <div className="advice-header">
            <div className="advice-avatar-circle">
              <img src="/profile.png" alt="Hira" className="advice-avatar-img" />
            </div>
            <h4 className="advice-title">
              <Heart size={16} fill="var(--accent-pink)" color="var(--accent-pink)" className="advice-icon-heart" />
              {t.hiraAdviceHeader}
            </h4>
          </div>
          <p className="advice-content-text">{getHiraAdvice()}</p>
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

        /* Inputs Panel */
        .optimizer-inputs-panel {
          padding: 2rem;
          background: var(--bg-secondary);
          margin-bottom: 3rem;
          border-radius: 24px;
        }

        .inputs-title {
          font-size: 1.35rem;
          font-family: var(--font-friendly);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .pink-color { color: var(--accent-pink); }

        .dropdowns-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .dropdowns-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .select-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-align: left;
        }

        .select-label {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-secondary);
          font-family: var(--font-friendly);
        }

        .custom-select {
          width: 100%;
          padding: 0.8rem 1.2rem;
          border-radius: 16px;
          border: 2px solid var(--border-color);
          background-color: var(--bg-primary);
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 700;
          outline: none;
          cursor: pointer;
          font-family: var(--font-sans);
          transition: border-color var(--transition-fast);
        }

        .custom-select:focus {
          border-color: var(--accent-pink);
        }

        /* Dashboard grid */
        .dashboard-section-title {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: left;
          font-family: var(--font-friendly);
          color: var(--text-primary);
        }

        .index-comparison-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 576px) {
          .index-comparison-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 992px) {
          .index-comparison-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Index Card */
        .index-card {
          padding: 1.75rem;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          border-radius: 24px;
          border: 1px solid var(--border-color);
          overflow: hidden;
        }

        .index-card:hover {
          border-color: var(--accent-pink);
        }

        /* Recommendation Badges */
        .recommendation-badge {
          position: absolute;
          top: 0;
          right: 0;
          padding: 0.35rem 0.85rem;
          font-size: 0.75rem;
          font-weight: 700;
          border-bottom-left-radius: 14px;
          font-family: var(--font-friendly);
        }

        .rec-badge-primary {
          background-color: rgba(236, 72, 153, 0.15);
          color: var(--accent-pink);
        }

        .rec-badge-secondary {
          background-color: var(--bg-tertiary);
          color: var(--text-muted);
        }

        .rec-badge-warning {
          background-color: rgba(251, 146, 60, 0.15);
          color: var(--accent-peach);
        }

        .rec-badge-success {
          background-color: rgba(13, 148, 136, 0.15);
          color: var(--accent-teal);
        }

        .index-card-name {
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 0.5rem;
          margin-bottom: 0.15rem;
          font-family: var(--font-friendly);
          color: var(--text-primary);
        }

        .index-badge-number {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          background-color: var(--bg-primary);
          padding: 0.15rem 0.5rem;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          margin-bottom: 1.5rem;
        }

        /* Lens Drawing */
        .lens-visual-container {
          width: 100%;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          background-color: var(--bg-primary);
          border-radius: 12px;
          padding: 0.5rem;
          border: 1px dashed var(--border-color);
        }

        .lens-svg-draw {
          width: 100%;
          max-width: 140px;
          height: 100%;
        }

        /* Tech details */
        .index-technical-details {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          border-top: 1px dashed var(--border-color);
          padding-top: 1rem;
          margin-bottom: 1rem;
        }

        .tech-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .tech-label {
          color: var(--text-muted);
        }

        .tech-value {
          color: var(--text-primary);
          font-weight: 700;
        }

        .reduction-percentage {
          font-family: var(--font-friendly);
        }

        .index-desc-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.45;
          text-align: center;
        }

        /* Hira Professional Advice Card */
        .hira-advice-card {
          padding: 2rem;
          background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%);
          border: 1.5px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          text-align: left;
          border-radius: 24px;
        }

        @media (min-width: 768px) {
          .hira-advice-card {
            flex-direction: row;
            align-items: center;
            gap: 2rem;
          }
        }

        .advice-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        .advice-avatar-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--accent-pink);
          box-shadow: 0 4px 10px rgba(236,72,153,0.15);
        }

        .advice-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 30%;
        }

        .advice-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-friendly);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .advice-icon-heart {
          animation: beat 1.5s infinite alternate;
        }

        @keyframes beat {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }

        .advice-content-text {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.7;
          font-weight: 500;
          flex-grow: 1;
        }
      `}</style>
    </section>
  );
};
