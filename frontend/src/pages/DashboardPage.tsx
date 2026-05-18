import React from 'react';
import { useProjectStore } from '@/stores/projectStore';
import { useProjects, useProject } from '@/api/projects';
import { useTasks } from '@/api/tasks';
import { useStatuses } from '@/api/statuses';
import { useTags } from '@/api/tags';
import { useNotifications } from '@/api/notifications';
import { useUsers } from '@/api/users';
import ProgressDonut from '@/components/chart/ProgressDonut';
import BarByMember from '@/components/chart/BarByMember';
import BarByTag from '@/components/chart/BarByTag';
import Spinner from '@/components/common/Spinner';
import Avatar from '@/components/common/Avatar';
import StatusBadge from '@/components/common/StatusBadge';
import Button from '@/components/common/Button';
import { FileText } from 'lucide-react';
import { format } from 'date-fns';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const { currentProjectId } = useProjectStore();
  const { openModal } = useUIStore();
  const { data: project, isLoading: projectLoading } = useProject(currentProjectId);
  const { data: tasks, isLoading: tasksLoading } = useTasks(currentProjectId);
  const { data: statuses } = useStatuses(currentProjectId);
  const { data: tags } = useTags(currentProjectId);
  const { data: templates } = useTemplates(currentProjectId);
  const { data: notifications } = useNotifications();
  const { data: users } = useUsers();

  if (projectLoading || tasksLoading) return <Spinner fullPage />;
  if (!project || !tasks) return null;

  // Data processing
  const completedTasks = tasks.filter(t => t.completedAt).length;
  const totalTasks = tasks.length;

  const tasksByMember = users?.map(u => ({
    name: u.name,
    count: tasks.filter(t => t.assigneeIds.includes(u.id)).length
  })).filter(d => d.count > 0) || [];

  const tasksByTag = tags?.map(tag => ({
    name: tag.name,
    count: tasks.filter(t => t.tagIds.includes(tag.id)).length,
    color: tag.color
  })).filter(d => d.count > 0) || [];

  const tasksByStatus = statuses?.map(s => ({
    status: s,
    count: tasks.filter(t => t.statusId === s.id).length
  })) || [];

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <h1 className="dashboard-page__title">{project.name} 대시보드</h1>
        <div className="dashboard-page__subtitle">{project.initial} 프로젝트 현황입니다.</div>
      </header>

      <div className="dashboard-page__grid">
        {/* Project Info */}
        <section className="card dashboard-widget">
          <h2 className="dashboard-widget__title">프로젝트 정보</h2>
          <div className="project-info">
            <div className="project-info__item">
              <span className="label">유형:</span>
              <span className={`badge badge--${project.type.toLowerCase()}`}>{project.type}</span>
            </div>
            <div className="project-info__item">
              <span className="label">기간:</span>
              <span>{project.startDate} ~ {project.endDate}</span>
            </div>
            <p className="project-info__description">{project.description}</p>
          </div>
        </section>

        {/* Progress Donut */}
        <section className="card dashboard-widget">
          <h2 className="dashboard-widget__title">전체 진행률</h2>
          <ProgressDonut completed={completedTasks} total={totalTasks} />
        </section>

        {/* Tasks by Member */}
        <section className="card dashboard-widget">
          <h2 className="dashboard-widget__title">멤버별 업무 현황</h2>
          <BarByMember data={tasksByMember} />
        </section>

        {/* Tasks by Tag */}
        <section className="card dashboard-widget">
          <h2 className="dashboard-widget__title">태그별 업무 분포</h2>
          <BarByTag data={tasksByTag} />
        </section>

        {/* Tasks by Status */}
        <section className="card dashboard-widget dashboard-widget--full">
          <h2 className="dashboard-widget__title">업무 상태별 현황</h2>
          <div className="status-grid">
            {tasksByStatus.map(({ status, count }) => (
              <div key={status.id} className="status-card">
                <div className="status-card__color" style={{ backgroundColor: status.color }} />
                <div className="status-card__info">
                  <div className="status-card__name">{status.name}</div>
                  <div className="status-card__count">{count}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Template Shortcuts */}
        <section className="card dashboard-widget">
          <h2 className="dashboard-widget__title">템플릿 바로쓰기</h2>
          <div className="template-shortcuts">
            {templates?.map(t => (
              <Button
                key={t.id}
                variant="secondary"
                className="template-btn"
                onClick={() => openModal('newTask', { templateId: t.id })}
              >
                <FileText size={16} />
                {t.name}
              </Button>
            ))}
          </div>
        </section>

        {/* Recent Notifications */}
        <section className="card dashboard-widget">
          <h2 className="dashboard-widget__title">최근 알림</h2>
          <div className="recent-notifications">
            {notifications?.slice(0, 5).map(n => (
              <div key={n.id} className="notification-item">
                <div className="notification-item__msg">{n.message}</div>
                <div className="notification-item__time">{format(new Date(n.createdAt), 'MM-dd HH:mm')}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
