"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from "recharts";

const chartData = [
  { name: "Base Scenario", value: 1.25 },
  { name: "Optimistic", value: 1.85 },
  { name: "Pessimistic", value: 0.85 },
  { name: "Stress Test", value: 0.45 },
];

export function RiskChart({ data }: { data?: any }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={true} vertical={false} />
          <XAxis type="number" stroke="#a1a1aa" fontSize={12} tickFormatter={(value) => `₹${value}B`} />
          <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={12} width={100} />
          <Tooltip
            cursor={{ fill: '#27272a', opacity: 0.4 }}
            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
            itemStyle={{ color: '#e4e4e7' }}
            formatter={(value: any) => [`₹${Number(value || 0).toFixed(2)}B`, "Profit"]}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.value > 1 ? '#10b981' : entry.value > 0.5 ? '#f59e0b' : '#ef4444'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}