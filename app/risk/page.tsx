import { ScenarioTable } from "@/components/dashboard/scenario-table";
import { RiskChart } from "@/components/dashboard/risk-chart";
import dashboardData from "@/data/dashboard.json";
import scenariosData from "@/data/scenarios.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Zap } from "lucide-react";

export default function RiskPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Risk Analysis</h1>
        <p className="text-zinc-400 mt-2">
          Monte Carlo simulations and scenario-based stress testing.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Graph: Takes up 2/3 of the space */}
        <div className="md:col-span-2">
          <RiskChart data={dashboardData} />
        </div>

        {/* Insights Box: Takes up 1/3 of the space */}
        <Card className="md:col-span-1 rounded-2xl border border-white/10 bg-zinc-950/40 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col">
          <CardHeader className="border-b border-zinc-800/50 pb-4">
            <CardTitle className="text-zinc-100 flex items-center text-lg">
              <ShieldAlert className="w-5 h-5 mr-2 text-amber-500" />
              Stress Test Results
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6 flex-1">
            
            <div>
              <h4 className="text-sm font-bold text-zinc-200 mb-2">Current Situation</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                The 10,000-iteration Monte Carlo simulation reveals a highly fragile operating model. A mere 2% adverse shock to procurement costs (e.g., cattle feed inflation or transport fuel spikes) wipes out 70% of the net profit, plunging the worst-case scenario to just <strong className="text-amber-500">₹0.38B</strong>.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <Zap className="w-12 h-12 text-emerald-500" />
              </div>
              <h4 className="text-sm font-bold text-emerald-400 mb-2 flex items-center">
                <Zap className="w-4 h-4 mr-1.5" /> AI / CFO Suggestion
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                We must decouple from raw commodity volatility. Implement dynamic B2B pricing contracts that float with inflation, and utilize financial hedging for transport fuel. Building a cash reserve equivalent to 3 months of operating expenses is strictly required to survive the 5% tail risk.
              </p>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Scenario Table spans the full width below the grid */}
      <div className="mt-6">
        <ScenarioTable data={scenariosData} />
      </div>
    </div>
  );
}