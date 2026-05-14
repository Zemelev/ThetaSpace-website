import ContactForm from '@/components/forms/ContactForm';
import { MENTORS } from '@/lib/static-content';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return MENTORS.map(mentor => ({ slug: mentor.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const mentor = MENTORS.find(item => item.slug === decodeURIComponent(slug));
  if (!mentor) return { title: 'Одитор' };

  return {
    title: mentor.name,
    description: mentor.bio,
  };
}

export default async function MentorPage({ params }: Props) {
  const { slug } = await params;
  const mentor = MENTORS.find(item => item.slug === decodeURIComponent(slug));
  if (!mentor) notFound();

  return (
    <main className="ts-static-page ts-mentor-detail-layout">
      <div className="ts-wrap">
        <Link href="/mentors" className="ts-back-link">← Усі одитори</Link>
      </div>

      <section className="ts-mentor-detail-hero">
        <div className="ts-wrap ts-mentor-detail-grid">
          <div className="ts-mentor-detail-photo">
            <img src={mentor.image} alt={mentor.name} />
          </div>
          <div className="ts-mentor-detail-copy">
            <span className="ts-label">— {mentor.level}</span>
            <h1 className="ts-page-title">{mentor.name}</h1>
            <strong>{mentor.tags}</strong>
            <p>{mentor.bio}</p>
            <div className="ts-mentor-detail-actions">
              <Link href="#mentor-detail-form" className="ts-btn ts-btn-primary">
                Записатись на сесію
              </Link>
              <Link href="/mentors" className="ts-btn ts-btn-outline">
                Команда
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ts-section ts-listening-band">
        <div className="ts-wrap ts-split">
          <div>
            <span className="ts-label">— Як проходить робота</span>
            <h2 className="ts-page-subtitle">Уважно, без оцінювання, до результату.</h2>
          </div>
          <div className="ts-copy-column">
            <p>
              Сесія триває 1–2 години та проходить онлайн або офлайн у просторі
              на Гончара 15/3. Під час роботи ви перебуваєте у свідомому стані,
              розумієте все, що відбувається, і можете зупинити процес у будь-який момент.
            </p>
            <div className="ts-note-card">
              Перед сесією бажано добре виспатися, бути ситим, не вживати алкоголь,
              наркотичні речовини та знеболювальні щонайменше за 3 дні.
            </div>
          </div>
        </div>
      </section>

      <section id="mentor-detail-form" className="ts-section ts-form-band">
        <div className="ts-wrap ts-form-grid">
          <div>
            <span className="ts-label-inv">— Перша сесія</span>
            <h2>Запис до {mentor.name}</h2>
            <p>Залиште контакти: ми зв’яжемося і підкажемо доступний формат.</p>
          </div>
          <div className="ts-form-shell">
            <ContactForm type="club" source={`mentor_${mentor.slug}`} />
          </div>
        </div>
      </section>
    </main>
  );
}
