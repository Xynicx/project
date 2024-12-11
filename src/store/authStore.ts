import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  emailNotifications: boolean;
  competitionAlerts: boolean;
  achievementAlerts: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  bio?: string;
  location?: string;
  preferences?: UserPreferences;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);