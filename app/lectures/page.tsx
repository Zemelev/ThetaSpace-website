import Link from 'next/link';
import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_ALL_LECTURES } from '@/lib/queries';
import { formatDate } from '@/utils/dateUtils';
import { LecturesResponse } from '@/types';
import Header from '@/components/layout/Header';

export default async function LecturesPage() {
  let lectures: LecturesResponse['lectures']['nodes'] = [];
  
  try {
    const data = await fetchGraphQL<LecturesResponse>(GET_ALL_LECTURES);
    lectures = data?.lectures?.nodes || [];
  } catch (error) {
    console.error('Error fetching lectures:', error);
  }

  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-blue-600 text-4xl font-bold text-center mb-12">Лекції та події</h1>
          
          {lectures.length === 0 ? (
            <p className="text-blue-600 text-center text-gray-500">Наразі немає запланованих лекцій</p>
          ) : (
            <div className="text-blue-600 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lectures.map((lecture) => (
                <div key={lecture.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  {lecture.featuredImage?.node?.sourceUrl && (
                    <img 
                      src={lecture.featuredImage.node.sourceUrl}
                      alt={lecture.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{lecture.title}</h2>
                    
                    <div className="space-y-2 text-gray-600 mb-4">
                      {lecture.lectureDetails?.dateTime && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm">{formatDate(lecture.lectureDetails.dateTime)}</span>
                        </div>
                      )}
                      
                      {lecture.lectureDetails?.location && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm">{lecture.lectureDetails.location}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-semibold">{lecture.lectureDetails?.price || 'Безкоштовно'}</span>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/lectures/${lecture.slug || lecture.id}`}
                      className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Детальніше
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}