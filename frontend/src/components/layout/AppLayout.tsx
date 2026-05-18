import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useSignalR } from '@/signalr/useSignalR';
import './AppLayout.css';

const AppLayout: React.FC = () => {
  useSignalR();

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-layout__main">
        <TopBar />
        <main className="app-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
