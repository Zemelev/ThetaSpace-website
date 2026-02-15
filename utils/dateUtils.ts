import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

export function formatDate(dateString?: string): string {
  if (!dateString) return 'Дата уточнюється';
  try {
    const date = new Date(dateString);
    return format(date, "d MMMM yyyy, HH:mm", { locale: uk });
  } catch {
    return dateString;
  }
}

export function isUpcoming(dateString?: string): boolean {
  if (!dateString) return false;
  try {
    const date = new Date(dateString);
    return date > new Date();
  } catch {
    return false;
  }
}