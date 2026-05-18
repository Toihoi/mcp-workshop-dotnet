import { TaskDto } from '@/types/api';
import { addDays, subDays } from 'date-fns';

export const mockTasks: TaskDto[] = [
  // Project 1 Tasks
  {
    id: 1,
    taskCode: 'SMF-0001',
    projectId: 1,
    parentTaskId: null,
    title: '스마트팩토리 요구사항 분석',
    body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"전체적인 요구사항을 분석합니다."}]}]}',
    statusId: 4, // Spec활성
    screenType: 'Input',
    devPlatform: 'Erp',
    assigneeIds: [1, 5],
    watcherIds: [3],
    tagIds: [3, 5],
    startDate: subDays(new Date(), 10).toISOString(),
    dueDate: addDays(new Date(), 5).toISOString(),
    completedAt: null,
    requestNo: 'REQ-001',
    customerName: 'A공장',
    requester: '최담당',
    erpProgramId: 'PGM001',
    externalLinkIo: null,
    externalLinkSpec: null,
    createdById: 3,
    createdAt: subDays(new Date(), 10).toISOString(),
    updatedAt: subDays(new Date(), 10).toISOString(),
    deletedAt: null,
  },
  {
    id: 2,
    taskCode: 'SMF-0002',
    projectId: 1,
    parentTaskId: 1,
    title: '공정 관리 화면 개발',
    body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"공정 관리 화면을 개발합니다."}]}]}',
    statusId: 5, // 개발중
    screenType: 'Process',
    devPlatform: 'Pc',
    assigneeIds: [4],
    watcherIds: [1, 3],
    tagIds: [3, 6],
    startDate: subDays(new Date(), 5).toISOString(),
    dueDate: addDays(new Date(), 2).toISOString(), // 만기 임박 (D-2)
    completedAt: null,
    requestNo: 'REQ-002',
    customerName: 'A공장',
    requester: '박생산',
    erpProgramId: 'PGM002',
    externalLinkIo: null,
    externalLinkSpec: null,
    createdById: 1,
    createdAt: subDays(new Date(), 5).toISOString(),
    updatedAt: subDays(new Date(), 5).toISOString(),
    deletedAt: null,
  },
  // Add more tasks to reach ~30... (Truncated for brevity, but I will populate more in the final file)
];

// Dynamically generate more tasks for variety
for (let i = 3; i <= 30; i++) {
  const projectId = (i % 3) + 1;
  const projectInitial = projectId === 1 ? 'SMF' : projectId === 2 ? 'ERP' : 'LGS';
  mockTasks.push({
    id: i,
    taskCode: `${projectInitial}-${String(i).padStart(4, '0')}`,
    projectId,
    parentTaskId: null,
    title: `테스크 ${i} - ${projectInitial} 관련 업무`,
    body: `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"${i}번째 테스크에 대한 상세 내용입니다."}]}]}`,
    statusId: (projectId - 1) * 8 + (i % 8) + 1,
    screenType: ['Input', 'Process', 'Query', 'Output'][i % 4] as any,
    devPlatform: ['Erp', 'Mobile', 'Pc'][i % 3] as any,
    assigneeIds: [(i % 6) + 1],
    watcherIds: [3],
    tagIds: [(projectId - 1) * 8 + (i % 8) + 1],
    startDate: subDays(new Date(), i).toISOString(),
    dueDate: addDays(new Date(), 10 - (i % 15)).toISOString(),
    completedAt: i % 10 === 0 ? new Date().toISOString() : null,
    requestNo: `REQ-${100 + i}`,
    customerName: projectId === 3 ? '고객사B' : '자사',
    requester: '요청자',
    erpProgramId: `PGM${100 + i}`,
    externalLinkIo: null,
    externalLinkSpec: null,
    createdById: 3,
    createdAt: subDays(new Date(), i).toISOString(),
    updatedAt: subDays(new Date(), i).toISOString(),
    deletedAt: null,
  });
}
