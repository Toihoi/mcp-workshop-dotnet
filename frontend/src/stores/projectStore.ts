import { create } from 'zustand';

interface ProjectState {
  currentProjectId: number;
  setCurrentProject: (id: number) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  currentProjectId: 1,
  setCurrentProject: (id) => set({ currentProjectId: id }),
}));
