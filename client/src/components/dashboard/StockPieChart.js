// client/src/components/dashboard/StockPieChart.js

"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function StockPieChart({ inventory }) {
  // 1. Calculate counts based on the robust status field from the backend
  const statusCounts = { FRESH: 0, SLOW: 0, DEAD: 0 };

  inventory.forEach((item) => {
    if (item.status) statusCounts[item.status]++;
  });

  // 2. Prepare data with synced Enterprise Colors
  const data = [
    { name: "Fresh Stock", value: statusCounts.FRESH, color: "#10b981" }, // Emerald-500
    { name: "Slow Moving", value: statusCounts.SLOW, color: "#f59e0b" }, // Amber-500
    { name: "Dead Stock", value: statusCounts.DEAD, color: "#ef4444" }, // Red-500
  ].filter((item) => item.value > 0);

  if (data.length === 0) {
    return (
      <div className="card-base p-6 h-80 flex items-center justify-center text-slate-400 text-sm">
        No stock health data available
      </div>
    );
  }

  return (
    <div className="card-base p-6">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        Stock Health Ratio
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65} // Slightly larger inner radius for a more "Modern" donut look
              outerRadius={85}
              paddingAngle={8}
              dataKey="value"
              animationBegin={0}
              animationDuration={1200}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  strokeWidth={0}
                  className="hover:opacity-80 transition-opacity outline-none"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                fontSize: "12px",
                fontWeight: "600",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}