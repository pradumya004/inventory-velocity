// client/src/app/inventory/add/page.js

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  PackagePlus,
  Calendar,
  MapPin,
} from "lucide-react";
import { addInventory } from "../../../lib/api";

export default function AddInventoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "Hardware",
    quantity: 0,
    zone: "A",
    row: "1",
    shelf: "1",
    entryDate: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        quantity: Number(formData.quantity),
        location: {
          zone: formData.zone.toUpperCase(),
          row: formData.row,
          shelf: formData.shelf,
        },
        entryDate: formData.entryDate,
      };

      await addInventory(payload);
      router.push("/inventory");
      router.refresh();
    } catch (err) {
      alert("Error adding item: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/inventory"
            className="p-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-500 transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <PackagePlus size={16} className="text-indigo-600" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Supply Chain Inbound
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
              Register New Stock
            </h2>
            <p className="text-sm text-slate-500">
              Log materials with precise location and arrival dating.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Form Container */}
      <div className="card-base p-10 bg-white shadow-2xl shadow-slate-200/50 border-none relative overflow-hidden">
        {/* Subtle Decorative Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full -z-0 pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          {/* Section: Material Identification */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-l-4 border-indigo-500 pl-3">
              Identification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Material Name
                </label>
                <input
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                  placeholder="e.g. High-Grade Industrial Steel Bolts"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  SKU Identifier
                </label>
                <input
                  name="sku"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none font-mono text-sm font-bold uppercase"
                  placeholder="HARD-001"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Category Segment
                </label>
                <select
                  name="category"
                  value={formData.category}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none appearance-none font-bold text-slate-700 cursor-pointer"
                  onChange={handleChange}
                >
                  <option value="Hardware">Hardware</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Raw Materials">Raw Materials</option>
                  <option value="Packaging">Packaging</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Warehouse Logistics */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-l-4 border-indigo-500 pl-3">
              Logistics Mapping
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase text-center">
                  Zone
                </label>
                <input
                  name="zone"
                  required
                  maxLength="1"
                  className="w-full py-3 bg-slate-50 border border-slate-200 rounded-xl text-center font-black text-indigo-600 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none uppercase"
                  placeholder="A"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase text-center">
                  Row
                </label>
                <input
                  name="row"
                  required
                  className="w-full py-3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none"
                  placeholder="1"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase text-center">
                  Shelf
                </label>
                <input
                  name="shelf"
                  required
                  className="w-full py-3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none"
                  placeholder="1"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Section: Quantity & Aging */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-2">
                Unit Volume
              </label>
              <input
                name="quantity"
                required
                type="number"
                min="1"
                className="w-full px-4 py-4 bg-indigo-50/30 border border-indigo-100 rounded-2xl text-2xl font-black text-indigo-600 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all"
                placeholder="0"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-2">
                <Calendar size={14} className="text-slate-400" /> Arrival Date
              </label>
              <input
                name="entryDate"
                type="date"
                value={formData.entryDate}
                className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none cursor-pointer"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-slate-900 hover:bg-indigo-600 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl transition-all shadow-2xl shadow-slate-200 hover:shadow-indigo-200 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Save size={20} />
              )}
              <span>Confirm System Entry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}