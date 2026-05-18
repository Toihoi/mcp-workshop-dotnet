import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_MOCK } from './config';
import { apiClient } from './client';
import { db, nextCommentId } from '@/mocks/db';
import { delay } from '@/mocks/latency';
import type { CommentDto } from '@/types/api';

export const commentKeys = {
  all: ['comments'] as const,
  byTask: (taskId: number) => [...commentKeys.all, 'task', taskId] as const,
};

async function fetchComments(taskId: number): Promise<CommentDto[]> {
  if (USE_MOCK) {
    await delay();
    return db.comments.filter((c) => c.taskId === taskId);
  }
  return apiClient.get<CommentDto[]>(`/api/tasks/${taskId}/comments`).then((r) => r.data);
}

export function useComments(taskId: number) {
  return useQuery({
    queryKey: commentKeys.byTask(taskId),
    queryFn: () => fetchComments(taskId),
    enabled: !!taskId,
  });
}

export function useAddComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { taskId: number; body: string; parentCommentId?: number | null; mentionedUserIds?: number[] }) => {
      if (USE_MOCK) {
        await delay();
        const newComment: CommentDto = {
          id: nextCommentId(),
          taskId: input.taskId,
          parentCommentId: input.parentCommentId ?? null,
          body: input.body,
          authorId: 1, // 김철수
          mentionedUserIds: input.mentionedUserIds ?? [],
          createdAt: new Date().toISOString(),
        };
        db.comments.push(newComment);

        // Mock notification creation for mentioned users
        if (input.mentionedUserIds) {
          input.mentionedUserIds.forEach(userId => {
            // In a real app, this would happen on the server
          });
        }

        return newComment;
      }
      return apiClient.post<CommentDto>(`/api/tasks/${input.taskId}/comments`, input).then((r) => r.data);
    },
    onSuccess: (comment) => {
      qc.invalidateQueries({ queryKey: commentKeys.byTask(comment.taskId) });
    },
  });
}
