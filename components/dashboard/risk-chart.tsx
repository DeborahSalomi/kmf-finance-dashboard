"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { DashboardMetrics } from "@/types/finance";

export function RiskChart({ data }: { data: DashboardMetrics }) {
  // Mapping the Monte Carlo summary data for visualization
  const chartData = [
    { name: "Worst Case (5%)", value: data.WorstCase / 1000, color: "#f43f5e" }, // Red
    { name: "Expected (Mean)", value: data.AverageProfit / 1000, color: "#3b82f6" }, // Blue
    { name: "Best Case (95%)", value: data.BestCase / 1000, color: "#10b981" }, // Green
  ];

  return (
    <Card className="bg-zinc-900 border-zinc-800 col-span-3">
      <CardHeader>
        <CardTitle className="text-zinc-100">Monte Carlo Simulation Bounds (10k Iterations)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}B`} />
              <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#27272a' }}
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                itemStyle={{ color: '#e4e4e7' }}
                formatter={(value: number) => [`₹${value.toFixed(2)}B`, "Profit"]}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}