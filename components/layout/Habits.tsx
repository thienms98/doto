"use client";

import { useState } from "react";
import { HabitType } from "./Dashboard";
import { HabitItem } from "../Habits";
import Link from "next/link";

interface HabitsProps {
  habits: HabitType[];
}

const Habits = ({ habits }: HabitsProps) => {
  const [habitsState, setHabitsState] = useState(habits);

  const onHabitChecked = (id: number, checked: boolean) => {
    setHabitsState((prev) =>
      [...prev].map((habit) =>
        habit.id !== id
          ? habit
          : {
              ...habit,
              isTodayDone: checked,
              streak: habit.streak + (Number(checked) - 0.5) * 2
            }
      )
    );
  };

  return (
    <section className="mt-6 space-y-4">
      <h3>Today habits</h3>
      <div className="text-sm space-y-3">
        {habitsState.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            onHabitChecked={onHabitChecked}
          />
        ))}
        <Link
          href="/habit/add"
          className="block border rounded-md p-2 py-3 cursor-pointer hover:bg-white/10 transition-colors duration-300 select-none text-center"
        >
          + Thêm habit mới
        </Link>
      </div>
    </section>
  );
};

export default Habits;
