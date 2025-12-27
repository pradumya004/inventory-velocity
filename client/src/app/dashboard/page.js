// client/src/app/dashboard/page.js

"use client";

import { useEffect, useState } from "react";
import { getInventory, getInventoryStats } from "../../lib/api";
import StatsGrid from "../../components/dashboard/StatsGrid";
import SalesChart from "../../components/dashboard/SalesChart";
import StockPieChart from "../../components/dashboard/StockPieChart";
import {
  LayoutDashboard,
  TrendingUp,
  RefreshCcw,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {
  const [inventory, setInventory] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [invData, statsData] = await Promise.all([
          getInventory(),
          getInventoryStats(),
        ]);
        setInventory(invData);
        setStats(statsData);
      } catch (err) {
        setError("Analytical Engine Sync Failed.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 gap-4">
        <RefreshCcw className="animate-spin text-indigo-500" size={32} />
        <p className="font-bold tracking-widest text-[10px] uppercase">
          Syncing Analytics Engine...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 border-2 border-dashed border-red-200 rounded-2xl flex flex-col items-center gap-4 text-center">
        <AlertTriangle className="text-red-500" size={40} />
        <div>
          <h3 className="text-lg font-bold text-red-900">
            System Interruption
          </h3>
          <p className="text-sm text-red-600">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 1. Enhanced Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg shadow-sm">
              <LayoutDashboard size={20} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Intelligence Hub
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
            Executive Overview
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time logistical performance & resource utilization metrics.
          </p>
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center gap-4 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">
              System Status
            </span>
            <span className="text-xs font-bold text-slate-900">
              OPERATIONAL
            </span>
          </div>
        </div>
      </div>

      {/* 2. Key Performance Indicators (KPIs) */}
      <div className="relative">
        <div className="absolute -top-4 left-6 px-2 bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest z-10">
          Global Metrics
        </div>
        <StatsGrid stats={stats} />
      </div>

      {/* 3. Visualization Layer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        {/* Sales/Movement Logic */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <TrendingUp size={16} className="text-indigo-500" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Velocity Trends
            </h3>
          </div>
          <SalesChart inventory={inventory} />
        </div>

        {/* Stock Health Logic */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <RefreshCcw size={16} className="text-emerald-500" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Resource Allocation
            </h3>
          </div>
          <StockPieChart inventory={inventory} />
        </div>
      </div>
    </div>
  );
}