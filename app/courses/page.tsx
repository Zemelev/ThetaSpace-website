import Link from 'next/link';
import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_ALL_COURSES } from '@/lib/queries';
import { CoursesResponse } from '@/types';
import Header from '@/components/layout/Header';
import CourseCard from '@/components/cards/CourseCard';

export default async function CoursesPage() {
  let courses: CoursesResponse['courses']['nodes'] = [];
  
  try {
    const data = await fetchGraphQL<CoursesResponse>(GET_ALL_COURSES);
    courses = data?.courses?.nodes || [];
  } catch (error) {
    console.error('Error fetching courses:', error);
  }

  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-green-600 text-4xl font-bold text-center mb-4">Наші курси</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Оберіть курс, який допоможе вам зробити перші кроки у світі живого спілкування
          </p>
          
          {courses.length === 0 ? (
            <p className="text-green-600 text-center text-gray-500">Наразі немає активних курсів</p>
          ) : (
            <div className="text-green-600 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  excerpt={course.excerpt}
                  slug={course.slug}
                  duration={course.courseDetails?.duration}
                  price={course.courseDetails?.coursePrice}
                  format={course.courseDetails?.format}
                  imageUrl={course.featuredImage?.node?.sourceUrl}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}