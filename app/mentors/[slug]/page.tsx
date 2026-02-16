import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_MENTOR_BY_SLUG } from '@/lib/queries';
import { Mentor } from '@/types';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

interface MentorResponse {
  mentor: Mentor | null;
}

export default async function MentorPage({ params }: Props) {
  const { slug } = await params;
  
  // Декодуємо slug для підтримки кирилиці
  const decodedSlug = decodeURIComponent(slug);
  
  let mentor: Mentor | null = null;
  
  try {
    const data = await fetchGraphQL<MentorResponse>(GET_MENTOR_BY_SLUG, { slug: decodedSlug });
    mentor = data?.mentor || null;
  } catch (error) {
    console.error('Error fetching mentor:', error);
  }
  
  if (!mentor) {
    notFound();
  }

  // Функція для парсингу соціальних посилань
  const parseSocialLinks = (socialLinks?: string) => {
    if (!socialLinks) return [];
    // Розділяємо посилання за комами або новими рядками
    return socialLinks.split(/[,\n]/).map(link => link.trim()).filter(link => link);
  };

  const socialLinks = parseSocialLinks(mentor.mentorDetails?.socialLinks);

  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Навігація назад */}
            <Link 
              href="/mentors"
              className="inline-flex items-center text-purple-600 mb-6 hover:underline"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Назад до менторів
            </Link>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-purple-600 to-pink-600 p-8 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border-4 border-white overflow-hidden">
                    <img 
                      src={mentor.featuredImage?.node?.sourceUrl || 'https://via.placeholder.com/300'}
                      alt={mentor.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="md:w-2/3 p-8">
                  <h1 className="text-purple-600 text-3xl font-bold mb-2">{mentor.title}</h1>
                  <p className="text-xl text-purple-600 mb-4">{mentor.mentorDetails?.position || 'Супервайзер'}</p>
                  
                  {socialLinks.length > 0 && (
                    <div className="flex space-x-4 mt-6">
                      {socialLinks.map((link, index) => (
                        <a 
                          key={index}
                          href={link.startsWith('http') ? link : `https://${link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-purple-600 transition"
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {(mentor.content || mentor.mentorDetails?.shortBio) && (
                <div className="p-8 border-t">
                  <h2 className="text-green-600 text-xl font-bold mb-4">Про ментора</h2>
                  <div className="prose max-w-none">
                    {mentor.mentorDetails?.shortBio && (
                      <p className="text-green-600 mb-4">{mentor.mentorDetails.shortBio}</p>
                    )}
                    {mentor.content && <div dangerouslySetInnerHTML={{ __html: mentor.content }} />}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}