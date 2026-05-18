import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useProjectStore } from '@/stores/projectStore';
import { useUIStore } from '@/stores/uiStore';
import { useTasks } from '@/api/tasks';
import { useStatuses } from '@/api/statuses';
import Spinner from '@/components/common/Spinner';
import './TaskCalendar.css';

const TaskCalendar: React.FC = () => {
  const { currentProjectId } = useProjectStore();
  const { openModal } = useUIStore();
  const { data: tasks, isLoading } = useTasks(currentProjectId);
  const { data: statuses } = useStatuses(currentProjectId);

  if (isLoading) return <Spinner fullPage />;

  const events = tasks?.filter(t => t.dueDate).map(task => {
    const status = statuses?.find(s => s.id === task.statusId);
    return {
      id: String(task.id),
      title: `${task.taskCode} ${task.title}`,
      start: task.dueDate!,
      backgroundColor: status?.color || 'var(--color-primary)',
      borderColor: status?.color || 'var(--color-primary)',
      extendedProps: task,
    };
  });

  const handleEventClick = (info: any) => {
    openModal('taskDetail', info.event.extendedProps);
  };

  return (
    <div className="task-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        events={events}
        eventClick={handleEventClick}
        locale="ko"
        height="100%"
      />
    </div>
  );
};

export default TaskCalendar;
