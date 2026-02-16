import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_LECTURE_BY_SLUG } from '@/lib/queries'; // Змінено імпорт
import { formatDate } from '@/utils/dateUtils';
import { Lecture } from '@/types';
import Header from '@/components/layout/Header';
import ContactForm from '@/components/forms/ContactForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

interface LectureResponse {
  lecture: Lecture | null;
}

export default async function LecturePage({ params }: Props) {
  const { slug } = await params;

  // 👇 Декодуємо slug 
  const decodedSlug = decodeURIComponent(slug);
  
  let lecture: Lecture | null = null;
  
  try {
    // 👇 Використовуємо slug без змін, як він є в URL
    const data = await fetchGraphQL<LectureResponse>(GET_LECTURE_BY_SLUG, { slug: decodedSlug });
    lecture = data?.lecture || null;
    
      // Для діагностики 
    console.log('Requested slug:', slug);
    console.log('Decoded slug:', decodedSlug);
    console.log('Fetched lecture:', lecture);
  } catch (error) {
    console.error('Error fetching lecture:', error);
  }
  
  if (!lecture) {
    notFound(); // Якщо лекцію не знайдено, показуємо 404
  }

  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Навігація назад */}
            <Link 
              href="/lectures"
              className="inline-flex items-center text-blue-600 mb-6 hover:underline"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Назад до лекцій
            </Link>

            <h1 className="text-green-600 text-4xl font-bold mb-6">{lecture.title}</h1>
            
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  {lecture.featuredImage?.node?.sourceUrl && (
                    <img 
                      src={lecture.featuredImage.node.sourceUrl}
                      alt={lecture.title}
                      className="w-full rounded-lg"
                    />
                  )}
                </div>
                
                <div className="space-y-4">
                  {lecture.lectureDetails?.dateTime && (
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Дата та час</p>
                        <p className="text-blue-600 font-semibold">{formatDate(lecture.lectureDetails.dateTime)}</p>
                      </div>
                    </div>
                  )}
                  
                  {lecture.lectureDetails?.location && (
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Місце проведення</p>
                        <p className="text-green-600 font-semibold">{lecture.lectureDetails.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {lecture.lectureDetails?.lecturerName?.nodes && lecture.lectureDetails.lecturerName.nodes.length > 0 && (
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Лектор</p>
                        {lecture.lectureDetails.lecturerName.nodes.map((lecturer) => (
                          <Link 
                            key={lecturer.id}
                            href={`/mentors/${lecturer.slug || lecturer.id}`}
                            className="text-purple-600 font-semibold hover:text-purple-600 transition block"
                          >
                            {lecturer.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Вартість</p>
                      <p className="font-semibold text-2xl text-green-600">{lecture.lectureDetails?.price || 'Безкоштовно'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {lecture.content && (
                <div className="mt-8 prose max-w-none">
                  <h3 className="text-xl font-bold mb-4">Про лекцію</h3>
                  <div dangerouslySetInnerHTML={{ __html: lecture.content }} />
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <ContactForm 
                type="lecture" 
                lectureId={lecture.id} 
                source={`lecture_${lecture.slug || lecture.id}`}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}