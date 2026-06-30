"use client";

import { useState, useEffect } from "react";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { WaterfallChart } from "@/components/dashboard/waterfall-chart";
import { DataUploader } from "@/components/dashboard/data-uploader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Lightbulb } from "lucide-react";
import { useData } from "@/components/data-context";

export default function Home() {
  const { rawData, setRawData, dashboardData, setDashboardData } = useData();

  const [insights, setInsights] = useState({
    situation: "Awaiting initial data scan. Upload a financial model to generate dynamic operational insights.",
    suggestion: "Upload required for AI analysis."
  });

  useEffect(() => {
    if (rawData && rawData.length > 0) {
      const latest = rawData[0];
      if (latest.Revenue) {
        const rev = latest.Revenue;
        const prof = latest.Profit || 0;
        const margin = ((prof / rev) * 100).toFixed(1);

        let maxCostName = "Operational Costs";
        let maxCostValue = 0;
        
        Object.keys(latest).forEach(key => {
          if (key !== "name" && key !== "Revenue" && key !== "Profit" && typeof latest[key] === 'number') {
            if (latest[key] > maxCostValue) {
              maxCostValue = latest[key];
              maxCostName = key;
            }
          }
        });

        const costPercentage = ((maxCostValue / rev) * 100).toFixed(1);

        setInsights({
          situation: `The uploaded model indicates a net profit margin of ${margin}%. The largest financial drain is currently ${maxCostName}, which consumes approximately ${costPercentage}% of total generated revenue.`,
          suggestion: parseFloat(margin) < 5
            ? `Margins are critically tight. AI/CFO Recommendation: Immediately freeze the ${maxCostName} budget and initiate an internal efficiency audit. Shift focus to higher-margin product lines.`
            : `Healthy margin detected (${margin}%). AI/CFO Recommendation: Reinvest 15-20% of net profits into R&D or market expansion while maintaining strict control over ${maxCostName}.`
        });
      }
    }
  }, [rawData]);

  const handleNewData = (parsedData: any[]) => {
    if (parsedData.length > 0) {
      setRawData(parsedData); // Commits to Global State
      
      if (parsedData[0].Revenue) {
        setDashboardData([
          { title: "Total Revenue", value: `₹${parsedData[0].Revenue.toFixed(2)} B`, trend: "Base" },
          { title: "Net Profit", value: `₹${parsedData[0].Profit?.toFixed(2) || "0"} B`, trend: "Dynamic Margin", positive: parsedData[0].Profit > 0 },
          { title: "Revenue CAGR", value: "Auto-Calc", trend: "Based on Upload", positive: true },
          { title: "Operating Risk", value: "Evaluating", trend: "Live Data Synced" }
        ]);
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Executive Dashboard</h1>
          <p className="text-zinc-400 mt-2">
            Financial performance overview and cost structure analysis.
          </p>
        </div>
        <div className="w-72">
          <DataUploader onDataParsed={handleNewData} />
        </div>
      </div>

      <KpiGrid data={dashboardData as any} />
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <WaterfallChart data={rawData as any} />
        </div>

        <Card className="md:col-span-1 rounded-2xl border border-white/10 bg-zinc-950/40 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col">
          <CardHeader className="border-b border-zinc-800/50 pb-4">
            <CardTitle className="text-zinc-100 flex items-center text-lg">
              <Target className="w-5 h-5 mr-2 text-emerald-500" />
              Strategic Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6 flex-1">
            <div>
              <h4 className="text-sm font-bold text-zinc-200 mb-2">Current Situation</h4>
              <p className="text-sm text-zinc-400 leading-relaxed transition-all duration-500">
                {insights.situation}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 relative overflow-hidden transition-all duration-500">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <Lightbulb className="w-12 h-12 text-emerald-500" />
              </div>
              <h4 className="text-sm font-bold text-emerald-400 mb-2 flex items-center">
                <Lightbulb className="w-4 h-4 mr-1.5" /> AI / CFO Suggestion
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {insights.suggestion}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}