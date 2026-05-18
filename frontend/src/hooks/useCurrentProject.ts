import { useProjectStore } from '@/stores/projectStore';
import { useProject } from '@/api/projects';

export function useCurrentProject() {
  const { currentProjectId } = useProjectStore();
  return useProject(currentProjectId);
}
