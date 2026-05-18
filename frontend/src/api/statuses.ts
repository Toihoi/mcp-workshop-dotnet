import { useQuery } from '@tanstack/react-query';
import { USE_MOCK } from './config';
import { apiClient } from './client';
import { db } from '@/mocks/db';
import { delay } from '@/mocks/latency';
import type { StatusDto } from '@/types/api';

export const statusKeys = {
  all: ['statuses'] as const,
  byProject: (projectId: number) => [...statusKeys.all, projectId] as const,
};

export function useStatuses(projectId: number) {
  return useQuery({
    queryKey: statusKeys.byProject(projectId),
    queryFn: async () => {
      if (USE_MOCK) {
        await delay();
        return db.statuses.filter((s) => s.projectId === projectId);
      }
      return apiClient.get<StatusDto[]>(`/api/projects/${projectId}/statuses`).then((r) => r.data);
    },
    enabled: !!projectId,
  });
}
