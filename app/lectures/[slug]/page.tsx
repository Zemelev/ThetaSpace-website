import { fetchGraphQL } from '@/lib/graphql-client';
import { GET_LECTURE_BY_SLUG } from '@/lib/queries';
import { formatDate } from '@/utils/dateUtils';
import { LectureResponse } from '@/types';
import ContactForm from '@/components/forms/ContactForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await fetchGraphQL<LectureResponse>(GET_LECTURE_BY_SLUG, {
      slug: decodeURIComponent(slug),
    });
    const lecture = data?.lecture;
    if (lecture) {
      return {
        title: lecture.title,
        description: lecture.excerpt?.replace(/<[^>]+>/g, '').slice(0, 160) || '',
      };
    }
  } catch { /* */ }
  return { title: 'Лекція' };
}

export default async function LecturePage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  let lecture: LectureResponse['lecture'] = null;
  try {
    const data = await fetchGraphQL<LectureResponse>(GET_LECTURE_BY_SLUG, { slug: decodedSlug });
    lecture = data?.lecture || null;
  } catch (error) {
    console.error('Error fetching lecture:', error);
  }

  if (!lecture) notFound();

  const displayImage =
    lecture.lectureDetails?.lectureImage?.node?.sourceUrl ||
    lecture.featuredImage?.node?.sourceUrl;

  const lecturers = lecture.lectureDetails?.lecturerName?.nodes ?? [];

  return (
    <main className="ts-lecture-page">

      <div className="ts-wrap">
        <Link href="/lectures" className="ts-back-link">← Всі лекції</Link>
      </div>

      {/* ── Hero ── */}
      <section className="ts-lsp-hero ts-noise">
        <div className="ts-lsp-bg-word" aria-hidden="true">
          {lecture.title.charAt(0)}
        </div>
        <div className="ts-wrap ts-lsp-hero-inner">
          <span className="ts-label">— Лекція</span>
          <h1 className="ts-d-xl" style={{ marginTop: 16, maxWidth: 1100 }}>
            {lecture.title}
          </h1>

          {/* Meta row */}
          <div className="ts-lsp-meta">
            {lecture.lectureDetails?.dateTime && (
              <div className="ts-meta-item">
                <span className="ts-meta-label">Дата та час</span>
                <span className="ts-meta-val">
                  {formatDate(lecture.lectureDetails.dateTime)}
                </span>
              </div>
            )}
            {lecture.lectureDetails?.location && (
              <div className="ts-meta-item">
                <span className="ts-meta-label">Місце</span>
                <span className="ts-meta-val">{lecture.lectureDetails.location}</span>
              </div>
            )}
            {lecturers.length > 0 && (
              <div className="ts-meta-item">
                <span className="ts-meta-label">Лектор</span>
                <span className="ts-meta-val">{lecturers.map(l => l.title).join(', ')}</span>
              </div>
            )}
            <div className="ts-meta-item">
              <span className="ts-meta-label">Вартість</span>
              <span className="ts-meta-val" style={{ color: 'var(--ts-amber)' }}>
                {lecture.lectureDetails?.price || 'Безкоштовно'}
              </span>
            </div>
            <div className="ts-meta-item">
              <span className="ts-meta-label">Тривалість</span>
              <span className="ts-meta-val">1.5 год</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="ts-section">
        <div className="ts-wrap ts-lsp-grid">

          {/* Main */}
          <div className="ts-lsp-main">

            {/* Image */}
            {displayImage && (
              <div className="ts-lsp-image">
                <img
                  src={displayImage}
                  alt={lecture.lectureDetails?.lectureImage?.node?.altText || lecture.title}
                />
              </div>
            )}

            {/* Excerpt */}
            {lecture.excerpt && (
              <p
                className="ts-lsp-excerpt ts-body"
                dangerouslySetInnerHTML={{ __html: lecture.excerpt }}
              />
            )}

            {/* Content */}
            {lecture.content && (
              <div className="ts-lsp-prose">
                <span className="ts-label" style={{ marginBottom: 20 }}>— Про лекцію</span>
                <div dangerouslySetInnerHTML={{ __html: lecture.content }} />
              </div>
            )}

            {/* Lecturer links */}
            {lecturers.length > 0 && (
              <div className="ts-lsp-lecturers">
                <span className="ts-label" style={{ marginBottom: 20 }}>— Лектор</span>
                <div className="ts-lsp-lecturers-list">
                  {lecturers.map(lecturer => (
                    <Link
                      key={lecturer.id}
                      href={`/mentors/${lecturer.slug || lecturer.id}`}
                      className="ts-lsp-lecturer-link ts-card"
                    >
                      <span className="ts-d-sm">{lecturer.title}</span>
                      <span
                        className="ts-body-sm"
                        style={{ marginTop: 4, display: 'block' }}
                      >
                        Переглянути профіль →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Aside */}
          <aside className="ts-lsp-aside">
            <div className="ts-lsp-aside-inner">

              {/* Location block */}
              <div className="ts-lsp-location-block">
                <span className="ts-label">— Де та коли</span>
                <div className="ts-lsp-details">
                  {lecture.lectureDetails?.dateTime && (
                    <div className="ts-lsp-detail-row">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <path d="M16 2v4M8 2v4M3 10h18"/>
                      </svg>
                      <span>{formatDate(lecture.lectureDetails.dateTime)}</span>
                    </div>
                  )}
                  {lecture.lectureDetails?.location && (
                    <div className="ts-lsp-detail-row">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                        <circle cx="12" cy="9" r="2.5"/>
                      </svg>
                      <span>{lecture.lectureDetails.location}</span>
                    </div>
                  )}
                  <div className="ts-lsp-detail-row">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    <span>1.5 години</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="ts-lsp-price-block">
                <span className="ts-label">— Вартість</span>
                <span
                  className="ts-price"
                  style={{ display: 'block', marginTop: 12, fontSize: 'clamp(36px, 5vw, 56px)' }}
                >
                  {lecture.lectureDetails?.price || 'Безкоштовно'}
                </span>
              </div>

              <hr className="ts-divider" style={{ margin: '32px 0' }} />

              {/* Form */}
              <span className="ts-label">— Реєстрація</span>
              <h2 className="ts-d-sm" style={{ marginTop: 16, marginBottom: 32 }}>
                Записатися<br />на лекцію
              </h2>
              <ContactForm
                type="lecture"
                lectureId={lecture.id}
                source={`lecture_${lecture.slug || lecture.id}`}
              />
            </div>
          </aside>

        </div>
      </section>

      {/* ── Next lectures strip ── */}
      <section className="ts-lsp-more ts-section-sm">
        <div className="ts-wrap ts-lsp-more-inner">
          <span className="ts-label">— Інші події</span>
          <Link href="/lectures" className="ts-btn ts-btn-outline" style={{ marginTop: 20 }}>
            Всі лекції →
          </Link>
        </div>
      </section>

      <style>{`
        .ts-lecture-page { background: var(--ts-bg); min-height: 100svh; }

        .ts-back-link {
          display: inline-block;
          font-family: var(--ts-font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ts-text-faint);
          padding: 32px 0 0;
          transition: color var(--ts-dur);
        }
        .ts-back-link:hover { color: var(--ts-amber); }

        /* Hero */
        .ts-lsp-hero {
          min-height: 55vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding-bottom: 60px;
          overflow: hidden;
          position: relative;
        }
        .ts-lsp-bg-word {
          position: absolute;
          top: 50%;
          left: var(--ts-gutter);
          transform: translateY(-54%);
          font-family: var(--ts-font-display);
          font-size: clamp(180px, 36vw, 560px);
          line-height: 1;
          color: rgba(255,193,7,0.04);
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .ts-lsp-hero-inner {
          position: relative;
          z-index: 2;
          padding-top: 120px;
        }
        .ts-lsp-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--ts-border);
        }
        .ts-meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-right: 32px;
          margin-right: 32px;
          border-right: 1px solid var(--ts-border);
        }
        .ts-meta-item:last-child { border-right: none; }
        .ts-meta-label {
          font-family: var(--ts-font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ts-text-faint);
        }
        .ts-meta-val {
          font-family: var(--ts-font-mono);
          font-size: 14px;
          font-weight: 700;
          color: var(--ts-text);
        }

        /* Content grid */
        .ts-lsp-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 80px;
          align-items: start;
        }
        .ts-lsp-main {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        /* Image */
        .ts-lsp-image {
          aspect-ratio: 16/9;
          overflow: hidden;
          background: var(--ts-bg-2);
        }
        .ts-lsp-image img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: grayscale(15%);
        }

        /* Excerpt */
        .ts-lsp-excerpt {
          font-size: 16px !important;
          line-height: 1.8 !important;
          padding-bottom: 48px;
          border-bottom: 1px solid var(--ts-border);
        }
        .ts-lsp-excerpt p { margin: 0; }

        /* Prose */
        .ts-lsp-prose {
          display: flex;
          flex-direction: column;
        }
        .ts-lsp-prose > div {
          font-family: var(--ts-font-mono);
          font-size: 14px;
          line-height: 1.85;
          color: var(--ts-text-muted);
          margin-top: 16px;
        }
        .ts-lsp-prose h2, .ts-lsp-prose h3 {
          font-family: var(--ts-font-display);
          color: var(--ts-text);
          margin: 28px 0 12px;
        }
        .ts-lsp-prose h2 { font-size: clamp(26px, 4vw, 40px); }
        .ts-lsp-prose h3 { font-size: clamp(20px, 3vw, 30px); }
        .ts-lsp-prose p { margin-bottom: 14px; }
        .ts-lsp-prose strong { color: var(--ts-text); }

        /* Lecturers */
        .ts-lsp-lecturers { display: flex; flex-direction: column; }
        .ts-lsp-lecturers-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-top: 16px;
        }
        .ts-lsp-lecturer-link {
          padding: 20px 24px;
          transition: border-color var(--ts-dur);
        }
        .ts-lsp-lecturer-link:hover { border-color: var(--ts-amber); }

        /* Aside */
        .ts-lsp-aside { position: sticky; top: 96px; }
        .ts-lsp-aside-inner {
          background: var(--ts-bg-1);
          border: 1px solid var(--ts-border);
          padding: 40px;
          display: flex;
          flex-direction: column;
        }

        .ts-lsp-location-block { margin-bottom: 32px; }
        .ts-lsp-details {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 20px;
        }
        .ts-lsp-detail-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--ts-font-mono);
          font-size: 13px;
          color: var(--ts-text-muted);
        }
        .ts-lsp-detail-row svg { color: var(--ts-amber); flex-shrink: 0; }

        .ts-lsp-price-block {
          display: flex;
          flex-direction: column;
        }

        /* More strip */
        .ts-lsp-more {
          background: var(--ts-bg-1);
          border-top: 1px solid var(--ts-border);
        }
        .ts-lsp-more-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .ts-lsp-grid { grid-template-columns: 1fr; gap: 48px; }
          .ts-lsp-aside { position: static; }
        }
        @media (max-width: 640px) {
          .ts-lsp-meta { gap: 20px; }
          .ts-meta-item { border-right: none; padding: 0; margin: 0; }
          .ts-lsp-more-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </main>
  );
}