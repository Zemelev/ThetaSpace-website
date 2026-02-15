'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface ContactFormProps {
  type?: 'club' | 'lecture' | 'course';
  lectureId?: string;
  courseId?: string;
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

export default function ContactForm({ 
  type = 'club', 
  lectureId = null, 
  courseId = null, 
  source = 'website' 
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    additional_info: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WP_REST_URL}/liveclub/v1/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type,
          source,
          lecture_id: lectureId,
          course_id: courseId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitResult({ type: 'success', message: result.message });
        setFormData({ name: '', phone: '', email: '', additional_info: '' });
      } else {
        setSubmitResult({ type: 'error', message: result.message || 'Помилка відправки' });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitResult({ type: 'error', message: 'Помилка з\'єднання' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formLabels: Record<string, string> = {
    club: 'Запис до Клубу',
    lecture: 'Запис на Лекцію',
    course: 'Запис на Курс',
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {formLabels[type] || 'Форма запису'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ім'я *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Ваше ім'я"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Телефон *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="+380 XX XXX XX XX"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label htmlFor="additional_info" className="block text-sm font-medium text-gray-700 mb-1">
            Коментар або питання
          </label>
          <textarea
            id="additional_info"
            name="additional_info"
            value={formData.additional_info}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Ваш коментар..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? 'Відправляємо...' : 'Відправити заявку'}
        </button>
      </form>

      {submitResult && (
        <div className={`mt-4 p-3 rounded-lg ${
          submitResult.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {submitResult.message}
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 text-center">
        Натискаючи "Відправити заявку", ви погоджуєтесь з обробкою ваших даних
      </p>
    </div>
  );
}

// for js
// 'use client';

// import { useState } from 'react';

// export default function ContactForm({ type = 'club', lectureId = null, courseId = null, source = 'website' }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     additional_info: '',
//   });
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitResult, setSubmitResult] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitResult(null);

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_WP_REST_URL}/liveclub/v1/submit`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           type,
//           source,
//           lecture_id: lectureId,
//           course_id: courseId,
//         }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         setSubmitResult({ type: 'success', message: result.message });
//         setFormData({ name: '', phone: '', email: '', additional_info: '' });
//       } else {
//         setSubmitResult({ type: 'error', message: result.message || 'Помилка відправки' });
//       }
//     } catch (error) {
//       console.error('Submit error:', error);
//       setSubmitResult({ type: 'error', message: 'Помилка з\'єднання' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const formLabels = {
//     club: 'Запис до Клубу',
//     lecture: 'Запис на лекцію',
//     course: 'Запис на курс',
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
//       <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
//         {formLabels[type] || 'Форма запису'}
//       </h3>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Ім'я */}
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//             Ім'я *
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//             placeholder="Ваше ім'я"
//           />
//         </div>

//         {/* Телефон */}
//         <div>
//           <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//             Телефон *
//           </label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//             placeholder="+380 XX XXX XX XX"
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//             placeholder="email@example.com"
//           />
//         </div>

//         {/* Додаткова інформація */}
//         <div>
//           <label htmlFor="additional_info" className="block text-sm font-medium text-gray-700 mb-1">
//             Коментар або питання
//           </label>
//           <textarea
//             id="additional_info"
//             name="additional_info"
//             value={formData.additional_info}
//             onChange={handleChange}
//             rows="3"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//             placeholder="Ваш коментар..."
//           />
//         </div>

//         {/* Кнопка відправки */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
//             isSubmitting
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-blue-600 hover:bg-blue-700 text-white'
//           }`}
//         >
//           {isSubmitting ? 'Відправляємо...' : 'Відправити заявку'}
//         </button>
//       </form>

//       {/* Результат відправки */}
//       {submitResult && (
//         <div className={`mt-4 p-3 rounded-lg ${
//           submitResult.type === 'success' 
//             ? 'bg-green-50 text-green-800 border border-green-200' 
//             : 'bg-red-50 text-red-800 border border-red-200'
//         }`}>
//           {submitResult.message}
//         </div>
//       )}

//       <p className="mt-4 text-xs text-gray-500 text-center">
//         Натискаючи "Відправити заявку", ви погоджуєтесь з обробкою ваших даних
//       </p>
//     </div>
//   );
// }