import Link from 'next/link';
import { formatDate } from '@/utils/dateUtils';

interface LectureCardProps {
  id: string;
  title: string;
  excerpt?: string;
  slug?: string;
  dateTime?: string;
  location?: string;
  price?: string;
  imageUrl?: string;
}

export default function LectureCard({
  id,
  title,
  excerpt,
  slug,
  dateTime,
  location,
  price,
  imageUrl,
}: LectureCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {imageUrl && (
        <img 
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        {excerpt && <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>}
        
        <div className="space-y-2 text-gray-600 mb-4">
          {dateTime && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">{formatDate(dateTime)}</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">{location}</span>
            </div>
          )}
          
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold">{price || 'Безкоштовно'}</span>
          </div>
        </div>
        
        <Link 
          href={`/lectures/${slug || id}`}
          className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Детальніше
        </Link>
      </div>
    </div>
  );
}