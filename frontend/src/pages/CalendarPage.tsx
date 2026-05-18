import React from 'react';
import TaskCalendar from '@/components/calendar/TaskCalendar';
import './CalendarPage.css';

const CalendarPage: React.FC = () => {
  return (
    <div className="calendar-page">
      <header className="calendar-page__header">
        <h1 className="calendar-page__title">캘린더</h1>
      </header>
      <div className="calendar-page__content">
        <TaskCalendar />
      </div>
    </div>
  );
};

export default CalendarPage;
