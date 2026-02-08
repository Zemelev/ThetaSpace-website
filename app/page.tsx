import Header from '@/components/layout/Header';
import ContactForm from '../components/forms/ContactForm';
import HeroSection from '../components/HeroSection';
import LecturePreview from '../components/cards/LecturePreview';

export default async function Home() {
  // Тут будуть GraphQL запити, поки що статично
  return (
    <>
      <Header />
      
      <main>
        {/* Герой секція */}
        <HeroSection />
        
        {/* Секція про клуб з формою */}
        <section id="club" className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Клуб живого спілкування
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  Щоденні зустрічі для практики спілкування у теплій та підтримуючій атмосфері.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>5 днів на тиждень</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Професійні супервайзери</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Безкоштовний перший візит</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <ContactForm type="club" />
              </div>
            </div>
          </div>
        </section>

        {/* Секція найближчих лекцій */}
        <section id="lectures" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Найближчі лекції</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Тут будуть картки лекцій через GraphQL */}
              <div className="text-center py-8">
                <p className="text-gray-500">Завантаження лекцій...</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-4">Live Club - простір для живого спілкування</p>
          <p className="text-gray-400">© {new Date().getFullYear()} Всі права захищені</p>
        </div>
      </footer>
    </>
  );
}