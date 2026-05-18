import React from 'react';
import { X } from 'lucide-react';
import './FilterChips.css';

interface FilterChip {
  id: string;
  label: string;
  category: string;
}

interface FilterChipsProps {
  chips: FilterChip[];
  onRemove: (chip: FilterChip) => void;
  onClearAll: () => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ chips, onRemove, onClearAll }) => {
  if (chips.length === 0) return null;

  return (
    <div className="filter-chips">
      {chips.map((chip) => (
        <span key={`${chip.category}-${chip.id}`} className="filter-chip">
          <span className="filter-chip__category">{chip.category}:</span>
          <span className="filter-chip__label">{chip.label}</span>
          <button className="filter-chip__remove" onClick={() => onRemove(chip)}>
            <X size={12} />
          </button>
        </span>
      ))}
      <button className="filter-chips__clear" onClick={onClearAll}>
        모두 지우기
      </button>
    </div>
  );
};

export default FilterChips;
