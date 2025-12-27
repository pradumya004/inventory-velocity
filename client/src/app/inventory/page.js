// client/src/app/inventory/page.js

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; 
import Link from "next/link";
import { Plus, PackageSearch, FilterX } from "lucide-react";
import { getInventory } from "../../lib/api";
import InventoryTable from "../../components/inventory/InventoryTable";

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Hooks for navigation and URL state
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Extract search term
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getInventory();
        setInventory(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Logic: Real-time filtering (handles empty search query correctly)
  const filteredInventory = inventory.filter((item) => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.sku.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* 1. Enhanced Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <PackageSearch size={20} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Global Stock
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Logistics Master
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time SKU visibility across all warehouse zones.
          </p>
        </div>

        <Link
          href="/inventory/add"
          className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-xl shadow-slate-200 hover:shadow-indigo-200 active:scale-95"
        >
          <Plus
            size={18}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          <span>Add Inbound Stock</span>
        </Link>
      </div>

      {/* 2. Content Logic */}
      {loading ? (
        <div className="card-base p-24 flex flex-col items-center justify-center text-slate-400 gap-4 border border-slate-100 rounded-2xl">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="font-medium animate-pulse">
            Syncing Master Database...
          </p>
        </div>
      ) : filteredInventory.length > 0 ? (
        <InventoryTable inventory={filteredInventory} />
      ) : (
        /* 3. Empty State / No Results UI */
        <div className="card-base p-20 flex flex-col items-center justify-center text-center border-dashed border-2 border-slate-200 rounded-2xl bg-slate-50/30">
          <div className="p-4 bg-white text-slate-300 rounded-full mb-4 shadow-sm">
            <FilterX size={48} strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            No matching records
          </h3>
          <p className="text-sm text-slate-500 max-w-xs mt-1">
            We couldn&apos;t find any items matching{" "}
            <span className="font-mono text-indigo-600 font-bold underline px-1">
              &quot;{searchQuery}&quot;
            </span>
            .
          </p>
          <button
            onClick={() => router.push(pathname)}
            className="mt-6 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline uppercase tracking-widest transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}