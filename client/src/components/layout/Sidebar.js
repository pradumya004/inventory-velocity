// client/src/components/layout/Sidebar.js

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PackageSearch,
  BarChart3,
  Settings,
  Box,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    category: "Overview",
    items: [
      {
        name: "Analytics Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
      },
      {
        name: "Reports & Forecasts",
        icon: BarChart3,
        path: "/dashboard/reports",
      },
    ],
  },
  {
    category: "Logistics",
    items: [
      { name: "Inventory Master", icon: PackageSearch, path: "/inventory" },
      { name: "Inbound Stock", icon: Box, path: "/inventory/add" },
    ],
  },
  {
    category: "System",
    items: [{ name: "Configuration", icon: Settings, path: "/settings" }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-950 text-slate-300 border-r border-slate-900 flex flex-col z-50">
      {/* 1. BRANDING FIXED */}
      <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-900">
        <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white shadow-lg shadow-indigo-900/20">
          <Box size={20} strokeWidth={3} />
        </div>
        <div>
          <h1 className="text-white font-bold tracking-tight text-lg">
            INVENTORY VELOCITY
          </h1>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
            Enterprise v1.0
          </p>
        </div>
      </div>

      {/* 2. Navigation */}
      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-8">
        {menuItems.map((group, idx) => (
          <div key={idx}>
            <p className="px-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3">
              {group.category}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-600/10 text-indigo-400 border border-indigo-600/20"
                        : "hover:bg-slate-900 hover:text-white text-slate-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        size={18}
                        className={
                          isActive
                            ? "text-indigo-500"
                            : "text-slate-500 group-hover:text-slate-300"
                        }
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    {isActive && (
                      <ChevronRight size={14} className="text-indigo-500" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* 3. Footer */}
      <div className="p-4 border-t border-slate-900 bg-slate-950">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-900">
          <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
            PG
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-white">Pradumya G.</p>
            <p className="text-[10px] text-slate-500">Admin Access</p>
          </div>
        </div>
      </div>
    </aside>
  );
}