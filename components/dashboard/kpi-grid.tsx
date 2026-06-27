"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { IndianRupee, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { DashboardMetrics } from "@/types/finance";
import { motion } from "framer-motion";

interface KpiGridProps {
  data: DashboardMetrics;
}

export function KpiGrid({ data }: KpiGridProps) {
  const kpis = [
    { title: "Total Revenue (FY24)", value: formatCurrency(data.Revenue_Billion), icon: IndianRupee, trend: "Base", color: "text-zinc-100" },
    { title: "Net Profit", value: formatCurrency(data.NetProfit_Billion), icon: TrendingUp, trend: `${formatPercent(data.NetMargin)} Margin`, color: "text-emerald-500" },
    { title: "Revenue CAGR", value: formatPercent(data.CAGR), icon: TrendingDown, trend: "5-Year Trend", color: "text-rose-500" },
    { title: "Operating Risk", value: formatCurrency(data.WorstCase / 1000), icon: AlertTriangle, trend: "Monte Carlo 5% Tail", color: "text-amber-500" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {kpis.map((kpi, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-100 tracking-tight">{kpi.value}</div>
              <p className="text-xs text-zinc-500 mt-1">{kpi.trend}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}