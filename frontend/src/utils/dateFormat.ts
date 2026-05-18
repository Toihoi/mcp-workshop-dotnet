import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (date: string | Date, pattern = 'yyyy-MM-dd') => {
  return format(new Date(date), pattern, { locale: ko });
};

export const formatDateTime = (date: string | Date) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm', { locale: ko });
};
