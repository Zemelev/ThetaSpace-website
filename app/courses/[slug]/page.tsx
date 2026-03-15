import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_COURSE_BY_SLUG } from '@/lib/queries';
import { CourseResponse } from '@/types';
import ContactForm from '@/components/forms/ContactForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

// ─── Статичні курси ────────────────────────────────────────────────────────────
const STATIC_COURSES: Record<string, {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  price: string;
  priceNote: string;
  duration: string;
  format: string;
  shortDesc: string;
  sections: { heading: string; items: string[] }[];
  practiceNote: string;
}> = {
  pps: {
    id: 'pps',
    title: 'Токсичні люди: як розпізнати маніпуляцію і повернути контроль над своїм життям',
    shortTitle: 'ППС',
    tagline: 'Практичний курс про руйнівний вплив оточення та як від нього захиститися',
    price: '100$',
    priceNote: '+ оплата годин супервізора',
    duration: 'Індивідуальний темп',
    format: 'У класі на Гончара 15/3 або індивідуально з супервізором',
    shortDesc: 'Чому поруч з одними людьми ти відчуваєш силу й натхнення, а поруч з іншими — занепад і втрату енергії? Цей курс дає відповідь і практичні інструменти.',
    sections: [
      {
        heading: 'На курсі ти вивчиш',
        items: [
          'Чому поруч з одними людьми життя покращується, а поруч з іншими руйнується',
          'Два типи поведінки: творча (созидальна) і руйнівна',
          'Як розпізнавати токсичних людей за конкретними ознаками',
          'Як зрозуміти, що ти перебуваєш під впливом такої людини',
          'Чому це спричиняє помилки, хвороби та нестабільність у житті',
          'Як відновити свою силу та здатність діяти',
        ],
      },
      {
        heading: 'Практичні завдання дають змогу',
        items: [
          'Аналізувати реальні ситуації зі свого життя',
          'Розпізнавати токсичний вплив',
          'Виробляти практичні способи взаємодії',
          'Навчитися врегульовувати ситуації або грамотно розривати руйнівні зв\'язки',
        ],
      },
    ],
    practiceNote: 'Курс проходиться за контрольним листом практичних завдань під керівництвом супервізора — не лише теорія, а реальні зміни у житті.',
  },
  gco: {
    id: 'gco',
    title: 'Опора на себе: практичний курс про те, як відновити повагу до себе та свою силу',
    shortTitle: 'ГЦО',
    tagline: 'Курс про особисту цілісність, внутрішню силу та гідність',
    price: '100$',
    priceNote: '+ оплата годин супервізора',
    duration: 'Індивідуальний темп',
    format: 'У класі на Гончара 15/3 або індивідуально з супервізором',
    shortDesc: 'Іноді людина втрачає внутрішню опору. З\'являються сумніви, тиск з боку інших, почуття провини. Цей курс допомагає повернути внутрішню чесність, силу та ясність.',
    sections: [
      {
        heading: 'Ти знайдеш відповіді на запитання',
        items: [
          'Що таке особиста етика і як вона працює',
          'Як визначити свої справжні цінності',
          'Як приймати рішення, які не руйнують тебе',
          'Як відновити повагу до себе',
          'Як перестати йти на компроміс із власною реальністю',
        ],
      },
      {
        heading: 'Теми програми',
        items: [
          'Гідність та цілісність особистості',
          'Етика і моральність',
          'Динаміки життя',
          'Кодекс честі',
          'Чесність і відповідальність за власні дії',
        ],
      },
    ],
    practiceNote: 'Кожен крок курсу проходить за контрольним листом. Ти виконуєш вправи, аналізуєш реальні ситуації зі свого життя і застосовуєш дані одразу.',
  },
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);

  const staticCourse = STATIC_COURSES[decoded];
  if (staticCourse) {
    return {
      title: staticCourse.shortTitle + ' — ' + staticCourse.tagline,
      description: staticCourse.shortDesc,
    };
  }

  try {
    const data = await fetchGraphQL<CourseResponse>(GET_COURSE_BY_SLUG, { slug: decoded });
    const course = data?.course;
    if (course) {
      return {
        title: course.title,
        description: course.excerpt?.replace(/<[^>]+>/g, '').slice(0, 160) || '',
      };
    }
  } catch { /* */ }

  return { title: 'Курс' };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);

  // 1. Static course?
  const staticCourse = STATIC_COURSES[decoded];
  if (staticCourse) {
    return <StaticCoursePage course={staticCourse} />;
  }

  // 2. CMS course
  let course: CourseResponse['course'] = null;
  try {
    const data = await fetchGraphQL<CourseResponse>(GET_COURSE_BY_SLUG, { slug: decoded });
    course = data?.course || null;
  } catch (error) {
    console.error('Error fetching course:', error);
  }

  if (!course) notFound();

  const renderFormat = (format: unknown) =>
    Array.isArray(format) ? format.join(', ') : (format as string) || 'Формат уточнюється';

  const displayImage =
    course.courseDetails?.courseImage?.node?.sourceUrl ||
    course.featuredImage?.node?.sourceUrl;

  return (
    <main className="ts-course-page">
      <div className="ts-wrap">
        <Link href="/courses" className="ts-back-link">
          ← Всі курси
        </Link>
      </div>

      {/* Hero */}
      <section className="ts-cp-hero ts-noise">
        <div className="ts-hero-bg-word" aria-hidden="true">
          {course.title.charAt(0)}
        </div>
        <div className="ts-wrap ts-cp-hero-inner">
          <span className="ts-label">— Курс</span>
          <h1 className="ts-d-xl" style={{ marginTop: 16, maxWidth: 1000 }}>
            {course.title}
          </h1>
          <div className="ts-cp-meta">
            {course.courseDetails?.duration && (
              <div className="ts-meta-item">
                <span className="ts-meta-label">Тривалість</span>
                <span className="ts-meta-val">{course.courseDetails.duration}</span>
              </div>
            )}
            {course.courseDetails?.format && (
              <div className="ts-meta-item">
                <span className="ts-meta-label">Формат</span>
                <span className="ts-meta-val">{renderFormat(course.courseDetails.format)}</span>
              </div>
            )}
            <div className="ts-meta-item">
              <span className="ts-meta-label">Вартість</span>
              <span className="ts-meta-val" style={{ color: 'var(--ts-amber)' }}>
                {course.courseDetails?.coursePrice || 'За запитом'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="ts-section">
        <div className="ts-wrap ts-cp-content-grid">
          <div className="ts-cp-main">
            {displayImage && (
              <div className="ts-cp-image">
                <img src={displayImage} alt={course.title} />
              </div>
            )}
            {course.content && (
              <div
                className="ts-cp-prose"
                dangerouslySetInnerHTML={{ __html: course.content }}
              />
            )}
            {course.courseDetails?.includes && (
              <div className="ts-cp-includes">
                <span className="ts-label" style={{ marginBottom: 16 }}>— Що включено</span>
                <p className="ts-body" style={{ whiteSpace: 'pre-line' }}>
                  {course.courseDetails.includes}
                </p>
              </div>
            )}
          </div>

          <aside className="ts-cp-aside">
            <div className="ts-cp-aside-inner">
              <span className="ts-label">— Реєстрація</span>
              <h2 className="ts-d-sm" style={{ marginTop: 16, marginBottom: 32 }}>
                Записатися<br />на курс
              </h2>
              <ContactForm
                type="course"
                courseId={course.id}
                source={`course_${course.slug || course.id}`}
              />
            </div>
          </aside>
        </div>
      </section>

      <CourseStyles />
    </main>
  );
}

