import React from 'react';

export const FloatingFlowers: React.FC = () => {
  // Flower SVG templates
  const flowerSVGs = [
    // Template 1: 5-petal flower
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
      <path d="M12 2a4 4 0 00-4 4 4 4 0 004-4zm0 20a4 4 0 004-4 4 4 0 00-4 4zM2 12a4 4 0 004 4 4 4 0 00-4-4zm20 0a4 4 0 00-4-4 4 4 0 004 4z" />
    </svg>,
    // Template 2: Sunflower style
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 1a2 2 0 012 2v1a2 2 0 01-4 0V3a2 2 0 012-2zm0 18a2 2 0 012 2v1a2 2 0 01-4 0v-1a2 2 0 012-2zM1 12a2 2 0 012-2h1a2 2 0 010 4H3a2 2 0 01-2-2zm18 0a2 2 0 012-2h1a2 2 0 010 4h-1a2 2 0 01-2-2zM4.22 4.22a2 2 0 012.83 0l.7.7a2 2 0 01-2.83 2.83l-.7-.7a2 2 0 010-2.83zm12.02 12.02a2 2 0 012.83 0l.7.7a2 2 0 01-2.83 2.83l-.7-.7a2 2 0 010-2.83zM4.22 19.78a2 2 0 010-2.83l.7-.7a2 2 0 012.83 2.83l-.7.7a2 2 0 01-2.83 0zm12.02-12.02a2 2 0 010-2.83l.7-.7a2 2 0 012.83 2.83l-.7.7a2 2 0 01-2.83 0z" />
    </svg>,
    // Template 3: Cute 4-petal flower
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 8a4 4 0 100 8 4 4 0 000-8z" />
      <circle cx="12" cy="3" r="3" />
      <circle cx="12" cy="21" r="3" />
      <circle cx="3" cy="12" r="3" />
      <circle cx="21" cy="12" r="3" />
    </svg>
  ];

  // Static list of flower coordinates, sizes and animations to avoid hydration mismatch
  const flowers = [
    { id: 1, left: '5%', top: '8%', size: 35, templateIndex: 0, delay: 0.2, duration: 8, color: '#f472b6' },
    { id: 2, left: '85%', top: '15%', size: 45, templateIndex: 1, delay: 1.5, duration: 11, color: '#fb923c' },
    { id: 3, left: '42%', top: '25%', size: 25, templateIndex: 2, delay: 0.8, duration: 9, color: '#facc15' },
    { id: 4, left: '12%', top: '48%', size: 40, templateIndex: 1, delay: 2.2, duration: 12, color: '#2dd4bf' },
    { id: 5, left: '78%', top: '55%', size: 30, templateIndex: 0, delay: 0.5, duration: 10, color: '#f472b6' },
    { id: 6, left: '92%', top: '72%', size: 35, templateIndex: 2, delay: 1.1, duration: 9, color: '#fb923c' },
    { id: 7, left: '8%', top: '85%', size: 50, templateIndex: 0, delay: 2.5, duration: 13, color: '#facc15' },
    { id: 8, left: '55%', top: '82%', size: 30, templateIndex: 1, delay: 0.1, duration: 10, color: '#2dd4bf' },
    { id: 9, left: '22%', top: '92%', size: 25, templateIndex: 2, delay: 1.9, duration: 8, color: '#f472b6' },
    { id: 10, left: '70%', top: '35%', size: 38, templateIndex: 0, delay: 0.7, duration: 11, color: '#fdba74' },
  ];

  return (
    <div className="floating-flowers-bg">
      {flowers.map((fl) => (
        <div
          key={fl.id}
          className="flower-particle"
          style={{
            left: fl.left,
            top: fl.top,
            width: `${fl.size}px`,
            height: `${fl.size}px`,
            color: fl.color,
            animationDelay: `${fl.delay}s`,
            animationDuration: `${fl.duration}s`,
          }}
        >
          {flowerSVGs[fl.templateIndex]}
        </div>
      ))}

      <style>{`
        .floating-flowers-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .flower-particle {
          position: absolute;
          opacity: 0.15;
          pointer-events: none;
          animation: floatAnimation 10s ease-in-out infinite;
          transform-origin: center;
        }

        [data-theme='dark'] .flower-particle {
          opacity: 0.08;
        }

        @keyframes floatAnimation {
          0% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-20px) rotate(180deg) scale(1.1);
          }
          100% {
            transform: translateY(0px) rotate(360deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
};
