import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_ALL_LECTURES } from '@/lib/queries';
import { LecturesResponse } from '@/types';
import Header from '@/components/layout/Header';
import LectureCard from '@/components/cards/LectureCard';

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
          <h1 className="text-4xl font-bold text-center mb-12">Лекції та події</h1>
          
          {lectures.length === 0 ? (
            <p className="text-center text-gray-500">Наразі немає запланованих лекцій</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lectures.map((lecture) => (
                <LectureCard
                  key={lecture.id}
                  id={lecture.id}
                  title={lecture.title}
                  excerpt={lecture.excerpt}
                  slug={lecture.slug}
                  dateTime={lecture.lectureDetails?.dateTime}
                  location={lecture.lectureDetails?.location}
                  price={lecture.lectureDetails?.price}
                  featuredImageUrl={lecture.featuredImage?.node?.sourceUrl}
                  lectureImage={lecture.lectureDetails?.lectureImage}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}