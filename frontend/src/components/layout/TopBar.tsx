import React from 'react';
import { useProjectStore } from '@/stores/projectStore';
import { useProjects } from '@/api/projects';
import { useMe } from '@/api/users';
import Select from '@/components/common/Select';
import SearchBar from '@/components/common/SearchBar';
import NotificationBell from '@/components/notification/NotificationBell';
import Avatar from '@/components/common/Avatar';
import './TopBar.css';

const TopBar: React.FC = () => {
  const { currentProjectId, setCurrentProject } = useProjectStore();
  const { data: projects } = useProjects();
  const { data: me } = useMe();

  const projectOptions = projects?.map(p => ({ value: p.id, label: p.name })) || [];

  return (
    <header className="top-bar">
      <div className="top-bar__left">
        <div className="project-selector">
          <Select
            options={projectOptions}
            value={currentProjectId}
            onChange={(val) => setCurrentProject(val)}
            placeholder="프로젝트 선택"
          />
        </div>
      </div>

      <div className="top-bar__right">
        <SearchBar value="" onChange={() => {}} placeholder="전체 검색..." />
        <NotificationBell />
        <div className="user-profile">
          <div className="user-profile__info">
            <span className="user-profile__name">{me?.name}</span>
            <span className="user-profile__role">컨설턴트</span>
          </div>
          <Avatar name={me?.name || ''} size="md" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
