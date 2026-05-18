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
    uv: 40,
    pv: 24,
    amt: 24
  },
  {
    name: "Page B",
    uv: 30,
    pv: 13,
    amt: 22
  },
  {
    name: "Page C",
    uv: 20,
    pv: 98,
    amt: 22
  },
  {
    name: "Page D",
    uv: 27,
    pv: 39,
    amt: 20
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
        <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
        <XAxis dataKey="name" niceTicks="snap125" />
        <YAxis width="auto" niceTicks="snap125" />
        <Tooltip />
        <Legend />
        <Bar dataKey="amt" stackId="a" barSize={20} fill="#8884d8" />
        <Bar dataKey="pv" stackId="a" barSize={20} fill="#413ea0" />
        <Bar dataKey="uv" stackId="a" barSize={20} fill="#ff7300" />
        <RechartsDevtools />
      </ComposedChart>
    </div>
  );
};

export default Analytics;
