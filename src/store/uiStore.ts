import { create } from 'zustand';

interface UiState {
  activeTab: 'personalInfo' | 'pages';
  selectedPageId: string | null;
  isExporting: boolean;
  setActiveTab: (tab: UiState['activeTab']) => void;
  selectPage: (id: string | null) => void;
  setExporting: (v: boolean) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  activeTab: 'personalInfo',
  selectedPageId: null,
  isExporting: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  selectPage: (id) => set({ selectedPageId: id }),
  setExporting: (v) => set({ isExporting: v }),
}));
