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
  const href = `/mentors/${slug || id}`;
  const initials = title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0])
    .join('');

  return (
    <article className="ts-card ts-mentor-card">
      <Link href={href} className="ts-mentor-photo" aria-label={title}>
        {displayImage ? (
          <img src={displayImage} alt={mentorPhoto?.node?.altText || title} />
        ) : (
          <span>{initials}</span>
        )}
      </Link>

      <div className="ts-mentor-body">
        <span className="ts-label">— {position || 'Супервізор'}</span>
        <h3 className="ts-mentor-title">
          <Link href={href}>{title}</Link>
        </h3>

        {excerpt && (
          <p
            className="ts-cms-card-copy"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        )}

        {socialLinks && <p className="ts-mentor-social">{socialLinks}</p>}

        <Link href={href} className="ts-cms-card-link">
          Детальніше
        </Link>
      </div>
    </article>
  );
}
