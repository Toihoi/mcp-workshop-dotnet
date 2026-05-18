import { NotificationDto } from '@/types/api';
import { subHours, subDays } from 'date-fns';

export const mockNotifications: NotificationDto[] = [];

// Notifications for 김철수 (id: 1)
for (let i = 1; i <= 15; i++) {
  mockNotifications.push({
    id: i,
    recipientId: 1,
    type: ['NewTask', 'NewComment', 'Mention', 'DueSoon', 'StatusChange'][i % 5] as any,
    taskId: (i % 10) + 1,
    taskCode: `SMF-${String((i % 10) + 1).padStart(4, '0')}`,
    message: `알림 메시지 ${i}입니다.`,
    channels: ['Inapp', 'Teams'],
    isRead: i > 7,
    createdAt: subHours(new Date(), i).toISOString(),
  });
}
