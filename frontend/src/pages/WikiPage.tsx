import React, { useState } from 'react';
import { useProjectStore } from '@/stores/projectStore';
import { useWikiPages, useWikiPage } from '@/api/wiki';
import WikiTree from '@/components/wiki/WikiTree';
import WikiContent from '@/components/wiki/WikiContent';
import Spinner from '@/components/common/Spinner';
import './WikiPage.css';

const WikiPage: React.FC = () => {
  const { currentProjectId } = useProjectStore();
  const [selectedPageId, setSelectedPageId] = useState<number | null>(null);

  const { data: pages, isLoading: listLoading } = useWikiPages(currentProjectId);
  const { data: page, isLoading: pageLoading } = useWikiPage(selectedPageId || 0);

  if (listLoading) return <Spinner fullPage />;

  return (
    <div className="wiki-page">
      <WikiTree
        pages={pages || []}
        selectedId={selectedPageId}
        onSelect={setSelectedPageId}
      />
      <WikiContent page={page || null} />
    </div>
  );
};

export default WikiPage;
