"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, TrendingUp, ShieldAlert, Target, Activity } from "lucide-react";

const routes = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/forecast", label: "Financial Forecast", icon: TrendingUp },
  { href: "/risk", label: "Risk Analysis", icon: ShieldAlert },
  { href: "/strategy", label: "AI Strategy", icon: Target },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950/50 backdrop-blur-xl flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <Activity className="w-6 h-6 text-emerald-500 mr-2" />
        <span className="font-bold text-lg tracking-tight">FinBoard Pro</span>
      </div>
      <nav className="flex-1 py-6 px-4 space-y-1">
        {routes.map((route) => {
          const isActive = pathname === route.href;
          const Icon = route.icon;
          
          return (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? "bg-emerald-500/10 text-emerald-400" 
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-emerald-500" : "text-zinc-500 group-hover:text-zinc-300"}`} />
              <span className="font-medium">{route.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}