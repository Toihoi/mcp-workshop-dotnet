import { useQuery } from '@tanstack/react-query';
import { USE_MOCK } from './config';
import { apiClient } from './client';
import { db } from '@/mocks/db';
import { delay } from '@/mocks/latency';
import type { ProjectDto } from '@/types/api';

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: number) => [...projectKeys.details(), id] as const,
};

async function fetchProjects(): Promise<ProjectDto[]> {
  if (USE_MOCK) {
    await delay();
    return db.projects;
  }
  return apiClient.get<ProjectDto[]>('/api/projects').then((r) => r.data);
}

export function useProjects() {
  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: fetchProjects,
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: async () => {
      if (USE_MOCK) {
        await delay();
        return db.projects.find((p) => p.id === id);
      }
      return apiClient.get<ProjectDto>(`/api/projects/${id}`).then((r) => r.data);
    },
    enabled: !!id,
  });
}
