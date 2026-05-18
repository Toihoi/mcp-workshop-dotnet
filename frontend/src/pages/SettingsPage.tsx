import React, { useState } from 'react';
import { useProjectStore } from '@/stores/projectStore';
import { useStatuses } from '@/api/statuses';
import { useTags } from '@/api/tags';
import { useTemplates } from '@/api/templates';
import Tabs from '@/components/common/Tabs';
import Button from '@/components/common/Button';
import StatusBadge from '@/components/common/StatusBadge';
import TagBadge from '@/components/common/TagBadge';
import './SettingsPage.css';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('statuses');
  const { currentProjectId } = useProjectStore();

  const { data: statuses } = useStatuses(currentProjectId);
  const { data: tags } = useTags(currentProjectId);
  const { data: templates } = useTemplates(currentProjectId);

  return (
    <div className="settings-page">
      <header className="settings-page__header">
        <h1 className="settings-page__title">설정</h1>
      </header>

      <Tabs
        tabs={[
          { id: 'statuses', label: '업무상태' },
          { id: 'tags', label: '태그' },
          { id: 'templates', label: '템플릿' },
          { id: 'notifications', label: '알림 설정' }
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      >
        <div className="settings-content">
          {activeTab === 'statuses' && (
            <div className="settings-section">
              <div className="settings-section__header">
                <h3>업무 상태 관리</h3>
                <Button size="sm">상태 추가</Button>
              </div>
              <table className="settings-table">
                <thead>
                  <tr>
                    <th>순서</th>
                    <th>상태명</th>
                    <th>ERP 코드</th>
                    <th>카테고리</th>
                    <th>색상</th>
                  </tr>
                </thead>
                <tbody>
                  {statuses?.map(s => (
                    <tr key={s.id}>
                      <td>{s.sortOrder}</td>
                      <td><StatusBadge name={s.name} color={s.color} /></td>
                      <td>{s.erpCode}</td>
                      <td>{s.category}</td>
                      <td>
                        <div className="color-preview" style={{ backgroundColor: s.color }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'tags' && (
            <div className="settings-section">
              <div className="settings-section__header">
                <h3>태그 관리</h3>
                <Button size="sm">태그 추가</Button>
              </div>
              <div className="tags-grid">
                {tags?.map(t => (
                  <div key={t.id} className="tag-card">
                    <TagBadge name={t.name} color={t.color} />
                    <Button size="sm" variant="ghost">편집</Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="settings-section">
              <div className="settings-section__header">
                <h3>템플릿 관리</h3>
                <Button size="sm">템플릿 추가</Button>
              </div>
              <div className="templates-list">
                {templates?.map(t => (
                  <div key={t.id} className="card template-item">
                    <div className="template-item__info">
                      <h4 className="template-item__name">{t.name}</h4>
                      <p className="template-item__pattern">패턴: {t.titlePattern || '없음'}</p>
                    </div>
                    <Button size="sm" variant="secondary">편집</Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <div className="settings-section__header">
                <h3>알림 채널 설정</h3>
              </div>
              <div className="card notification-settings">
                <table className="notification-table">
                  <thead>
                    <tr>
                      <th>알림 유형</th>
                      <th>In-App</th>
                      <th>Email</th>
                      <th>Teams</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['새 Task', '새 댓글', '멘션', '만기 임박', '상태 변경'].map(type => (
                      <tr key={type}>
                        <td>{type}</td>
                        <td><input type="checkbox" defaultChecked /></td>
                        <td><input type="checkbox" /></td>
                        <td><input type="checkbox" defaultChecked /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
