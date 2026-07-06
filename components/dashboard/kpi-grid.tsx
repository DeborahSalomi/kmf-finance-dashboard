"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, IndianRupee } from "lucide-react";

interface KpiData {
  title: string;
  value: string | number;
  trend: string;
  positive?: boolean;
}

export function KpiGrid({ data }: { data: KpiData[] }) {
  // Safe formatting function
  const formatValue = (val: any) => {
    if (val === undefined || val === null) return "0.00";
    if (typeof val === "number") return val.toFixed(2);
    return val; 
  };

  // THE ARMOR: Explicitly verify data is an array before mapping
  if (!Array.isArray(data) || data.length === 0) {
    return null; 
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {data.map((kpi, i) => (
        <Card key={i} className="bg-zinc-950/40 border border-zinc-800/50 backdrop-blur-xl shadow-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start space-y-0 pb-2">
              <p className="text-sm font-medium text-zinc-400">{kpi.title}</p>
              {kpi.title?.includes("Risk") ? (
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              ) : kpi.title?.includes("Revenue") && !kpi.title?.includes("CAGR") ? (
                <IndianRupee className="h-4 w-4 text-zinc-500" />
              ) : kpi.positive ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : kpi.positive === false ? (
                <TrendingDown className="h-4 w-4 text-rose-500" />
              ) : (
                <Minus className="h-4 w-4 text-zinc-500" />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">
                {formatValue(kpi.value)}
              </h2>
              <p className="text-xs text-zinc-500 font-medium">{kpi.trend}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}