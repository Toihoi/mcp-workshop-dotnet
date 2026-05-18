import { create } from 'zustand';
import { ScreenType, DevPlatform } from '@/types/domain';

interface FilterState {
  searchQuery: string;
  filters: {
    assigneeIds: number[];
    tagIds: number[];
    statusIds: number[];
    screenTypes: ScreenType[];
    devPlatforms: DevPlatform[];
  };
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<FilterState['filters']>) => void;
  setSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  clearFilters: () => void;
}

const initialFilters = {
  assigneeIds: [],
  tagIds: [],
  statusIds: [],
  screenTypes: [],
  devPlatforms: [],
};

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  filters: initialFilters,
  sortBy: 'createdAt',
  sortOrder: 'desc',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  setSort: (sortBy, sortOrder) => set({ sortBy, sortOrder }),
  clearFilters: () => set({ searchQuery: '', filters: initialFilters }),
}));
