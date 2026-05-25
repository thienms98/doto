'use client';

import { HabitItem } from '../Habits';
import Link from 'next/link';
import { useHabitStore } from '@/store/habit.store';

const Habits = () => {
  const { habits, handleHabitCheck } = useHabitStore();

  return habits.length ? (
    <section className="mt-6 space-y-4">
      <h3>Today habits</h3>
      <div className="text-sm space-y-3">
        {habits.map((habit) => (
          <HabitItem key={habit.id} habit={habit} onHabitChecked={handleHabitCheck} />
        ))}
        <Link href="/habit/add" className="block border rounded-md p-2 py-3 cursor-pointer hover:bg-white/10 transition-colors duration-300 select-none text-center">
          + Thêm habit mới
        </Link>
      </div>
    </section>
  ) : (
    'Bạn chưa có thói quen nào'
  );
};

export default Habits;
