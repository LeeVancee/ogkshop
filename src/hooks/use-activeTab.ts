// store/useAuthStore.ts
import { create } from 'zustand';

interface AuthState {
  activeTab: string;
  changeActiveTab: (tab: string) => void;
}

export const useActiveTabStore = create<AuthState>((set) => ({
  activeTab: 'login',
  changeActiveTab: (tab) => set({ activeTab: tab }),
}));
