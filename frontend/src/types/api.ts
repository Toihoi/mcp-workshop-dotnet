import {
  CompanyType,
  ProjectType,
  StatusCategory,
  ScreenType,
  DevPlatform,
  NotificationType,
  NotificationChannel
} from './domain';

export interface UserDto {
  id: number;
  loginId: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  company: CompanyType;
}

export interface ProjectDto {
  id: number;
  name: string;
  initial: string;
  type: ProjectType;
  description: string | null;
  ownerUserId: number;
  memberIds: number[];
  startDate: string | null;
  endDate: string | null;
}

export interface StatusDto {
  id: number;
  projectId: number;
  name: string;
  erpCode: string;
  category: StatusCategory;
  color: string;
  sortOrder: number;
  isActive: boolean;
}

export interface TagDto {
  id: number;
  projectId: number;
  name: string;
  color: string;
}

export interface TaskDto {
  id: number;
  taskCode: string;
  projectId: number;
  parentTaskId: number | null;
  title: string;
  body: string | null;            // Tiptap JSON 문자열
  statusId: number;
  screenType: ScreenType | null;
  devPlatform: DevPlatform | null;
  assigneeIds: number[];
  watcherIds: number[];
  tagIds: number[];
  startDate: string | null;
  dueDate: string | null;
  completedAt: string | null;
  requestNo: string | null;
  customerName: string | null;
  requester: string | null;
  erpProgramId: string | null;
  externalLinkIo: string | null;
  externalLinkSpec: string | null;
  createdById: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CommentDto {
  id: number;
  taskId: number;
  parentCommentId: number | null;
  body: string;
  authorId: number;
  mentionedUserIds: number[];
  createdAt: string;
}

export interface NotificationDto {
  id: number;
  recipientId: number;
  type: NotificationType;
  taskId: number | null;
  taskCode: string | null;
  message: string;
  channels: NotificationChannel[];
  isRead: boolean;
  createdAt: string;
}

export interface TemplateDto {
  id: number;
  projectId: number;
  name: string;
  titlePattern: string | null;
  bodyContent: string | null;
  defaultStatusId: number | null;
  defaultTagIds: number[];
}

export interface WikiPageDto {
  id: number;
  projectId: number | null;
  parentPageId: number | null;
  title: string;
  body: string | null;
  createdById: number;
  updatedAt: string;
}

// 입력용 타입
export interface CreateTaskInput {
  projectId: number;
  title: string;
  body?: string | null;
  statusId: number;
  screenType?: ScreenType | null;
  devPlatform?: DevPlatform | null;
  assigneeIds: number[];
  watcherIds: number[];
  tagIds: number[];
  startDate?: string | null;
  dueDate?: string | null;
  parentTaskId?: number | null;
}
