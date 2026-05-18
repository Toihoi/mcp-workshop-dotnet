import { useQuery } from '@tanstack/react-query';
import { USE_MOCK } from './config';
import { apiClient } from './client';
import { db } from '@/mocks/db';
import { delay } from '@/mocks/latency';
import type { TemplateDto } from '@/types/api';

export const templateKeys = {
  all: ['templates'] as const,
  byProject: (projectId: number) => [...templateKeys.all, projectId] as const,
};

export function useTemplates(projectId: number) {
  return useQuery({
    queryKey: templateKeys.byProject(projectId),
    queryFn: async () => {
      if (USE_MOCK) {
        await delay();
        return db.templates.filter((t) => t.projectId === projectId);
      }
      return apiClient.get<TemplateDto[]>(`/api/projects/${projectId}/templates`).then((r) => r.data);
    },
    enabled: !!projectId,
  });
}
