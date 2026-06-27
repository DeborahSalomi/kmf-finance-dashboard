"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export function StrategySimulator() {
  const [procurementSavings, setProcurementSavings] = useState([0]);
  const [vapMix, setVapMix] = useState([0]);

  const baseRevenue = 46.95;
  const baseProcurement = 42.55;
  const baseProfit = 1.25;

  const savingsBillion = baseProcurement * (procurementSavings[0] / 100);
  const vapBonusBillion = baseRevenue * (vapMix[0] / 100) * 0.25;
  const simulatedProfit = baseProfit + savingsBillion + vapBonusBillion;

  const chartData = [
    { name: "FY24 Baseline", Profit: baseProfit, color: "#3f3f46" },
    { name: "Simulated Strategy", Profit: simulatedProfit, color: "#10b981" },
  ];

  const applyAiSuggestions = () => {
    setProcurementSavings([1.5]);
    setVapMix([12.0]);
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-1 rounded-2xl border border-white/10 bg-zinc-950/40 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <CardHeader>
          <CardTitle className="text-zinc-100 flex items-center justify-between">
            Strategic Levers
            <button 
              onClick={applyAiSuggestions}
              className="flex items-center text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full hover:bg-emerald-500/20 transition border border-emerald-500/20"
            >
              <Sparkles className="w-3 h-3 mr-1.5" />
              AI Suggestion
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-zinc-300">Cut Procurement Waste</label>
              <span className="text-emerald-400 font-mono font-bold">{procurementSavings[0].toFixed(1)}%</span>
            </div>
            <Slider 
              value={procurementSavings} 
              onValueChange={setProcurementSavings} 
              max={5} step={0.1} 
              className="py-2"
            />
            <p className="text-xs text-zinc-500">Target: 1.5%. Achievable via cold-chain routing optimization.</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-zinc-300">Shift to Premium Products</label>
              <span className="text-emerald-400 font-mono font-bold">{vapMix[0].toFixed(1)}%</span>
            </div>
            <Slider 
              value={vapMix} 
              onValueChange={setVapMix} 
              max={25} step={0.5} 
            />
            <p className="text-xs text-zinc-500">Target: 12.0%. Convert liquid milk to high-margin cheese/ghee.</p>
          </div>
        </CardContent>
      </Card>

      <div className="md:col-span-2 space-y-6">
        <Card className="rounded-2xl border border-white/10 bg-zinc-950/40 backdrop-blur-xl shadow-2xl">
          <CardContent className="pt-6">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}B`} />
                  <Tooltip 
                    cursor={{ fill: '#18181b', opacity: 0.5 }}
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                    formatter={(value: number) => [`₹${value.toFixed(2)} Billion`, "Net Profit"]}
                  />
                  <Bar dataKey="Profit" radius={[6, 6, 0, 0]} barSize={80}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <motion.div 
          key={simulatedProfit} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 flex items-start space-x-4"
        >
          <div className="bg-emerald-500/20 p-2 rounded-lg mt-0.5">
            <ArrowRight className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-100 mb-1">CFO Strategic Impact</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {procurementSavings[0] === 0 && vapMix[0] === 0 ? (
                "Adjust the operational levers above or click 'AI Suggestion' to model the financial impact of strategic interventions."
              ) : (
                <>
                  By executing this strategy, net profit increases from <strong className="text-zinc-200">₹{baseProfit.toFixed(2)}B</strong> to <strong className="text-emerald-400">₹{simulatedProfit.toFixed(2)}B</strong>. 
                  {procurementSavings[0] > 0 && ` Recapturing ${procurementSavings[0].toFixed(1)}% of procurement waste injects ₹${savingsBillion.toFixed(2)}B straight to the bottom line.`}
                  {vapMix[0] > 0 && ` Shifting ${vapMix[0].toFixed(1)}% of volume to high-margin dairy products generates an additional ₹${vapBonusBillion.toFixed(2)}B in profit.`}
                </>
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}