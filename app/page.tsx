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
  } catch (e) {
    console.error(e);
  }

  const MARQUEE = ['Клуб', 'Лекції', 'Курси', 'Self Upgrade', 'ProLab', 'Гончара 15/3', 'Київ', 'Theta Space'];

  return (
    <>
      <style>{`

        /* ══════════════════════════════════════
           HEADER override для світлої теми
        ══════════════════════════════════════ */
        .ts-header { background: transparent !important; border-bottom-color: transparent !important; }
        .ts-header--scrolled { background: rgba(245,240,232,0.96) !important; backdrop-filter: blur(12px); border-bottom-color: var(--ts-border) !important; }
        .ts-logo { border-color: var(--ts-amber-deep) !important; }
        .ts-logo-text { color: var(--ts-text) !important; }
        .ts-logo:hover .ts-logo-text { color: var(--ts-amber-deep) !important; }
        .ts-logo:hover { border-color: var(--ts-text) !important; }
        .ts-nav-link { color: var(--ts-text-muted) !important; }
        .ts-nav-link:hover { color: var(--ts-text) !important; }
        .ts-nav-link::after { background: var(--ts-amber-deep) !important; }
        .ts-header-cta { background: var(--ts-text) !important; color: var(--ts-bg) !important; }
        .ts-header-cta:hover { background: var(--ts-amber) !important; color: var(--ts-text) !important; }
        .ts-burger-line { background: var(--ts-text) !important; }
        .ts-mobile-menu { background: var(--ts-bg) !important; border-top-color: var(--ts-border) !important; }
        .ts-mobile-nav-link { color: var(--ts-text-muted) !important; border-bottom-color: var(--ts-border) !important; }
        .ts-mobile-nav-link:hover { color: var(--ts-amber-deep) !important; }
        .ts-mobile-cta { background: var(--ts-text) !important; color: var(--ts-bg) !important; }

        /* ══════════════════════════════════════
           HERO
        ══════════════════════════════════════ */
        .hp-hero {
          min-height: 100svh;
          background: var(--ts-bg);
          display: grid;
          grid-template-rows: 1fr auto;
          padding: 0 var(--ts-gutter);
          padding-top: 88px;
          position: relative;
          overflow: hidden;
        }

        /* Текстура паперу */
        .hp-hero::before {
          content: '';
          position: absolute; inset: 0; z-index: 0;
          background-image:
            radial-gradient(ellipse 90% 70% at 60% 40%, rgba(255,193,7,0.07) 0%, transparent 65%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* Великий фоновий символ θ */
        .hp-theta-bg {
          position: absolute;
          right: -2%;
          top: 50%;
          transform: translateY(-50%);
          font-family: serif;
          font-size: clamp(300px, 55vw, 760px);
          line-height: 1;
          color: rgba(28,26,20,0.04);
          pointer-events: none;
          user-select: none;
          z-index: 0;
          font-weight: 400;
        }

        .hp-hero-content {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          justify-content: center;
          padding: 48px 0 40px;
          max-width: 900px;
        }

        /* Eyebrow */
        .hp-eyebrow {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 32px;
        }
        .hp-eyebrow-line {
          width: 32px; height: 1px;
          background: var(--ts-amber-deep);
        }
        .hp-eyebrow-text {
          font-family: var(--ts-font-mono);
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--ts-amber-deep);
        }

        /* Title */
        .hp-title {
          font-family: var(--ts-font-display);
          font-size: clamp(72px, 12vw, 180px);
          line-height: 0.91;
          color: var(--ts-text);
          margin-bottom: 36px;
        }
        .hp-title-accent { color: var(--ts-amber-deep); }

        /* Subtitle */
        .hp-sub {
          font-family: var(--ts-font-mono);
          font-size: clamp(14px, 1.5vw, 17px);
          line-height: 1.8;
          color: var(--ts-text-muted);
          max-width: 500px;
          margin-bottom: 48px;
        }

        /* Actions */
        .hp-actions {
          display: flex; flex-wrap: wrap; gap: 12px;
        }

        /* Bottom meta strip */
        .hp-hero-bottom {
          position: relative; z-index: 1;
          display: flex; flex-wrap: wrap;
          border-top: 1px solid var(--ts-border);
          padding: 24px 0;
          gap: 0;
        }
        .hp-stat {
          display: flex; flex-direction: column; gap: 3px;
          padding-right: 36px; margin-right: 36px;
          border-right: 1px solid var(--ts-border);
        }
        .hp-stat:last-child { border-right: none; padding: 0; margin: 0; }
        .hp-stat-val {
          font-family: var(--ts-font-display);
          font-size: 28px; line-height: 1;
          color: var(--ts-text);
        }
        .hp-stat-label {
          font-family: var(--ts-font-mono);
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ts-text-faint);
        }

        /* ══════════════════════════════════════
           MARQUEE — темний
        ══════════════════════════════════════ */
        .hp-marquee {
          background: var(--ts-text);
          overflow: hidden; padding: 15px 0;
        }
        .hp-marquee-track {
          display: flex; white-space: nowrap;
          animation: hp-run 24s linear infinite;
        }
        @keyframes hp-run {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .hp-marquee-item {
          font-family: var(--ts-font-display);
          font-size: 18px; letter-spacing: 0.06em;
          color: var(--ts-bg);
          padding: 0 28px; flex-shrink: 0;
        }
        .hp-msep { color: rgba(245,240,232,0.3); }

        /* ══════════════════════════════════════
           NEXT EVENT — amber banner
        ══════════════════════════════════════ */
        .hp-event {
          background: var(--ts-amber);
          padding: 40px var(--ts-gutter);
        }
        .hp-event-inner {
          max-width: var(--ts-max); margin-inline: auto;
          display: flex; align-items: center;
          justify-content: space-between; gap: 32px;
          flex-wrap: wrap;
        }
        .hp-event-label {
          font-family: var(--ts-font-mono);
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(28,26,20,0.55); margin-bottom: 8px; display: block;
        }
        .hp-event-title {
          font-family: var(--ts-font-display);
          font-size: clamp(22px, 3.5vw, 44px);
          line-height: 1; color: var(--ts-text);
          max-width: 640px;
        }
        .hp-event-chips {
          display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px;
        }
        .hp-echip {
          font-family: var(--ts-font-mono);
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(28,26,20,0.65);
          background: rgba(28,26,20,0.08);
          padding: 5px 12px;
        }
        .hp-event-btns {
          display: flex; gap: 10px; flex-shrink: 0; flex-wrap: wrap;
        }
        .hp-event-btn-primary {
          font-family: var(--ts-font-mono);
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          background: var(--ts-text); color: var(--ts-bg);
          padding: 13px 28px; text-decoration: none; display: inline-block;
          transition: background 0.2s;
        }
        .hp-event-btn-primary:hover { background: #fff; color: var(--ts-text); }
        .hp-event-btn-outline {
          font-family: var(--ts-font-mono);
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          background: transparent; color: var(--ts-text);
          border: 1px solid rgba(28,26,20,0.3);
          padding: 13px 28px; text-decoration: none; display: inline-block;
          transition: background 0.2s, border-color 0.2s;
        }
        .hp-event-btn-outline:hover { background: rgba(28,26,20,0.08); }

        /* ══════════════════════════════════════
           PRODUCTS — світлий фон
        ══════════════════════════════════════ */
        .hp-products {
          background: var(--ts-bg-1);
          padding: 80px var(--ts-gutter);
          border-top: 1px solid var(--ts-border);
        }
        .hp-products-inner { max-width: var(--ts-max); margin-inline: auto; }
        .hp-products-head {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 24px;
          margin-bottom: 40px; padding-bottom: 24px;
          border-bottom: 1px solid var(--ts-border);
        }
        .hp-prod-label {
          font-family: var(--ts-font-mono); font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--ts-amber-deep); margin-bottom: 8px; display: block;
        }
        .hp-prod-title {
          font-family: var(--ts-font-display);
          font-size: clamp(32px, 5vw, 60px); line-height: 0.97;
          color: var(--ts-text);
        }
        .hp-prod-list { display: flex; flex-direction: column; }
        .hp-prod-row {
          display: flex; align-items: center;
          justify-content: space-between; gap: 24px;
          padding: 20px 16px; margin: 0 -16px;
          text-decoration: none;
          border-bottom: 1px solid var(--ts-border);
          border-radius: 0;
          transition: background var(--ts-dur), padding-left var(--ts-dur);
        }
        .hp-prod-row:hover { background: var(--ts-bg-2); padding-left: 28px; }
        .hp-prod-left { display: flex; align-items: center; gap: 20px; flex: 1; min-width: 0; }
        .hp-prod-num {
          font-family: var(--ts-font-display);
          font-size: 18px; color: var(--ts-text-faint);
          flex-shrink: 0; width: 28px; text-align: right;
        }
        .hp-prod-name {
          font-family: var(--ts-font-display);
          font-size: clamp(20px, 2.8vw, 34px);
          color: var(--ts-text);
          transition: color var(--ts-dur);
        }
        .hp-prod-row:hover .hp-prod-name { color: var(--ts-amber-deep); }
        .hp-prod-desc {
          font-family: var(--ts-font-mono); font-size: 12px;
          color: var(--ts-text-faint); flex: 1; min-width: 0;
          display: none;
        }
        @media (min-width: 900px) { .hp-prod-desc { display: block; } }
        .hp-prod-price {
          font-family: var(--ts-font-mono); font-size: 12px; font-weight: 700;
          color: var(--ts-text-muted); flex-shrink: 0;
        }
        .hp-prod-arrow {
          font-size: 16px; color: var(--ts-text-faint); flex-shrink: 0;
          transition: color var(--ts-dur), transform var(--ts-dur);
        }
        .hp-prod-row:hover .hp-prod-arrow { color: var(--ts-amber-deep); transform: translateX(4px); }

        /* ══════════════════════════════════════
           CLUB — темна секція
        ══════════════════════════════════════ */
        .hp-club {
          background: var(--ts-bg-dark);
          border-top: none;
        }
        .hp-club-inner {
          max-width: var(--ts-max); margin-inline: auto;
          padding: 80px var(--ts-gutter);
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center;
        }
        .hp-club-media {
          aspect-ratio: 4/5; background: var(--ts-bg-dark1);
          overflow: hidden; position: relative;
        }
        .hp-club-media img {
          width: 100%; height: 100%; object-fit: cover;
          filter: grayscale(20%) brightness(0.85);
          transition: transform 0.6s, filter 0.5s;
        }
        .hp-club-media:hover img { transform: scale(1.04); filter: grayscale(0%) brightness(0.9); }
        .hp-club-badge {
          position: absolute; bottom: 20px; right: 20px;
          font-family: var(--ts-font-mono); font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ts-amber); background: var(--ts-bg-dark);
          border: 1px solid rgba(255,193,7,0.3); padding: 8px 16px;
        }
        .hp-club-content { display: flex; flex-direction: column; gap: 24px; }
        .hp-club-title {
          font-family: var(--ts-font-display);
          font-size: clamp(48px, 7vw, 90px); line-height: 0.94;
          color: var(--ts-text-inv);
        }
        .hp-club-desc {
          font-family: var(--ts-font-mono);
          font-size: 14px; line-height: 1.85;
          color: var(--ts-text-inv-muted); max-width: 400px;
        }
        .hp-facts {
          display: flex; flex-direction: column; gap: 10px;
          padding-left: 20px; border-left: 2px solid var(--ts-amber);
        }
        .hp-fact {
          font-family: var(--ts-font-mono);
          font-size: 13px; color: var(--ts-text-inv-muted);
        }
        .hp-club-actions { display: flex; gap: 12px; flex-wrap: wrap; }

        /* ══════════════════════════════════════
           MISSION — світла, з великою цитатою
        ══════════════════════════════════════ */
        .hp-mission {
          background: var(--ts-bg);
          padding: 100px var(--ts-gutter);
          border-top: 1px solid var(--ts-border);
        }
        .hp-mission-inner { max-width: var(--ts-max); margin-inline: auto; }
        .hp-mission-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: start;
        }
        .hp-mission-quote {
          font-family: var(--ts-font-display);
          font-size: clamp(44px, 7vw, 92px); line-height: 0.95;
          color: var(--ts-text);
        }
        .hp-mission-accent { color: var(--ts-amber-deep); }
        .hp-mission-right { display: flex; flex-direction: column; gap: 24px; padding-top: 8px; }
        .hp-mission-text {
          font-family: var(--ts-font-mono);
          font-size: 15px; line-height: 1.85; color: var(--ts-text-muted);
        }
        .hp-founders {
          padding-top: 28px; border-top: 1px solid var(--ts-border);
          display: flex; flex-direction: column; gap: 6px;
        }
        .hp-founders-label {
          font-family: var(--ts-font-mono); font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--ts-text-faint);
        }
        .hp-founders-names {
          font-family: var(--ts-font-display);
          font-size: clamp(24px, 3.5vw, 40px); color: var(--ts-text);
        }

        /* ══════════════════════════════════════
           FORM — одна, в кінці, темна секція
        ══════════════════════════════════════ */
        .hp-form-section {
          background: var(--ts-bg-dark);
          padding: 80px var(--ts-gutter);
          border-top: none;
        }
        .hp-form-inner {
          max-width: var(--ts-max); margin-inline: auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: start;
        }
        .hp-form-left { display: flex; flex-direction: column; gap: 20px; }
        .hp-form-title {
          font-family: var(--ts-font-display);
          font-size: clamp(48px, 7vw, 92px); line-height: 0.94;
          color: var(--ts-text-inv);
        }
        .hp-form-title-accent { color: var(--ts-amber); }
        .hp-form-desc {
          font-family: var(--ts-font-mono);
          font-size: 14px; line-height: 1.85;
          color: var(--ts-text-inv-muted); max-width: 360px;
        }
        .hp-form-options { display: flex; flex-direction: column; gap: 10px; }
        .hp-form-option {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px;
          border: 1px solid var(--ts-border-inv);
          cursor: pointer;
          transition: border-color var(--ts-dur), background var(--ts-dur);
          background: transparent;
        }
        .hp-form-option:hover,
        .hp-form-option.active {
          border-color: var(--ts-amber);
          background: rgba(255,193,7,0.06);
        }
        .hp-form-option-name {
          font-family: var(--ts-font-mono); font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--ts-text-inv);
        }
        .hp-form-option-price {
          font-family: var(--ts-font-display);
          font-size: 20px; color: var(--ts-amber);
        }
        .hp-form-box {
          background: var(--ts-bg-dark1);
          border: 1px solid var(--ts-border-inv);
          padding: 40px;
        }
        /* ContactForm inputs overrides for dark bg */
        .hp-form-box .ts-input {
          background: var(--ts-bg-dark);
          border-color: var(--ts-border-inv);
          border-bottom-color: rgba(245,240,232,0.2);
          color: var(--ts-text-inv);
        }
        .hp-form-box .ts-input::placeholder { color: rgba(245,240,232,0.25); }
        .hp-form-box .ts-input:focus { border-color: var(--ts-amber); }
        .hp-form-box .ts-field-label { color: rgba(245,240,232,0.3); }
        .hp-form-box .ts-btn-primary {
          background: var(--ts-amber); color: var(--ts-text);
        }
        .hp-form-box .ts-btn-primary:hover { background: #fff; }
        .hp-form-box .cf-disclaimer { color: rgba(245,240,232,0.2); }
        .hp-form-box .cf-title { color: var(--ts-amber) !important; }

        /* ══════════════════════════════════════
           INSTAGRAM
        ══════════════════════════════════════ */
        .hp-ig {
          background: var(--ts-bg);
          border-top: 1px solid var(--ts-border);
          padding: 80px var(--ts-gutter);
          text-align: center;
        }
        .hp-ig-inner { max-width: 520px; margin-inline: auto; }
        .hp-ig-icon { width: 36px; height: 36px; margin: 0 auto 18px; color: var(--ts-amber-deep); }
        .hp-ig-handle {
          font-family: var(--ts-font-display);
          font-size: clamp(36px, 6vw, 72px); line-height: 1;
          color: var(--ts-text); display: block; margin-bottom: 14px;
        }
        .hp-ig-desc {
          font-family: var(--ts-font-mono); font-size: 13px; line-height: 1.7;
          color: var(--ts-text-muted); margin-bottom: 28px;
        }

        /* ══════════════════════════════════════
           FOOTER
        ══════════════════════════════════════ */
        .hp-footer {
          background: var(--ts-text);
          padding: 56px var(--ts-gutter) 36px;
        }
        .hp-footer-grid {
          max-width: var(--ts-max); margin-inline: auto;
          display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 48px; padding-bottom: 48px;
          border-bottom: 1px solid rgba(245,240,232,0.1); margin-bottom: 28px;
        }
        .hp-footer-logo {
          font-family: var(--ts-font-display); font-size: 32px;
          color: var(--ts-bg); text-decoration: none;
          display: block; margin-bottom: 12px; letter-spacing: 0.02em;
        }
        .hp-footer-desc {
          font-family: var(--ts-font-mono); font-size: 12px;
          line-height: 1.7; color: rgba(245,240,232,0.35); max-width: 200px;
        }
        .hp-footer-heading {
          font-family: var(--ts-font-mono); font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(245,240,232,0.3); margin-bottom: 16px; display: block;
        }
        .hp-footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .hp-footer-links a, .hp-footer-links li {
          font-family: var(--ts-font-mono); font-size: 13px;
          color: rgba(245,240,232,0.5); transition: color .2s; text-decoration: none;
        }
        .hp-footer-links a:hover { color: var(--ts-amber); }
        .hp-footer-bottom {
          max-width: var(--ts-max); margin-inline: auto;
          display: flex; justify-content: space-between; align-items: center;
          font-family: var(--ts-font-mono); font-size: 11px;
          color: rgba(245,240,232,0.2); letter-spacing: 0.06em;
        }
        .hp-footer-coords { font-family: var(--ts-font-display); font-size: 13px; letter-spacing: 0.1em; }

        /* ══════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════ */
        @media (max-width: 1024px) {
          .hp-footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 900px) {
          .hp-club-inner { grid-template-columns: 1fr; gap: 48px; }
          .hp-club-media { aspect-ratio: 16/9; }
          .hp-mission-grid { grid-template-columns: 1fr; gap: 48px; }
          .hp-form-inner { grid-template-columns: 1fr; gap: 48px; }
          .hp-products-head { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 640px) {
          .hp-hero-bottom { gap: 20px; }
          .hp-stat { border-right: none; padding: 0; margin: 0; }
          .hp-event-inner { flex-direction: column; align-items: flex-start; }
          .hp-footer-grid { grid-template-columns: 1fr; }
          .hp-footer-bottom { flex-direction: column; gap: 10px; text-align: center; }
        }
      `}</style>

      <main>

        {/* ══ 1. HERO ══════════════════════════════════════════ */}
        <section className="hp-hero">
          <div aria-hidden="true" className="hp-theta-bg">θ</div>

          <div className="hp-hero-content">
            <div className="hp-eyebrow">
              <span className="hp-eyebrow-line" />
              <span className="hp-eyebrow-text">Theta Space · Гончара 15/3 · Київ</span>
            </div>

            <h1 className="hp-title">
              Школа<br />
              <span className="hp-title-accent">живого</span><br />
              спілкування
            </h1>

            <p className="hp-sub">
              Простір для тих, хто шукає справжній контакт —
              із собою, з іншими та з реальністю.
              Клуб, лекції та курси у серці Києва.
            </p>

            <div className="hp-actions">
              <Link href="#register" className="ts-btn ts-btn-primary">
                Перший візит безкоштовно
              </Link>
              <Link href="/about" className="ts-btn ts-btn-outline">
                Дізнатися більше
              </Link>
            </div>
          </div>

          <div className="hp-hero-bottom">
            {[
              { val: '5',     label: 'Днів на тиждень' },
              { val: '0₴',    label: 'Перший візит' },
              { val: '750₴',  label: 'Заняття в клубі' },
              { val: '2024',  label: 'Рік заснування' },
            ].map(({ val, label }) => (
              <div key={label} className="hp-stat">
                <span className="hp-stat-val">{val}</span>
                <span className="hp-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 2. MARQUEE ══════════════════════════════════════ */}
        <div className="hp-marquee" aria-hidden="true">
          <div className="hp-marquee-track">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} className="hp-marquee-item">
                {item}<span className="hp-msep"> · </span>
              </span>
            ))}
          </div>
        </div>

        {/* ══ 3. NEXT EVENT ════════════════════════════════════ */}
        {latestLecture && (
          <div className="hp-event">
            <div className="hp-event-inner">
              <div>
                <span className="hp-event-label">— Найближча подія</span>
                <h2 className="hp-event-title">{latestLecture.title}</h2>
                <div className="hp-event-chips">
                  {latestLecture.lectureDetails?.dateTime && (
                    <span className="hp-echip">
                      {formatDate(latestLecture.lectureDetails.dateTime)}
                    </span>
                  )}
                  {latestLecture.lectureDetails?.location && (
                    <span className="hp-echip">{latestLecture.lectureDetails.location}</span>
                  )}
                  <span className="hp-echip">
                    {latestLecture.lectureDetails?.price || 'від 0$'}
                  </span>
                </div>
              </div>
              <div className="hp-event-btns">
                <Link
                  href={`/lectures/${latestLecture.slug || latestLecture.id}`}
                  className="hp-event-btn-primary"
                >
                  Детальніше
                </Link>
                <Link href="#register" className="hp-event-btn-outline">
                  Записатися
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ══ 4. PRODUCTS ══════════════════════════════════════ */}
        <section className="hp-products">
          <div className="hp-products-inner">
            <div className="hp-products-head">
              <div>
                <span className="hp-prod-label">— Що ми пропонуємо</span>
                <h2 className="hp-prod-title">Напрямки</h2>
              </div>
              <Link href="/courses" className="ts-btn ts-btn-outline">
                Всі продукти →
              </Link>
            </div>
            <div className="hp-prod-list">
              {[
                { n:'01', name:'Клуб живого спілкування', desc:'5 днів на тиждень, відпрацювання у парах з супервізором', price:'750 грн', href:'/club' },
                { n:'02', name:'Відкриті лекції',          desc:'Про базові закони виживання — 1.5 год', price:'від 0$',   href:'/lectures' },
                { n:'03', name:'Self Upgrade Space',        desc:'Практичні курси: ППС, ГЦО, як обирати своїх людей',     price:'100$',    href:'/courses' },
                { n:'04', name:'Семінари',                  desc:'2 дні заглибленої роботи + тижневий супровід',           price:'200$',    href:'/courses' },
                { n:'05', name:'ProLab',                    desc:'Навички нового покоління: увага, лідерство, ясність',    price:'від 500$',href:'/courses' },
              ].map(p => (
                <Link key={p.n} href={p.href} className="hp-prod-row">
                  <div className="hp-prod-left">
                    <span className="hp-prod-num">{p.n}</span>
                    <span className="hp-prod-name">{p.name}</span>
                    <span className="hp-prod-desc">{p.desc}</span>
                  </div>
                  <span className="hp-prod-price">{p.price}</span>
                  <span className="hp-prod-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 5. CLUB ══════════════════════════════════════════ */}
        <section className="hp-club">
          <div className="hp-club-inner">
            <div className="hp-club-media">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80"
                alt="Клуб живого спілкування Theta Space"
              />
              <span className="hp-club-badge">Щодня · 14:00–20:00</span>
            </div>
            <div className="hp-club-content">
              <span className="ts-label-inv">— Клуб живого спілкування</span>
              <h2 className="hp-club-title">
                Простір<br />для щирих<br />розмов
              </h2>
              <p className="hp-club-desc">
                Відпрацювання формули спілкування у парах під керівництвом
                супервізора. Щоденно, без критики — тільки живий контакт.
              </p>
              <div className="hp-facts">
                <span className="hp-fact">→ 5 днів на тиждень, 14:00–20:00</span>
                <span className="hp-fact">→ Професійні супервізори</span>
                <span className="hp-fact">→ Перший візит безкоштовний</span>
                <span className="hp-fact">→ 750 грн за заняття</span>
              </div>
              <div className="hp-club-actions">
                <Link href="/club" className="ts-btn ts-btn-primary">Про клуб</Link>
                <Link href="#register" className="ts-btn ts-btn-outline-inv">Записатися</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 6. MISSION ═══════════════════════════════════════ */}
        <section className="hp-mission">
          <div className="hp-mission-inner">
            <div className="hp-mission-grid">
              <div>
                <span className="ts-label">— Наша місія</span>
                <blockquote className="hp-mission-quote" style={{ marginTop: 20 }}>
                  Спільнота<br />здібних людей,<br />що стають<br />
                  <span className="hp-mission-accent">ще здібнішими</span>
                </blockquote>
              </div>
              <div className="hp-mission-right">
                <p className="hp-mission-text">
                  Theta Space — це простір живого спілкування, розвитку та апгрейду людини.
                  Ми працюємо з контактом як ключовою силою змін — із собою, з іншими та з реальністю.
                </p>
                <p className="hp-mission-text">
                  Не «навчаємо», а допомагаємо відновлювати ясність, гнучкість і здатність
                  бути причиною у власному житті.
                </p>
                <div className="hp-founders">
                  <span className="hp-founders-label">Засновники</span>
                  <span className="hp-founders-names">Роман Кхан & Лада Чудненко</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 7. FORM — одна, зібрана, вибір типу ════════════ */}
        <section id="register" className="hp-form-section">
          <div className="hp-form-inner">
            <div className="hp-form-left">
              <span className="ts-label-inv">— Записатися</span>
              <h2 className="hp-form-title">
                Перший<br />крок за<br />
                <span className="hp-form-title-accent">тобою</span>
              </h2>
              <p className="hp-form-desc">
                Обери формат і залиш контакт — ми зв'яжемося і відповімо на всі питання.
              </p>
              <div className="hp-form-options">
                {[
                  { label: 'Клуб', price: 'перший безкоштовно' },
                  { label: 'Лекція', price: 'від 0$' },
                  { label: 'Курс', price: 'від 100$' },
                ].map(o => (
                  <div key={o.label} className="hp-form-option">
                    <span className="hp-form-option-name">{o.label}</span>
                    <span className="hp-form-option-price">{o.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hp-form-box">
              <ContactForm
                type="club"
                lectureId={latestLecture?.id || null}
                source="homepage_unified"
              />
            </div>
          </div>
        </section>

        {/* ══ 8. INSTAGRAM ═════════════════════════════════════ */}
        <section className="hp-ig">
          <div className="hp-ig-inner">
            <svg className="hp-ig-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span className="hp-ig-handle">@theta_space_ua</span>
            <p className="hp-ig-desc">Анонси подій, фото зі зустрічей та поради від менторів</p>
            <a
              href="https://www.instagram.com/theta_space_club?igsh=MWl2MGJudG00ZXZqNg=="
              target="_blank" rel="noopener noreferrer"
              className="ts-btn ts-btn-primary"
            >
              Підписатися
            </a>
          </div>
        </section>

      </main>

      {/* ══ FOOTER ════════════════════════════════════════════ */}
      <footer className="hp-footer">
        <div className="hp-footer-grid">
          <div>
            <Link href="/" className="hp-footer-logo">ThetaSpace</Link>
            <p className="hp-footer-desc">Школа живого спілкування. Гончара 15/3, Київ.</p>
          </div>
          <div>
            <span className="hp-footer-heading">Навігація</span>
            <ul className="hp-footer-links">
              {[['Клуб','/club'],['Лекції','/lectures'],['Курси','/courses'],['Ментори','/mentors'],['Про нас','/about']].map(([l,h])=>(
                <li key={h}><Link href={h}>{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <span className="hp-footer-heading">Напрямки</span>
            <ul className="hp-footer-links">
              {[['Self Upgrade','/courses'],['ProLab','/courses'],['Семінари','/courses']].map(([l,h])=>(
                <li key={l}><Link href={h}>{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <span className="hp-footer-heading">Контакти</span>
            <ul className="hp-footer-links">
              <li><a href="https://www.instagram.com/theta_space_club" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="mailto:info@theta-space.org">info@theta-space.org</a></li>
              <li>вул. Гончара 15/3, Київ</li>
            </ul>
          </div>
        </div>
        <div className="hp-footer-bottom">
          <span>© {new Date().getFullYear()} Theta Space. Всі права захищені</span>
          <span className="hp-footer-coords">KYIV · UA · 50°27′N 30°31′E</span>
        </div>
      </footer>

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Theta Space",
        "url": "https://www.theta-space.org",
        "description": "Школа живого спілкування. Клуб, лекції, курси, Self Upgrade.",
        "address": { "@type": "PostalAddress", "streetAddress": "вул. Гончара 15/3", "addressLocality": "Київ", "addressCountry": "UA" },
        "founder": [{ "@type": "Person", "name": "Роман Кхан" }, { "@type": "Person", "name": "Лада Чудненко" }],
        "foundingDate": "2024", "email": "info@theta-space.org",
        "sameAs": ["https://www.instagram.com/theta_space_club"]
      }} />
    </>
  );
}