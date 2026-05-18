import { CommentDto } from '@/types/api';
import { subHours, subDays } from 'date-fns';

export const mockComments: CommentDto[] = [];

// Generate some comments
for (let i = 1; i <= 60; i++) {
  const taskId = (i % 30) + 1;
  mockComments.push({
    id: i,
    taskId,
    parentCommentId: i > 30 && i % 2 === 0 ? i - 30 : null,
    body: `댓글 ${i} - 테스크 ${taskId}에 대한 의견입니다.`,
    authorId: (i % 6) + 1,
    mentionedUserIds: i % 5 === 0 ? [1] : [],
    createdAt: subHours(new Date(), i).toISOString(),
  });
}
