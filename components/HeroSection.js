'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Простір для 
            <span className="block text-yellow-300">живого спілкування</span>
          </h1>
          
          <p className="text-xl mb-8 text-blue-100">
            Щоденний клуб, лекції від експертів та курси для початківців. 
            Приєднуйтесь до спільноти, де кожен знайде собі співрозмовника.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="#club" 
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors text-center"
            >
              Записатися до клубу
            </Link>
            
            <Link 
              href="#lectures" 
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-colors text-center"
            >
              Переглянути лекції
            </Link>
          </div>
        </div>
      </div>
      
      {/* Декоративні елементи */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}