import { TemplateDto } from '@/types/api';

export const mockTemplates: TemplateDto[] = [1, 2, 3].flatMap((projectId) => [
  {
    id: (projectId - 1) * 4 + 1,
    projectId,
    name: '회의록',
    titlePattern: '[회의] {date} 주간 회의',
    bodyContent: '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"회의 안건"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph"}]}]}]}',
    defaultStatusId: (projectId - 1) * 8 + 1,
    defaultTagIds: [],
  },
  {
    id: (projectId - 1) * 4 + 2,
    projectId,
    name: '버그수정',
    titlePattern: '[Bug] {title}',
    bodyContent: '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"재현 경로"}]},{"type":"paragraph"},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"기대 결과"}]},{"type":"paragraph"}]}',
    defaultStatusId: (projectId - 1) * 8 + 5, // 개발중
    defaultTagIds: [],
  },
  {
    id: (projectId - 1) * 4 + 3,
    projectId,
    name: '기능개발',
    titlePattern: '[Feature] {title}',
    bodyContent: '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"기능 개요"}]},{"type":"paragraph"},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"상세 설계"}]},{"type":"paragraph"}]}',
    defaultStatusId: (projectId - 1) * 8 + 3, // Spec진행
    defaultTagIds: [],
  },
]);
