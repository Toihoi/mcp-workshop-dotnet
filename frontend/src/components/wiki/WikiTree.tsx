import React from 'react';
import { WikiPageDto } from '@/types/api';
import { ChevronRight, ChevronDown, FileText } from 'lucide-react';
import './WikiTree.css';

interface WikiTreeProps {
  pages: WikiPageDto[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const WikiTree: React.FC<WikiTreeProps> = ({ pages, selectedId, onSelect }) => {
  const [expanded, setExpanded] = React.useState<Record<number, boolean>>({});

  const toggleExpand = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTree = (parentId: number | null = null, level = 0) => {
    const children = pages.filter(p => p.parentPageId === parentId);
    if (children.length === 0) return null;

    return (
      <ul className="wiki-tree__list" style={{ marginLeft: level ? 16 : 0 }}>
        {children.map(page => {
          const hasChildren = pages.some(p => p.parentPageId === page.id);
          const isExpanded = expanded[page.id];

          return (
            <li key={page.id} className="wiki-tree__item">
              <div
                className={`wiki-tree__node ${selectedId === page.id ? 'wiki-tree__node--selected' : ''}`}
                onClick={() => onSelect(page.id)}
              >
                <span className="wiki-tree__toggle" onClick={(e) => toggleExpand(page.id, e)}>
                  {hasChildren ? (isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />) : <FileText size={14} />}
                </span>
                <span className="wiki-tree__title">{page.title}</span>
              </div>
              {hasChildren && isExpanded && renderTree(page.id, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav className="wiki-tree">
      <h3 className="wiki-tree__header">페이지 목록</h3>
      {renderTree()}
    </nav>
  );
};

export default WikiTree;
