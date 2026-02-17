import Link from 'next/link';

interface CourseCardProps {
  id: string;
  title: string;
  excerpt?: string;
  slug?: string;
  duration?: string;
  price?: string;
  format?: any;
  featuredImageUrl?: string;
  courseImage?: {
     node: {
      sourceUrl: string;
      altText?: string;
    };
  };
}

export default function CourseCard({
  id,
  title,
  excerpt,
  slug,
  duration,
  price,
  format,
  featuredImageUrl,
  courseImage,
}: CourseCardProps) {
const displayImage = courseImage?.node?.sourceUrl || featuredImageUrl;

  const renderFormat = (format: any) => {
    if (Array.isArray(format)) {
      return format.join(', ');
    }
    return format || '';
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {displayImage && (
        <img 
          src={displayImage}
          alt={courseImage?.node?.altText || title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
        {excerpt && <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>}
        
        <div className="space-y-2 text-gray-600 mb-4">
          {duration && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{duration}</span>
            </div>
          )}
          
          {format && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-sm">{renderFormat(format)}</span>
            </div>
          )}
          
          <div className="text-2xl font-bold text-green-600 mt-4">
            {price || 'Ціна за запитом'}
          </div>
        </div>
        
        <Link 
          href={`/courses/${slug || id}`}
          className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Детальніше
        </Link>
      </div>
    </div>
  );
}