import Link from 'next/link';

interface MentorCardProps {
  id: string;
  title: string;
  position?: string;
  excerpt?: string;
  slug?: string;
  featuredImageUrl?: string;
  mentorPhoto?: {
     node: {
      sourceUrl: string;
      altText?: string;
    };
  };
  socialLinks?: string;
}

export default function MentorCard({
  id,
  title,
  position,
  excerpt,
  slug,
  featuredImageUrl,
  mentorPhoto,
  socialLinks,
}: MentorCardProps) {
const displayImage = mentorPhoto?.node?.sourceUrl || featuredImageUrl;

  return (
    <div className="text-center group">
      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-1">
        <div className="w-full h-full rounded-full bg-white p-1">
          <img 
            src={displayImage || 'https://via.placeholder.com/150'}
            alt={mentorPhoto?.node?.altText || title}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600 mb-2">{position || 'Супервайзер'}</p>
      
      {excerpt && <p className="text-sm text-gray-500 mb-3 line-clamp-2">{excerpt}</p>}
      
      {socialLinks && (
        <div className="flex justify-center space-x-3 mb-4">
          {/* Можна додати парсинг соціальних посилань */}
          <span className="text-xs text-gray-400">{socialLinks.substring(0, 30)}...</span>
        </div>
      )}
      
      <Link 
        href={`/mentors/${slug || id}`}
        className="inline-block border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-50 transition"
      >
        Детальніше
      </Link>
    </div>
  );
}