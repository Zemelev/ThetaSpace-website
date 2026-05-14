import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_ALL_LECTURES } from '@/lib/queries';
import { COURSE_URLS, MENTOR_URLS } from '@/lib/static-content';
import { LecturesResponse } from '@/types';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.theta-space.org';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/club`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/lectures`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/courses`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/mentors`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    ...COURSE_URLS.map(url => ({
      url: `${baseUrl}${url}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    ...MENTOR_URLS.map(url => ({
      url: `${baseUrl}${url}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  try {
    const lecturesData = await fetchGraphQL<LecturesResponse>(GET_ALL_LECTURES).catch(() => ({ lectures: { nodes: [] } }));
    const lectures = lecturesData?.lectures?.nodes || [];

    const lectureUrls = lectures.map((lecture: { slug?: string; id: string }) => ({
      url: `${baseUrl}/lectures/${lecture.slug || lecture.id}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...lectureUrls];
  } catch {
    return staticPages;
  }
}
