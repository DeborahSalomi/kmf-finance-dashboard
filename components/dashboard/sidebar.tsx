"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, TrendingUp, ShieldAlert, Briefcase, Target } from "lucide-react";

const navItems = [
  { name: "Executive Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Forecast & Trends", href: "/forecast", icon: TrendingUp },
  { name: "Risk Analysis", href: "/risk", icon: ShieldAlert },
  { name: "Strategic Planner", href: "/strategy", icon: Target },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col z-20">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-zinc-800">
        <Briefcase className="w-6 h-6 mr-3 text-emerald-500 shrink-0" />
        <div className="flex flex-col">
          <span className="font-bold text-zinc-100 tracking-tight text-sm">Reynord Joshua K</span>
          <span className="text-xs text-emerald-500/80 font-medium tracking-wide uppercase mt-0.5">MBA Portfolio</span>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-zinc-800/50 text-emerald-400" 
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30"
              )}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-zinc-800">
        <div className="text-xs text-zinc-500 font-mono leading-relaxed">
          KMF Dairy Sector Analysis
          <br />
          FY20 - FY24
        </div>
      </div>
    </div>
  );
}