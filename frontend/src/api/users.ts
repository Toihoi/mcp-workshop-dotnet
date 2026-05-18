import { useQuery } from '@tanstack/react-query';
import { USE_MOCK } from './config';
import { apiClient } from './client';
import { db } from '@/mocks/db';
import { delay } from '@/mocks/latency';
import type { UserDto } from '@/types/api';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  me: () => [...userKeys.all, 'me'] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: async () => {
      if (USE_MOCK) {
        await delay();
        return db.users;
      }
      return apiClient.get<UserDto[]>('/api/users').then((r) => r.data);
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: async () => {
      if (USE_MOCK) {
        await delay(100);
        return db.users.find((u) => u.id === 1); // Mock me as 김철수
      }
      return apiClient.get<UserDto>('/api/users/me').then((r) => r.data);
    },
  });
}
