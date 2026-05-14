import Link from 'next/link';

interface CourseCardProps {
  id: string;
  title: string;
  excerpt?: string;
  slug?: string;
  duration?: string;
  price?: string;
  format?: string | string[] | null;
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
  const href = `/courses/${slug || id}`;
  const formatLabel = Array.isArray(format) ? format.join(', ') : format;

  return (
    <article className="ts-card ts-cms-card ts-course-card">
      {displayImage ? (
        <Link href={href} className="ts-cms-card-media" aria-label={title}>
          <img src={displayImage} alt={courseImage?.node?.altText || title} />
        </Link>
      ) : (
        <Link href={href} className="ts-cms-card-media ts-cms-card-media--course" aria-label={title}>
          <span>Self Upgrade</span>
        </Link>
      )}

      <div className="ts-cms-card-body">
        <div className="ts-cms-card-meta">
          {duration && <span>{duration}</span>}
          {formatLabel && <span>{formatLabel}</span>}
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

        <div className="ts-cms-card-footer">
          <span className="ts-cms-card-price">{price || 'Ціна за запитом'}</span>
          <Link href={href} className="ts-cms-card-link">
            Детальніше
          </Link>
        </div>
      </div>
    </article>
  );
}
