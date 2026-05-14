'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="ts-legacy-hero">
      <div className="ts-wrap ts-legacy-hero-inner">
        <span className="ts-label">— Theta Space</span>
        <h1 className="ts-d-xl">
          Простір<br />живого<br />спілкування
        </h1>
        <p className="ts-body">
          Клуб, лекції та курси у серці Києва. Місце для розмов, практики і ясного контакту.
        </p>
        <div className="ts-legacy-hero-actions">
          <Link href="/#register" className="ts-btn ts-btn-primary">
            Записатися
          </Link>
          <Link href="/lectures" className="ts-btn ts-btn-outline">
            Лекції
          </Link>
        </div>
      </div>

      <style>{`
        .ts-legacy-hero {
          min-height: 80svh;
          display: flex;
          align-items: center;
          background: var(--ts-bg);
          overflow: hidden;
          position: relative;
        }
        .ts-legacy-hero::before {
          content: 'θ';
          position: absolute;
          right: -4vw;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(23, 19, 15, 0.045);
          font-family: Georgia, serif;
          font-size: clamp(260px, 48vw, 720px);
          line-height: 1;
        }
        .ts-legacy-hero-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 28px;
          padding-top: 96px;
          padding-bottom: 72px;
        }
        .ts-legacy-hero .ts-body {
          max-width: 560px;
        }
        .ts-legacy-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
      `}</style>
    </section>
  );
}
