import { create } from 'zustand';

export type ModalType =
  | 'taskDetail'
  | 'newTask'
  | 'statusEdit'
  | 'tagEdit'
  | 'templateEdit'
  | 'notificationSettings';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface UIState {
  sidebarCollapsed: boolean;
  modal: { type: ModalType | null; data: any };
  toasts: Toast[];
  toggleSidebar: () => void;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarCollapsed: false,
  modal: { type: null, data: null },
  toasts: [],
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  openModal: (type, data = null) => set({ modal: { type, data } }),
  closeModal: () => set({ modal: { type: null, data: null } }),
  showToast: (message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { id, type, message }] }));
    setTimeout(() => get().removeToast(id), 5000);
  },
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id),
  })),
}));
