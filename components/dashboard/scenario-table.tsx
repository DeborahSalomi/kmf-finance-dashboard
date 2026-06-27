"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { ScenarioData } from "@/types/finance";

export function ScenarioTable({ data }: { data: ScenarioData[] }) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 col-span-4">
      <CardHeader>
        <CardTitle className="text-zinc-100">Stress Testing & Scenario Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-zinc-400">
            <thead className="text-xs text-zinc-500 uppercase bg-zinc-950/50">
              <tr>
                <th className="px-4 py-3 rounded-tl-md">Scenario</th>
                <th className="px-4 py-3">Revenue Shock</th>
                <th className="px-4 py-3">Procurement Cost</th>
                <th className="px-4 py-3">Mfg. Cost</th>
                <th className="px-4 py-3 rounded-tr-md text-right">Proj. Profit</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                  <td className="px-4 py-3 font-medium text-zinc-200">{row.Scenario}</td>
                  <td className="px-4 py-3">{formatPercent(row.Revenue_Change * 100)}</td>
                  <td className="px-4 py-3">{formatPercent(row.Purchase_Change * 100)}</td>
                  <td className="px-4 py-3">{formatPercent(row.Manufacturing_Change * 100)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-emerald-500">
                    {formatCurrency(row.Profit_Million / 1000)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}