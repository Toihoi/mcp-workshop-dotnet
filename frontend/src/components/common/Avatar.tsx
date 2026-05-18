import React from 'react';
import './Avatar.css';

interface AvatarProps {
  name: string;
  url?: string | null;
  size?: 'sm' | 'md' | 'lg';
  company?: 'Internal' | 'Partner' | 'Customer';
}

const Avatar: React.FC<AvatarProps> = ({ name, url, size = 'md', company }) => {
  const initial = name.charAt(0);

  return (
    <div className={`avatar avatar--${size}`}>
      {url ? (
        <img src={url} alt={name} className="avatar__img" />
      ) : (
        <div className="avatar__initial">{initial}</div>
      )}
      {company && company !== 'Internal' && (
        <div className={`avatar__badge avatar__badge--${company.toLowerCase()}`}>
          {company === 'Partner' ? 'P' : 'C'}
        </div>
      )}
    </div>
  );
};

export default Avatar;
