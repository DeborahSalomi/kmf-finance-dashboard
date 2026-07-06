"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function WaterfallChart({ data }: { data: any[] }) {
  // THE SHIELD: If data doesn't exist, isn't an array, is empty, OR the first row is missing, stop here.
  if (!data || !Array.isArray(data) || data.length === 0 || !data[0]) {
    return (
      <div className="h-100 w-full p-6 bg-zinc-950/40 border border-zinc-800/50 rounded-2xl flex items-center justify-center">
        <p className="text-zinc-500">Awaiting financial model...</p>
      </div>
    );
  }

  const raw = data[0];
  
  // Safety check: ensure everything is a valid number, defaulting to 0 if missing
  const rev = Number(raw.Revenue || 0);
  const proc = Number(raw.Procurement || 0);
  const trans = Number(raw.Transport || 0);
  const mfg = Number(raw.Manufacturing || 0);
  const prof = Number(raw.Profit || 0);

  const chartData = [
    { name: "Revenue", value: [0, rev], color: "#10b981" },
    { name: "Procurement", value: [rev - proc, rev], color: "#f43f5e" },
    { name: "Transport", value: [rev - proc - trans, rev - proc], color: "#f43f5e" },
    { name: "Manufacturing", value: [rev - proc - trans - mfg, rev - proc - trans], color: "#f43f5e" },
    { name: "Net Profit", value: [0, prof], color: "#10b981" }
  ];

  return (
    <div className="h-100 w-full p-6 bg-zinc-950/40 border border-zinc-800/50 rounded-2xl backdrop-blur-xl shadow-xl flex flex-col">
      <h3 className="text-zinc-100 font-bold text-lg mb-6 flex items-center">
        FY24 Cost Structure & Profitability (Billion INR)
      </h3>
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#a1a1aa" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#a1a1aa" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(val) => `₹${val}`} 
            />
            <Tooltip 
              cursor={{ fill: '#27272a', opacity: 0.4 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const barData = payload[0].payload;
                  const diff = barData.value[1] - barData.value[0];
                  return (
                    <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-lg shadow-xl">
                      <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1 font-semibold">{barData.name}</p>
                      <p className="text-zinc-100 font-bold text-lg">₹{diff.toFixed(2)} B</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 4, 4]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}