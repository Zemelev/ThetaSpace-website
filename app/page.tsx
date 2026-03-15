import Header from '@/components/layout/Header';
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

  return (
    <>
      {/* <Header /> */}
      
      <main>
        {/* Блок 1: Найближча лекція */}
        <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block bg-yellow-400 text-purple-900 px-4 py-1 rounded-full text-sm font-semibold mb-6">
                🎉 Найближча подія
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {latestLecture?.title || 'Нова лекція вже скоро'}
              </h1>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {latestLecture?.lectureDetails?.dateTime && (
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-lg">{formatDate(latestLecture.lectureDetails.dateTime)}</span>
                  </div>
                )}
                
                {latestLecture?.lectureDetails?.location && (
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-lg">{latestLecture.lectureDetails.location}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={latestLecture ? `/lectures/${latestLecture.slug || latestLecture.id}` : '/lectures'}
                  className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Детальніше про лекцію
                </Link>
                
                <Link
                  href="#lecture-form"
                  className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Записатися на лекцію
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Форма запису на лекцію */}
        <section id="lecture-form" className="py-16 bg-gray-50 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <ContactForm 
                type="lecture" 
                lectureId={latestLecture?.id || null} 
                source="homepage_lecture"
              />
            </div>
          </div>
        </section>

        {/* Блок 2: Клуб */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                  Клуб живого спілкування
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                  Простір для щирих розмов
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Щоденні зустрічі у теплій атмосфері. Без оцінок, без критики — тільки підтримка та практика.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    5 днів на тиждень
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Професійні супервайзери
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Безкоштовний перший візит
                  </li>
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/club"
                    className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors text-center"
                  >
                    Детальніше про клуб
                  </Link>
                  
                  <Link
                    href="#club-form"
                    className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors text-center"
                  >
                    Записатися зараз
                  </Link>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl">
                <img 
                  src="https://via.placeholder.com/600x400?text=Club+Meeting" 
                  alt="Клуб живого спілкування"
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Форма запису до клубу */}
        <section id="club-form" className="py-16 bg-gray-50 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <ContactForm type="club" source="homepage_club" />
            </div>
          </div>
        </section>

        {/* Блок 3: Курси */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
              Навчання
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Курси для початківців
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Оберіть курс, який допоможе зробити перші кроки у світі живого спілкування
            </p>
            <Link 
              href="/courses"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition"
            >
              Переглянути всі курси
            </Link>
          </div>
        </section>

        {/* Блок 4: Ментори */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
              Наша команда
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Досвідчені супервайзери
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Професіонали, які створюють безпечний простір для вашого розвитку
            </p>
            <Link 
              href="/mentors"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
            >
              Познайомитись з усіма
            </Link>
          </div>
        </section>

        {/* Блок 5: Instagram */}
        <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl p-4">
                <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              
              <h2 className="text-gray-600 text-3xl md:text-4xl font-bold mb-4">
                Слідкуйте за нами в Instagram
              </h2>
              
              <p className="text-gray-600 text-lg mb-8">
                Анонси подій, фото з зустрічей та корисні поради від наших менторів
              </p>
              
              <a
                href="https://www.instagram.com/theta_space_club?igsh=MWl2MGJudG00ZXZqNg=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                @theta_space_ua
              </a>
            </div>
          </div>
        </section>
           <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "ThetaSpace",
                "url": "https://www.theta-space.org",
                "logo": "https://www.theta-space.org/images/logo.png",
                "sameAs": [
                  "https://www.instagram.com/theta_space_club?igsh=MWl2MGJudG00ZXZqNg=="
                ],
                "description": "Простір для живого спілкування, лекцій та курсів",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Київ",
                  "addressCountry": "UA"
                },
                "founder": {
                  "@type": "Person",
                  "name": "Команда ThetaSpace"
                },
                "foundingDate": "2024", // 
                "email": "info@theta-space.org" //
              }}
            />     
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ThetaSpace</h3>
              <p className="text-gray-400">Простір для живого спілкування, розвитку та підтримки</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навігація</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/club" className="hover:text-white">Клуб</Link></li>
                <li><Link href="/lectures" className="hover:text-white">Лекції</Link></li>
                <li><Link href="/courses" className="hover:text-white">Курси</Link></li>
                <li><Link href="/mentors" className="hover:text-white">Ментори</Link></li>
                <li><Link href="/about" className="hover:text-white">Про нас</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакти</h4>
              <ul className="space-y-2 text-gray-400">
                 <li className="flex items-center space-x-2">
                  <a 
                    href="https://www.instagram.com/theta_space_club?igsh=MWl2MGJudG00ZXZqNg==" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-pink-400 transition"
                  >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                    Instagram
                  </a>
                </li>
              </ul>    
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} ThetaSpace. Всі права захищені</p>
          </div>
        </div>
      </footer>
    </>
  );
}