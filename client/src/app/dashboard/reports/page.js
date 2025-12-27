// client/src/app/dashboard/reports/page.js

"use client";

import { useEffect, useState } from "react";
import {
  Download,
  BarChart3,
  ArrowRight,
  Table as TableIcon,
  Zap,
  ShieldCheck,
  Loader2
} from "lucide-react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { getInventory } from "../../../lib/api"; // Need this to get the data for export

export default function ReportsPage() {
  const [inventory, setInventory] = useState([]);
  const [isExporting, setIsExporting] = useState(false);

  // Fetch data on load so it's ready for export
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getInventory();
        setInventory(data);
      } catch (err) {
        console.error("Export Error:", err);
      }
    }
    fetchData();
  }, []);

  // --- OPTION 1: FUNCTIONAL CSV EXPORT LOGIC ---
  const handleExportCSV = () => {
    if (inventory.length === 0) return alert("No data available to export.");
    
    setIsExporting(true);

    // 1. Define CSV Headers
    const headers = ["Item Name", "SKU", "Category", "Quantity", "Zone", "Row", "Shelf", "Aging (Days)", "Status"];
    
    // 2. Format the data rows
    const csvRows = inventory.map(item => [
      item.name,
      item.sku,
      item.category,
      item.quantity,
      item.location?.zone || "N/A",
      item.location?.row || "N/A",
      item.location?.shelf || "N/A",
      item.daysInInventory,
      item.status
    ]);

    // 3. Combine headers and rows into a string
    const csvContent = [
      headers.join(","), 
      ...csvRows.map(row => row.join(","))
    ].join("\n");

    // 4. Create Blob and Trigger Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Inventory_Master_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsExporting(false), 1000);
  };

  const reportHistory = [
    { id: "REP-001", name: "Weekly Velocity Audit", date: "Dec 20, 2025", size: "1.2 MB", type: "PDF" },
    { id: "REP-002", name: "Aging Stock Forecast", date: "Dec 13, 2025", size: "840 KB", type: "CSV" },
    { id: "REP-003", name: "Quarterly Valuation", date: "Oct 01, 2025", size: "3.5 MB", type: "XLSX" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <BarChart3 size={20} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Analytics Intelligence</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            REPORTS & FORECASTS
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Generate and export system-wide inventory intelligence.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" className="border-slate-200 font-bold text-xs uppercase tracking-wider">
            Schedule Auto-Report
          </Button>
          {/* FUNCTIONAL BUTTON */}
          <Button 
            variant="primary" 
            onClick={handleExportCSV}
            disabled={isExporting}
            className="bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-slate-200 transition-all active:scale-95 disabled:opacity-50"
          >
            {isExporting ? <Loader2 size={16} className="animate-spin mr-2" /> : <Download size={16} className="mr-2" />}
            Export Master CSV
          </Button>
        </div>
      </div>

      {/* 2. Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Movement Analysis", desc: "Detailed breakdown of SKU turnover rates and velocity trends per zone.", icon: Zap },
          { title: "Valuation Equity", desc: "Financial summary of current stock assets and potential loss on dead items.", icon: ShieldCheck },
          { title: "Audit Log", desc: "Full traceability log of inbound and outbound transactions for compliance.", icon: TableIcon },
        ].map((item, idx) => (
          <Card key={idx} className="p-8 group hover:border-indigo-500 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all">
              <item.icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {item.desc}
            </p>
            <div className="mt-8 flex items-center text-[10px] font-black text-indigo-600 tracking-widest uppercase group-hover:gap-3 gap-2 transition-all">
              GENERATE REPORT <ArrowRight size={14} />
            </div>
          </Card>
        ))}
      </div>

      {/* 3. Recent Exports Table */}
      <div className="space-y-4 pt-4">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Recent Downloads
        </h3>
        <Card className="overflow-hidden border-none shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Report ID</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Report Name</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date Generated</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {reportHistory.map((report) => (
                <tr key={report.id} className="group hover:bg-indigo-50/30 transition-all duration-200">
                  <td className="px-8 py-5 text-xs font-mono font-bold text-slate-400">{report.id}</td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800">{report.name}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{report.type} FILE</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-xs font-medium text-slate-500">{report.date}</td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={handleExportCSV} // Make these functional too
                      className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-[10px] font-black hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                    >
                      <Download size={14} />
                      DOWNLOAD ({report.size})
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}