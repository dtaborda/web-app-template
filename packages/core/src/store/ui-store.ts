import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Global UI state store with localStorage persistence.
 *
 * Persisted state:
 * - theme: Light/dark mode preference
 * - sidebarOpen: Sidebar visibility state
 *
 * @example
 * const { theme, setTheme } = useUIStore()
 * const toggleSidebar = useUIStore((state) => state.toggleSidebar)
 */

export interface UIStore {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: 'light',
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-store', // localStorage key
      // Only persist theme and sidebar state
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
)
