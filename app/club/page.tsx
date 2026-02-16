import Header from '@/components/layout/Header';
import ContactForm from '@/components/forms/ContactForm';
import Link from 'next/link';

export default function ClubPage() {
  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-blue-600 text-4xl font-bold text-center mb-8">Клуб живого спілкування</h1>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="md:flex">
                <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-12 text-white">
                  <h2 className="text-2xl font-bold mb-4">Чому варто прийти?</h2>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Практика живого спілкування</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Підтримка професійних супервайзерів</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Нові знайомства та друзі</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Безкоштовний перший візит</span>
                    </li>
                  </ul>
                </div>
                
                <div className="md:w-1/2 p-8">
                  <h3 className="text-blue-600 text-xl font-bold mb-4">Розклад зустрічей</h3>
                  <div className=" text-blue-600 space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">Понеділок</span>
                      <span>14:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">Вівторок</span>
                      <span>14:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">Середа</span>
                      <span>14:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">Четвер</span>
                      <span>14:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold">П'ятниця</span>
                      <span>14:00 - 20:00</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-4">
                    * Після клубу по п'ятницях відбуваються лекції
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <ContactForm type="club" source="club_page" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}