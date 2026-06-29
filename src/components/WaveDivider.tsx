import React from 'react';

interface WaveDividerProps {
  flip?: boolean;
  color?: string;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({ flip = false, color }) => {
  return (
    <div
      className={`wave-divider-container ${flip ? 'flipped' : ''}`}
      style={{ color: color || 'var(--bg-secondary)' }}
    >
      <svg
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="wave-svg"
      >
        <path
          d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,50 1440,40 L1440,100 L0,100 Z"
          fill="currentColor"
        />
        <path
          d="M0,60 C240,20 480,80 720,50 C960,20 1200,80 1440,60 L1440,100 L0,100 Z"
          fill="currentColor"
          opacity="0.3"
        />
      </svg>

      <style>{`
        .wave-divider-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          margin: -1px 0;
          z-index: 2;
        }

        .wave-divider-container.flipped {
          transform: rotate(180deg);
        }

        .wave-svg {
          position: relative;
          display: block;
          width: 100%;
          height: 50px;
        }

        @media (min-width: 768px) {
          .wave-svg {
            height: 70px;
          }
        }
      `}</style>
    </div>
  );
};
