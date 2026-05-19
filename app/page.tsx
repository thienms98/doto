import Dashboard, { DashboardProps } from "@/components/layout/Dashboard";
import { Frequency } from "@/generated/prisma/enums";

const mockDashboard: DashboardProps = {
  habits: [
    {
      id: 1,
      title: "Read book 30 mins",
      frequency: Frequency.WEEKLY,
      targetPerPeriod: 1,
      color: "#afc",
      createdAt: new Date("Mon May 15 2026 14:57:34 GMT+0700 (Giờ Đông Dương)"),
      logs: [],
      streak: 0,
      isTodayDone: false,
      archivedAt: null,
      note: null,
      reminder: null
    },
    {
      id: 2,
      title: "Doing excercise",
      frequency: Frequency.DAILY,
      targetPerPeriod: 7,
      color: "#acf",
      createdAt: new Date("Mon May 15 2026 14:57:34 GMT+0700 (Giờ Đông Dương)"),
      logs: [
        {
          id: 101,
          habitId: 2,
          completedAt: new Date()
        }
      ],
      streak: 1,
      isTodayDone: true,
      archivedAt: null,
      note: null,
      reminder: null
    },
    {
      id: 3,
      title: "Drink water",
      frequency: Frequency.DAILY,
      targetPerPeriod: 7,
      color: "#fac",
      createdAt: new Date("Mon May 15 2026 14:57:34 GMT+0700 (Giờ Đông Dương)"),
      logs: [
        {
          id: 103,
          habitId: 3,
          completedAt: new Date(
            "Mon May 17 2026 14:57:34 GMT+0700 (Giờ Đông Dương)"
          )
        }
      ],
      streak: 1,
      isTodayDone: false,
      archivedAt: null,
      note: null,
      reminder: null
    },
    {
      id: 4,
      title: "Playing dota",
      frequency: Frequency.DAILY,
      targetPerPeriod: 7,
      color: "#f45",
      createdAt: new Date("Mon May 15 2026 14:57:34 GMT+0700 (Giờ Đông Dương)"),
      logs: [
        {
          id: 104,
          habitId: 4,
          completedAt: new Date()
        },
        {
          id: 105,
          habitId: 4,
          completedAt: new Date(
            "Mon May 17 2026 14:57:34 GMT+0700 (Giờ Đông Dương)"
          )
        },
        {
          id: 106,
          habitId: 4,
          completedAt: new Date(
            "Mon May 16 2026 14:57:34 GMT+0700 (Giờ Đông Dương)"
          )
        }
      ],
      streak: 3,
      isTodayDone: true,
      archivedAt: null,
      note: null,
      reminder: null
    }
  ],
  streak: 3,
  weeklyRate: 0.53
};

export default function Home() {
  return (
    <div className="container mx-auto px-8 py-10">
      <Dashboard {...mockDashboard} />
    </div>
  );
}
