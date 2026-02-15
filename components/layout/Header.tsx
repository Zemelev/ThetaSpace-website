'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Головна', href: '/' },
    { name: 'Клуб', href: '/club' },
    { name: 'Лекції', href: '/lectures' },
    { name: 'Курси', href: '/courses' },
    { name: 'Ментори', href: '/mentors' },
    { name: 'Про нас', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            ThetaSpace
          </Link>

          {/* Навігація для десктопа */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Кнопка запису */}
          <div className="hidden md:block">
            <Link
              href="/#register"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              Записатися
            </Link>
          </div>

          {/* Мобільне меню */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Мобільне меню (випадаюче) */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/#register"
                className="bg-blue-600 text-white px-6 py-3 rounded-full text-center hover:bg-blue-700 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Записатися
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}