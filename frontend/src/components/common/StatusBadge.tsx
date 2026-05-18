import React from 'react';
import './StatusBadge.css';

interface StatusBadgeProps {
  name: string;
  color: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ name, color }) => {
  return (
    <span className="status-badge" style={{ backgroundColor: color }}>
      {name}
    </span>
  );
};

export default StatusBadge;
