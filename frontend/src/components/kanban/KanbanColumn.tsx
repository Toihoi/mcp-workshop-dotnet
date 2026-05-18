import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { StatusDto, TaskDto, UserDto, TagDto } from '@/types/api';
import TaskCard from './TaskCard';
import './KanbanColumn.css';

interface KanbanColumnProps {
  status: StatusDto;
  tasks: TaskDto[];
  users: UserDto[];
  tags: TagDto[];
  onTaskClick: (task: TaskDto) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, tasks, users, tags, onTaskClick }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`kanban-column ${isOver ? 'kanban-column--over' : ''}`}
    >
      <header className="kanban-column__header">
        <div className="kanban-column__title-wrap">
          <div className="kanban-column__color" style={{ backgroundColor: status.color }} />
          <h3 className="kanban-column__title">{status.name}</h3>
        </div>
        <span className="kanban-column__count">{tasks.length}</span>
      </header>
      <div className="kanban-column__list">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            users={users}
            tags={tags}
            onClick={onTaskClick}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
