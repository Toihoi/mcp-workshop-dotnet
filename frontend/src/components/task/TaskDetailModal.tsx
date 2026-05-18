import React from 'react';
import { useUIStore } from '@/stores/uiStore';
import { useTask, useUpdateTask } from '@/api/tasks';
import { useStatuses } from '@/api/statuses';
import { useTags } from '@/api/tags';
import { useUsers } from '@/api/users';
import Modal from '@/components/common/Modal';
import TiptapEditor from '@/components/editor/TiptapEditor';
import CommentThread from './CommentThread';
import Select from '@/components/common/Select';
import StatusBadge from '@/components/common/StatusBadge';
import TagBadge from '@/components/common/TagBadge';
import Avatar from '@/components/common/Avatar';
import Spinner from '@/components/common/Spinner';
import './TaskDetailModal.css';

const TaskDetailModal: React.FC = () => {
  const { modal, closeModal, showToast } = useUIStore();
  const taskId = modal.data?.id;

  const { data: task, isLoading } = useTask(taskId);
  const { data: statuses } = useStatuses(task?.projectId || 0);
  const { data: tags } = useTags(task?.projectId || 0);
  const { data: users } = useUsers();

  const updateTaskMutation = useUpdateTask();

  if (modal.type !== 'taskDetail') return null;

  const handleStatusChange = async (statusId: number) => {
    if (!task) return;
    try {
      await updateTaskMutation.mutateAsync({ id: task.id, statusId });
      showToast('상태가 변경되었습니다.');
    } catch (e) {
      showToast('실패했습니다.', 'error');
    }
  };

  const handleTitleBlur = (e: React.FocusEvent<HTMLHeadingElement>) => {
    if (!task) return;
    const newTitle = e.target.innerText;
    if (newTitle !== task.title) {
      updateTaskMutation.mutate({ id: task.id, title: newTitle });
    }
  };

  const statusOptions = statuses?.map(s => ({ value: s.id, label: s.name })) || [];

  return (
    <Modal
      isOpen={!!modal.type}
      onClose={closeModal}
      title={task?.taskCode || 'Task 상세'}
      width="1000px"
    >
      {isLoading || !task ? <Spinner /> : (
        <div className="task-detail">
          <div className="task-detail__main">
            <h1
              className="task-detail__title"
              contentEditable
              onBlur={handleTitleBlur}
              suppressContentEditableWarning
            >
              {task.title}
            </h1>

            <div className="task-detail__section">
              <label className="task-detail__label">상세 내용</label>
              <TiptapEditor
                content={task.body || ''}
                onChange={(body) => updateTaskMutation.mutate({ id: task.id, body })}
              />
            </div>

            <CommentThread taskId={task.id} />
          </div>

          <aside className="task-detail__side">
            <div className="side-item">
              <label className="side-item__label">상태</label>
              <Select
                options={statusOptions}
                value={task.statusId}
                onChange={handleStatusChange}
              />
            </div>

            <div className="side-item">
              <label className="side-item__label">담당자</label>
              <div className="side-item__avatars">
                {task.assigneeIds.map(id => {
                  const user = users?.find(u => u.id === id);
                  return user ? (
                    <div key={id} className="avatar-with-name">
                      <Avatar name={user.name} size="sm" />
                      <span>{user.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            <div className="side-item">
              <label className="side-item__label">태그</label>
              <div className="side-item__tags">
                {task.tagIds.map(id => {
                  const tag = tags?.find(t => t.id === id);
                  return tag ? <TagBadge key={id} name={tag.name} color={tag.color} /> : null;
                })}
              </div>
            </div>

            <div className="side-item">
              <label className="side-item__label">만기일</label>
              <input
                type="date"
                className="input"
                defaultValue={task.dueDate ? task.dueDate.split('T')[0] : ''}
                onChange={(e) => updateTaskMutation.mutate({ id: task.id, dueDate: e.target.value })}
              />
            </div>

            <div className="side-info">
              <div className="side-info__row">
                <span>등록자</span>
                <span>{users?.find(u => u.id === task.createdById)?.name}</span>
              </div>
              <div className="side-info__row">
                <span>등록일</span>
                <span>{task.createdAt.split('T')[0]}</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </Modal>
  );
};

export default TaskDetailModal;
