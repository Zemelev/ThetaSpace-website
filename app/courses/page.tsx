import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_ALL_COURSES } from '@/lib/queries';
import { CoursesResponse } from '@/types';
import CourseCard from '@/components/cards/CourseCard';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Курси',
  description: 'Навчальні курси Self Upgrade Space — базова підготовка до життя. ППС, ГЦО та інші практичні курси з супервізором. Гончара 15/3, Київ.',
};

// ─── Хардкодовані курси (ППС і ГЦО) ───────────────────────────────────────────
const STATIC_COURSES = [
  {
    id: 'pps',
    slug: 'pps',
    title: 'Токсичні люди: як розпізнати маніпуляцію і повернути контроль над своїм життям',
    excerpt: 'Цей курс допомагає зрозуміти, чому іноді втрачаєш впевненість у собі та чому в житті виникають різкі підйоми й спади. Ти дізнаєшся, як розпізнавати токсичних людей і відновити стабільність.',
    price: '100$ + супервізор',
    duration: 'Індивідуальний темп',
    format: 'У класі або з супервізором',
    featuredImageUrl: undefined,
    courseImage: undefined,
  },
  {
    id: 'gco',
    slug: 'gco',
    title: 'Опора на себе: практичний курс про те, як відновити повагу до себе та свою силу',
    excerpt: 'Іноді людина втрачає внутрішню опору. Цей курс допомагає повернути внутрішню чесність, силу та ясність — і навчитися приймати рішення, спираючись на власні принципи.',
    price: '100$ + супервізор',
    duration: 'Індивідуальний темп',
    format: 'У класі або з супервізором',
    featuredImageUrl: undefined,
    courseImage: undefined,
  },
] as const;

export default async function CoursesPage() {
  let cmsCoures: CoursesResponse['courses']['nodes'] = [];

  try {
    const data = await fetchGraphQL<CoursesResponse>(GET_ALL_COURSES);
    cmsCoures = data?.courses?.nodes || [];
  } catch (error) {
    console.error('Error fetching courses:', error);
  }

  const totalCount = STATIC_COURSES.length + cmsCoures.length;

  return (
    <main className="ts-courses-page">

      {/* ── Hero ── */}
      <section className="ts-courses-hero ts-noise">
        <div className="ts-hero-bg-word" aria-hidden="true">КУРСИ</div>
        <div className="ts-wrap ts-courses-hero-inner">
          <span className="ts-label">— Self Upgrade Space</span>
          <h1 className="ts-d-xl" style={{ marginTop: 16 }}>
            Курси
          </h1>
          <div className="ts-courses-hero-meta">
            <div className="ts-meta-item">
              <span className="ts-meta-label">Курсів</span>
              <span className="ts-meta-val">{totalCount}</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-label">Формат</span>
              <span className="ts-meta-val">Клас · Онлайн</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-label">Локація</span>
              <span className="ts-meta-val">Гончара 15/3</span>
            </div>
          </div>
          <p className="ts-body ts-courses-hero-desc">
            Навчальні курси по базовій підготовці до життя.
            Кожен курс проходить за контрольним листом із практичними завданнями
            під керівництвом супервізора.
          </p>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="ts-marquee" aria-hidden="true">
        <div className="ts-marquee-track">
          {Array(2).fill(['Self Upgrade', 'ППС', 'ГЦО', 'Практичні завдання', 'Супервізор', 'Гончара 15/3', 'Київ']).flat().map((item, i) => (
            <span key={i} className="ts-marquee-item">
              {item}<span className="ts-marquee-sep"> · </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="ts-section">
        <div className="ts-wrap">

          {/* Static courses */}
          <div className="ts-section-head">
            <div>
              <span className="ts-label">— Self Upgrade Space</span>
              <h2 className="ts-d-md" style={{ marginTop: 12 }}>Базова<br />підготовка</h2>
            </div>
            <p className="ts-body" style={{ maxWidth: 360 }}>
              Курси, що дають практичні інструменти для стабілізації та розвитку в реальному житті.
            </p>
          </div>

          <div className="ts-courses-grid">
            {STATIC_COURSES.map(course => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                excerpt={course.excerpt}
                slug={course.slug}
                duration={course.duration}
                price={course.price}
                format={course.format}
              />
            ))}
          </div>

          {/* CMS courses */}
          {cmsCoures.length > 0 && (
            <>
              <div className="ts-section-head" style={{ marginTop: 'var(--ts-xl)' }}>
                <div>
                  <span className="ts-label">— Інші курси</span>
                  <h2 className="ts-d-md" style={{ marginTop: 12 }}>Програми</h2>
                </div>
              </div>
              <div className="ts-courses-grid">
                {cmsCoures.map(course => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    excerpt={course.excerpt}
                    slug={course.slug}
                    duration={course.courseDetails?.duration}
                    price={course.courseDetails?.coursePrice}
                    format={course.courseDetails?.format}
                    featuredImageUrl={course.featuredImage?.node?.sourceUrl}
                    courseImage={course.courseDetails?.courseImage}
                  />
                ))}
              </div>
            </>
          )}

        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="ts-courses-cta ts-section-sm">
        <div className="ts-wrap ts-courses-cta-inner">
          <div>
            <span className="ts-label">— Не знаєте з чого почати?</span>
            <h2 className="ts-d-md" style={{ marginTop: 12 }}>
              Зв'яжіться з нами
            </h2>
          </div>
          <div className="ts-courses-cta-actions">
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
        .ts-courses-page { background: var(--ts-bg); }

        /* Hero */
        .ts-courses-hero {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding-bottom: 64px;
          background: var(--ts-bg);
          overflow: hidden;
          position: relative;
        }
        .ts-hero-bg-word {
          position: absolute;
          top: 50%;
          left: var(--ts-gutter);
          transform: translateY(-54%);
          font-family: var(--ts-font-display);
          font-size: clamp(120px, 26vw, 400px);
          line-height: 1;
          color: rgba(255,193,7,0.04);
          letter-spacing: -0.02em;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .ts-courses-hero-inner {
          position: relative;
          z-index: 2;
          padding-top: 120px;
        }
        .ts-courses-hero-meta {
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
        .ts-courses-hero-desc {
          max-width: 560px;
          margin-top: 28px;
        }

        /* Grid */
        .ts-courses-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        /* CTA strip */
        .ts-courses-cta {
          background: var(--ts-bg-1);
          border-top: 1px solid var(--ts-border);
        }
        .ts-courses-cta-inner {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
        }
        .ts-courses-cta-actions {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .ts-courses-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .ts-courses-grid { grid-template-columns: 1fr; }
          .ts-courses-cta-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </main>
  );
}