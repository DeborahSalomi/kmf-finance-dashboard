import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { WaterfallChart } from "@/components/dashboard/waterfall-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Lightbulb } from "lucide-react";
import dashboardData from "@/data/dashboard.json";
import waterfallData from "@/data/waterfall.json";

export default function Home() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Executive Dashboard</h1>
        <p className="text-zinc-400 mt-2">
          Financial performance overview and cost structure analysis.
        </p>
      </div>

      <KpiGrid data={dashboardData} />
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Graph: Takes up 2/3 of the space */}
        <div className="md:col-span-2">
          <WaterfallChart data={waterfallData} />
        </div>

        {/* Insights Box: Takes up 1/3 of the space */}
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
              <p className="text-sm text-zinc-400 leading-relaxed">
                The cooperative operates on extreme volume with razor-thin margins. A staggering <strong className="text-rose-400">90.6% of revenue</strong> is instantly absorbed by raw milk procurement costs, leaving only 2.65% as net profit after manufacturing and transport.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <Lightbulb className="w-12 h-12 text-emerald-500" />
              </div>
              <h4 className="text-sm font-bold text-emerald-400 mb-2 flex items-center">
                <Lightbulb className="w-4 h-4 mr-1.5" /> AI / CFO Suggestion
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Farmer procurement prices are politically difficult to cut. The most viable path to margin expansion is capping supply chain waste (spoilage/transport inefficiencies) while simultaneously shifting 10-15% of liquid milk into high-margin Value-Added Products (VAP) like cheese and whey.
              </p>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}