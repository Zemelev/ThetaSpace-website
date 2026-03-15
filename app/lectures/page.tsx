import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_ALL_LECTURES } from '@/lib/queries';
import { LecturesResponse } from '@/types';
import LectureCard from '@/components/cards/LectureCard';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Лекції',
  description: 'Відкриті лекції про базові закони виживання та розвитку. Гончара 15/3, Київ. Від 0$ до 30$.',
};

export default async function LecturesPage() {
  let lectures: LecturesResponse['lectures']['nodes'] = [];

  try {
    const data = await fetchGraphQL<LecturesResponse>(GET_ALL_LECTURES);
    lectures = data?.lectures?.nodes || [];
  } catch (error) {
    console.error('Error fetching lectures:', error);
  }

  return (
    <main className="ts-lp-page">

      {/* ── Hero ── */}
      <section className="ts-lp-hero ts-noise">
        <div className="ts-lp-bg-word" aria-hidden="true">ЛЕКЦІЇ</div>
        <div className="ts-wrap ts-lp-hero-inner">
          <span className="ts-label">— Відкриті події</span>
          <h1 className="ts-d-xl" style={{ marginTop: 16 }}>Лекції</h1>
          <div className="ts-lp-meta">
            <div className="ts-meta-item">
              <span className="ts-meta-label">Подій</span>
              <span className="ts-meta-val">{lectures.length || '—'}</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-label">Тривалість</span>
              <span className="ts-meta-val">1.5 год</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-label">Вартість</span>
              <span className="ts-meta-val">від 0$</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-label">Локація</span>
              <span className="ts-meta-val">Гончара 15/3</span>
            </div>
          </div>
          <p className="ts-body ts-lp-desc">
            Лекції про базові закони виживання на цій планеті.
            Відкриті для всіх — незалежно від досвіду та рівня підготовки.
          </p>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="ts-marquee" aria-hidden="true">
        <div className="ts-marquee-track">
          {Array(2).fill([
            'Відкриті лекції', 'Живий формат', 'Гончара 15/3',
            'Київ', 'від 0$', 'Theta Space', '1.5 год',
          ]).flat().map((item, i) => (
            <span key={i} className="ts-marquee-item">
              {item}<span className="ts-marquee-sep"> · </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="ts-section">
        <div className="ts-wrap">
          <div className="ts-section-head">
            <div>
              <span className="ts-label">— Розклад</span>
              <h2 className="ts-d-md" style={{ marginTop: 12 }}>
                Найближчі<br />події
              </h2>
            </div>
            <Link href="/#lecture-form" className="ts-btn ts-btn-primary">
              Записатися →
            </Link>
          </div>

          {lectures.length === 0 ? (
            <div className="ts-lp-empty">
              <span className="ts-d-sm" style={{ color: 'var(--ts-text-faint)' }}>
                Наразі немає запланованих лекцій
              </span>
              <p className="ts-body" style={{ marginTop: 16 }}>
                Слідкуйте за анонсами в{' '}
                <a
                  href="https://www.instagram.com/theta_space_club"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--ts-amber)' }}
                >
                  Instagram
                </a>
              </p>
            </div>
          ) : (
            <div className="ts-lp-grid">
              {lectures.map(lecture => (
                <LectureCard
                  key={lecture.id}
                  id={lecture.id}
                  title={lecture.title}
                  excerpt={lecture.excerpt}
                  slug={lecture.slug}
                  dateTime={lecture.lectureDetails?.dateTime}
                  location={lecture.lectureDetails?.location}
                  price={lecture.lectureDetails?.price}
                  featuredImageUrl={lecture.featuredImage?.node?.sourceUrl}
                  lectureImage={lecture.lectureDetails?.lectureImage}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="ts-lp-cta ts-section-sm">
        <div className="ts-wrap ts-lp-cta-inner">
          <div>
            <span className="ts-label">— Не пропустіть наступну подію</span>
            <h2 className="ts-d-md" style={{ marginTop: 12 }}>
              Підписуйтесь<br />на Instagram
            </h2>
          </div>
          <div className="ts-lp-cta-actions">
            <a
              href="https://www.instagram.com/theta_space_club"
              target="_blank"
              rel="noopener noreferrer"
              className="ts-btn ts-btn-primary"
            >
              @theta_space_ua
            </a>
            <Link href="/courses" className="ts-btn ts-btn-outline">
              Курси →
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .ts-lp-page { background: var(--ts-bg); }

        .ts-lp-hero {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding-bottom: 64px;
          background: var(--ts-bg);
          overflow: hidden;
          position: relative;
        }
        .ts-lp-bg-word {
          position: absolute;
          top: 50%;
          left: var(--ts-gutter);
          transform: translateY(-54%);
          font-family: var(--ts-font-display);
          font-size: clamp(100px, 22vw, 360px);
          line-height: 1;
          color: rgba(255,193,7,0.04);
          letter-spacing: -0.02em;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .ts-lp-hero-inner {
          position: relative;
          z-index: 2;
          padding-top: 120px;
        }
        .ts-lp-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--ts-border);
        }
        .ts-meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-right: 32px;
          margin-right: 32px;
          border-right: 1px solid var(--ts-border);
        }
        .ts-meta-item:last-child { border-right: none; }
        .ts-meta-label {
          font-family: var(--ts-font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ts-text-faint);
        }
        .ts-meta-val {
          font-family: var(--ts-font-mono);
          font-size: 14px;
          font-weight: 700;
          color: var(--ts-text);
        }
        .ts-lp-desc {
          max-width: 520px;
          margin-top: 28px;
        }

        .ts-lp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        .ts-lp-empty {
          padding: 80px 0;
          border-top: 1px solid var(--ts-border);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .ts-lp-cta {
          background: var(--ts-bg-1);
          border-top: 1px solid var(--ts-border);
        }
        .ts-lp-cta-inner {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
        }
        .ts-lp-cta-actions {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
          .ts-lp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .ts-lp-grid { grid-template-columns: 1fr; }
          .ts-lp-cta-inner { flex-direction: column; align-items: flex-start; }
          .ts-lp-meta { gap: 20px; }
          .ts-meta-item { border-right: none; padding: 0; margin: 0; }
        }
      `}</style>
    </main>
  );
}