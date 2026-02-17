import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_ALL_MENTORS } from '@/lib/queries';
import { MentorsResponse } from '@/types';
import Header from '@/components/layout/Header';
import MentorCard from '@/components/cards/MentorCard';

export default async function MentorsPage() {
  let mentors: MentorsResponse['mentors']['nodes'] = [];
  
  try {
    const data = await fetchGraphQL<MentorsResponse>(GET_ALL_MENTORS);
    mentors = data?.mentors?.nodes || [];
  } catch (error) {
    console.error('Error fetching mentors:', error);
  }

  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Наші супервайзери</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Професіонали, які створюють безпечний простір для вашого розвитку
          </p>
          
          {mentors.length === 0 ? (
            <p className="text-center text-gray-500">Інформація про менторів з'явиться незабаром</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {mentors.map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  id={mentor.id}
                  title={mentor.title}
                  position={mentor.mentorDetails?.position}
                  excerpt={mentor.excerpt}
                  slug={mentor.slug}
                  featuredImageUrl={mentor.featuredImage?.node?.sourceUrl}
                  mentorPhoto={mentor.mentorDetails?.mentorPhoto}
                  socialLinks={mentor.mentorDetails?.socialLinks}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}