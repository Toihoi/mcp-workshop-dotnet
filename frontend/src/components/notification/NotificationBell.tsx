import React from 'react';
import { useNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead } from '@/api/notifications';
import { Bell } from 'lucide-react';
import Dropdown from '@/components/common/Dropdown';
import Button from '@/components/common/Button';
import { format } from 'date-fns';
import './NotificationBell.css';

const NotificationBell: React.FC = () => {
  const { data: notifications } = useNotifications();
  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();

  const unreadCount = notifications?.filter(n => !n.isRead).length || 0;

  return (
    <Dropdown
      trigger={
        <div className="notification-bell">
          <Bell size={20} />
          {unreadCount > 0 && <span className="notification-bell__badge">{unreadCount}</span>}
        </div>
      }
    >
      <div className="notification-dropdown">
        <header className="notification-dropdown__header">
          <h3>알림</h3>
          <Button size="sm" variant="ghost" onClick={() => markAllAsRead.mutate()}>
            모두 읽음
          </Button>
        </header>
        <div className="notification-dropdown__list scroll-y">
          {notifications?.length === 0 ? (
            <div className="notification-dropdown__empty">새로운 알림이 없습니다.</div>
          ) : (
            notifications?.map(n => (
              <div
                key={n.id}
                className={`notification-item ${n.isRead ? '' : 'notification-item--unread'}`}
                onClick={() => markAsRead.mutate(n.id)}
              >
                <div className="notification-item__msg">{n.message}</div>
                <div className="notification-item__date">
                  {format(new Date(n.createdAt), 'MM-dd HH:mm')}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Dropdown>
  );
};

export default NotificationBell;
