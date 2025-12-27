// client/src/components/layout/Header.js

"use client";

import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. Logic: Detect scroll to add shadow/blur for "Premium" feel
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Logic: Search Functionality (Updates URL params)
  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Format breadcrumbs: "/inventory/add" -> "Inventory / Add"
  const breadcrumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" / ");

  return (
    <header
      className={`h-20 flex items-center justify-between px-8 sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200"
          : "bg-transparent"
      }`}
    >
      {/* LEFT: Contextual Breadcrumbs */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
          <Sparkles size={14} className="text-indigo-600" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Enterprise
          </span>
        </div>
        <div className="h-4 w-px bg-slate-300 mx-1 hidden lg:block"></div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="text-slate-400">Inventory</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-semibold">
            {breadcrumbs || "Dashboard"}
          </span>
        </div>
      </div>

      {/* CENTER: High-Fidelity Search Bar */}
      <div className="flex-1 max-w-lg mx-12">
        <div className="relative group">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
          />
          <input
            type="text"
            placeholder="Search SKU, name, or location..."
            defaultValue={searchParams.get("q") || ""}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-slate-100/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all placeholder:text-slate-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400 opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      {/* RIGHT: Actions & Profile Container */}
      <div className="flex items-center gap-6">
        {/* Notification Bell with Pulse */}
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 rounded-xl transition-all group">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white ring-2 ring-indigo-100 animate-pulse"></span>
        </button>

        {/* Professional Profile Dropdown (UI Only) */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 group cursor-pointer">
          <div className="text-right hidden xl:block">
            <p className="text-sm font-bold text-slate-900 leading-none">
              Pradumya Gaurav
            </p>
            <p className="text-[10px] font-bold text-indigo-600 uppercase mt-1 tracking-tight">
              Lead Administrator
            </p>
          </div>

          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px]">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center overflow-hidden">
                <User size={20} className="text-slate-600" />
              </div>
            </div>
            {/* Status Indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></div>
          </div>

          <ChevronDown
            size={16}
            className="text-slate-400 group-hover:text-slate-600 transition-transform group-hover:rotate-180 duration-300"
          />
        </div>
      </div>
    </header>
  );
}