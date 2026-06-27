"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { WaterfallData } from "@/types/finance";

interface WaterfallChartProps {
  data: WaterfallData;
}

export function WaterfallChart({ data }: WaterfallChartProps) {
  // Format the JSON object into an array for Recharts
  const chartData = [
    { name: "Revenue", value: data.Revenue, color: "#10b981" }, // Emerald
    { name: "Procurement", value: Math.abs(data.Procurement), color: "#f43f5e" }, // Rose
    { name: "Transport", value: Math.abs(data.Transport), color: "#f43f5e" },
    { name: "Manufacturing", value: Math.abs(data.Manufacturing), color: "#f43f5e" },
    { name: "Net Profit", value: data.Net_Profit, color: "#3b82f6" }, // Blue
  ];

  return (
    <Card className="bg-zinc-900 border-zinc-800 col-span-4">
      <CardHeader>
        <CardTitle className="text-zinc-100">FY24 Cost Structure & Profitability (Billion INR)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" vertical={false} />
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}B`} />
              <Tooltip 
                cursor={{ fill: '#27272a' }}
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                itemStyle={{ color: '#e4e4e7' }}
                formatter={(value: number) => [`₹${value.toFixed(2)}B`, "Amount"]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
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