import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_MENTOR_BY_SLUG } from '@/lib/queries';
import { MentorResponse } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await fetchGraphQL<MentorResponse>(GET_MENTOR_BY_SLUG, {
      slug: decodeURIComponent(slug),
    });
    const mentor = data?.mentor;
    if (mentor) {
      return {
        title: mentor.title,
        description: mentor.mentorDetails?.shortBio ||
          mentor.excerpt?.replace(/<[^>]+>/g, '').slice(0, 160) || '',
      };
    }
  } catch { /* */ }
  return { title: 'Супервізор' };
}

export default async function MentorPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  let mentor: MentorResponse['mentor'] = null;
  try {
    const data = await fetchGraphQL<MentorResponse>(GET_MENTOR_BY_SLUG, { slug: decodedSlug });
    mentor = data?.mentor || null;
  } catch (error) {
    console.error('Error fetching mentor:', error);
  }

  if (!mentor) notFound();

  const displayImage =
    mentor.mentorDetails?.mentorPhoto?.node?.sourceUrl ||
    mentor.featuredImage?.node?.sourceUrl;

  const initials = mentor.title
    .split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase();

  const socialLinks = (mentor.mentorDetails?.socialLinks || '')
    .split(/[,\n]/).map((l: string) => l.trim()).filter(Boolean);

  const getSocialLabel = (url: string) => {
    if (url.includes('instagram')) return 'Instagram';
    if (url.includes('facebook')) return 'Facebook';
    if (url.includes('linkedin')) return 'LinkedIn';
    if (url.includes('t.me') || url.includes('telegram')) return 'Telegram';
    return url.replace(/^https?:\/\//, '').split('/')[0];
  };

  return (
    <main className="ts-msp-page">

      <div className="ts-wrap">
        <Link href="/mentors" className="ts-back-link">← Всі супервізори</Link>
      </div>

      {/* ── Hero ── */}
      <section className="ts-msp-hero ts-noise">
        {/* Full-bleed photo background */}
        {displayImage && (
          <div className="ts-msp-hero-bg">
            <img src={displayImage} alt="" aria-hidden="true" />
          </div>
        )}
        <div className="ts-wrap ts-msp-hero-inner">
          <div className="ts-msp-hero-content">
            <span className="ts-label">— Супервізор</span>
            <h1 className="ts-d-xl" style={{ marginTop: 16 }}>{mentor.title}</h1>
            {mentor.mentorDetails?.position && (
              <p className="ts-msp-position">{mentor.mentorDetails.position}</p>
            )}
            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="ts-msp-socials">
                {socialLinks.map((link: string, i: number) => (
                  <a
                    key={i}
                    href={link.startsWith('http') ? link : `https://${link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ts-btn ts-btn-outline ts-msp-social-btn"
                  >
                    {getSocialLabel(link)} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="ts-section">
        <div className="ts-wrap ts-msp-grid">

          {/* Left — photo + details */}
          <aside className="ts-msp-aside">
            <div className="ts-msp-photo-block">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={mentor.mentorDetails?.mentorPhoto?.node?.altText || mentor.title}
                  className="ts-msp-photo"
                />
              ) : (
                <div className="ts-msp-initials-block">
                  <span className="ts-msp-initials">{initials}</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="ts-msp-details">
              {mentor.mentorDetails?.position && (
                <div className="ts-msp-detail-item">
                  <span className="ts-label">— Роль</span>
                  <p className="ts-body" style={{ marginTop: 8 }}>{mentor.mentorDetails.position}</p>
                </div>
              )}
              <div className="ts-msp-detail-item">
                <span className="ts-label">— Локація</span>
                <p className="ts-body" style={{ marginTop: 8 }}>Гончара 15/3, Київ</p>
              </div>
              {socialLinks.length > 0 && (
                <div className="ts-msp-detail-item">
                  <span className="ts-label">— Соцмережі</span>
                  <div className="ts-msp-social-list">
                    {socialLinks.map((link: string, i: number) => (
                      <a
                        key={i}
                        href={link.startsWith('http') ? link : `https://${link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ts-msp-social-link"
                      >
                        {getSocialLabel(link)} ↗
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Right — bio + content */}
          <div className="ts-msp-main">

            {/* Short bio */}
            {mentor.mentorDetails?.shortBio && (
              <p className="ts-msp-shortbio ts-body">
                {mentor.mentorDetails.shortBio}
              </p>
            )}

            {/* Full content */}
            {mentor.content && (
              <div className="ts-msp-content-block">
                <span className="ts-label" style={{ marginBottom: 20 }}>— Детальніше</span>
                <div
                  className="ts-msp-prose"
                  dangerouslySetInnerHTML={{ __html: mentor.content }}
                />
              </div>
            )}

            {/* Excerpt fallback */}
            {!mentor.content && !mentor.mentorDetails?.shortBio && mentor.excerpt && (
              <div
                className="ts-msp-shortbio ts-body"
                dangerouslySetInnerHTML={{ __html: mentor.excerpt }}
              />
            )}

            {/* CTA */}
            <div className="ts-msp-cta-block">
              <span className="ts-label">— Зустрінемось на клубі</span>
              <p className="ts-body" style={{ marginTop: 16, maxWidth: 420 }}>
                Приходьте на заняття клубу живого спілкування, щоб поспілкуватися особисто.
              </p>
              <div className="ts-msp-cta-actions">
                <Link href="/#club-form" className="ts-btn ts-btn-primary">
                  Записатися до клубу
                </Link>
                <Link href="/club" className="ts-btn ts-btn-outline">
                  Про клуб →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .ts-msp-page { background: var(--ts-bg); min-height: 100svh; }

        .ts-back-link {
          display: inline-block;
          font-family: var(--ts-font-mono);
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ts-text-faint);
          padding: 32px 0 0;
          transition: color var(--ts-dur);
        }
        .ts-back-link:hover { color: var(--ts-amber); }

        /* Hero */
        .ts-msp-hero {
          min-height: 70vh;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding-bottom: 60px;
          position: relative; overflow: hidden;
        }
        .ts-msp-hero-bg {
          position: absolute; inset: 0;
          z-index: 0;
        }
        .ts-msp-hero-bg img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: grayscale(40%) brightness(0.35);
        }
        .ts-msp-hero-inner { position: relative; z-index: 2; padding-top: 120px; }
        .ts-msp-hero-content { max-width: 900px; }
        .ts-msp-position {
          font-family: var(--ts-font-mono);
          font-size: 14px;
          color: var(--ts-amber);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 12px;
        }
        .ts-msp-socials {
          display: flex; flex-wrap: wrap; gap: 10px;
          margin-top: 32px;
        }
        .ts-msp-social-btn {
          padding: 10px 20px !important;
          font-size: 10px !important;
        }

        /* Content grid */
        .ts-msp-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 80px;
          align-items: start;
        }

        /* Aside */
        .ts-msp-aside {
          position: sticky; top: 96px;
          display: flex; flex-direction: column; gap: 0;
        }
        .ts-msp-photo-block {
          aspect-ratio: 3/4;
          background: var(--ts-bg-2);
          overflow: hidden;
          border: 1px solid var(--ts-border);
        }
        .ts-msp-photo {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: grayscale(15%);
        }
        .ts-msp-initials-block {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
        }
        .ts-msp-initials {
          font-family: var(--ts-font-display);
          font-size: clamp(80px, 14vw, 160px);
          color: rgba(255,193,7,0.12);
          user-select: none;
        }
        .ts-msp-details {
          display: flex; flex-direction: column; gap: 0;
          border: 1px solid var(--ts-border);
          border-top: none;
        }
        .ts-msp-detail-item {
          padding: 20px 24px;
          border-bottom: 1px solid var(--ts-border);
        }
        .ts-msp-detail-item:last-child { border-bottom: none; }
        .ts-msp-social-list {
          display: flex; flex-direction: column; gap: 8px;
          margin-top: 10px;
        }
        .ts-msp-social-link {
          font-family: var(--ts-font-mono);
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--ts-text-muted);
          transition: color var(--ts-dur);
        }
        .ts-msp-social-link:hover { color: var(--ts-amber); }

        /* Main content */
        .ts-msp-main {
          display: flex; flex-direction: column; gap: 56px;
        }
        .ts-msp-shortbio {
          font-size: 16px !important;
          line-height: 1.85 !important;
          padding-bottom: 56px;
          border-bottom: 1px solid var(--ts-border);
        }
        .ts-msp-content-block { display: flex; flex-direction: column; }
        .ts-msp-prose {
          font-family: var(--ts-font-mono);
          font-size: 14px; line-height: 1.85;
          color: var(--ts-text-muted);
          margin-top: 20px;
        }
        .ts-msp-prose h2, .ts-msp-prose h3 {
          font-family: var(--ts-font-display);
          color: var(--ts-text); margin: 28px 0 12px;
        }
        .ts-msp-prose h2 { font-size: clamp(26px, 4vw, 40px); }
        .ts-msp-prose h3 { font-size: clamp(20px, 3vw, 30px); }
        .ts-msp-prose p { margin-bottom: 14px; }
        .ts-msp-prose strong { color: var(--ts-text); }

        /* CTA block */
        .ts-msp-cta-block {
          background: var(--ts-bg-1);
          border: 1px solid var(--ts-border);
          padding: 40px;
          display: flex; flex-direction: column;
        }
        .ts-msp-cta-actions {
          display: flex; flex-wrap: wrap; gap: 12px;
          margin-top: 28px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .ts-msp-grid { grid-template-columns: 1fr; gap: 48px; }
          .ts-msp-aside { position: static; }
          .ts-msp-photo-block { aspect-ratio: 16/9; }
        }
      `}</style>
    </main>
  );
}