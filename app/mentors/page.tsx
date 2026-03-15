import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_ALL_MENTORS } from '@/lib/queries';
import { MentorsResponse } from '@/types';
import MentorCard from '@/components/cards/MentorCard';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Супервізори',
  description: 'Команда Theta Space — досвідчені супервізори, які створюють простір для живого спілкування та розвитку. Гончара 15/3, Київ.',
};

export default async function MentorsPage() {
  let mentors: MentorsResponse['mentors']['nodes'] = [];

  try {
    const data = await fetchGraphQL<MentorsResponse>(GET_ALL_MENTORS);
    mentors = data?.mentors?.nodes || [];
  } catch (error) {
    console.error('Error fetching mentors:', error);
  }

  return (
    <main className="ts-mp-page">

      {/* ── Hero ── */}
      <section className="ts-mp-hero ts-noise">
        <div className="ts-mp-bg-word" aria-hidden="true">ЛЮДИ</div>
        <div className="ts-wrap ts-mp-hero-inner">
          <span className="ts-label">— Наша команда</span>
          <h1 className="ts-d-xl" style={{ marginTop: 16 }}>
            Супер&shy;візори
          </h1>
          <div className="ts-mp-meta">
            <div className="ts-meta-item">
              <span className="ts-meta-label">Спеціалістів</span>
              <span className="ts-meta-val">{mentors.length || '—'}</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-label">Підхід</span>
              <span className="ts-meta-val">Живий контакт</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-label">Локація</span>
              <span className="ts-meta-val">Гончара 15/3</span>
            </div>
          </div>
          <p className="ts-body ts-mp-desc">
            Їх об'єднує глибокий інтерес до розвитку людини,
            культури живого контакту та створення просторів, де можна бути справжнім.
          </p>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="ts-marquee" aria-hidden="true">
        <div className="ts-marquee-track">
          {Array(2).fill([
            'Супервізори', 'Живий контакт', 'Розвиток', 'Theta Space',
            'Справжнє спілкування', 'Київ', 'Гончара 15/3',
          ]).flat().map((item, i) => (
            <span key={i} className="ts-marquee-item">
              {item}<span className="ts-marquee-sep"> · </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Founders ── */}
      <section className="ts-mp-founders ts-section-sm">
        <div className="ts-wrap">
          <div className="ts-section-head">
            <div>
              <span className="ts-label">— Засновники</span>
              <h2 className="ts-d-md" style={{ marginTop: 12 }}>
                Роман Кхан<br />&amp; Лада Чудненко
              </h2>
            </div>
            <p className="ts-body" style={{ maxWidth: 400 }}>
              Створили Theta Space як місце присутності, усвідомленості та реального діалогу —
              простір, у якому здібні люди розкривають потенціал через спілкування.
            </p>
          </div>

          <div className="ts-mp-founders-grid">
            {[
              { name: 'Роман Кхан', role: 'Засновник · Супервізор' },
              { name: 'Лада Чудненко', role: 'Засновниця · Супервізор' },
            ].map(founder => (
              <div key={founder.name} className="ts-mp-founder-card ts-card">
                <div className="ts-mp-founder-photo">
                  <div className="ts-mp-founder-initials">
                    {founder.name.split(' ').map(w => w[0]).join('')}
                  </div>
                </div>
                <div className="ts-card-body">
                  <span className="ts-label" style={{ marginBottom: 8 }}>— {founder.role}</span>
                  <h3 className="ts-d-sm">{founder.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All mentors ── */}
      {mentors.length > 0 && (
        <section className="ts-section">
          <div className="ts-wrap">
            <div className="ts-section-head">
              <div>
                <span className="ts-label">— Команда</span>
                <h2 className="ts-d-md" style={{ marginTop: 12 }}>
                  Всі<br />супервізори
                </h2>
              </div>
            </div>
            <div className="ts-mp-grid">
              {mentors.map(mentor => (
                <MentorCard
                  key={mentor.id}
                  id={mentor.id}
                  title={mentor.title}
                  position={mentor.mentorDetails?.position}
                  excerpt={mentor.excerpt}
                  slug={mentor.slug}
                  featuredImageUrl={mentor.featuredImage?.node?.sourceUrl}
                  mentorPhoto={mentor.mentorDetails?.mentorPhoto}
                  socialLinks={mentor.mentorDetails?.socialLinks}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Join CTA ── */}
      <section className="ts-mp-cta ts-section-sm">
        <div className="ts-wrap ts-mp-cta-inner">
          <div>
            <span className="ts-label">— Хочете з нами?</span>
            <h2 className="ts-d-md" style={{ marginTop: 12 }}>
              Приходьте<br />на клуб
            </h2>
          </div>
          <div className="ts-mp-cta-actions">
            <Link href="/#club-form" className="ts-btn ts-btn-primary">
              Записатися
            </Link>
            <Link href="/about" className="ts-btn ts-btn-outline">
              Про нас →
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .ts-mp-page { background: var(--ts-bg); }

        .ts-mp-hero {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding-bottom: 64px;
          overflow: hidden;
          position: relative;
        }
        .ts-mp-bg-word {
          position: absolute;
          top: 50%; left: var(--ts-gutter);
          transform: translateY(-54%);
          font-family: var(--ts-font-display);
          font-size: clamp(120px, 26vw, 400px);
          line-height: 1;
          color: rgba(255,193,7,0.04);
          pointer-events: none; user-select: none; z-index: 0;
        }
        .ts-mp-hero-inner { position: relative; z-index: 2; padding-top: 120px; }
        .ts-mp-meta {
          display: flex; flex-wrap: wrap; gap: 0;
          margin-top: 32px; padding-top: 24px;
          border-top: 1px solid var(--ts-border);
        }
        .ts-meta-item {
          display: flex; flex-direction: column; gap: 4px;
          padding-right: 32px; margin-right: 32px;
          border-right: 1px solid var(--ts-border);
        }
        .ts-meta-item:last-child { border-right: none; }
        .ts-meta-label {
          font-family: var(--ts-font-mono); font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ts-text-faint);
        }
        .ts-meta-val {
          font-family: var(--ts-font-mono); font-size: 14px;
          font-weight: 700; color: var(--ts-text);
        }
        .ts-mp-desc { max-width: 520px; margin-top: 28px; }

        /* Founders */
        .ts-mp-founders { background: var(--ts-bg-1); }
        .ts-mp-founders-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
        }
        .ts-mp-founder-card { display: flex; flex-direction: column; }
        .ts-mp-founder-photo {
          aspect-ratio: 3/2;
          background: var(--ts-bg-2);
          display: flex; align-items: center; justify-content: center;
          border-bottom: 1px solid var(--ts-border);
        }
        .ts-mp-founder-initials {
          font-family: var(--ts-font-display);
          font-size: clamp(60px, 10vw, 120px);
          color: rgba(255,193,7,0.1);
          user-select: none;
        }

        /* Mentors grid */
        .ts-mp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        /* CTA */
        .ts-mp-cta { background: var(--ts-bg-1); border-top: 1px solid var(--ts-border); }
        .ts-mp-cta-inner {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 40px;
        }
        .ts-mp-cta-actions { display: flex; gap: 12px; flex-shrink: 0; }

        @media (max-width: 1024px) {
          .ts-mp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .ts-mp-founders-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .ts-mp-grid { grid-template-columns: 1fr; }
          .ts-mp-cta-inner { flex-direction: column; align-items: flex-start; }
          .ts-mp-meta { gap: 20px; }
          .ts-meta-item { border-right: none; padding: 0; margin: 0; }
        }
      `}</style>
    </main>
  );
}