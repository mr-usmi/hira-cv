import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Glasses, Wrench, ShoppingBag, Heart, Calendar, MapPin } from 'lucide-react';
import { WaveDivider } from './WaveDivider';

export const Timeline: React.FC = () => {
  const { t } = useLanguage();

  const jobsData = [
    {
      key: 'optician',
      icon: <Glasses size={20} />,
      color: 'var(--accent-pink)',
      location: 'Barcelona, España',
    },
    {
      key: 'workshopManager',
      icon: <Wrench size={20} />,
      color: 'var(--accent-teal)',
      location: 'Terrassa, Barcelona',
    },
    {
      key: 'salesAssistant',
      icon: <ShoppingBag size={20} />,
      color: 'var(--accent-peach)',
      location: 'Barcelona, España',
    },
    {
      key: 'socialFacilitator',
      icon: <Heart size={20} />,
      color: 'var(--accent-gold)',
      location: 'Barcelona, España',
    },
  ];

  return (
    <section id="experience" className="experience-section">
      <WaveDivider color="var(--bg-primary)" />
      
      <div className="bg-glow-teal"></div>
      
      <div className="container experience-container">
        <div className="section-header">
          <h2>{t.expTitle}</h2>
          <p>{t.expSubtitle}</p>
        </div>

        <div className="timeline-wrapper">
          {/* Vertical central line */}
          <div className="timeline-line"></div>

          {/* Timeline Items */}
          <div className="timeline-items-list">
            {jobsData.map((job, index) => {
              // Retrieve language translated details
              const jobDetails = t.jobs[job.key as keyof typeof t.jobs];
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={job.key} 
                  className={`timeline-item ${isEven ? 'even-item' : 'odd-item'}`}
                >
                  {/* Icon Node */}
                  <div 
                    className="timeline-icon-node"
                    style={{ 
                      backgroundColor: job.color,
                      boxShadow: `0 0 15px ${job.color}`
                    }}
                  >
                    {job.icon}
                  </div>

                  {/* Content Card */}
                  <div className="timeline-content-card glass-card">
                    <div className="card-header-info">
                      <span className="job-period">
                        <Calendar size={14} />
                        {jobDetails.period}
                      </span>
                      <span className="job-location">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                    </div>

                    <h3 className="job-title">{jobDetails.title}</h3>
                    <h4 className="job-company" style={{ color: job.color }}>{jobDetails.company}</h4>

                    <ul className="job-bullets">
                      {jobDetails.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <WaveDivider flip color="var(--bg-primary)" />

      <style>{`
        .experience-section {
          background-color: var(--bg-secondary);
          z-index: 5;
        }

        .experience-container {
          position: relative;
          z-index: 10;
        }

        .timeline-wrapper {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        /* The vertical line in the middle */
        .timeline-line {
          position: absolute;
          left: 1.5rem;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(
            to bottom,
            var(--accent-pink) 0%,
            var(--accent-teal) 50%,
            var(--accent-gold) 100%
          );
          border-radius: 9999px;
        }

        @media (min-width: 992px) {
          .timeline-line {
            left: 50%;
            transform: translateX(-50%);
          }
        }

        .timeline-items-list {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .timeline-item {
          position: relative;
          display: flex;
          flex-direction: column;
          padding-left: 3.5rem;
        }

        @media (min-width: 992px) {
          .timeline-item {
            padding-left: 0;
            width: 50%;
          }

          .timeline-item.even-item {
            align-self: flex-start;
            padding-right: 3rem;
            text-align: right;
          }

          .timeline-item.odd-item {
            align-self: flex-end;
            padding-left: 3rem;
            text-align: left;
          }
        }

        /* Icon node positioning */
        .timeline-icon-node {
          position: absolute;
          left: 0.5rem;
          top: 1.5rem;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          z-index: 10;
          border: 3px solid var(--bg-secondary);
        }

        @media (min-width: 992px) {
          .timeline-icon-node {
            left: auto;
            top: 1.5rem;
          }

          .even-item .timeline-icon-node {
            right: -19px;
          }

          .odd-item .timeline-icon-node {
            left: -19px;
          }
        }

        /* Card Content Styling */
        .timeline-content-card {
          padding: 2rem;
          background: var(--bg-primary);
          border-radius: 24px;
        }

        .card-header-info {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 0.75rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .even-item .card-header-info {
          justify-content: flex-start;
        }

        @media (min-width: 992px) {
          .even-item .card-header-info {
            justify-content: flex-end;
          }
        }

        .job-period, .job-location {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .job-title {
          font-size: 1.35rem;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          font-family: var(--font-friendly);
        }

        .job-company {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          font-family: var(--font-friendly);
        }

        .job-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .job-bullets li {
          position: relative;
          padding-left: 1.25rem;
          text-align: left;
        }

        .job-bullets li::before {
          content: '✿';
          position: absolute;
          left: 0;
          top: 0;
          color: var(--accent-pink);
          font-size: 0.8rem;
        }

        @media (min-width: 992px) {
          .even-item .job-bullets li {
            padding-left: 0;
            padding-right: 1.25rem;
            text-align: right;
          }

          .even-item .job-bullets li::before {
            left: auto;
            right: 0;
          }
          
          /* Keep bullet items reading left-to-right inside the list even if right-aligned */
          .even-item .job-bullets {
            align-items: flex-end;
          }
          
          .even-item .job-bullets li {
            direction: rtl;
            unicode-bidi: bidi-override;
          }
        }

        /* Fix bullet layout alignment for reading order */
        @media (min-width: 992px) {
          .even-item .job-bullets li {
            direction: ltr;
            unicode-bidi: normal;
            padding-left: 0;
            padding-right: 1.25rem;
          }
          
          .even-item .job-bullets li::before {
            left: auto;
            right: 0;
          }
        }
      `}</style>
    </section>
  );
};
