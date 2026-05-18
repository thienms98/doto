import Dashboard, { DashboardProps } from "@/components/layout/Dashboard";

const mockDashboard: DashboardProps = {
  habits: [
    {
      id: 1,
      title: "Read book 30 mins",
      frequencyType: "weekly",
      targetPerPeriod: 1,
      color: "#afc",
      createdAt: new Date("Mon May 15 2026 14:57:34 GMT+0700 (Giờ Đông Dương)"),
      logs: [],
      streak: 0,
      isTodayDone: false
    },
    {
      id: 2,
      title: "Doing excercise",
      frequencyType: "daily",
      targetPerPeriod: 7,
      color: "#acf",
      createdAt: new Date("Mon May 15 2026 14:57:34 GMT+0700 (Giờ Đông Dương)"),
      logs: [
        {
          id: 101,
          completedAt: new Date()
        }
      ],
      streak: 1,
      isTodayDone: true
    },
    {
      id: 3,
      title: "Drink water",
      frequencyType: "daily",
      targetPerPeriod: 7,
      color: "#fac",
      createdAt: new Date("Mon May 15 2026 14:57:34 GMT+0700 (Giờ Đông Dương)"),
      logs: [
        {
          id: 103,
          completedAt: new Date(
            "Mon May 17 2026 14:57:34 GMT+0700 (Giờ Đông Dương)"
          )
        }
      ],
      streak: 1,
      isTodayDone: false
    },
    {
      id: 4,
      title: "Playing dota",
      frequencyType: "daily",
      targetPerPeriod: 7,
      color: "#caf",
      createdAt: new Date("Mon May 15 2026 14:57:34 GMT+0700 (Giờ Đông Dương)"),
      logs: [
        {
          id: 104,
          completedAt: new Date()
        },
        {
          id: 105,
          completedAt: new Date(
            "Mon May 17 2026 14:57:34 GMT+0700 (Giờ Đông Dương)"
          )
        },
        {
          id: 106,
          completedAt: new Date(
            "Mon May 16 2026 14:57:34 GMT+0700 (Giờ Đông Dương)"
          )
        }
      ],
      streak: 3,
      isTodayDone: true
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
