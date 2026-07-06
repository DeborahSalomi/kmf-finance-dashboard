"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  ComposedChart,
  LineChart,
  Line, 
  Bar, 
  BarChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend,
  Area,
  AreaChart
} from "recharts";
import { Truck, TrendingDown, Target, BarChart3 } from "lucide-react";

// Mock Data: Monthly Procurement (FY 23-24) - Capturing Lean and Flush Seasons
const monthlyData = [
  { month: "Apr", volume: 245, avgPrice: 32.5, minPrice: 31.0, maxPrice: 34.0 },
  { month: "May", volume: 230, avgPrice: 33.2, minPrice: 31.5, maxPrice: 35.0 }, // Lean start
  { month: "Jun", volume: 220, avgPrice: 34.0, minPrice: 32.0, maxPrice: 36.5 },
  { month: "Jul", volume: 235, avgPrice: 33.5, minPrice: 31.5, maxPrice: 35.5 },
  { month: "Aug", volume: 260, avgPrice: 32.8, minPrice: 31.0, maxPrice: 34.5 }, // Flush start
  { month: "Sep", volume: 280, avgPrice: 31.5, minPrice: 30.0, maxPrice: 33.0 },
  { month: "Oct", volume: 295, avgPrice: 31.0, minPrice: 29.5, maxPrice: 32.5 },
  { month: "Nov", volume: 310, avgPrice: 30.5, minPrice: 29.0, maxPrice: 32.0 }, // Peak flush
  { month: "Dec", volume: 305, avgPrice: 30.8, minPrice: 29.5, maxPrice: 32.5 },
  { month: "Jan", volume: 290, avgPrice: 31.5, minPrice: 30.0, maxPrice: 33.5 },
  { month: "Feb", volume: 270, avgPrice: 32.0, minPrice: 30.5, maxPrice: 34.0 },
  { month: "Mar", volume: 255, avgPrice: 32.8, minPrice: 31.0, maxPrice: 35.0 },
];

// Mock Data: Top Unions Contribution (Pareto Analysis)
const unionData = [
  { name: "Kolar", volume: 850 },
  { name: "Mandya", volume: 720 },
  { name: "Bengaluru", volume: 680 },
  { name: "Mysuru", volume: 540 },
  { name: "Tumakuru", volume: 410 },
  { name: "Others", volume: 650 },
];

export default function ProcurementAnalytics() {
  // Calculations for KPIs
  const totalVolume = monthlyData.reduce((acc, curr) => acc + curr.volume, 0);
  const avgYearlyPrice = (monthlyData.reduce((acc, curr) => acc + curr.avgPrice, 0) / 12).toFixed(2);
  
  // Dispersion metrics
  const maxRecorded = Math.max(...monthlyData.map(d => d.maxPrice));
  const minRecorded = Math.min(...monthlyData.map(d => d.minPrice));
  const priceSpread = (maxRecorded - minRecorded).toFixed(2);

  const procurementKpis = [
    { title: "Total Procurement Volume", value: `${(totalVolume / 1000).toFixed(2)}B Ltrs`, icon: Truck, color: "text-emerald-500" },
    { title: "Avg Procurement Price", value: `₹${avgYearlyPrice} /L`, icon: TrendingDown, color: "text-blue-500" },
    { title: "Max Price Dispersion", value: `₹${priceSpread} Spread`, icon: BarChart3, color: "text-amber-500" },
    { title: "Top Union Dependency", value: "22.1%", icon: Target, color: "text-rose-500" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Procurement Analytics</h1>
        <p className="text-zinc-400 mt-2">Volume trends, price dispersion, and union-level supply metrics.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {procurementKpis.map((kpi, i) => (
          <Card key={i} className="bg-zinc-950/40 border border-zinc-800/50 backdrop-blur-xl">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">{kpi.title}</p>
                <h2 className="text-2xl font-bold text-zinc-100">{kpi.value}</h2>
              </div>
              <div className={`p-3 bg-zinc-900 rounded-full border border-zinc-800 ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* Volume vs Price (Macro Trend) */}
        <Card className="bg-zinc-950/40 border border-zinc-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-zinc-300">Procurement Volume vs Average Price (Seasonality)</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="month" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}M`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} domain={[25, 40]} tickFormatter={(v) => `₹${v}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar yAxisId="left" dataKey="volume" name="Volume (Million Ltrs)" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  <Line yAxisId="right" type="monotone" dataKey="avgPrice" name="Avg Price (₹/Ltr)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Union Contribution */}
        <Card className="bg-zinc-950/40 border border-zinc-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-zinc-300">Top Unions Contribution (Million Ltrs)</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={unionData} layout="vertical" margin={{ top: 20, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                  <XAxis type="number" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} width={80} />
                  <Tooltip 
                    cursor={{ fill: '#27272a', opacity: 0.4 }}
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  />
                  <Bar dataKey="volume" name="Volume Supplied" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Price Dispersion */}
        <Card className="bg-zinc-950/40 border border-zinc-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-zinc-300">Price Dispersion & Volatility (Min/Max Spread)</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSpread" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="month" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} domain={[25, 40]} tickFormatter={(v) => `₹${v}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="maxPrice" name="Max Price" stroke="#f43f5e" fill="url(#colorSpread)" strokeWidth={1} />
                  <Area type="monotone" dataKey="minPrice" name="Min Price" stroke="#eab308" fill="#18181b" strokeWidth={1} />
                  <Line type="monotone" dataKey="avgPrice" name="Avg Price" stroke="#a1a1aa" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}