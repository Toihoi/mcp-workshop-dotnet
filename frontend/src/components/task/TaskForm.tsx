import React, { useState } from 'react';
import { useProjectStore } from '@/stores/projectStore';
import { useStatuses } from '@/api/statuses';
import { useTags } from '@/api/tags';
import { useUsers } from '@/api/users';
import { useCreateTask } from '@/api/tasks';
import Button from '@/components/common/Button';
import Select from '@/components/common/Select';
import './TaskForm.css';

interface TaskFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSuccess, onCancel }) => {
  const { currentProjectId } = useProjectStore();
  const { data: statuses } = useStatuses(currentProjectId);
  const { data: tags } = useTags(currentProjectId);
  const { data: users } = useUsers();
  const createTaskMutation = useCreateTask();

  const [title, setTitle] = useState('');
  const [statusId, setStatusId] = useState<number>(statuses?.[0]?.id || 0);
  const [assigneeIds, setAssigneeIds] = useState<number[]>([]);
  const [tagIds, setTagIds] = useState<number[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTaskMutation.mutateAsync({
      projectId: currentProjectId,
      title,
      statusId: statusId || statuses?.[0]?.id || 0,
      assigneeIds,
      tagIds,
      watcherIds: [],
    });
    onSuccess();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>제목</label>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="업무 제목을 입력하세요"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>상태</label>
          <Select
            options={statuses?.map(s => ({ value: s.id, label: s.name })) || []}
            value={statusId}
            onChange={setStatusId}
          />
        </div>
      </div>

      <div className="form-group">
        <label>담당자</label>
        <Select
          multiple
          options={users?.map(u => ({ value: u.id, label: u.name })) || []}
          value={assigneeIds}
          onChange={setAssigneeIds}
        />
      </div>

      <div className="form-group">
        <label>태그</label>
        <Select
          multiple
          options={tags?.map(t => ({ value: t.id, label: t.name })) || []}
          value={tagIds}
          onChange={setTagIds}
        />
      </div>

      <div className="task-form__actions">
        <Button variant="secondary" type="button" onClick={onCancel}>취소</Button>
        <Button type="submit" loading={createTaskMutation.isPending}>생성</Button>
      </div>
    </form>
  );
};

export default TaskForm;
