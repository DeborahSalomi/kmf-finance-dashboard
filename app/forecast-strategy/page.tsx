"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  LineChart,
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend
} from "recharts";
import { Target, Lightbulb, Sliders, TrendingUp } from "lucide-react";

// Base FY24 Data for Forecasting
const baseYear = 2024;
const baseRev = 46.95;
const basePur = 33.33;
const baseOpex = 12.37;
const revCAGR = 0.084; // 8.4%
const purCAGR = 0.085; // 8.5%

// 3-Year Forecasting Engine (Using CAGR)
const forecastData = [0, 1, 2, 3].map(yearOffset => {
  const year = baseYear + yearOffset;
  const rev = baseRev * Math.pow(1 + revCAGR, yearOffset);
  const pur = basePur * Math.pow(1 + purCAGR, yearOffset);
  const opex = baseOpex * Math.pow(1 + 0.05, yearOffset); // Assume 5% steady Opex growth
  const gp = rev - pur;
  const np = gp - opex;
  
  return {
    year: year.toString(),
    revenue: Number(rev.toFixed(2)),
    purchases: Number(pur.toFixed(2)),
    grossProfit: Number(gp.toFixed(2)),
    netProfit: Number(np.toFixed(2)),
    margin: Number(((np / rev) * 100).toFixed(2))
  };
});

export default function ForecastStrategy() {
  // Scenario Planner State
  const [volumeGrowth, setVolumeGrowth] = useState<number>(5);
  const [priceIncrease, setPriceIncrease] = useState<number>(2);
  const [opexReduction, setOpexReduction] = useState<number>(0);

  // Dynamic Scenario Engine
  const scenarioRev = baseRev * (1 + volumeGrowth / 100) * (1 + priceIncrease / 100);
  const scenarioPur = basePur * (1 + volumeGrowth / 100); // Volume increases purchases, assuming base procurement cost
  const scenarioOpex = baseOpex * (1 - opexReduction / 100);
  const scenarioNp = scenarioRev - scenarioPur - scenarioOpex;
  const scenarioMargin = (scenarioNp / scenarioRev) * 100;

  // Rule-Based AI Recommendations
  const getRecommendation = () => {
    if (scenarioMargin < 2.0) return { text: "Very High Financial Risk. Immediate price hike or severe cost-cutting required.", color: "text-rose-500" };
    if (scenarioMargin < 5.0) return { text: "Improve procurement efficiency. Margins are stable but remain vulnerable to input shocks.", color: "text-amber-500" };
    return { text: "Healthy strategic trajectory. Reinvest surplus into Value-Added Dairy Products (VADP) capacity.", color: "text-emerald-500" };
  };

  const aiRec = getRecommendation();

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Forecast & Strategic Planner</h1>
        <p className="text-zinc-400 mt-2">3-Year financial projections and interactive scenario modeling.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Forecasting Chart */}
        <Card className="lg:col-span-2 bg-zinc-950/40 border border-zinc-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-zinc-300 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
              3-Year Financial Forecast (Based on Historical CAGR)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="year" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}B`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="revenue" name="Projected Revenue" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="purchases" name="Projected Purchases" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="netProfit" name="Projected Net Profit" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Forecast Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-zinc-500 uppercase bg-zinc-900/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Year</th>
                    <th className="px-4 py-3">Revenue (B)</th>
                    <th className="px-4 py-3">Purchases (B)</th>
                    <th className="px-4 py-3">Gross Profit (B)</th>
                    <th className="px-4 py-3">Net Profit (B)</th>
                    <th className="px-4 py-3 rounded-tr-lg">Net Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {forecastData.map((row, idx) => (
                    <tr key={idx} className="text-zinc-300">
                      <td className="px-4 py-3 font-medium text-zinc-100">{row.year}{idx === 0 ? " (Base)" : " (Proj)"}</td>
                      <td className="px-4 py-3">₹{row.revenue}</td>
                      <td className="px-4 py-3">₹{row.purchases}</td>
                      <td className="px-4 py-3">₹{row.grossProfit}</td>
                      <td className="px-4 py-3 text-emerald-400">₹{row.netProfit}</td>
                      <td className="px-4 py-3">{row.margin}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Scenario Planner */}
        <div className="space-y-6">
          <Card className="bg-zinc-950/40 border border-zinc-800/50">
            <CardHeader className="pb-4 border-b border-zinc-800/50">
              <CardTitle className="text-sm font-semibold text-zinc-300 flex items-center">
                <Sliders className="w-4 h-4 mr-2 text-amber-500" />
                Scenario Planner (FY25 Simulator)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              {/* Levers */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <label className="text-zinc-400 font-medium">Sales Volume Growth (%)</label>
                    <span className="text-zinc-100">{volumeGrowth}%</span>
                  </div>
                  <input 
                    type="range" min="-10" max="20" value={volumeGrowth} 
                    onChange={(e) => setVolumeGrowth(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <label className="text-zinc-400 font-medium">Selling Price Adjustment (%)</label>
                    <span className="text-zinc-100">{priceIncrease}%</span>
                  </div>
                  <input 
                    type="range" min="-5" max="15" value={priceIncrease} 
                    onChange={(e) => setPriceIncrease(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <label className="text-zinc-400 font-medium">Opex Reduction/Efficiency (%)</label>
                    <span className="text-zinc-100">{opexReduction}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="10" value={opexReduction} 
                    onChange={(e) => setOpexReduction(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500" 
                  />
                </div>
              </div>

              {/* Output Results */}
              <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-400">Target Revenue</span>
                  <span className="text-sm font-bold text-zinc-100">₹{scenarioRev.toFixed(2)} B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-400">Target Net Profit</span>
                  <span className={`text-sm font-bold ${scenarioNp >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    ₹{scenarioNp.toFixed(2)} B
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-zinc-800">
                  <span className="text-sm font-medium text-zinc-300">Projected Margin</span>
                  <span className={`text-lg font-bold tracking-tight ${scenarioMargin >= 2.66 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {scenarioMargin.toFixed(2)}%
                  </span>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* AI Recommendation Box */}
          <Card className="bg-zinc-950/40 border border-zinc-800/50">
             <CardContent className="p-5">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2" /> Strategic Directive
              </h4>
              <div className="flex gap-3">
                <div className="shrink-0 mt-0.5">
                  <Lightbulb className={`w-5 h-5 ${aiRec.color}`} />
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {aiRec.text}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}