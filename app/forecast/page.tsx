import { ForecastChart } from "@/components/dashboard/forecast-chart";
import forecastData from "@/data/forecast.json";
import dashboardData from "@/data/dashboard.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, BrainCircuit } from "lucide-react";

export default function ForecastPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Forecast & Trends</h1>
        <p className="text-zinc-400 mt-2">
          Predictive financial modeling based on historical CAGR.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Graph: Takes up 2/3 of the space */}
        <div className="md:col-span-2">
          <ForecastChart data={forecastData} />
        </div>
        
        {/* Insights Box: Takes up 1/3 of the space */}
        <Card className="md:col-span-1 rounded-2xl border border-white/10 bg-zinc-950/40 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col">
          <CardHeader className="border-b border-zinc-800/50 pb-4">
            <CardTitle className="text-zinc-100 flex items-center text-lg">
              <TrendingDown className="w-5 h-5 mr-2 text-rose-500" />
              Trajectory Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6 flex-1">
            
            <div>
              <h4 className="text-sm font-bold text-zinc-200 mb-2">Current Situation</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Based on 5-year historical data, the business is in contraction. The <strong className="text-rose-400">-3.18% Revenue CAGR</strong> indicates that standard liquid milk sales are declining. Projections for FY25-FY27 show profits shrinking below ₹0.6B if operations remain static.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <BrainCircuit className="w-12 h-12 text-emerald-500" />
              </div>
              <h4 className="text-sm font-bold text-emerald-400 mb-2 flex items-center">
                <BrainCircuit className="w-4 h-4 mr-1.5" /> AI / CFO Suggestion
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                A shrinking top-line in a high-fixed-cost business is lethal. The cooperative must urgently diversify its SKUs. Introducing flavored milks and fortified yogurts targets younger demographics and commands a 30% price premium, which will artificially reverse the revenue contraction.
              </p>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}