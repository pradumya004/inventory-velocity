// client/src/app/settings/page.js

"use client";

import {
  Save,
  Lock,
  Bell,
  User,
  ShieldCheck,
  Mail,
  Smartphone,
  Globe,
  RefreshCcw,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useState } from "react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSync = () => {
    setLoading(true);
    // Logic: Simulate system state reset/sync
    setTimeout(() => {
      setLoading(false);
      alert("System Audit Complete: All records synchronized.");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <Globe size={20} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Core Infrastructure
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
            System Configuration
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Global governance for account security and node preferences.
          </p>
        </div>

        <Button
          onClick={handleSync}
          variant="primary"
          className="bg-slate-900 hover:bg-indigo-600 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-slate-200 active:scale-95"
        >
          {loading ? (
            <RefreshCcw size={16} className="animate-spin mr-2" />
          ) : (
            <ShieldCheck size={16} className="mr-2" />
          )}
          Run System Audit
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Identity Card */}
        <Card className="p-8 group hover:border-indigo-100 transition-all border-none shadow-sm">
          <div className="flex items-center gap-5 mb-8">
            <div className="p-4 bg-slate-100 text-slate-600 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
              <User size={28} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                Admin Identity
              </h3>
              <p className="text-sm text-slate-500">
                Personalize your system footprint.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={14}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  defaultValue="Pradumya Gaurav"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Secure Email
              </label>
              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  defaultValue="pradumya004@gmail.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Intelligence Alerts */}
        <Card className="p-8 border-none shadow-sm">
          <div className="flex items-center gap-5 mb-8">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Bell size={28} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                Intelligence Alerts
              </h3>
              <p className="text-sm text-slate-500">
                Manage velocity and risk notification nodes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Dead Stock Pulse (90+ Days)", icon: Zap, status: true },
              {
                label: "Critical Stock Thresholds",
                icon: Smartphone,
                status: true,
              },
              {
                label: "Daily Logistics Summary",
                icon: FileText,
                status: false,
              },
              { label: "Automatic CSV Cloud Sync", icon: Globe, status: true },
            ].map((node, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-5 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <node.icon
                    size={16}
                    className="text-slate-400 group-hover:text-indigo-600 transition-colors"
                  />
                  <span className="text-xs font-bold text-slate-700">
                    {node.label}
                  </span>
                </div>
                {/* Custom Functional Toggle */}
                <button
                  className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${
                    node.status ? "bg-indigo-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${
                      node.status ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Security & Access Keys */}
        <Card className="p-8 border-none shadow-sm overflow-hidden relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl">
                <Lock size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                  System Security
                </h3>
                <p className="text-sm text-slate-500">
                  Update administrative credentials and API keys.
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              className="bg-red-600 hover:bg-red-700 text-white font-black text-[10px] px-8 py-3"
            >
              RESET MASTER KEYS
            </Button>
          </div>
          {/* Subtle safety text */}
          <div className="mt-6 p-4 bg-slate-900 rounded-xl">
            <code className="text-[10px] text-emerald-400 font-mono">
              LAST_LOGIN: {new Date().toLocaleString()} | NODE_VERSION: v20.10.0
            </code>
          </div>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-600 transition-all">
          <Save size={20} className="mr-3" /> Save Changes
        </Button>
      </div>
    </div>
  );
}

// Mock imports for consistent behavior
import { Zap, FileText } from "lucide-react";