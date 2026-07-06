"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, TrendingUp, ShoppingCart, AlertTriangle, LineChart } from "lucide-react";

const navItems = [
  { name: "Executive Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Financial Analysis", href: "/financial-analysis", icon: TrendingUp },
  { name: "Procurement Analytics", href: "/procurement-analytics", icon: ShoppingCart },
  { name: "Risk & Sensitivity", href: "/risk-analysis", icon: AlertTriangle },
  { name: "Forecast & Strategy", href: "/forecast-strategy", icon: LineChart },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-800 h-screen flex flex-col p-4 fixed left-0 top-0">
      <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-zinc-800/50">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
          <LineChart className="w-5 h-5 text-emerald-500" />
        </div>
        <span className="text-zinc-100 font-bold text-lg tracking-tight">FinBoard Pro</span>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <span
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-500 font-medium"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-emerald-500" : "text-zinc-500"}`} />
                <span className="text-sm">{item.name}</span>
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}