"use client";

import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

const data = [
  {
    name: "Page A",
    daily: 40,
    weekly: 8,
    monthly: 2
  },
  {
    name: "Page B",
    daily: 30,
    weekly: 8,
    monthly: 2
  },
  {
    name: "Page C",
    daily: 20,
    weekly: 8,
    monthly: 2
  },
  {
    name: "Page D",
    daily: 27,
    weekly: 8,
    monthly: 2
  }
];

const Analytics = () => {
  return (
    <div>
      <ComposedChart
        className="container max-h-50"
        style={{
          aspectRatio: 1.618
        }}
        responsive
        data={data}
        margin={{
          top: 20,
          right: 0,
          bottom: 0,
          left: 0
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        {/* <XAxis dataKey="name" niceTicks="snap125" />
        <YAxis width="auto" niceTicks="snap125" /> */}
        {/* <Legend /> */}
        <Tooltip />
        <Bar dataKey="daily" stackId="a" barSize={100} fill="#8884d8" />
        <Bar dataKey="weekly" stackId="a" barSize={100} fill="#413ea0" />
        <Bar dataKey="monthly" stackId="a" barSize={100} fill="#ff7300" />
        <RechartsDevtools />
      </ComposedChart>
    </div>
  );
};

export default Analytics;
