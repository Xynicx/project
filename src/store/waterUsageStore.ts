import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WaterUsage {
  date: string;
  shower: number;
  toilet: number;
  dishes: number;
  laundry: number;
  garden: number;
  drinking: number;
  total: number;
}

interface WaterUsageState {
  usageHistory: WaterUsage[];
  addUsage: (usage: WaterUsage) => void;
  getWeeklyTotal: () => number;
  getMonthlyTotal: () => number;
  getBadgeLevel: () => 'bronze' | 'silver' | 'gold' | null;
}

export const useWaterUsageStore = create<WaterUsageState>()(
  persist(
    (set, get) => ({
      usageHistory: [],
      addUsage: (usage) =>
        set((state) => ({
          usageHistory: [...state.usageHistory, usage],
        })),
      getWeeklyTotal: () => {
        const state = get();
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        return state.usageHistory
          .filter((usage) => new Date(usage.date) >= weekAgo)
          .reduce((acc, curr) => acc + curr.total, 0);
      },
      getMonthlyTotal: () => {
        const state = get();
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        
        return state.usageHistory
          .filter((usage) => new Date(usage.date) >= monthAgo)
          .reduce((acc, curr) => acc + curr.total, 0);
      },
      getBadgeLevel: () => {
        const state = get();
        const weeklyTotal = state.getWeeklyTotal();
        
        if (weeklyTotal >= 5000) return 'gold';
        if (weeklyTotal >= 3000) return 'silver';
        if (weeklyTotal >= 1000) return 'bronze';
        return null;
      },
    }),
    {
      name: 'water-usage-storage',
    }
  )
);