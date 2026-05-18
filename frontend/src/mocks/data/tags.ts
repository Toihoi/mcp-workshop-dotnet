import { TagDto } from '@/types/api';

const tagNames = [
  { name: '회계', color: '#EF4444' },
  { name: '물류', color: '#F59E0B' },
  { name: '생산', color: '#10B981' },
  { name: '인사', color: '#3B82F6' },
  { name: 'API', color: '#6366F1' },
  { name: 'UI', color: '#EC4899' },
  { name: '모바일', color: '#8B5CF6' },
  { name: 'WMS연동', color: '#06B6D4' },
];

export const mockTags: TagDto[] = [1, 2, 3].flatMap((projectId) =>
  tagNames.map((t, idx) => ({
    id: (projectId - 1) * 8 + idx + 1,
    projectId,
    name: t.name,
    color: t.color,
  }))
);
