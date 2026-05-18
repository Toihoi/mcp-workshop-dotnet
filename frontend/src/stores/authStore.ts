import { create } from 'zustand';

interface AuthState {
  currentUserId: number;
}

export const useAuthStore = create<AuthState>(() => ({
  currentUserId: 1, // Logged in as 김철수
}));
