'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const nav = [
    { label: 'Клуб',    href: '/club' },
    { label: 'Лекції',  href: '/lectures' },
    { label: 'Курси',   href: '/courses' },
    { label: 'Ментори', href: '/mentors' },
    { label: 'Про нас', href: '/about' },
  ];

  return (
    <>
      <header className={`ts-header${scrolled ? ' ts-header--scrolled' : ''}`}>
        <div className="ts-header-inner ts-wrap">

          {/* ── Logo ── */}
          <Link href="/" className="ts-logo" aria-label="ThetaSpace — на головну">
            <span className="ts-logo-text">
              <span>THETA</span>
              <span>SPACE</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="ts-header-nav" aria-label="Основна навігація">
            {nav.map(({ label, href }) => (
              <Link key={href} href={href} className="ts-nav-link">
                {label}
              </Link>
            ))}
          </nav>

          {/* ── CTA ── */}
          <Link href="/#lecture-form" className="ts-btn ts-btn-primary ts-header-cta">
            Записатися
          </Link>

          {/* ── Burger ── */}
          <button
            className="ts-burger"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-label={open ? 'Закрити меню' : 'Відкрити меню'}
          >
            <span className={`ts-burger-line${open ? ' ts-burger-line--top' : ''}`} />
            <span className={`ts-burger-line${open ? ' ts-burger-line--mid' : ''}`} />
            <span className={`ts-burger-line${open ? ' ts-burger-line--bot' : ''}`} />
          </button>
        </div>

        {/* ── Mobile menu ── */}
        <div className={`ts-mobile-menu${open ? ' ts-mobile-menu--open' : ''}`}>
          <nav className="ts-mobile-nav">
            {nav.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="ts-mobile-nav-link"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link
            href="/#lecture-form"
            className="ts-btn ts-btn-primary ts-mobile-cta"
            onClick={() => setOpen(false)}
          >
            Записатися
          </Link>
        </div>
      </header>

      <style>{`
        /* ── Header shell ── */
        .ts-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition:
            background 0.35s var(--ts-ease),
            border-color 0.35s var(--ts-ease);
        }
        .ts-header--scrolled {
          background: rgba(13, 12, 10, 0.96);
          border-bottom-color: var(--ts-border);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .ts-header-inner {
          display: flex;
          align-items: center;
          height: 72px;
          gap: 40px;
        }

        /* ── Logo — бренд: текст у рамці ── */
        .ts-logo {
          border: 2.5px solid var(--ts-amber);
          border-radius: 7px;
          padding: 5px 9px;
          line-height: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: border-color var(--ts-dur), color var(--ts-dur);
          flex-shrink: 0;
        }
        .ts-logo:hover { border-color: #fff; color: #fff; }

        .ts-logo-text {
          font-family: var(--ts-font-display);
          font-size: 15px;
          letter-spacing: 0.06em;
          color: var(--ts-amber);
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 0.95;
          transition: color var(--ts-dur);
        }
        .ts-logo:hover .ts-logo-text { color: #fff; }

        /* ── Desktop nav ── */
        .ts-header-nav {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-left: auto;
        }
        .ts-nav-link {
          font-family: var(--ts-font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ts-text-muted);
          transition: color var(--ts-dur);
          position: relative;
        }
        .ts-nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0; right: 100%;
          height: 1px;
          background: var(--ts-amber);
          transition: right 0.25s var(--ts-ease);
        }
        .ts-nav-link:hover { color: var(--ts-text); }
        .ts-nav-link:hover::after { right: 0; }

        .ts-header-cta { flex-shrink: 0; }

        /* ── Burger ── */
        .ts-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 4px;
          margin-left: auto;
          cursor: pointer;
          background: none;
          border: none;
        }
        .ts-burger-line {
          display: block;
          width: 26px;
          height: 2px;
          background: var(--ts-text);
          transition: transform 0.3s var(--ts-ease), opacity 0.3s;
          transform-origin: center;
        }
        .ts-burger-line--top { transform: rotate(45deg) translate(5px, 5px); }
        .ts-burger-line--mid { opacity: 0; }
        .ts-burger-line--bot { transform: rotate(-45deg) translate(5px, -5px); }

        /* ── Mobile menu ── */
        .ts-mobile-menu {
          background: var(--ts-bg);
          border-top: 1px solid var(--ts-border);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s var(--ts-ease);
        }
        .ts-mobile-menu--open { max-height: 600px; }

        .ts-mobile-nav {
          display: flex;
          flex-direction: column;
          padding: 24px var(--ts-gutter) 0;
        }
        .ts-mobile-nav-link {
          font-family: var(--ts-font-mono);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ts-text-muted);
          padding: 16px 0;
          border-bottom: 1px solid var(--ts-border);
          transition: color var(--ts-dur);
        }
        .ts-mobile-nav-link:hover { color: var(--ts-amber); }

        .ts-mobile-cta {
          display: block;
          margin: 24px var(--ts-gutter) 32px;
          text-align: center;
        }

        /* ── Breakpoints ── */
        @media (max-width: 768px) {
          .ts-header-nav,
          .ts-header-cta { display: none; }
          .ts-burger { display: flex; }
        }
      `}</style>
    </>
  );
}