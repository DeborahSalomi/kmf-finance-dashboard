import { StrategySimulator } from "@/components/dashboard/strategy-simulator";

export default function StrategyPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Strategic Planner</h1>
        <p className="text-zinc-400 mt-2">
          Interactive financial modeling for operational turnaround and margin expansion.
        </p>
      </div>

      <StrategySimulator />
    </div>
  );
}