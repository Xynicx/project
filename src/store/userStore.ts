import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  picture: string;
  waterSaved: number;
  badgeLevel: 'bronze' | 'silver' | 'gold' | null;
  competitions: Competition[];
}

interface Competition {
  id: string;
  opponent: string;
  target: number;
  duration: 'week' | 'month';
  startDate: string;
  endDate: string;
  progress: number;
}

interface UserState {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  startCompetition: (userId: string, competition: Competition) => void;
}

// Simulated user data
const initialUsers: User[] = [
  {
    id: '1',
    name: 'Emma Watson',
    picture: 'https://i.pravatar.cc/150?u=emma',
    waterSaved: 6200,
    badgeLevel: 'gold',
    competitions: [],
  },
  {
    id: '2',
    name: 'Chris Evans',
    picture: 'https://i.pravatar.cc/150?u=chris',
    waterSaved: 3800,
    badgeLevel: 'silver',
    competitions: [],
  },
  {
    id: '3',
    name: 'Zoe Saldana',
    picture: 'https://i.pravatar.cc/150?u=zoe',
    waterSaved: 4500,
    badgeLevel: 'silver',
    competitions: [],
  },
  {
    id: '4',
    name: 'Tom Holland',
    picture: 'https://i.pravatar.cc/150?u=tom',
    waterSaved: 2100,
    badgeLevel: 'bronze',
    competitions: [],
  },
  {
    id: '5',
    name: 'Scarlett Johansson',
    picture: 'https://i.pravatar.cc/150?u=scarlett',
    waterSaved: 5800,
    badgeLevel: 'gold',
    competitions: [],
  },
];

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      users: initialUsers,
      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),
      updateUser: (id, updates) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...updates } : user
          ),
        })),
      startCompetition: (userId, competition) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  competitions: [...user.competitions, competition],
                }
              : user
          ),
        })),
    }),
    {
      name: 'user-storage',
    }
  )
);