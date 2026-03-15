// app/seo.ts
import { Metadata } from 'next';

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  slug?: string;
}

export function generateMetadata({
  title,
  description,
  keywords = 'клуб спілкування, лекції, курси, ментори, психологія, розвиток, живе спілкування, ThetaSpace',
  image = '/images/og-image.jpg',
  slug = '',
}: PageSEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.theta-space.org';
  const url = slug ? `${baseUrl}/${slug}` : baseUrl;

  return {
    title: {
      default: `${title} | ThetaSpace`,
      template: '%s | ThetaSpace',
    },
    description,
    keywords,
    authors: [{ name: 'ThetaSpace' }],
    openGraph: {
      title: `${title} | ThetaSpace`,
      description,
      url,
      siteName: 'ThetaSpace',
      images: [
        {
          url: image.startsWith('http') ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'uk_UA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ThetaSpace`,
      description,
      images: [image.startsWith('http') ? image : `${baseUrl}${image}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}