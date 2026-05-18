import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import './Select.css';

interface Option {
  value: any;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: any | any[];
  onChange: (value: any) => void;
  multiple?: boolean;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, multiple = false, placeholder = '선택...' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (option: Option) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(option.value)) {
        onChange(currentValues.filter((v) => v !== option.value));
      } else {
        onChange([...currentValues, option.value]);
      }
    } else {
      onChange(option.value);
      setIsOpen(false);
    }
  };

  const selectedLabels = multiple
    ? options.filter((o) => (value as any[]).includes(o.value)).map((o) => o.label).join(', ')
    : options.find((o) => o.value === value)?.label;

  return (
    <div className="custom-select" ref={containerRef}>
      <div className="custom-select__trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className={selectedLabels ? '' : 'placeholder'}>
          {selectedLabels || placeholder}
        </span>
        <ChevronDown size={16} />
      </div>
      {isOpen && (
        <div className="custom-select__options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-select__option ${
                multiple
                  ? (value as any[]).includes(option.value) ? 'custom-select__option--selected' : ''
                  : value === option.value ? 'custom-select__option--selected' : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
