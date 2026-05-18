import { StatusDto } from '@/types/api';

const statusNames = [
  { name: 'IO진행', erpCode: 'IO01', category: 'Todo', color: '#FBBF24' },
  { name: 'IO활성', erpCode: 'IO02', category: 'Todo', color: '#F59E0B' },
  { name: 'Spec진행', erpCode: 'SP01', category: 'InProgress', color: '#60A5FA' },
  { name: 'Spec활성', erpCode: 'SP02', category: 'InProgress', color: '#3B82F6' },
  { name: '개발중', erpCode: 'DV01', category: 'InProgress', color: '#6366F1' },
  { name: '개발완료', erpCode: 'DV02', category: 'Done', color: '#10B981' },
  { name: '현업확인', erpCode: 'CF01', category: 'Done', color: '#059669' },
  { name: '취소', erpCode: 'CC01', category: 'Done', color: '#6B7280' },
] as const;

export const mockStatuses: StatusDto[] = [1, 2, 3].flatMap((projectId) =>
  statusNames.map((s, idx) => ({
    id: (projectId - 1) * 8 + idx + 1,
    projectId,
    name: s.name,
    erpCode: s.erpCode,
    category: s.category as any,
    color: s.color,
    sortOrder: idx + 1,
    isActive: true,
  }))
);
