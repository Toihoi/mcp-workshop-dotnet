import React from 'react';
import { DndContext, DragOverlay, closestCorners, DragEndEvent } from '@dnd-kit/core';
import { StatusDto, TaskDto, UserDto, TagDto } from '@/types/api';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import './KanbanBoard.css';

interface KanbanBoardProps {
  statuses: StatusDto[];
  tasks: TaskDto[];
  users: UserDto[];
  tags: TagDto[];
  onTaskClick: (task: TaskDto) => void;
  onTaskStatusChange: (taskId: number, statusId: number) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  statuses,
  tasks,
  users,
  tags,
  onTaskClick,
  onTaskStatusChange
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as number;
    const newStatusId = over.id as number;

    const task = tasks.find(t => t.id === taskId);
    if (task && task.statusId !== newStatusId) {
      onTaskStatusChange(taskId, newStatusId);
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="kanban-board scroll-x">
        {statuses.map(status => (
          <KanbanColumn
            key={status.id}
            status={status}
            tasks={tasks.filter(t => t.statusId === status.id)}
            users={users}
            tags={tags}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
