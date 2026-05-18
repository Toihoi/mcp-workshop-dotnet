import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ListTodo,
  Calendar,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: '대시보드' },
    { to: '/tasks', icon: <ListTodo size={20} />, label: 'Task 목록' },
    { to: '/calendar', icon: <Calendar size={20} />, label: '캘린더' },
    { to: '/wiki', icon: <FileText size={20} />, label: '위키' },
    { to: '/settings', icon: <Settings size={20} />, label: '설정' },
  ];

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__logo">
        <span className="logo-icon">P</span>
        {!sidebarCollapsed && <span className="logo-text">PRO-COLLAB</span>}
      </div>

      <nav className="sidebar__nav">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
          >
            <span className="nav-item__icon">{item.icon}</span>
            {!sidebarCollapsed && <span className="nav-item__label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <button className="sidebar__toggle" onClick={toggleSidebar}>
        {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
};

export default Sidebar;
