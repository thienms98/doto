import { HabitType } from '@/components/layout/Dashboard';
import { create } from 'zustand';

interface HabitStore {
  habits: HabitType[];
  addHabits: (habits: HabitType[]) => void;
  handleHabitCheck: (id: number, check: boolean) => void;
}

export const useHabitStore = create<HabitStore>((set) => ({
  habits: [],
  addHabits: (payload: HabitType[]) => set((state) => ({ habits: [...state.habits, ...payload] })),
  handleHabitCheck: (id: number, check: boolean) => set((state) => ({ habits: state.habits.map((i) => (i.id === id ? { ...i, isTodayDone: check } : i)) })),
}));
