import React from 'react';
import './DatePicker.css';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, ...props }) => {
  return (
    <div className="date-picker">
      {label && <label className="date-picker__label">{label}</label>}
      <input type="date" className="input date-picker__input" {...props} />
    </div>
  );
};

export default DatePicker;
