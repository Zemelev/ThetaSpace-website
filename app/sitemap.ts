// app/sitemap.ts
import { MetadataRoute } from 'next';
import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_ALL_LECTURES, GET_ALL_COURSES, GET_ALL_MENTORS } from '@/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.theta-space.org';
  
  // Статичні сторінки
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/club`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lectures`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mentors`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  try {
    const [lecturesData, coursesData, mentorsData] = await Promise.all([
      fetchGraphQL(GET_ALL_LECTURES).catch(() => ({ lectures: { nodes: [] } })),
      fetchGraphQL(GET_ALL_COURSES).catch(() => ({ courses: { nodes: [] } })),
      fetchGraphQL(GET_ALL_MENTORS).catch(() => ({ mentors: { nodes: [] } })),
    ]);

    const lectures = lecturesData?.lectures?.nodes || [];
    const courses = coursesData?.courses?.nodes || [];
    const mentors = mentorsData?.mentors?.nodes || [];

    const lectureUrls = lectures.map((lecture: any) => ({
      url: `${baseUrl}/lectures/${lecture.slug || lecture.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    const courseUrls = courses.map((course: any) => ({
      url: `${baseUrl}/courses/${course.slug || course.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    const mentorUrls = mentors.map((mentor: any) => ({
      url: `${baseUrl}/mentors/${mentor.slug || mentor.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticPages, ...lectureUrls, ...courseUrls, ...mentorUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}