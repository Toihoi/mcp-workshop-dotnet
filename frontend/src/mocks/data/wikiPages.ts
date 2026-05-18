import { WikiPageDto } from '@/types/api';

export const mockWikiPages: WikiPageDto[] = [
  {
    id: 1,
    projectId: 1,
    parentPageId: null,
    title: '시작하기',
    body: '스마트팩토리 프로젝트 위키입니다.',
    createdById: 3,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    projectId: 1,
    parentPageId: 1,
    title: '개발 가이드',
    body: '개발 가이드 문서입니다.',
    createdById: 3,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    projectId: 1,
    parentPageId: 2,
    title: '코딩 컨벤션',
    body: '코딩 컨벤션 내용...',
    createdById: 3,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    projectId: 1,
    parentPageId: 2,
    title: '배포 절차',
    body: '배포 절차 내용...',
    createdById: 3,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    projectId: 1,
    parentPageId: null,
    title: '회의록',
    body: '회의록 목록입니다.',
    createdById: 3,
    updatedAt: new Date().toISOString(),
  },
];
