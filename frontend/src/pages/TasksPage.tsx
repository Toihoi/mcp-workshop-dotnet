import React, { useState } from 'react';
import { useProjectStore } from '@/stores/projectStore';
import { useUIStore } from '@/stores/uiStore';
import { useFilterStore } from '@/stores/filterStore';
import { useTasks, useChangeTaskStatus } from '@/api/tasks';
import { useStatuses } from '@/api/statuses';
import { useTags } from '@/api/tags';
import { useUsers } from '@/api/users';
import Tabs from '@/components/common/Tabs';
import Button from '@/components/common/Button';
import SearchBar from '@/components/common/SearchBar';
import FilterChips from '@/components/common/FilterChips';
import TaskList from '@/components/task/TaskList';
import TaskDetailList from '@/components/task/TaskDetailList';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import Spinner from '@/components/common/Spinner';
import { Plus } from 'lucide-react';
import './TasksPage.css';

const TasksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list');
  const { currentProjectId } = useProjectStore();
  const { openModal, showToast } = useUIStore();
  const { searchQuery, setSearchQuery, clearFilters } = useFilterStore();

  const { data: tasks, isLoading: tasksLoading } = useTasks(currentProjectId);
  const { data: statuses } = useStatuses(currentProjectId);
  const { data: tags } = useTags(currentProjectId);
  const { data: users } = useUsers();

  const changeStatusMutation = useChangeTaskStatus();

  if (tasksLoading) return <Spinner fullPage />;
  if (!tasks || !statuses || !tags || !users) return null;

  // Simple filtering
  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.taskCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTaskClick = (task: any) => {
    openModal('taskDetail', task);
  };

  const handleStatusChange = async (taskId: number, statusId: number) => {
    try {
      await changeStatusMutation.mutateAsync({ taskId, statusId });
      showToast('상태가 변경되었습니다.', 'success');
    } catch (e) {
      showToast('변경에 실패했습니다.', 'error');
    }
  };

  return (
    <div className="tasks-page">
      <header className="tasks-page__header">
        <div className="tasks-page__top">
          <Tabs
            tabs={[
              { id: 'list', label: '목록' },
              { id: 'detail', label: '상세 목록' },
              { id: 'kanban', label: '칸반' }
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          >
            {null}
          </Tabs>
          <Button onClick={() => openModal('newTask')}>
            <Plus size={18} /> 새 Task
          </Button>
        </div>

        <div className="tasks-page__filters">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          {/* Detailed filters would go here */}
          <FilterChips chips={[]} onRemove={() => {}} onClearAll={clearFilters} />
        </div>
      </header>

      <div className="tasks-page__content">
        {activeTab === 'list' && (
          <TaskList
            tasks={filteredTasks}
            users={users}
            statuses={statuses}
            tags={tags}
            onTaskClick={handleTaskClick}
          />
        )}
        {activeTab === 'detail' && (
          <TaskDetailList
            tasks={filteredTasks}
            users={users}
            statuses={statuses}
            tags={tags}
          />
        )}
        {activeTab === 'kanban' && (
          <KanbanBoard
            statuses={statuses}
            tasks={filteredTasks}
            users={users}
            tags={tags}
            onTaskClick={handleTaskClick}
            onTaskStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
};

export default TasksPage;
