import React from 'react';
import { TaskDto, UserDto, StatusDto, TagDto } from '@/types/api';
import Avatar from '@/components/common/Avatar';
import StatusBadge from '@/components/common/StatusBadge';
import TagBadge from '@/components/common/TagBadge';
import { format, differenceInDays } from 'date-fns';
import './TaskList.css';

interface TaskListProps {
  tasks: TaskDto[];
  users: UserDto[];
  statuses: StatusDto[];
  tags: TagDto[];
  onTaskClick: (task: TaskDto) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, users, statuses, tags, onTaskClick }) => {
  const getUser = (id: number) => users.find(u => u.id === id);
  const getStatus = (id: number) => statuses.find(s => s.id === id);
  const getTag = (id: number) => tags.find(t => t.id === id);

  const isUrgent = (dueDate: string | null) => {
    if (!dueDate) return false;
    const days = differenceInDays(new Date(dueDate), new Date());
    return days >= 0 && days <= 3;
  };

  return (
    <div className="task-list-wrapper">
      <table className="task-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>담당자</th>
            <th>상태</th>
            <th>태그</th>
            <th>만기일</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => {
            const status = getStatus(task.statusId);
            const urgent = isUrgent(task.dueDate);

            return (
              <tr
                key={task.id}
                className={`task-row ${urgent ? 'task-row--urgent' : ''}`}
                onClick={() => onTaskClick(task)}
              >
                <td>{task.taskCode}</td>
                <td className="task-row__title">{task.title}</td>
                <td>
                  <div className="assignees">
                    {task.assigneeIds.map(id => {
                      const user = getUser(id);
                      return user ? <Avatar key={id} name={user.name} size="sm" /> : null;
                    })}
                  </div>
                </td>
                <td>
                  {status && <StatusBadge name={status.name} color={status.color} />}
                </td>
                <td>
                  <div className="task-row__tags">
                    {task.tagIds.map(id => {
                      const tag = getTag(id);
                      return tag ? <TagBadge key={id} name={tag.name} color={tag.color} /> : null;
                    })}
                  </div>
                </td>
                <td className={urgent ? 'text-urgent' : ''}>
                  {task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '-'}
                </td>
                <td>
                  {format(new Date(task.createdAt), 'yyyy-MM-dd')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
