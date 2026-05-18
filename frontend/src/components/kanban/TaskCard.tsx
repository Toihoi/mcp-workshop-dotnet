import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { TaskDto, UserDto, TagDto } from '@/types/api';
import Avatar from '@/components/common/Avatar';
import TagBadge from '@/components/common/TagBadge';
import { format } from 'date-fns';
import { CSS } from '@dnd-kit/utilities';
import './TaskCard.css';

interface TaskCardProps {
  task: TaskDto;
  users: UserDto[];
  tags: TagDto[];
  onClick: (task: TaskDto) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, users, tags, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: task,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  const getUser = (id: number) => users.find(u => u.id === id);
  const getTag = (id: number) => tags.find(t => t.id === id);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="task-card"
      onClick={() => onClick(task)}
      {...listeners}
      {...attributes}
    >
      <div className="task-card__header">
        <span className="task-card__code">{task.taskCode}</span>
        <div className="task-card__assignees">
          {task.assigneeIds.slice(0, 3).map(id => {
            const user = getUser(id);
            return user ? <Avatar key={id} name={user.name} size="sm" /> : null;
          })}
        </div>
      </div>
      <h4 className="task-card__title">{task.title}</h4>
      <div className="task-card__tags">
        {task.tagIds.slice(0, 2).map(id => {
          const tag = getTag(id);
          return tag ? <TagBadge key={id} name={tag.name} color={tag.color} /> : null;
        })}
      </div>
      {task.dueDate && (
        <div className="task-card__date">
          {format(new Date(task.dueDate), 'MM-dd')}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
