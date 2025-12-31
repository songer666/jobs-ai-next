export interface SidebarState {
  isCollapsed: boolean;
  initialized: boolean;
  setIsCollapsed: (value: boolean) => void;
  setInitialized: (value: boolean) => void;
  toggle: () => void;
}
