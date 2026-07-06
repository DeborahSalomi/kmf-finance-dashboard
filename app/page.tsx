"use client";

import { useState, ReactNode } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { WaterfallChart } from "@/components/dashboard/waterfall-chart";
import { Target, Lightbulb, Plus, Minus, TrendingUp, Truck, Zap, Package, DollarSign, Activity, Droplet, Wallet } from "lucide-react";

// Master Financial Constants
const BASE = { Revenue: 46.95, Procurement: 33.33, Transport: 3.12, Manufacturing: 9.25, Profit: 1.25 };

// Stat Card Component
const StatCard = ({ title, value, icon }: { title: string; value: string; icon?: ReactNode }) => (
  <Card className="bg-zinc-900 border-zinc-800 p-4 flex justify-between items-center">
    <div>
      <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{title}</p>
      <h3 className="text-lg font-bold mt-1">{value}</h3>
    </div>
    {icon && <div className="text-emerald-500">{icon}</div>}
  </Card>
);

export default function FinBoardPro() {
  const [levers, setLevers] = useState({ procurement: 11, vadp: 8, logistics: 5, pricing: 8, expansion: 9 });
  const [activeTab] = useState("Executive Dashboard");

  // Calculations
  const revenue = BASE.Revenue * (1 + (levers.pricing / 100) + (levers.vadp / 100));
  const profit = BASE.Profit * (1 + (levers.pricing / 100) + (levers.logistics / 100) - (levers.procurement / 100));
  const margin = (profit / revenue) * 100;

  const adjustLever = (key: string, delta: number) => {
    setLevers(prev => ({ ...prev, [key]: Math.max(0, Math.min(20, (prev[key as keyof typeof levers] || 0) + delta)) }));
  };

  const getCFOInsights = () => [
    levers.procurement >= 10 ? "• Procurement: Efficiency optimized." : "• Procurement: Need 10%+ to save ₹1.2B.",
    levers.vadp >= 10 ? "• VADP Mix: High." : "• VADP Mix: Shift 10%+ for ROI.",
    levers.logistics >= 10 ? "• Logistics: Optimized." : "• Logistics: Need 10%+ optimization.",
    levers.pricing >= 10 ? "• Pricing: Strategic." : "• Pricing: Risk. Adjust to offset costs.",
    levers.expansion >= 10 ? "• Expansion: Growth driven." : "• Expansion: Constrained."
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">{activeTab}</h1>
      
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Revenue (FY24)" value={`₹${revenue.toFixed(2)} B`} icon={<TrendingUp size={16}/>} />
        <StatCard title="Net Profit" value={`₹${profit.toFixed(2)} B`} icon={<Activity size={16}/>} />
        <StatCard title="Net Margin %" value={`${margin.toFixed(2)}%`} icon={<Droplet size={16}/>} />
        <StatCard title="Break-Even Shock" value="3.75%" icon={<Wallet size={16}/>} />
      </div>

      {/* Strategic Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <CardTitle className="text-sm mb-6 flex items-center"><Target className="mr-2 text-emerald-500" size={16}/> Risk & Sensitivity Planner</CardTitle>
          <div className="space-y-5">
            {[ { label: "Procurement Efficiency", key: "procurement", icon: <Zap size={14}/> }, { label: "VADP Revenue Mix", key: "vadp", icon: <Package size={14}/> }, { label: "Logistics Optimization", key: "logistics", icon: <Truck size={14}/> }, { label: "Pricing Strategy", key: "pricing", icon: <DollarSign size={14}/> }, { label: "Expansion Capacity", key: "expansion", icon: <TrendingUp size={14}/> } ].map(item => (
              <div key={item.key}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="flex items-center gap-2 text-zinc-300">{item.icon} {item.label}</span>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => adjustLever(item.key, -1)}><Minus size={12}/></Button>
                    <span className="font-bold text-emerald-500 w-8 text-center">{levers[item.key as keyof typeof levers]}%</span>
                    <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => adjustLever(item.key, 1)}><Plus size={12}/></Button>
                  </div>
                </div>
                <Slider value={[levers[item.key as keyof typeof levers]]} max={20} step={1} onValueChange={(v) => setLevers({...levers, [item.key]: v[0]})} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-6">
           <CardTitle className="text-sm flex items-center text-emerald-500"><Lightbulb className="mr-2" size={16}/> CFO Strategic Directive</CardTitle>
           <div className="mt-4 bg-emerald-500/5 p-4 rounded border border-emerald-500/10 text-xs text-zinc-300">
             {getCFOInsights().map((p, i) => <p key={i}>{p}</p>)}
           </div>
        </Card>
      </div>

      {/* Waterfall Chart */}
      <Card className="bg-zinc-900 border-zinc-800 p-6 pb-10">
        <CardTitle className="text-sm mb-6">FY24 Cost Structure & Profitability (Billion INR)</CardTitle>
        <div className="h-[400px] w-full">
          <WaterfallChart 
            data={[{ Revenue: revenue, Procurement: BASE.Procurement, Transport: BASE.Transport, Manufacturing: BASE.Manufacturing, Profit: profit }]} 
          />
        </div>
      </Card>
    </div>
  );
}