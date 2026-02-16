import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_COURSE_BY_ID } from '@/lib/queries';
import { Course } from '@/types';
import Header from '@/components/layout/Header';
import ContactForm from '@/components/forms/ContactForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

interface CourseResponse {
  course: Course | null;
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  
  let course: Course | null = null;
  
  try {
    const id = slug.split('-').pop() || slug;
    const data = await fetchGraphQL<CourseResponse>(GET_COURSE_BY_ID, { id });
    course = data?.course || null;
  } catch (error) {
    console.error('Error fetching course:', error);
  }
  
  if (!course) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/courses"
              className="inline-flex items-center text-green-600 mb-6 hover:underline"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Назад до курсів
            </Link>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {course.featuredImage?.node?.sourceUrl && (
                <img 
                  src={course.featuredImage.node.sourceUrl}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
              )}
              
              <div className="p-8">
                <h1 className="text-4xl font-bold mb-6">{course.title}</h1>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    {course.courseDetails?.duration && (
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Тривалість</p>
                          <p className="font-semibold">{course.courseDetails.duration}</p>
                        </div>
                      </div>
                    )}
                    
                    {course.courseDetails?.format && (
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Формат</p>
                          <p className="font-semibold">{course.courseDetails.format}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="text-sm text-gray-500 mb-2">Вартість курсу</p>
                    <p className="text-3xl font-bold text-green-600 mb-4">{course.courseDetails?.coursePrice || 'Ціна за запитом'}</p>
                  </div>
                </div>
                
                {course.content && (
                  <div className="prose max-w-none mb-8">
                    <h3 className="text-xl font-bold mb-4">Про курс</h3>
                    <div dangerouslySetInnerHTML={{ __html: course.content }} />
                  </div>
                )}
                
                {course.courseDetails?.includes && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Що включено</h3>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="whitespace-pre-line">{course.courseDetails.includes}</p>
                    </div>
                  </div>
                )}
                
                {/* Форма запису */}
                <div className="mt-8 pt-8 border-t">
                  <h2 className="text-2xl font-bold mb-6 text-center">Записатися на курс</h2>
                  <ContactForm 
                    type="course" 
                    courseId={course.id} 
                    source={`course_${course.id}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}