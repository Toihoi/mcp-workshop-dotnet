import { useQuery } from '@tanstack/react-query';
import { USE_MOCK } from './config';
import { apiClient } from './client';
import { db } from '@/mocks/db';
import { delay } from '@/mocks/latency';
import type { TagDto } from '@/types/api';

export const tagKeys = {
  all: ['tags'] as const,
  byProject: (projectId: number) => [...tagKeys.all, projectId] as const,
};

export function useTags(projectId: number) {
  return useQuery({
    queryKey: tagKeys.byProject(projectId),
    queryFn: async () => {
      if (USE_MOCK) {
        await delay();
        return db.tags.filter((t) => t.projectId === projectId);
      }
      return apiClient.get<TagDto[]>(`/api/projects/${projectId}/tags`).then((r) => r.data);
    },
    enabled: !!projectId,
  });
}
