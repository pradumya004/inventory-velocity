// client/src/components/dashboard/StatsGrid.js

import { Package, Layers, AlertCircle, Clock, CheckCircle } from "lucide-react";

export default function StatsGrid({ stats }) {
  const cards = [
    {
      label: "Total SKU Count",
      value: stats.totalItems || 0,
      desc: "Active unique items",
      icon: Package,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
    },
    {
      label: "Total Unit Volume",
      value: stats.totalQuantity || 0,
      desc: "Physical units in bin",
      icon: Layers,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      label: "Slow Moving",
      value: stats.slowStockCount || 0,
      desc: "Items > 30 days old",
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      isWarning: true,
    },
    {
      label: "Dead Stock Risk",
      value: stats.deadStockCount || 0,
      desc: "Items > 90 days old",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      isAlert: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`card-base p-6 relative group transition-all hover:shadow-md ${
            card.isAlert ? "border-l-4 border-l-red-500" : 
            card.isWarning ? "border-l-4 border-l-amber-500" : ""
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {card.label}
              </p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">
                {card.value}
              </h3>
            </div>
            <div className={`p-2 rounded-lg ${card.bgColor} ${card.color}`}>
              <card.icon size={20} />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-slate-400">{card.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}