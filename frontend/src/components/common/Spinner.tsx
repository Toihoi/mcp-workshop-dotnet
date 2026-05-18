import React from 'react';
import './Spinner.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', fullPage = false }) => {
  const content = <div className={`spinner spinner--${size}`} />;

  if (fullPage) {
    return <div className="spinner-overlay">{content}</div>;
  }

  return content;
};

export default Spinner;
