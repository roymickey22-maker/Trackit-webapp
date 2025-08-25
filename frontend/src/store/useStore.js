import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // Auth state
      user: null,
      token: localStorage.getItem('token'),
      isAuthenticated: false,

      // Items cache
      itemsCache: {
        lost: [],
        found: [],
        lastFetch: null
      },

      // Notifications
      notifications: [],

      // UI state
      isLoading: false,
      error: null,

      // Auth actions
      setAuth: (user, token) => {
        if (token) {
          localStorage.setItem('token', token);
        }
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        set({ user: null, token: null, isAuthenticated: false });
      },

      // Items actions
      setItems: (type, items) => set((state) => ({
        itemsCache: {
          ...state.itemsCache,
          [type]: items,
          lastFetch: Date.now()
        }
      })),

      addItem: (item) => set((state) => ({
        itemsCache: {
          ...state.itemsCache,
          [item.type.toLowerCase()]: [item, ...state.itemsCache[item.type.toLowerCase()]]
        }
      })),

      removeItem: (itemId, type) => set((state) => ({
        itemsCache: {
          ...state.itemsCache,
          [type]: state.itemsCache[type].filter(item => item._id !== itemId)
        }
      })),

      // Notifications actions
      addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications.slice(0, 49)] // Keep last 50
      })),

      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),

      clearNotifications: () => set({ notifications: [] }),

      // UI actions
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'trackit-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useStore;