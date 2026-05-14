import ContactForm from '@/components/forms/ContactForm';
import { COURSES } from '@/lib/static-content';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COURSES.map(course => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = COURSES.find(item => item.slug === decodeURIComponent(slug));
  if (!course) return { title: 'Курс' };

  return {
    title: course.fullTitle,
    description: course.intro,
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = COURSES.find(item => item.slug === decodeURIComponent(slug));
  if (!course) notFound();

  return (
    <main className="ts-static-page ts-course-detail-layout">
      <div className="ts-wrap">
        <Link href="/courses" className="ts-back-link">← Усі курси</Link>
      </div>

      <section className="ts-page-hero ts-course-detail-hero">
        <div className="ts-wrap ts-page-hero-grid">
          <div>
            <span className="ts-label">— Self Upgrade Space · {course.shortTitle}</span>
            <h1 className="ts-page-title">{course.fullTitle}</h1>
          </div>
          <aside className="ts-course-panel ts-course-panel--sticky">
            <span className="ts-label">Деталі курсу</span>
            <strong>{course.price}</strong>
            <small>{course.priceNote}</small>
            <ul>
              {course.details.map(item => <li key={item}>{item}</li>)}
            </ul>
            <Link href="#course-detail-form" className="ts-btn ts-btn-primary">
              Записатись на курс
            </Link>
          </aside>
        </div>
      </section>

      <section className="ts-section">
        <div className="ts-wrap ts-detail-grid">
          <div className="ts-detail-main">
            <p className="ts-detail-lead">{course.intro}</p>
            {course.sections.map(section => (
              <article key={section.heading} className="ts-detail-block">
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
                <ul className="ts-check-list">
                  {section.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <aside className="ts-detail-side">
            <div className="ts-note-card">
              Курс не є лише теоретичним. Кожен крок проходить за контрольним
              листом, а супервізор допомагає правильно опанувати матеріал.
            </div>
          </aside>
        </div>
      </section>

      <section id="course-detail-form" className="ts-section ts-form-band">
        <div className="ts-wrap ts-form-grid">
          <div>
            <span className="ts-label-inv">— Запис на курс</span>
            <h2>{course.shortTitle}: залишити заявку</h2>
            <p>Ми зв’яжемося, відповімо на питання і пояснимо наступний крок.</p>
          </div>
          <div className="ts-form-shell">
            <ContactForm type="course" courseId={course.id} source={`course_${course.slug}`} />
          </div>
        </div>
      </section>
    </main>
  );
}
