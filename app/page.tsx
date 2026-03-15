import ContactForm from '@/components/forms/ContactForm';
import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_LATEST_LECTURE } from '@/lib/queries';
import { formatDate } from '@/utils/dateUtils';
import { LecturesResponse } from '@/types';
import Link from 'next/link';
import JsonLd from '../components/JsonLd';

export default async function Home() {
  let latestLecture: LecturesResponse['lectures']['nodes'][0] | null = null;

  try {
    const data = await fetchGraphQL<LecturesResponse>(GET_LATEST_LECTURE);
    latestLecture = data?.lectures?.nodes?.[0] || null;
  } catch (error) {
    console.error('Error fetching latest lecture:', error);
  }

  const MARQUEE_ITEMS = [
    'Клуб живого спілкування',
    'Лекції',
    'Курси',
    'Self Upgrade Space',
    'ProLab',
    'Гончара 15/3',
    'Київ',
    'Theta Space',
  ];

  return (
    <>
      <main>

        {/* ══════════════════════════════════════
            HERO — найближча подія
        ══════════════════════════════════════ */}
        <section className="ts-hero ts-noise">
          {/* Великий фоновий текст */}
          <div className="ts-hero-bg-word" aria-hidden="true">THETA</div>

          <div className="ts-wrap ts-hero-inner">
            {/* Верхній рядок */}
            <div className="ts-hero-top">
              <span className="ts-location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                вул. Гончара 15/3 · Київ
              </span>
            </div>

            {/* Заголовок */}
            <div className="ts-hero-label ts-label">— Найближча подія</div>

            <h1 className="ts-hero-title ts-d-xl">
              {latestLecture?.title
                ? latestLecture.title
                : <>Школа<br />Живого<br />Спілкування</>
              }
            </h1>

            {/* Мета */}
            <div className="ts-hero-meta">
              {latestLecture?.lectureDetails?.dateTime && (
                <div className="ts-meta-item">
                  <span className="ts-meta-label">Дата</span>
                  <span className="ts-meta-val">{formatDate(latestLecture.lectureDetails.dateTime)}</span>
                </div>
              )}
              {latestLecture?.lectureDetails?.location && (
                <div className="ts-meta-item">
                  <span className="ts-meta-label">Місце</span>
                  <span className="ts-meta-val">{latestLecture.lectureDetails.location}</span>
                </div>
              )}
              <div className="ts-meta-item">
                <span className="ts-meta-label">Тривалість</span>
                <span className="ts-meta-val">1.5 год</span>
              </div>
              <div className="ts-meta-item">
                <span className="ts-meta-label">Вартість</span>
                <span className="ts-meta-val">від 0$</span>
              </div>
            </div>

            {/* CTA */}
            <div className="ts-hero-actions">
              <Link
                href={latestLecture ? `/lectures/${latestLecture.slug || latestLecture.id}` : '/lectures'}
                className="ts-btn ts-btn-primary"
              >
                Детальніше
              </Link>
              <Link href="#lecture-form" className="ts-btn ts-btn-outline">
                Записатися →
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            MARQUEE
        ══════════════════════════════════════ */}
        <div className="ts-marquee" aria-hidden="true">
          <div className="ts-marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="ts-marquee-item">
                {item}
                <span className="ts-marquee-sep"> · </span>
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            LECTURE FORM
        ══════════════════════════════════════ */}
        <section id="lecture-form" className="ts-form-section ts-section-sm">
          <div className="ts-wrap">
            <div className="ts-form-grid">
              <div className="ts-form-intro">
                <span className="ts-label">— Реєстрація</span>
                <h2 className="ts-d-md" style={{ marginTop: 16 }}>Записатися<br />на лекцію</h2>
                <p className="ts-body" style={{ marginTop: 20, maxWidth: 320 }}>
                  Лекції про базові закони виживання та розвитку. Відкриті для всіх.
                </p>
                <div className="ts-price-tag">
                  <span className="ts-price">від 0$</span>
                  <span className="ts-body-sm" style={{ marginTop: 4 }}>Є безкоштовні формати</span>
                </div>
              </div>
              <div className="ts-form-wrap">
                <ContactForm
                  type="lecture"
                  lectureId={latestLecture?.id || null}
                  source="homepage_lecture"
                />
              </div>
            </div>
          </div>
        </section>

        <hr className="ts-divider" />

        {/* ══════════════════════════════════════
            CLUB — Клуб живого спілкування
        ══════════════════════════════════════ */}
        <section className="ts-section">
          <div className="ts-wrap">
            <div className="ts-two-col">

              {/* Ліва колонка — контент */}
              <div className="ts-col-content">
                <span className="ts-label">— Клуб живого спілкування</span>
                <h2 className="ts-d-lg" style={{ marginTop: 16 }}>
                  Простір<br />для щирих<br />розмов
                </h2>
                <p className="ts-body" style={{ marginTop: 24, maxWidth: 400 }}>
                  Відпрацювання у парах формули спілкування під керівництвом супервізора.
                  Щоденні зустрічі у теплій атмосфері — без оцінок, без критики.
                </p>

                <ul className="ts-feature-list">
                  <li>5 днів на тиждень</li>
                  <li>Професійні супервізори</li>
                  <li>Безкоштовний перший візит</li>
                  <li>1 день · 750 грн</li>
                </ul>

                <div className="ts-actions">
                  <Link href="/club" className="ts-btn ts-btn-primary">Про клуб</Link>
                  <Link href="#club-form" className="ts-btn ts-btn-outline">Записатися</Link>
                </div>
              </div>

              {/* Права колонка — зображення */}
              <div className="ts-col-media">
                <div className="ts-media-frame">
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80"
                    alt="Клуб живого спілкування Theta Space"
                  />
                  <div className="ts-media-badge">
                    <span className="ts-tag">Щодня · Київ</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CLUB FORM
        ══════════════════════════════════════ */}
        <section id="club-form" className="ts-form-section ts-section-sm">
          <div className="ts-wrap">
            <div className="ts-form-grid">
              <div className="ts-form-intro">
                <span className="ts-label">— Реєстрація</span>
                <h2 className="ts-d-md" style={{ marginTop: 16 }}>Вступити<br />до клубу</h2>
                <p className="ts-body" style={{ marginTop: 20, maxWidth: 320 }}>
                  Перший візит безкоштовний. Приходьте і відчуйте атмосферу живого спілкування.
                </p>
                <div className="ts-price-tag">
                  <span className="ts-price">750 грн</span>
                  <span className="ts-body-sm" style={{ marginTop: 4 }}>за одне заняття</span>
                </div>
              </div>
              <div className="ts-form-wrap">
                <ContactForm type="club" source="homepage_club" />
              </div>
            </div>
          </div>
        </section>

        <hr className="ts-divider" />

        {/* ══════════════════════════════════════
            MISSION QUOTE — цитата-місія
        ══════════════════════════════════════ */}
        <section className="ts-mission ts-noise">
          <div className="ts-wrap">
            <div className="ts-mission-inner">
              <span className="ts-label" style={{ marginBottom: 32 }}>— Наша місія</span>
              <blockquote className="ts-mission-quote ts-d-lg">
                Спільнота здібних людей,<br />
                які стають ще<br />
                <span style={{ color: 'var(--ts-amber)' }}>здібнішими</span>
              </blockquote>
              <p className="ts-body ts-mission-sub">
                Theta Space — це простір живого спілкування, розвитку та апгрейду людини.
                Ми працюємо з контактом як ключовою силою змін — із собою, з іншими та з реальністю.
              </p>
              <div className="ts-founders">
                <span className="ts-body-sm">Засновники</span>
                <span className="ts-founders-names ts-d-sm">
                  Роман Кхан & Лада Чудненко
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PRODUCTS — всі напрямки
        ══════════════════════════════════════ */}
        <section className="ts-section">
          <div className="ts-wrap">
            <div className="ts-section-head">
              <div>
                <span className="ts-label">— Напрямки</span>
                <h2 className="ts-d-md" style={{ marginTop: 12 }}>
                  Що ми<br />пропонуємо
                </h2>
              </div>
              <Link href="/courses" className="ts-btn ts-btn-outline">
                Всі продукти →
              </Link>
            </div>

            <div className="ts-products-grid">

              <div className="ts-product-card">
                <span className="ts-label">— Клуб</span>
                <h3 className="ts-d-sm" style={{ marginTop: 8 }}>Клуб живого спілкування</h3>
                <p className="ts-body" style={{ marginTop: 12, flex: 1 }}>
                  Відпрацювання у парах під керівництвом супервізора.
                </p>
                <div style={{ marginTop: 24 }}>
                  <span className="ts-price">750 грн</span>
                  <span className="ts-body-sm" style={{ display: 'block', marginTop: 4 }}>1 заняття</span>
                </div>
                <Link href="/club" className="ts-btn ts-btn-outline" style={{ marginTop: 20, display: 'block', textAlign: 'center' }}>
                  Детальніше
                </Link>
              </div>

              <div className="ts-product-card">
                <span className="ts-label">— Лекції</span>
                <h3 className="ts-d-sm" style={{ marginTop: 8 }}>Відкриті лекції</h3>
                <p className="ts-body" style={{ marginTop: 12, flex: 1 }}>
                  Про базові закони виживання на цій планеті. 1.5 год.
                </p>
                <div style={{ marginTop: 24 }}>
                  <span className="ts-price">від 0$</span>
                  <span className="ts-body-sm" style={{ display: 'block', marginTop: 4 }}>до 30$ за лекцію</span>
                </div>
                <Link href="/lectures" className="ts-btn ts-btn-outline" style={{ marginTop: 20, display: 'block', textAlign: 'center' }}>
                  Детальніше
                </Link>
              </div>

              <div className="ts-product-card">
                <span className="ts-label">— Семінари</span>
                <h3 className="ts-d-sm" style={{ marginTop: 8 }}>Семінари</h3>
                <p className="ts-body" style={{ marginTop: 12, flex: 1 }}>
                  Діанетичний, емоції, етичні стани. 2 дні + тижневий супровід.
                </p>
                <div style={{ marginTop: 24 }}>
                  <span className="ts-price">200$</span>
                  <span className="ts-body-sm" style={{ display: 'block', marginTop: 4 }}>2 дні роботи</span>
                </div>
                <Link href="/courses" className="ts-btn ts-btn-outline" style={{ marginTop: 20, display: 'block', textAlign: 'center' }}>
                  Детальніше
                </Link>
              </div>

              <div className="ts-product-card ts-product-card--accent">
                <span className="ts-label">— Self Upgrade</span>
                <h3 className="ts-d-sm" style={{ marginTop: 8 }}>Self Upgrade Space</h3>
                <p className="ts-body" style={{ marginTop: 12, flex: 1 }}>
                  Навчальні курси по базовій підготовці до життя: ППС, ГЦО, як обирати своїх людей.
                </p>
                <div style={{ marginTop: 24 }}>
                  <span className="ts-price">200$</span>
                  <span className="ts-body-sm" style={{ display: 'block', marginTop: 4 }}>повний курс</span>
                </div>
                <Link href="/courses" className="ts-btn ts-btn-primary" style={{ marginTop: 20, display: 'block', textAlign: 'center' }}>
                  Детальніше
                </Link>
              </div>

              <div className="ts-product-card">
                <span className="ts-label">— ProLab</span>
                <h3 className="ts-d-sm" style={{ marginTop: 8 }}>ProLab</h3>
                <p className="ts-body" style={{ marginTop: 12, flex: 1 }}>
                  Лабораторія навичок нового покоління: увага, емоційна архітектура, гнучке лідерство.
                </p>
                <div style={{ marginTop: 24 }}>
                  <span className="ts-price">від 500$</span>
                  <span className="ts-body-sm" style={{ display: 'block', marginTop: 4 }}>сесія зі спеціалістом</span>
                </div>
                <Link href="/courses" className="ts-btn ts-btn-outline" style={{ marginTop: 20, display: 'block', textAlign: 'center' }}>
                  Детальніше
                </Link>
              </div>

            </div>
          </div>
        </section>

        <hr className="ts-divider" />

        {/* ══════════════════════════════════════
            MENTORS
        ══════════════════════════════════════ */}
        <section className="ts-section">
          <div className="ts-wrap">
            <div className="ts-section-head">
              <div>
                <span className="ts-label">— Команда</span>
                <h2 className="ts-d-md" style={{ marginTop: 12 }}>Досвідчені<br />Супервізори</h2>
              </div>
              <Link href="/mentors" className="ts-btn ts-btn-outline">
                Всі ментори →
              </Link>
            </div>
            <div className="ts-mentors-grid">
              {[1, 2, 3].map(n => (
                <div key={n} className="ts-mentor-card">
                  <div className="ts-mentor-photo" />
                  <div className="ts-mentor-info">
                    <span className="ts-label" style={{ marginBottom: 6 }}>— Супервізор</span>
                    <p className="ts-d-sm">Ментор {n}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            INSTAGRAM
        ══════════════════════════════════════ */}
        <section className="ts-ig ts-section-sm">
          <div className="ts-wrap ts-ig-inner">
            <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--ts-amber)', marginBottom: 20 }}>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <h2 className="ts-d-md">@theta_space_ua</h2>
            <p className="ts-body" style={{ marginTop: 16, maxWidth: 440 }}>
              Анонси подій, фото зі зустрічей та поради від менторів
            </p>
            <a
              href="https://www.instagram.com/theta_space_club?igsh=MWl2MGJudG00ZXZqNg=="
              target="_blank"
              rel="noopener noreferrer"
              className="ts-btn ts-btn-primary"
              style={{ marginTop: 32, display: 'inline-block' }}
            >
              Підписатися
            </a>
          </div>
        </section>

      </main>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="ts-footer">
        <div className="ts-wrap">
          <div className="ts-footer-grid">

            <div className="ts-footer-brand">
              <Link href="/" className="ts-logo ts-footer-logo" aria-label="ThetaSpace">
                <span className="ts-logo-text">
                  <span>THETA</span>
                  <span>SPACE</span>
                </span>
              </Link>
              <p className="ts-body-sm" style={{ marginTop: 16, maxWidth: 220 }}>
                Школа життя та живого спілкування. Гончара 15/3, Київ.
              </p>
            </div>

            <div>
              <p className="ts-footer-heading">Навігація</p>
              <ul className="ts-footer-links">
                <li><Link href="/club">Клуб</Link></li>
                <li><Link href="/lectures">Лекції</Link></li>
                <li><Link href="/courses">Курси</Link></li>
                <li><Link href="/mentors">Ментори</Link></li>
                <li><Link href="/about">Про нас</Link></li>
              </ul>
            </div>

            <div>
              <p className="ts-footer-heading">Напрямки</p>
              <ul className="ts-footer-links">
                <li><Link href="/courses">Self Upgrade Space</Link></li>
                <li><Link href="/courses">ProLab</Link></li>
                <li><Link href="/courses">Семінари</Link></li>
              </ul>
            </div>

            <div>
              <p className="ts-footer-heading">Контакти</p>
              <ul className="ts-footer-links">
                <li>
                  <a href="https://www.instagram.com/theta_space_club" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="mailto:info@theta-space.org">info@theta-space.org</a>
                </li>
                <li>вул. Гончара 15/3, Київ</li>
              </ul>
            </div>

          </div>

          <div className="ts-footer-bottom">
            <span>© {new Date().getFullYear()} Theta Space. Всі права захищені</span>
            <span className="ts-footer-location">
              KYIV · UA · 50°27′N 30°31′E
            </span>
          </div>
        </div>
      </footer>

      <style>{`
        /* ── Hero ── */
        .ts-hero {
          min-height: 100svh;
          background: var(--ts-bg);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding-bottom: 64px;
          overflow: hidden;
        }
        .ts-hero-bg-word {
          position: absolute;
          top: 50%;
          left: var(--ts-gutter);
          transform: translateY(-54%);
          font-family: var(--ts-font-display);
          font-size: clamp(160px, 32vw, 480px);
          line-height: 1;
          color: rgba(255, 193, 7, 0.04);
          letter-spacing: -0.02em;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .ts-hero-inner {
          position: relative;
          z-index: 2;
          padding-top: 100px;
        }
        .ts-hero-top {
          margin-bottom: 32px;
        }
        .ts-hero-label {
          margin-bottom: 20px;
        }
        .ts-hero-title {
          max-width: 1100px;
        }
        .ts-hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid var(--ts-border);
        }
        .ts-meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 0 32px 0 0;
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
        .ts-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 36px;
        }

        /* ── Forms ── */
        .ts-form-section { background: var(--ts-bg-1); }
        .ts-form-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 80px;
          align-items: start;
        }
        .ts-price-tag {
          display: flex;
          flex-direction: column;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--ts-border);
        }

        /* ── Two-column ── */
        .ts-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .ts-feature-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 28px 0 36px;
          padding-left: 20px;
          border-left: 2px solid var(--ts-amber);
        }
        .ts-feature-list li {
          font-family: var(--ts-font-mono);
          font-size: 13px;
          color: var(--ts-text-muted);
        }
        .ts-actions { display: flex; gap: 12px; flex-wrap: wrap; }

        /* Media frame */
        .ts-col-media { position: relative; }
        .ts-media-frame {
          aspect-ratio: 4/5;
          background: var(--ts-bg-2);
          overflow: hidden;
          position: relative;
        }
        .ts-media-frame img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: grayscale(20%);
        }
        .ts-media-badge {
          position: absolute;
          bottom: 20px; right: 20px;
        }

        /* ── Mission ── */
        .ts-mission {
          background: var(--ts-bg-1);
          padding-block: var(--ts-xl);
        }
        .ts-mission-inner {
          max-width: 900px;
        }
        .ts-mission-quote {
          margin-top: 0;
        }
        .ts-mission-sub {
          max-width: 520px;
          margin-top: 32px;
        }
        .ts-founders {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid var(--ts-border);
        }
        .ts-founders-names { color: var(--ts-amber); }

        /* ── Products grid ── */
        .ts-products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        .ts-product-card--accent {
          background: var(--ts-amber-faint);
          border-color: var(--ts-border-warm);
        }

        /* ── Mentors ── */
        .ts-mentors-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        .ts-mentor-card {
          background: var(--ts-bg-1);
          border: 1px solid var(--ts-border);
          overflow: hidden;
        }
        .ts-mentor-photo {
          aspect-ratio: 3/4;
          background: var(--ts-bg-2);
        }
        .ts-mentor-info {
          padding: 20px 24px 24px;
          border-top: 1px solid var(--ts-border);
        }

        /* ── Instagram ── */
        .ts-ig { background: var(--ts-bg); }
        .ts-ig-inner {
          max-width: 600px;
          text-align: center;
          margin-inline: auto;
        }
        .ts-ig-inner svg { margin-inline: auto; }

        /* ── Footer ── */
        .ts-footer {
          background: var(--ts-bg);
          border-top: 1px solid var(--ts-border);
          padding-block: 60px 40px;
        }
        .ts-footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 56px;
          border-bottom: 1px solid var(--ts-border);
          margin-bottom: 32px;
        }
        .ts-footer-logo {
          font-size: 13px !important;
        }
        .ts-footer-heading {
          font-family: var(--ts-font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ts-text-faint);
          margin-bottom: 20px;
        }
        .ts-footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ts-footer-links a, .ts-footer-links li {
          font-family: var(--ts-font-mono);
          font-size: 13px;
          color: var(--ts-text-muted);
          transition: color var(--ts-dur);
        }
        .ts-footer-links a:hover { color: var(--ts-amber); }
        .ts-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--ts-font-mono);
          font-size: 11px;
          color: var(--ts-text-faint);
          letter-spacing: 0.06em;
        }
        .ts-footer-location {
          font-family: var(--ts-font-display);
          font-size: 14px;
          letter-spacing: 0.1em;
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .ts-products-grid { grid-template-columns: repeat(2, 1fr); }
          .ts-footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 900px) {
          .ts-two-col { grid-template-columns: 1fr; gap: 48px; }
          .ts-col-content { order: 1; }
          .ts-col-media { order: 2; }
          .ts-media-frame { aspect-ratio: 16/9; }
          .ts-form-grid { grid-template-columns: 1fr; gap: 40px; }
          .ts-mentors-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .ts-products-grid { grid-template-columns: 1fr; }
          .ts-mentors-grid { grid-template-columns: 1fr; }
          .ts-footer-grid { grid-template-columns: 1fr; }
          .ts-footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
          .ts-hero-meta { gap: 20px; }
          .ts-meta-item { border-right: none; padding: 0; margin: 0; }
        }
      `}</style>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Theta Space",
          "alternateName": "ThetaSpace",
          "url": "https://www.theta-space.org",
          "logo": "https://www.theta-space.org/images/logo.png",
          "description": "Школа життя та живого спілкування. Клуб, лекції, курси, семінари та ProLab.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "вул. Гончара 15/3",
            "addressLocality": "Київ",
            "addressCountry": "UA"
          },
          "founder": [
            { "@type": "Person", "name": "Роман Кхан" },
            { "@type": "Person", "name": "Лада Чудненко" }
          ],
          "foundingDate": "2024",
          "email": "info@theta-space.org",
          "sameAs": [
            "https://www.instagram.com/theta_space_club"
          ]
        }}
      />
    </>
  );
}