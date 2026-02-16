import Header from '@/components/layout/Header';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Про нас</h1>
            
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Наша місія</h2>
                <p className="text-gray-700 leading-relaxed">
                  Ми створюємо простір, де кожен може практикувати живе спілкування у безпечній та підтримуючій атмосфері. 
                  У світі цифрових технологій ми віримо в силу живого слова та щирих розмов.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Що ми пропонуємо</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold">Клуб живого спілкування</span> – щоденні зустрічі 5 днів на тиждень
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold">Лекції</span> – щоп'ятниці у легкому форматі міні-вечірок
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold">Курси</span> – для початківців, які хочуть зробити перші кроки
                    </div>
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Наші цінності</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Безпека</h3>
                    <p className="text-sm text-gray-600">Створюємо простір без осуду та критики</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Підтримка</h3>
                    <p className="text-sm text-gray-600">Кожен отримує увагу та зворотній зв'язок</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Розвиток</h3>
                    <p className="text-sm text-gray-600">Допомагаємо рости та вдосконалюватись</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Спільнота</h3>
                    <p className="text-sm text-gray-600">Об'єднуємо людей навколо живого спілкування</p>
                  </div>
                </div>
              </section>
              
              <section className="text-center pt-6">
                <Link 
                  href="/#club"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                >
                  Приєднатися до клубу
                </Link>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}