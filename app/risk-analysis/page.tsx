"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  Area,
  AreaChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ReferenceLine
} from "recharts";
import { AlertTriangle, ShieldAlert, Activity, TrendingDown } from "lucide-react";

// Base FY24 Financials for the Model
const baseRev = 46.95;
const basePur = 33.33;
const baseOpex = 12.37; // Operating expenses
const baseNp = 1.25;

// Exact break-even calculation: When does NP = 0? 
const breakEvenShockPct = (baseNp / basePur) * 100;

// Generate Sensitivity Curve Data (0% to 15% Procurement Shock)
const sensitivityData = [0, 2, 3.75, 4, 6, 8, 10, 12, 14, 15].map(shock => {
  const pct = shock / 100;
  const newPur = basePur * (1 + pct);
  const newGp = baseRev - newPur;
  const newNp = newGp - baseOpex;
  const newMargin = (newNp / baseRev) * 100;
  
  return {
    shock: shock === 3.75 ? "3.75% (BE)" : `${shock}%`,
    rawShock: shock,
    netProfit: Number(newNp.toFixed(2)),
    margin: Number(newMargin.toFixed(2)),
    grossProfit: Number(newGp.toFixed(2)),
  };
}).sort((a, b) => a.rawShock - b.rawShock); 

export default function RiskAnalysis() {
  const riskKpis = [
    { title: "Break-Even Shock", value: `${breakEvenShockPct.toFixed(2)}%`, icon: AlertTriangle, color: "text-amber-500", desc: "Profit wipeout threshold" },
    { title: "Value at Risk (5% Shock)", value: `₹${(basePur * 0.05).toFixed(2)} B`, icon: TrendingDown, color: "text-rose-500", desc: "NP loss at 5% inflation" },
    { title: "Current Margin Buffer", value: "2.66%", icon: ShieldAlert, color: "text-blue-500", desc: "Net Margin FY24" },
    { title: "Risk Status", value: "High", icon: Activity, color: "text-rose-500", desc: "Highly sensitive to inputs" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Risk & Sensitivity Analysis</h1>
        <p className="text-zinc-400 mt-2">Procurement cost shocks, stress testing, and break-even thresholds.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {riskKpis.map((kpi, i) => (
          <Card key={i} className="bg-zinc-950/40 border border-zinc-800/50 backdrop-blur-xl">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">{kpi.title}</p>
                <h2 className="text-2xl font-bold text-zinc-100">{kpi.value}</h2>
                <p className="text-xs font-medium text-zinc-500 mt-1">{kpi.desc}</p>
              </div>
              <div className={`p-3 bg-zinc-900 rounded-full border border-zinc-800 ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Sensitivity Curve */}
        <Card className="lg:col-span-2 bg-zinc-950/40 border border-zinc-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-zinc-300">Net Profit Sensitivity Curve (Procurement Cost Shock)</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sensitivityData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorNp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="shock" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}B`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  />
                  <ReferenceLine y={0} stroke="#52525b" strokeDasharray="3 3" />
                  <ReferenceLine x="3.75% (BE)" stroke="#f59e0b" strokeDasharray="3 3" label={{ position: 'insideTopRight', value: 'Break-Even', fill: '#f59e0b', fontSize: 12 }} />
                  <Area 
                    type="monotone" 
                    dataKey="netProfit" 
                    name="Net Profit (Billion INR)" 
                    stroke="#10b981" 
                    fill="url(#colorNp)" 
                    strokeWidth={3} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Standardized Stress Tests */}
        <Card className="lg:col-span-1 bg-zinc-950/40 border border-zinc-800/50 flex flex-col">
          <CardHeader className="pb-4 border-b border-zinc-800/50">
            <CardTitle className="text-sm font-semibold text-zinc-300">Stress Testing Matrix</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col">
            {[3, 5, 10].map((testShock, index) => {
              const testPur = basePur * (1 + (testShock / 100));
              const testNp = baseRev - testPur - baseOpex;
              const isNegative = testNp < 0;
              
              return (
                <div key={index} className="p-6 border-b border-zinc-800/50 last:border-0 flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-zinc-400 font-medium">{testShock}% Cost Shock</span>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${isNegative ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                      {isNegative ? 'Critical Deficit' : 'Margin Squeeze'}
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Projected Net Profit</p>
                      <p className={`text-2xl font-bold tracking-tight ${isNegative ? 'text-rose-500' : 'text-zinc-100'}`}>
                        ₹{testNp.toFixed(2)} B
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-500 mb-1">Net Margin</p>
                      <p className={`text-sm font-bold ${isNegative ? 'text-rose-500' : 'text-zinc-300'}`}>
                        {((testNp / baseRev) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}