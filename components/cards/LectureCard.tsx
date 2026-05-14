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
  featuredImageUrl?: string;
  lectureImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
}

export default function LectureCard({
  id,
  title,
  excerpt,
  slug,
  dateTime,
  location,
  price,
  featuredImageUrl,
  lectureImage,
}: LectureCardProps) {
  const displayImage = lectureImage?.node?.sourceUrl || featuredImageUrl;
  const href = `/lectures/${slug || id}`;

  return (
    <article className="ts-card ts-cms-card ts-lecture-card">
      {displayImage ? (
        <Link href={href} className="ts-cms-card-media" aria-label={title}>
          <img src={displayImage} alt={lectureImage?.node?.altText || title} />
        </Link>
      ) : (
        <Link href={href} className="ts-cms-card-media ts-cms-card-media--empty" aria-label={title}>
          <span>Лекція</span>
        </Link>
      )}

      <div className="ts-cms-card-body">
        <div className="ts-cms-card-meta">
          {dateTime && <span>{formatDate(dateTime)}</span>}
          {location && <span>{location}</span>}
          <span>{price || 'Безкоштовно'}</span>
        </div>

        <h3 className="ts-cms-card-title">
          <Link href={href}>{title}</Link>
        </h3>

        {excerpt && (
          <p
            className="ts-cms-card-copy"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        )}

        <Link href={href} className="ts-cms-card-link">
          Детальніше
        </Link>
      </div>
    </article>
  );
}
