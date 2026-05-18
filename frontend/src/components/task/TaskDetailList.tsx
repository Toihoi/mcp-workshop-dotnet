import React, { useState } from 'react';
import { TaskDto, UserDto, StatusDto, TagDto } from '@/types/api';
import Avatar from '@/components/common/Avatar';
import StatusBadge from '@/components/common/StatusBadge';
import { format } from 'date-fns';
import './TaskDetailList.css';

interface TaskDetailListProps {
  tasks: TaskDto[];
  users: UserDto[];
  statuses: StatusDto[];
  tags: TagDto[];
}

const TaskDetailList: React.FC<TaskDetailListProps> = ({ tasks, users, statuses, tags }) => {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(tasks[0]?.id || null);
  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  const getUser = (id: number) => users.find(u => u.id === id);
  const getStatus = (id: number) => statuses.find(s => s.id === id);

  return (
    <div className="task-detail-list">
      <div className="task-detail-list__sidebar scroll-y">
        {tasks.map(task => {
          const status = getStatus(task.statusId);
          const assignee = getUser(task.assigneeIds[0]);
          return (
            <div
              key={task.id}
              className={`task-summary-card ${selectedTaskId === task.id ? 'task-summary-card--selected' : ''}`}
              onClick={() => setSelectedTaskId(task.id)}
            >
              <div className="task-summary-card__header">
                <span className="task-summary-card__code">{task.taskCode}</span>
                {status && <StatusBadge name={status.name} color={status.color} />}
              </div>
              <h3 className="task-summary-card__title">{task.title}</h3>
              <div className="task-summary-card__footer">
                <div className="task-summary-card__meta">
                  {assignee && <Avatar name={assignee.name} size="sm" />}
                  <span>{assignee?.name}</span>
                </div>
                <div className="task-summary-card__date">
                  {task.dueDate ? format(new Date(task.dueDate), 'MM-dd') : '-'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="task-detail-list__content scroll-y">
        {selectedTask ? (
          <div className="task-full-view">
            <header className="task-full-view__header">
              <div className="task-full-view__meta">
                <span className="task-full-view__code">{selectedTask.taskCode}</span>
                {getStatus(selectedTask.statusId) && (
                  <StatusBadge
                    name={getStatus(selectedTask.statusId)!.name}
                    color={getStatus(selectedTask.statusId)!.color}
                  />
                )}
              </div>
              <h1 className="task-full-view__title">{selectedTask.title}</h1>
            </header>
            <div className="task-full-view__body">
               {/* Body will be rendered with Tiptap parser in real modal, here simplified */}
               <p>{selectedTask.title} 의 상세 내용 영역입니다.</p>
            </div>
          </div>
        ) : (
          <div className="task-detail-list__empty">테스크를 선택해주세요.</div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailList;
