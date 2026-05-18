import { ProjectDto } from '@/types/api';

export const mockProjects: ProjectDto[] = [
  {
    id: 1,
    name: '스마트팩토리 구축',
    initial: 'SMF',
    type: 'Main',
    description: '스마트팩토리 구축 프로젝트입니다.',
    ownerUserId: 3,
    memberIds: [1, 2, 3, 4, 5, 6],
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  {
    id: 2,
    name: 'ERP 결산 모듈 보완',
    initial: 'ERP',
    type: 'Additional',
    description: '기존 ERP의 결산 모듈을 보완하는 프로젝트입니다.',
    ownerUserId: 3,
    memberIds: [1, 2, 3, 4, 5, 6, 7],
    startDate: '2024-03-01',
    endDate: '2024-06-30',
  },
  {
    id: 3,
    name: '물류 통합 시스템',
    initial: 'LGS',
    type: 'Main',
    description: '물류 통합 관리 시스템 개발 프로젝트입니다.',
    ownerUserId: 3,
    memberIds: [1, 2, 3, 4, 5, 6, 8],
    startDate: '2024-05-01',
    endDate: '2025-04-30',
  },
];
