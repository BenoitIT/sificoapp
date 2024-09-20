"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 200 },
  { month: "Feb", revenue: 450 },
  { month: "Mar", revenue: 300 },
  { month: "Apr", revenue: 500 },
  { month: "May", revenue: 700 },
  { month: "Jun", revenue: 600 },
  { month: "Jul", revenue: 800 },
  { month: "Aug", revenue: 650 },
  { month: "Sep", revenue: 400 },
  { month: "Oct", revenue: 300 },
  { month: "Nov", revenue: 500 },
  { month: "Dec", revenue: 700 },
];

const RevenueChart = () => {
  return (
    <div className="flex flex-col lg:h-full h-[80vh] bg-white lg:w-[60%] w-full pb-2 rounded-md text-sm">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Revenue generated (USD)
        </h2>
      </div>
      <ResponsiveContainer width="100%" className="text-sm">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#003472" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
