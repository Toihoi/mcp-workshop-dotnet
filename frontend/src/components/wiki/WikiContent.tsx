import React, { useState } from 'react';
import { WikiPageDto } from '@/types/api';
import { useUpdateWikiPage } from '@/api/wiki';
import Button from '@/components/common/Button';
import { format } from 'date-fns';
import './WikiContent.css';

interface WikiContentProps {
  page: WikiPageDto | null;
}

const WikiContent: React.FC<WikiContentProps> = ({ page }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState('');
  const updateWikiMutation = useUpdateWikiPage();

  React.useEffect(() => {
    if (page) {
      setEditedBody(page.body || '');
      setIsEditing(false);
    }
  }, [page]);

  if (!page) {
    return (
      <div className="wiki-content wiki-content--empty">
        페이지를 선택해주세요.
      </div>
    );
  }

  const handleSave = async () => {
    await updateWikiMutation.mutateAsync({ id: page.id, body: editedBody });
    setIsEditing(false);
  };

  return (
    <div className="wiki-content">
      <header className="wiki-content__header">
        <h1 className="wiki-content__title">{page.title}</h1>
        <div className="wiki-content__actions">
          {isEditing ? (
            <>
              <Button size="sm" variant="secondary" onClick={() => setIsEditing(false)}>취소</Button>
              <Button size="sm" onClick={handleSave} loading={updateWikiMutation.isPending}>저장</Button>
            </>
          ) : (
            <Button size="sm" variant="secondary" onClick={() => setIsEditing(true)}>편집</Button>
          )}
        </div>
      </header>
      <div className="wiki-content__meta">
        마지막 수정: {format(new Date(page.updatedAt), 'yyyy-MM-dd HH:mm')}
      </div>
      <div className="wiki-content__body">
        {isEditing ? (
          <textarea
            className="input wiki-content__textarea"
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
        ) : (
          <div className="wiki-content__text">
            {page.body || '내용이 없습니다.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default WikiContent;
