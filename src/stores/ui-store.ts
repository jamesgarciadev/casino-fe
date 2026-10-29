import { createStore } from "zustand/vanilla";

/** Client UI state only. Server data lives in the GraphQL client cache, never here. */
export type UiState = {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
};

export type UiActions = {
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
};

export type UiStore = UiState & UiActions;

export const defaultUiState: UiState = {
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
};

export function createUiStore(initialState: UiState = defaultUiState) {
  return createStore<UiStore>()((set) => ({
    ...initialState,
    toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    toggleMobileSidebar: () => set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),
    closeMobileSidebar: () => set({ mobileSidebarOpen: false }),
  }));
}
