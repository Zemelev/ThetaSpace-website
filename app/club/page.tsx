import ContactForm from '@/components/forms/ContactForm';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Клуб живого спілкування',
  description: 'Щоденні зустрічі 5 днів на тиждень. Відпрацювання формули спілкування під керівництвом супервізора. Безкоштовний перший візит. Гончара 15/3, Київ.',
};

const SCHEDULE = [
  { day: 'Понеділок', time: '14:00 — 20:00' },
  { day: 'Вівторок',  time: '14:00 — 20:00' },
  { day: 'Середа',    time: '14:00 — 20:00' },
  { day: 'Четвер',    time: '14:00 — 20:00' },
  { day: "П'ятниця",  time: '14:00 — 20:00', note: '+ лекція після клубу' },
];

const WHY = [
  { label: 'Практика',    desc: 'Відпрацювання формули спілкування у парах під керівництвом супервізора' },
  { label: 'Безпека',     desc: 'Простір без осуду та критики — тільки підтримка та чесний зворотній зв\'язок' },
  { label: 'Спільнота',   desc: 'Люди дії: психологи, підприємці, практики, лідери — всі шукають справжній контакт' },
  { label: 'Результат',   desc: 'Ясність у стосунках, точність у діях, впевненість у собі' },
];

export default function ClubPage() {
  return (
    <main className="ts-club-page">

      {/* ── Hero ── */}
      <section className="ts-clp-hero ts-noise">
        <div className="ts-clp-bg-word" aria-hidden="true">КЛУБ</div>
        <div className="ts-wrap ts-clp-hero-inner">
          <span className="ts-label">— Theta Space</span>
          <h1 className="ts-d-xl" style={{ marginTop: 16 }}>
            Клуб живого<br />спілкування
          </h1>
          <div className="ts-clp-meta">
            <div className="ts-meta-item">
              <span className="ts-meta-label">Днів на тиждень</span>
              <span className="ts-meta-val">5</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-label">Час</span>
              <span className="ts-meta-val">14:00 — 20:00</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-label">Вартість</span>
              <span className="ts-meta-val">750 грн</span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-label">Перший візит</span>
              <span className="ts-meta-val" style={{ color: 'var(--ts-amber)' }}>Безкоштовно</span>
            </div>
          </div>
          <div className="ts-clp-hero-actions">
            <Link href="#club-form" className="ts-btn ts-btn-primary">
              Записатися
            </Link>
            <span className="ts-location">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              вул. Гончара 15/3, Київ
            </span>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="ts-marquee" aria-hidden="true">
        <div className="ts-marquee-track">
          {Array(2).fill([
            'Живе спілкування', '5 днів на тиждень', 'Супервізор',
            'Безкоштовний перший візит', 'Гончара 15/3', 'Київ', '750 грн',
          ]).flat().map((item, i) => (
            <span key={i} className="ts-marquee-item">
              {item}<span className="ts-marquee-sep"> · </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Why section ── */}
      <section className="ts-section">
        <div className="ts-wrap">
          <div className="ts-section-head">
            <div>
              <span className="ts-label">— Чому варто прийти</span>
              <h2 className="ts-d-md" style={{ marginTop: 12 }}>
                Що дає<br />клуб
              </h2>
            </div>
            <p className="ts-body" style={{ maxWidth: 380 }}>
              Щоденні зустрічі у теплій атмосфері.
              Без оцінок, без критики — тільки підтримка та практика.
            </p>
          </div>

          <div className="ts-clp-why-grid">
            {WHY.map((item, i) => (
              <div key={i} className="ts-clp-why-card ts-card">
                <div className="ts-card-body">
                  <span className="ts-label" style={{ marginBottom: 16 }}>— {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="ts-d-sm">{item.label}</h3>
                  <p className="ts-body" style={{ marginTop: 12 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="ts-divider" />

      {/* ── Schedule + Form ── */}
      <section className="ts-section">
        <div className="ts-wrap ts-clp-main-grid">

          {/* Schedule */}
          <div className="ts-clp-schedule-block">
            <span className="ts-label">— Розклад зустрічей</span>
            <h2 className="ts-d-md" style={{ marginTop: 16, marginBottom: 40 }}>
              Щодня<br />о 14:00
            </h2>

            <div className="ts-clp-schedule">
              {SCHEDULE.map(({ day, time, note }) => (
                <div key={day} className="ts-clp-schedule-row">
                  <span className="ts-clp-day">{day}</span>
                  <span className="ts-clp-time">{time}</span>
                  {note && <span className="ts-clp-note">{note}</span>}
                </div>
              ))}
            </div>

            <div className="ts-clp-price-block">
              <span className="ts-label">— Вартість</span>
              <span className="ts-price" style={{ display: 'block', marginTop: 12, fontSize: 'clamp(40px, 6vw, 72px)' }}>
                750 грн
              </span>
              <span className="ts-body-sm" style={{ marginTop: 6, display: 'block' }}>
                за одне заняття
              </span>
              <div className="ts-clp-free-badge">
                <span className="ts-tag">Перший візит безкоштовно</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div id="club-form" className="ts-clp-form-block">
            <div className="ts-clp-form-inner">
              <span className="ts-label">— Реєстрація</span>
              <h2 className="ts-d-md" style={{ marginTop: 16, marginBottom: 36 }}>
                Записатися<br />до клубу
              </h2>
              <ContactForm type="club" source="club_page" />
            </div>
          </div>

        </div>
      </section>

      <hr className="ts-divider" />

      {/* ── Location ── */}
      <section className="ts-section-sm ts-clp-location-section">
        <div className="ts-wrap ts-clp-location-inner">
          <div>
            <span className="ts-label">— Де знайти нас</span>
            <h2 className="ts-d-md" style={{ marginTop: 12 }}>
              Гончара 15/3<br />
              <span style={{ color: 'var(--ts-text-muted)', fontSize: '0.6em' }}>
                Поруч із Софійським собором
              </span>
            </h2>
            <p className="ts-body" style={{ marginTop: 20, maxWidth: 420 }}>
              Простір розташований в історичному та сакральному центрі столиці —
              місці, де час відчувається інакше, а сенси накопичуються століттями.
            </p>
          </div>
          <div className="ts-clp-location-details">
            <div className="ts-clp-location-card ts-card">
              <div className="ts-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: '📍', label: 'Адреса', value: 'вул. Гончара 15/3, Київ' },
                  { icon: '🕐', label: 'Пн–Пт', value: '14:00 — 20:00' },
                  { icon: '🚇', label: 'Метро', value: 'Золоті Ворота' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="ts-clp-loc-row">
                    <span className="ts-clp-loc-icon">{icon}</span>
                    <div>
                      <span className="ts-meta-label">{label}</span>
                      <span className="ts-meta-val" style={{ display: 'block', marginTop: 2 }}>{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .ts-club-page { background: var(--ts-bg); }

        /* Hero */
        .ts-clp-hero {
          min-height: 60vh;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding-bottom: 64px;
          overflow: hidden; position: relative;
        }
        .ts-clp-bg-word {
          position: absolute; top: 50%; left: var(--ts-gutter);
          transform: translateY(-54%);
          font-family: var(--ts-font-display);
          font-size: clamp(100px, 22vw, 360px);
          line-height: 1; color: rgba(255,193,7,0.04);
          pointer-events: none; user-select: none; z-index: 0;
        }
        .ts-clp-hero-inner { position: relative; z-index: 2; padding-top: 120px; }
        .ts-clp-meta {
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
        .ts-clp-hero-actions {
          display: flex; align-items: center; flex-wrap: wrap;
          gap: 20px; margin-top: 36px;
        }

        /* Why grid */
        .ts-clp-why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
        }
        .ts-clp-why-card { height: 100%; }

        /* Main grid */
        .ts-clp-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        /* Schedule */
        .ts-clp-schedule {
          display: flex; flex-direction: column;
          border: 1px solid var(--ts-border);
          margin-bottom: 48px;
        }
        .ts-clp-schedule-row {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid var(--ts-border);
          gap: 16px;
        }
        .ts-clp-schedule-row:last-child { border-bottom: none; }
        .ts-clp-day {
          font-family: var(--ts-font-mono);
          font-size: 13px; font-weight: 700;
          color: var(--ts-text); min-width: 120px;
        }
        .ts-clp-time {
          font-family: var(--ts-font-mono);
          font-size: 13px; color: var(--ts-text-muted);
          flex: 1;
        }
        .ts-clp-note {
          font-family: var(--ts-font-mono);
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--ts-amber);
          border: 1px solid var(--ts-border-warm);
          padding: 4px 10px;
          flex-shrink: 0;
        }
        .ts-clp-price-block {
          display: flex; flex-direction: column;
          padding-top: 32px; border-top: 1px solid var(--ts-border);
        }
        .ts-clp-free-badge { margin-top: 16px; }

        /* Form block */
        .ts-clp-form-block { }
        .ts-clp-form-inner {
          background: var(--ts-bg-1);
          border: 1px solid var(--ts-border);
          padding: 40px;
        }

        /* Location */
        .ts-clp-location-section { background: var(--ts-bg-1); border-top: 1px solid var(--ts-border); }
        .ts-clp-location-inner {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 80px; align-items: start;
        }
        .ts-clp-location-details { }
        .ts-clp-loc-row {
          display: flex; align-items: flex-start; gap: 16px;
        }
        .ts-clp-loc-icon { font-size: 18px; flex-shrink: 0; margin-top: 2px; }

        /* Responsive */
        @media (max-width: 1100px) {
          .ts-clp-why-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .ts-clp-main-grid { grid-template-columns: 1fr; gap: 48px; }
          .ts-clp-location-inner { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 640px) {
          .ts-clp-why-grid { grid-template-columns: 1fr; }
          .ts-clp-meta { gap: 20px; }
          .ts-meta-item { border-right: none; padding: 0; margin: 0; }
        }
      `}</style>
    </main>
  );
}