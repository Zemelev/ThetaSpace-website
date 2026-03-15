'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface ContactFormProps {
  type?: 'club' | 'lecture' | 'course';
  lectureId?: string | null;
  courseId?: string | null;
  source?: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  additional_info: string;
}

interface SubmitResult {
  type: 'success' | 'error';
  message: string;
}

const LABELS: Record<string, string> = {
  club: 'Запис до клубу',
  lecture: 'Запис на лекцію',
  course: 'Запис на курс',
};

export default function ContactForm({
  type = 'club',
  lectureId = null,
  courseId = null,
  source = 'website',
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    additional_info: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WP_REST_URL}/liveclub/v1/submit`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            type,
            source,
            lecture_id: lectureId || undefined,
            course_id: courseId || undefined,
          }),
        }
      );
      const data = await response.json();

      if (data.success) {
        setResult({ type: 'success', message: data.message });
        setFormData({ name: '', phone: '', email: '', additional_info: '' });
      } else {
        setResult({ type: 'error', message: data.message || 'Помилка відправки' });
      }
    } catch {
      setResult({ type: 'error', message: 'Помилка з\'єднання' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cf-wrap">
      <p className="cf-title ts-label">{LABELS[type] || 'Форма запису'}</p>

      <form onSubmit={handleSubmit} className="cf-form" noValidate>

        <div className="ts-field">
          <label htmlFor="cf-name" className="ts-field-label">Ім'я *</label>
          <input
            id="cf-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ваше ім'я"
            className="ts-input"
          />
        </div>

        <div className="ts-field">
          <label htmlFor="cf-phone" className="ts-field-label">Телефон *</label>
          <input
            id="cf-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+380 XX XXX XX XX"
            className="ts-input"
          />
        </div>

        <div className="ts-field">
          <label htmlFor="cf-email" className="ts-field-label">Email</label>
          <input
            id="cf-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="ts-input"
          />
        </div>

        <div className="ts-field">
          <label htmlFor="cf-comment" className="ts-field-label">Коментар або питання</label>
          <textarea
            id="cf-comment"
            name="additional_info"
            value={formData.additional_info}
            onChange={handleChange}
            rows={4}
            placeholder="Ваш коментар..."
            className="ts-input cf-textarea"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`ts-btn ts-btn-primary cf-submit${isSubmitting ? ' cf-submit--loading' : ''}`}
        >
          {isSubmitting ? (
            <span className="cf-spinner-row">
              <span className="cf-spinner" />
              Відправляємо...
            </span>
          ) : (
            'Відправити заявку'
          )}
        </button>
      </form>

      {result && (
        <div className={`cf-result cf-result--${result.type}`}>
          <span className="cf-result-icon">
            {result.type === 'success' ? '✓' : '✕'}
          </span>
          {result.message}
        </div>
      )}

      <p className="cf-disclaimer">
        Натискаючи кнопку, ви погоджуєтесь з обробкою персональних даних
      </p>

      <style>{`
        .cf-wrap {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .cf-title {
          margin-bottom: 28px;
        }

        .cf-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cf-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .cf-submit {
          width: 100%;
          text-align: center;
          margin-top: 8px;
          padding: 16px !important;
          font-size: 12px !important;
        }

        .cf-submit--loading {
          opacity: 0.7;
          cursor: not-allowed;
          pointer-events: none;
        }

        .cf-spinner-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .cf-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(13,12,10,0.3);
          border-top-color: var(--ts-bg);
          border-radius: 50%;
          animation: cf-spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        @keyframes cf-spin {
          to { transform: rotate(360deg); }
        }

        .cf-result {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 20px;
          padding: 16px;
          font-family: var(--ts-font-mono);
          font-size: 13px;
          line-height: 1.6;
          border: 1px solid;
        }

        .cf-result--success {
          color: #a8e6cf;
          border-color: rgba(168, 230, 207, 0.2);
          background: rgba(168, 230, 207, 0.05);
        }

        .cf-result--error {
          color: #ffb3b3;
          border-color: rgba(255, 179, 179, 0.2);
          background: rgba(255, 179, 179, 0.05);
        }

        .cf-result-icon {
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .cf-disclaimer {
          font-family: var(--ts-font-mono);
          font-size: 10px;
          color: var(--ts-text-faint);
          margin-top: 16px;
          line-height: 1.6;
          letter-spacing: 0.03em;
        }
      `}</style>
    </div>
  );
}