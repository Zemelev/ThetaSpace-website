import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Про нас',
  description: 'Theta Space — школа життя та живого спілкування. Засновники: Роман Кхан та Лада Чудненко. Гончара 15/3, поруч із Софійським собором, Київ.',
};

const VALUES = [
  {
    num: '01',
    title: 'Живий контакт',
    desc: 'Ми працюємо з контактом як ключовою силою змін — із собою, з іншими та з реальністю тут і тепер.',
  },
  {
    num: '02',
    title: 'Апгрейд людини',
    desc: 'Особистість оновлюється як система: мислення, емоції, увага, комунікація, дія.',
  },
  {
    num: '03',
    title: 'Не теорія — практика',
    desc: 'Нас цікавить живий досвід і практичні інструменти, які дозволяють діяти точно, етично й усвідомлено.',
  },
  {
    num: '04',
    title: 'Спільнота',
    desc: 'Theta Space об\'єднує людей дії: психологів, підприємців, практиків, лідерів.',
  },
];

const PRODUCTS = [
  { title: 'Клуб живого спілкування', desc: 'Щоденні зустрічі 5 днів на тиждень', href: '/club' },
  { title: 'Відкриті лекції', desc: 'Про базові закони виживання на цій планеті', href: '/lectures' },
  { title: 'Self Upgrade Space', desc: 'Навчальні курси по базовій підготовці до життя', href: '/courses' },
  { title: 'ProLab', desc: 'Лабораторія навичок нового покоління', href: '/courses' },
  { title: 'Семінари', desc: '2 дні заглибленої роботи з тижневим супроводом', href: '/courses' },
];

