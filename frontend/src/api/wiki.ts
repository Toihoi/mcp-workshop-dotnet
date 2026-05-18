import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_MOCK } from './config';
import { apiClient } from './client';
import { db, nextWikiId } from '@/mocks/db';
import { delay } from '@/mocks/latency';
import type { WikiPageDto } from '@/types/api';

export const wikiKeys = {
  all: ['wiki'] as const,
  byProject: (projectId: number) => [...wikiKeys.all, projectId] as const,
  detail: (id: number) => [...wikiKeys.all, 'detail', id] as const,
};

export function useWikiPages(projectId: number) {
  return useQuery({
    queryKey: wikiKeys.byProject(projectId),
    queryFn: async () => {
      if (USE_MOCK) {
        await delay();
        return db.wikiPages.filter((w) => w.projectId === projectId);
      }
      return apiClient.get<WikiPageDto[]>(`/api/projects/${projectId}/wiki`).then((r) => r.data);
    },
    enabled: !!projectId,
  });
}

export function useWikiPage(id: number) {
  return useQuery({
    queryKey: wikiKeys.detail(id),
    queryFn: async () => {
      if (USE_MOCK) {
        await delay();
        return db.wikiPages.find((w) => w.id === id);
      }
      return apiClient.get<WikiPageDto>(`/api/wiki/${id}`).then((r) => r.data);
    },
    enabled: !!id,
  });
}

export function useUpdateWikiPage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<WikiPageDto> & { id: number }) => {
      if (USE_MOCK) {
        await delay();
        const index = db.wikiPages.findIndex((w) => w.id === id);
        if (index === -1) throw new Error('Wiki page not found');
        db.wikiPages[index] = { ...db.wikiPages[index], ...updates, updatedAt: new Date().toISOString() };
        return db.wikiPages[index];
      }
      return apiClient.patch<WikiPageDto>(`/api/wiki/${id}`, updates).then((r) => r.data);
    },
    onSuccess: (page) => {
      if (page.projectId) qc.invalidateQueries({ queryKey: wikiKeys.byProject(page.projectId) });
      qc.invalidateQueries({ queryKey: wikiKeys.detail(page.id) });
    },
  });
}
