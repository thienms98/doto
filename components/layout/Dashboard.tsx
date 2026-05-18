import { Habit, HabitLog } from '@/app/generated/prisma/client';
import Habits from './Habits';

export type HabitType = Habit & {
  logs: HabitLog[];
  streak: number;
  isTodayDone: boolean;
};

export interface DashboardProps {
  habits: HabitType[];
  streak: number;
  weeklyRate: number;
}

const Dashboard = ({ streak, habits, weeklyRate }: DashboardProps) => {
  const completedTasks = habits.filter((item) => item.targetPerPeriod === item.logs.length || item.isTodayDone);

  return (
    <>
      <section className="grid grid-cols-3 gap-5">
        <div className="rounded-lg bg-black/60 p-6 flex flex-col items-center">
          <span className="font-semibold text-xl text-purple-800">
            {completedTasks.length}/{habits.length}
          </span>
          <span>Hôm nay</span>
        </div>
        <div className="rounded-lg bg-black/60 p-6 flex flex-col items-center">
          <span className="font-semibold text-xl">{streak}</span>
          <span>Streak</span>
        </div>
        <div className="rounded-lg bg-black/60 p-6 flex flex-col items-center">
          <span className="font-semibold text-xl">{weeklyRate * 100}%</span>
          <span>Tuần này</span>
        </div>
      </section>

      <Habits habits={habits} />
    </>
  );
};

export default Dashboard;
