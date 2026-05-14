"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { label: "Головна", href: "/" },
  { label: "Клуб", href: "/club" },
  { label: "Лекції", href: "/lectures" },
  { label: "Курси", href: "/courses" },
  { label: "Ментори", href: "/mentors" },
  { label: "Про нас", href: "/about" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav" aria-label="Головна навігація">
        <Link className="brand" href="/" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <Image
              src="/theta-static/assets/Logo.JPG"
              alt=""
              width={38}
              height={38}
              priority
            />
          </span>
          <span className="brand-text">
            Theta Space
            <small>Клуб живого спілкування</small>
          </span>
        </Link>

        <ul className={`nav-links${open ? " is-open" : ""}`}>
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={isActive(pathname, item.href) ? "active" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="nav-cta"
              data-modal-open="signupModal"
              data-context="Загальна заявка з шапки сайту"
              onClick={() => setOpen(false)}
            >
              Записатись →
            </button>
          </li>
        </ul>

        <button
          className="nav-toggle"
          type="button"
          aria-label="Меню"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M0 1h20M0 7h20M0 13h20" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
