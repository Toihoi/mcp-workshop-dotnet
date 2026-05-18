import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_MOCK } from './config';
import { apiClient } from './client';
import { db, nextTaskId } from '@/mocks/db';
import { delay } from '@/mocks/latency';
import type { TaskDto, CreateTaskInput } from '@/types/api';

export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  list: (projectId: number, filters?: object) =>
    [...taskKeys.lists(), projectId, filters] as const,
  details: () => [...taskKeys.all, 'detail'] as const,
  detail: (id: number) => [...taskKeys.details(), id] as const,
};

async function fetchTasks(projectId: number): Promise<TaskDto[]> {
  if (USE_MOCK) {
    await delay();
    return db.tasks.filter((t) => t.projectId === projectId && !t.deletedAt);
  }
  return apiClient.get<TaskDto[]>(`/api/projects/${projectId}/tasks`).then((r) => r.data);
}

async function fetchTask(id: number): Promise<TaskDto> {
  if (USE_MOCK) {
    await delay();
    const task = db.tasks.find((t) => t.id === id && !t.deletedAt);
    if (!task) throw new Error('Task not found');
    return task;
  }
  return apiClient.get<TaskDto>(`/api/tasks/${id}`).then((r) => r.data);
}

async function createTaskReq(input: CreateTaskInput): Promise<TaskDto> {
  if (USE_MOCK) {
    await delay();
    const project = db.projects.find((p) => p.id === input.projectId)!;
    const seq = db.tasks.filter((t) => t.projectId === input.projectId).length + 1;
    const newTask: TaskDto = {
      ...input,
      id: nextTaskId(),
      taskCode: `${project.initial}-${String(seq).padStart(4, '0')}`,
      body: input.body ?? null,
      screenType: input.screenType ?? null,
      devPlatform: input.devPlatform ?? null,
      startDate: input.startDate ?? null,
      dueDate: input.dueDate ?? null,
      parentTaskId: input.parentTaskId ?? null,
      completedAt: null,
      requestNo: null,
      customerName: null,
      requester: null,
      erpProgramId: null,
      externalLinkIo: null,
      externalLinkSpec: null,
      createdById: 1, // Logged in as 김철수
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    };
    db.tasks.push(newTask);
    return newTask;
  }
  return apiClient.post<TaskDto>(`/api/projects/${input.projectId}/tasks`, input).then((r) => r.data);
}

async function updateTaskReq({ id, ...updates }: Partial<TaskDto> & { id: number }): Promise<TaskDto> {
  if (USE_MOCK) {
    await delay();
    const index = db.tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Task not found');
    db.tasks[index] = { ...db.tasks[index], ...updates, updatedAt: new Date().toISOString() };
    return db.tasks[index];
  }
  return apiClient.patch<TaskDto>(`/api/tasks/${id}`, updates).then((r) => r.data);
}

export function useTasks(projectId: number) {
  return useQuery({
    queryKey: taskKeys.list(projectId),
    queryFn: () => fetchTasks(projectId),
    enabled: !!projectId,
  });
}

export function useTask(id: number) {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => fetchTask(id),
    enabled: !!id,
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTaskReq,
    onSuccess: (task) => {
      qc.invalidateQueries({ queryKey: taskKeys.list(task.projectId) });
    },
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateTaskReq,
    onSuccess: (task) => {
      qc.invalidateQueries({ queryKey: taskKeys.list(task.projectId) });
      qc.invalidateQueries({ queryKey: taskKeys.detail(task.id) });
    },
  });
}

export function useChangeTaskStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ taskId, statusId }: { taskId: number; statusId: number }) => {
      if (USE_MOCK) {
        await delay(150);
        const task = db.tasks.find((t) => t.id === taskId)!;
        task.statusId = statusId;
        task.updatedAt = new Date().toISOString();
        return task;
      }
      return apiClient.patch(`/api/tasks/${taskId}/status`, { statusId }).then((r) => r.data);
    },
    onSuccess: (task) => {
      qc.invalidateQueries({ queryKey: taskKeys.list(task.projectId) });
      qc.invalidateQueries({ queryKey: taskKeys.detail(task.id) });
    },
  });
}
