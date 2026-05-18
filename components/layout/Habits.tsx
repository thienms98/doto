"use client";

import { useState } from "react";
import { Habit } from "./Dashboard";

interface HabitsProps {
  habits: (Habit & {
    logs: {
      id: number;
      completedAt: Date;
    }[];
    streak: number;
    isTodayDone: boolean;
  })[];
}

const Habits = ({ habits }: HabitsProps) => {
  const [habitsDone, setHabitsDone] = useState(
    habits.filter((habit) => habit.isTodayDone).map((i) => i.id)
  );

  const onHabitChecked = (checked: boolean, id: number) => {
    setHabitsDone((prev) => {
      if (checked) return [...prev, id];
      else return [...prev].filter((i) => i !== id);
    });
  };

  return (
    <section className="mt-6 space-y-4">
      <h3>Today habits</h3>
      <div className="text-sm space-y-3">
        {habits.map((habit) => (
          <label
            key={habit.id}
            className={`relative border rounded-md p-2 pl-7 py-3 flex gap-2 items-center cursor-pointer hover:bg-white/10 transition-colors duration-300 overflow-hidden select-none ${habitsDone.includes(habit.id) ? "text-black" : ""}`}
          >
            <div
              className={`size-3 absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${habitsDone.includes(habit.id) ? "left-1/2 -translate-x-1/2 w-full h-full rounded-none" : "left-2 rounded-full"}`}
              style={{ background: habit.color }}
            ></div>
            <div className="relative z-1">{habit.title}</div>
            <div className="ml-auto flex items-center gap-2 relative z-1">
              {habit.streak > 1 && <div className="">x{habit.streak}</div>}
              <input
                type="checkbox"
                name="habits"
                checked={habitsDone.includes(habit.id)}
                onChange={(e) => onHabitChecked(e.target.checked, habit.id)}
              />
            </div>
          </label>
        ))}
      </div>
    </section>
  );
};

export default Habits;

// dthien.tr@1998
