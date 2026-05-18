import React from 'react';
import './TagBadge.css';

interface TagBadgeProps {
  name: string;
  color: string;
  onRemove?: () => void;
}

const TagBadge: React.FC<TagBadgeProps> = ({ name, color, onRemove }) => {
  return (
    <span className="tag-badge" style={{ backgroundColor: `${color}15`, color, borderColor: `${color}40` }}>
      {name}
      {onRemove && (
        <button className="tag-badge__remove" onClick={onRemove}>×</button>
      )}
    </span>
  );
};

export default TagBadge;
