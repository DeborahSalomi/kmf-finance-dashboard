"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  ComposedChart,
  LineChart,
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend,
  Area,
  AreaChart
} from "recharts";
import { Activity, Droplets, TrendingUp, Wallet } from "lucide-react";

// Static Data Injection with Liquidity & Opex metrics added for deep analysis
const rawFinancialData = [
  { year: "2020", revenue: 28.5, purchases: 19.8, gpMargin: 30.5, npMargin: 2.2, ca: 8.2, cl: 6.5, qa: 4.1, opex: 8.05 },
  { year: "2021", revenue: 31.2, purchases: 22.1, gpMargin: 29.1, npMargin: 2.5, ca: 9.5, cl: 7.2, qa: 4.8, opex: 8.32 },
  { year: "2022", revenue: 35.8, purchases: 25.5, gpMargin: 28.7, npMargin: 2.6, ca: 11.2, cl: 8.1, qa: 5.9, opex: 9.35 },
  { year: "2023", revenue: 41.5, purchases: 29.2, gpMargin: 29.6, npMargin: 2.65, ca: 13.5, cl: 9.5, qa: 7.2, opex: 11.2 },
  { year: "2024", revenue: 46.95, purchases: 33.33, gpMargin: 29.0, npMargin: 2.66, ca: 15.8, cl: 10.2, qa: 8.5, opex: 12.37 },
];

// MBA Finance Engine: Dynamically calculate YoY Growth, Liquidity Ratios, and Cost Structures
const processedData = rawFinancialData.map((data, index, array) => {
  const prev = index > 0 ? array[index - 1] : data;
  return {
    ...data,
    revGrowth: index === 0 ? 0 : (((data.revenue - prev.revenue) / prev.revenue) * 100),
    purGrowth: index === 0 ? 0 : (((data.purchases - prev.purchases) / prev.purchases) * 100),
    currentRatio: data.ca / data.cl,
    quickRatio: data.qa / data.cl,
    workingCapital: data.ca - data.cl,
    opexRatio: (data.opex / data.revenue) * 100,
    purchaseRatio: (data.purchases / data.revenue) * 100,
  };
});

// THIS IS THE LINE NEXT.JS WAS LOOKING FOR
export default function FinancialAnalysis() {
  const latest = processedData[processedData.length - 1];
  
  // Calculate 4-Year CAGR (2020 to 2024)
  const first = processedData[0];
  const revCAGR = ((Math.pow(latest.revenue / first.revenue, 1/4) - 1) * 100).toFixed(1);
  const purCAGR = ((Math.pow(latest.purchases / first.purchases, 1/4) - 1) * 100).toFixed(1);

  const analyticalKpis = [
    { title: "Revenue CAGR (4Y)", value: `${revCAGR}%`, icon: TrendingUp, color: "text-emerald-500" },
    { title: "Purchase CAGR (4Y)", value: `${purCAGR}%`, icon: Activity, color: "text-rose-500" },
    { title: "Current Ratio (FY24)", value: latest.currentRatio.toFixed(2), icon: Droplets, color: "text-blue-500" },
    { title: "Working Capital", value: `₹${latest.workingCapital.toFixed(2)} B`, icon: Wallet, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Financial Performance Analysis</h1>
        <p className="text-zinc-400 mt-2">Historical revenue, liquidity metrics, and cost structure ratios.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {analyticalKpis.map((kpi, i) => (
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Growth Analysis (Revenue vs Purchases) */}
        <Card className="bg-zinc-950/40 border border-zinc-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-zinc-300">YoY Growth: Revenue vs Purchases</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={processedData.slice(1)} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="year" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value.toFixed(1)}%`]}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="revGrowth" name="Revenue YoY" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="purGrowth" name="Purchase YoY" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Liquidity Analysis */}
        <Card className="bg-zinc-950/40 border border-zinc-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-zinc-300">Liquidity Analysis (Ratios)</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={processedData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="year" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} domain={[0, 2]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                    formatter={(value: number) => [value.toFixed(2)]}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="currentRatio" name="Current Ratio" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="quickRatio" name="Quick Ratio" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Profitability Analysis */}
        <Card className="bg-zinc-950/40 border border-zinc-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-zinc-300">Profitability Margins Trend</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={processedData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="year" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} domain={[25, 35]} tickFormatter={(v) => `${v}%`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} domain={[0, 5]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value.toFixed(2)}%`]}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line yAxisId="left" type="monotone" dataKey="gpMargin" name="Gross Margin" stroke="#eab308" strokeWidth={3} />
                  <Line yAxisId="right" type="monotone" dataKey="npMargin" name="Net Margin" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cost Structure Analysis */}
        <Card className="bg-zinc-950/40 border border-zinc-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-zinc-300">Cost Structure (% of Revenue)</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={processedData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                   <defs>
                    <linearGradient id="colorPurRatio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOpex" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="year" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value.toFixed(1)}%`]}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="purchaseRatio" name="Purchase Ratio" stroke="#f43f5e" fill="url(#colorPurRatio)" strokeWidth={2} />
                  <Area type="monotone" dataKey="opexRatio" name="Operating Expense Ratio" stroke="#8b5cf6" fill="url(#colorOpex)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}