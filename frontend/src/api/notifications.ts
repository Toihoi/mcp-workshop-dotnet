import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_MOCK } from './config';
import { apiClient } from './client';
import { db } from '@/mocks/db';
import { delay } from '@/mocks/latency';
import type { NotificationDto } from '@/types/api';

export const notificationKeys = {
  all: ['notifications'] as const,
  mine: () => [...notificationKeys.all, 'mine'] as const,
};

async function fetchNotifications(): Promise<NotificationDto[]> {
  if (USE_MOCK) {
    await delay();
    return db.notifications.filter((n) => n.recipientId === 1); // Fixed current user
  }
  return apiClient.get<NotificationDto[]>('/api/notifications').then((r) => r.data);
}

export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.mine(),
    queryFn: fetchNotifications,
  });
}

export function useMarkNotificationAsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      if (USE_MOCK) {
        await delay(50);
        const notification = db.notifications.find((n) => n.id === id);
        if (notification) notification.isRead = true;
        return id;
      }
      return apiClient.patch(`/api/notifications/${id}/read`).then((r) => r.data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: notificationKeys.mine() });
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (USE_MOCK) {
        await delay();
        db.notifications
          .filter((n) => n.recipientId === 1)
          .forEach((n) => (n.isRead = true));
        return;
      }
      return apiClient.post('/api/notifications/read-all').then((r) => r.data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: notificationKeys.mine() });
    },
  });
}
