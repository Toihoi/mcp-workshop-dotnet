import React from 'react';
import './MentionList.css';

interface MentionListProps {
  items: string[];
  command: (item: any) => void;
}

const MentionList = React.forwardRef((props: MentionListProps, ref) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command({ id: item });
    }
  };

  React.useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
        return true;
      }
      if (event.key === 'ArrowDown') {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
        return true;
      }
      if (event.key === 'Enter') {
        selectItem(selectedIndex);
        return true;
      }
      return false;
    },
  }));

  return (
    <div className="mention-list" ref={ref as any}>
      {props.items.length ? (
        props.items.map((item, index) => (
          <button
            className={`mention-list__item ${index === selectedIndex ? 'mention-list__item--selected' : ''}`}
            key={item}
            onClick={() => selectItem(index)}
          >
            {item}
          </button>
        ))
      ) : (
        <div className="mention-list__item">No result</div>
      )}
    </div>
  );
});

export default MentionList;