export default function AboutPage() {
  return (
    <main className="ts-about-page">

      {/* ── Hero ── */}
      <section className="ts-ap-hero ts-noise">
        <div className="ts-ap-bg-word" aria-hidden="true">THETA</div>
        <div className="ts-wrap ts-ap-hero-inner">
          <span className="ts-label">— Про нас</span>
          <h1 className="ts-d-xl" style={{ marginTop: 16 }}>
            Школа<br />живого<br />спілкування
          </h1>
          <div className="ts-ap-meta">
            <div className="ts-meta-item">
              <span className="ts-meta-label">Заснована</span>
              <span className="ts-meta-val">2024</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-label">Місто</span>
              <span className="ts-meta-val">Київ</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-label">Адреса</span>
              <span className="ts-meta-val">Гончара 15/3</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="ts-marquee" aria-hidden="true">
        <div className="ts-marquee-track">
          {Array(2).fill([
            'Theta Space', 'Школа живого спілкування',
            'Роман Кхан', 'Лада Чудненко',
            'Гончара 15/3', 'Київ', 'Self Upgrade',
          ]).flat().map((item, i) => (
            <span key={i} className="ts-marquee-item">
              {item}<span className="ts-marquee-sep"> · </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Mission ── */}
      <section className="ts-section ts-ap-mission-section">
        <div className="ts-wrap">
          <div className="ts-ap-mission-grid">
            <div>
              <span className="ts-label">— Місія</span>
              <h2 className="ts-d-lg" style={{ marginTop: 16 }}>
                Спільнота<br />здібних людей,<br />
                які стають<br />
                <span style={{ color: 'var(--ts-amber)' }}>ще здібнішими</span>
              </h2>
            </div>
            <div className="ts-ap-mission-text">
              <p className="ts-body" style={{ marginBottom: 24 }}>
                Theta Space — це простір живого спілкування, розвитку та апгрейду людини.
                Ми працюємо з контактом як ключовою силою змін — із собою, з іншими та з реальністю.
              </p>
              <p className="ts-body" style={{ marginBottom: 24 }}>
                Ми створюємо середовище, де особистість оновлюється як система:
                мислення, емоції, увага, комунікація, дія.
              </p>
              <p className="ts-body">
                Не «навчаємо», а допомагаємо відновлювати ясність, гнучкість і здатність
                бути причиною у власному житті.
              </p>
              <div className="ts-ap-mission-actions">
                <Link href="/#club-form" className="ts-btn ts-btn-primary">
                  Приєднатися
                </Link>
                <Link href="/club" className="ts-btn ts-btn-outline">
                  Про клуб →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="ts-divider" />

      {/* ── Location ── */}
      <section className="ts-section">
        <div className="ts-wrap">
          <div className="ts-ap-location-grid">
            <div>
              <span className="ts-label">— Простір</span>
              <h2 className="ts-d-md" style={{ marginTop: 16 }}>
                Гончара 15/3
              </h2>
              <p className="ts-label-gold" style={{ marginTop: 12, fontSize: '11px' }}>
                Поруч із Софійським собором · Київ
              </p>
            </div>
            <div className="ts-ap-location-text">
              <p className="ts-body" style={{ marginBottom: 20 }}>
                Жива точка присутності, розташована в історичному та сакральному центрі столиці —
                у місці, де час відчувається інакше, а сенси накопичуються століттями.
              </p>
              <p className="ts-body">
                Це локація, в якій є глибина. Тут немає випадкових стін і порожніх розмов.
                Сам простір працює як каталізатор: він запрошує людину зупинитися, видихнути
                й знову увійти в контакт — із собою, з іншими, з реальністю тут і тепер.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="ts-divider" />

      {/* ── Values ── */}
      <section className="ts-section ts-ap-values-section">
        <div className="ts-wrap">
          <div className="ts-section-head">
            <div>
              <span className="ts-label">— Цінності</span>
              <h2 className="ts-d-md" style={{ marginTop: 12 }}>Що нас<br />рухає</h2>
            </div>
          </div>
          <div className="ts-ap-values-grid">
            {VALUES.map(({ num, title, desc }) => (
              <div key={num} className="ts-ap-value-card ts-card">
                <div className="ts-card-body">
                  <span className="ts-ap-value-num">{num}</span>
                  <h3 className="ts-d-sm" style={{ marginTop: 12 }}>{title}</h3>
                  <p className="ts-body" style={{ marginTop: 12 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="ts-divider" />

      {/* ── Founders ── */}
      <section className="ts-section ts-ap-founders-section">
        <div className="ts-wrap">
          <div className="ts-section-head">
            <div>
              <span className="ts-label">— Засновники</span>
              <h2 className="ts-d-md" style={{ marginTop: 12 }}>
                Роман Кхан<br />&amp; Лада Чудненко
              </h2>
            </div>
            <Link href="/mentors" className="ts-btn ts-btn-outline">
              Вся команда →
            </Link>
          </div>

          <div className="ts-ap-founders-grid">
            {[
              { name: 'Роман Кхан', role: 'Засновник' },
              { name: 'Лада Чудненко', role: 'Засновниця' },
            ].map(f => (
              <div key={f.name} className="ts-ap-founder ts-card">
                <div className="ts-ap-founder-photo">
                  <span className="ts-ap-founder-initial">
                    {f.name.charAt(0)}
                  </span>
                </div>
                <div className="ts-card-body">
                  <span className="ts-label" style={{ marginBottom: 8 }}>— {f.role}</span>
                  <h3 className="ts-d-sm">{f.name}</h3>
                  <p className="ts-body" style={{ marginTop: 12 }}>
                    Їх об'єднує глибокий інтерес до розвитку людини, культури живого контакту
                    та створення просторів, де можна бути справжнім.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="ts-divider" />

      {/* ── Products ── */}
      <section className="ts-section">
        <div className="ts-wrap">
          <div className="ts-section-head">
            <div>
              <span className="ts-label">— Напрямки</span>
              <h2 className="ts-d-md" style={{ marginTop: 12 }}>
                Що є<br />в Theta Space
              </h2>
            </div>
          </div>
          <div className="ts-ap-products">
            {PRODUCTS.map(({ title, desc, href }) => (
              <Link key={title} href={href} className="ts-ap-product-row">
                <div>
                  <h3 className="ts-d-sm">{title}</h3>
                  <p className="ts-body" style={{ marginTop: 4 }}>{desc}</p>
                </div>
                <span className="ts-ap-product-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="ts-section-sm ts-ap-final-cta ts-noise">
        <div className="ts-wrap ts-ap-final-cta-inner">
          <div>
            <span className="ts-label">— Почати</span>
            <h2 className="ts-d-lg" style={{ marginTop: 16 }}>
              Приходьте<br />і будьте<br />
              <span style={{ color: 'var(--ts-amber)' }}>собою</span>
            </h2>
          </div>
          <div className="ts-ap-final-actions">
            <Link href="/#club-form" className="ts-btn ts-btn-primary">
              Записатися до клубу
            </Link>
            <Link href="/lectures" className="ts-btn ts-btn-outline">
              Найближча лекція →
            </Link>
            <a
              href="https://www.instagram.com/theta_space_club"
              target="_blank" rel="noopener noreferrer"
              className="ts-btn ts-btn-outline"
            >
              Instagram ↗
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .ts-about-page { background: var(--ts-bg); }

        /* Hero */
        .ts-ap-hero {
          min-height: 70vh;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding-bottom: 64px; overflow: hidden; position: relative;
        }
        .ts-ap-bg-word {
          position: absolute; top: 50%; left: var(--ts-gutter);
          transform: translateY(-54%);
          font-family: var(--ts-font-display);
          font-size: clamp(140px, 30vw, 480px); line-height: 1;
          color: rgba(255,193,7,0.04); pointer-events: none; user-select: none; z-index: 0;
        }
        .ts-ap-hero-inner { position: relative; z-index: 2; padding-top: 120px; }
        .ts-ap-meta {
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
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--ts-text-faint);
        }
        .ts-meta-val {
          font-family: var(--ts-font-mono); font-size: 14px;
          font-weight: 700; color: var(--ts-text);
        }
        .ts-label-gold {
          font-family: var(--ts-font-mono); font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--ts-amber); display: block;
        }

        /* Mission */
        .ts-ap-mission-section { background: var(--ts-bg); }
        .ts-ap-mission-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: start;
        }
        .ts-ap-mission-text { }
        .ts-ap-mission-actions {
          display: flex; flex-wrap: wrap; gap: 12px; margin-top: 36px;
        }

        /* Location */
        .ts-ap-location-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: start;
        }

        /* Values */
        .ts-ap-values-section { background: var(--ts-bg-1); }
        .ts-ap-values-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px;
        }
        .ts-ap-value-num {
          font-family: var(--ts-font-display);
          font-size: 48px; color: rgba(255,193,7,0.15); line-height: 1;
          display: block;
        }

        /* Founders */
        .ts-ap-founders-section { background: var(--ts-bg); }
        .ts-ap-founders-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px;
        }
        .ts-ap-founder { display: flex; flex-direction: column; }
        .ts-ap-founder-photo {
          aspect-ratio: 3/2; background: var(--ts-bg-2);
          display: flex; align-items: center; justify-content: center;
          border-bottom: 1px solid var(--ts-border);
        }
        .ts-ap-founder-initial {
          font-family: var(--ts-font-display);
          font-size: clamp(80px, 14vw, 160px);
          color: rgba(255,193,7,0.08); user-select: none;
        }

        /* Products list */
        .ts-ap-products { display: flex; flex-direction: column; }
        .ts-ap-product-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px; padding: 24px 0;
          border-bottom: 1px solid var(--ts-border);
          transition: color var(--ts-dur);
        }
        .ts-ap-product-row:first-child { border-top: 1px solid var(--ts-border); }
        .ts-ap-product-row:hover .ts-d-sm { color: var(--ts-amber); }
        .ts-ap-product-arrow {
          font-family: var(--ts-font-mono); font-size: 20px;
          color: var(--ts-text-faint); flex-shrink: 0;
          transition: color var(--ts-dur), transform var(--ts-dur);
        }
        .ts-ap-product-row:hover .ts-ap-product-arrow {
          color: var(--ts-amber); transform: translateX(4px);
        }

        /* Final CTA */
        .ts-ap-final-cta { background: var(--ts-bg-1); border-top: 1px solid var(--ts-border); }
        .ts-ap-final-cta-inner {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 60px;
        }
        .ts-ap-final-actions {
          display: flex; flex-direction: column; gap: 10px;
          min-width: 260px; flex-shrink: 0;
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .ts-ap-values-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .ts-ap-mission-grid { grid-template-columns: 1fr; gap: 48px; }
          .ts-ap-location-grid { grid-template-columns: 1fr; gap: 40px; }
          .ts-ap-final-cta-inner { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 768px) {
          .ts-ap-founders-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .ts-ap-values-grid { grid-template-columns: 1fr; }
          .ts-ap-meta { gap: 20px; }
          .ts-meta-item { border-right: none; padding: 0; margin: 0; }
        }
      `}</style>
    </main>
  );
}