// ─── Static course template ───────────────────────────────────────────────────
function StaticCoursePage({ course }: { course: typeof STATIC_COURSES[string] }) {
  return (
    <main className="ts-course-page">
      <div className="ts-wrap">
        <Link href="/courses" className="ts-back-link">← Всі курси</Link>
      </div>

      {/* Hero */}
      <section className="ts-cp-hero ts-noise">
        <div className="ts-hero-bg-word" aria-hidden="true">{course.shortTitle}</div>
        <div className="ts-wrap ts-cp-hero-inner">
          <span className="ts-label">— Self Upgrade Space</span>
          <h1 className="ts-d-xl" style={{ marginTop: 16, maxWidth: 1100 }}>
            {course.title}
          </h1>
          <div className="ts-cp-meta">
            <div className="ts-meta-item">
              <span className="ts-meta-label">Тривалість</span>
              <span className="ts-meta-val">{course.duration}</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-label">Формат</span>
              <span className="ts-meta-val">Клас · Індивідуально</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-label">Вартість</span>
              <span className="ts-meta-val" style={{ color: 'var(--ts-amber)' }}>
                {course.price}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="ts-section">
        <div className="ts-wrap ts-cp-content-grid">

          {/* Main */}
          <div className="ts-cp-main">

            {/* Tagline */}
            <p className="ts-cp-tagline ts-body">{course.shortDesc}</p>

            {/* Practice note */}
            <div className="ts-cp-practice-note">
              <span className="ts-label" style={{ marginBottom: 12 }}>— Формат навчання</span>
              <p className="ts-body">{course.practiceNote}</p>
              <ul className="ts-cp-format-list">
                <li>За контрольним листом практичних завдань</li>
                <li>У супроводі супервізора</li>
                <li>В індивідуальному темпі навчання</li>
              </ul>
            </div>

            {/* Sections */}
            {course.sections.map((section, i) => (
              <div key={i} className="ts-cp-section-block">
                <span className="ts-label" style={{ marginBottom: 20 }}>— {section.heading}</span>
                <ul className="ts-cp-list">
                  {section.items.map((item, j) => (
                    <li key={j} className="ts-cp-list-item">
                      <span className="ts-cp-list-arrow">→</span>
                      <span className="ts-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Location */}
            <div className="ts-cp-location">
              <span className="ts-location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                {course.format}
              </span>
            </div>

          </div>

          {/* Aside */}
          <aside className="ts-cp-aside">
            <div className="ts-cp-aside-inner">
              {/* Price block */}
              <div className="ts-cp-price-block">
                <span className="ts-label">— Вартість курсу</span>
                <span className="ts-price" style={{ marginTop: 12, display: 'block', fontSize: 'clamp(40px, 6vw, 64px)' }}>
                  {course.price}
                </span>
                <span className="ts-body-sm" style={{ marginTop: 6, display: 'block' }}>
                  {course.priceNote}
                </span>
              </div>

              <hr className="ts-divider" style={{ margin: '32px 0' }} />

              <span className="ts-label">— Реєстрація</span>
              <h2 className="ts-d-sm" style={{ marginTop: 16, marginBottom: 32 }}>
                Записатися<br />на курс
              </h2>
              <ContactForm
                type="course"
                courseId={course.id}
                source={`course_${course.id}`}
              />
            </div>
          </aside>

        </div>
      </section>

      <CourseStyles />
    </main>
  );
}

// ─── Shared styles ─────────────────────────────────────────────────────────────
function CourseStyles() {
  return (
    <style>{`
      .ts-course-page { background: var(--ts-bg); min-height: 100svh; }

      .ts-back-link {
        display: inline-block;
        font-family: var(--ts-font-mono);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--ts-text-faint);
        padding: 32px 0 0;
        transition: color var(--ts-dur);
      }
      .ts-back-link:hover { color: var(--ts-amber); }

      /* Hero */
      .ts-cp-hero {
        min-height: 55vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding-bottom: 60px;
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
        font-size: clamp(100px, 22vw, 360px);
        line-height: 1;
        color: rgba(255,193,7,0.04);
        letter-spacing: -0.02em;
        pointer-events: none;
        user-select: none;
        z-index: 0;
      }
      .ts-cp-hero-inner {
        position: relative;
        z-index: 2;
        padding-top: 120px;
      }
      .ts-cp-meta {
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

      /* Content grid */
      .ts-cp-content-grid {
        display: grid;
        grid-template-columns: 1fr 380px;
        gap: 80px;
        align-items: start;
      }
      .ts-cp-main {
        display: flex;
        flex-direction: column;
        gap: 48px;
      }

      .ts-cp-image {
        aspect-ratio: 16/9;
        overflow: hidden;
        background: var(--ts-bg-2);
      }
      .ts-cp-image img {
        width: 100%; height: 100%;
        object-fit: cover;
        filter: grayscale(15%);
      }

      .ts-cp-tagline {
        font-size: 16px !important;
        line-height: 1.8 !important;
        color: var(--ts-text-muted) !important;
        padding-bottom: 48px;
        border-bottom: 1px solid var(--ts-border);
      }

      .ts-cp-practice-note {
        background: var(--ts-bg-1);
        border: 1px solid var(--ts-border);
        padding: 32px;
      }
      .ts-cp-format-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
        padding-left: 20px;
        border-left: 2px solid var(--ts-amber);
      }
      .ts-cp-format-list li {
        font-family: var(--ts-font-mono);
        font-size: 13px;
        color: var(--ts-text-muted);
      }

      .ts-cp-section-block {
        display: flex;
        flex-direction: column;
        gap: 0;
      }
      .ts-cp-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .ts-cp-list-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
      }
      .ts-cp-list-arrow {
        font-family: var(--ts-font-mono);
        font-size: 13px;
        color: var(--ts-amber);
        flex-shrink: 0;
        margin-top: 1px;
      }
      .ts-cp-list-item .ts-body {
        font-size: 14px !important;
      }

      .ts-cp-location {
        padding-top: 24px;
        border-top: 1px solid var(--ts-border);
      }

      /* Aside */
      .ts-cp-aside {
        position: sticky;
        top: 96px;
      }
      .ts-cp-aside-inner {
        background: var(--ts-bg-1);
        border: 1px solid var(--ts-border);
        padding: 40px;
      }
      .ts-cp-price-block {
        display: flex;
        flex-direction: column;
      }

      /* Prose (CMS content) */
      .ts-cp-prose {
        font-family: var(--ts-font-mono);
        font-size: 14px;
        line-height: 1.85;
        color: var(--ts-text-muted);
      }
      .ts-cp-prose h2, .ts-cp-prose h3 {
        font-family: var(--ts-font-display);
        color: var(--ts-text);
        margin: 32px 0 16px;
      }
      .ts-cp-prose h2 { font-size: clamp(28px, 4vw, 40px); }
      .ts-cp-prose h3 { font-size: clamp(22px, 3vw, 30px); }
      .ts-cp-prose p { margin-bottom: 16px; }
      .ts-cp-prose ul { padding-left: 20px; margin-bottom: 16px; }
      .ts-cp-prose li { margin-bottom: 8px; }
      .ts-cp-prose strong { color: var(--ts-text); font-weight: 700; }

      .ts-cp-includes {
        background: var(--ts-bg-1);
        border: 1px solid var(--ts-border);
        padding: 32px;
        display: flex;
        flex-direction: column;
      }

      /* Responsive */
      @media (max-width: 1024px) {
        .ts-cp-content-grid { grid-template-columns: 1fr; gap: 48px; }
        .ts-cp-aside { position: static; }
      }
      @media (max-width: 640px) {
        .ts-cp-meta { gap: 20px; }
        .ts-meta-item { border-right: none; padding: 0; margin: 0; }
      }
    `}</style>
  );
}