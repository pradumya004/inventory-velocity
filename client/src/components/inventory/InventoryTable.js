// client/src/components/inventory/InventoryTable.js

"use client";

import { MapPin, Clock, Trash2, Edit2, Check, X } from "lucide-react";
import { useState } from "react"; // Added missing useState
import Card from "../ui/Card";
import StatusBadge from "./StatusBadge";
import { updateInventory, deleteInventory } from "../../lib/api";

export default function InventoryTable({ inventory }) {
  // Added missing state for inline editing
  const [editingId, setEditingId] = useState(null);
  const [tempQty, setTempQty] = useState(0);

  const handleSave = async (id) => {
    try {
      await updateInventory(id, tempQty);
      setEditingId(null);
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This SKU will be permanently removed.")) {
      try {
        await deleteInventory(id);
        window.location.reload();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (!inventory || inventory.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-slate-400 font-medium">No stock records found.</p>
        <p className="text-slate-400 text-sm mt-1">
          Navigate to &quot;Inbound Stock&quot; to add items.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Item Details
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                SKU / Category
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                Qty
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Aging
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {inventory.map((item) => (
              <tr
                key={item._id}
                className="group hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="block text-sm font-semibold text-slate-900">
                    {item.name}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-slate-500">
                      {item.sku}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">
                      {item.category}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-200 bg-white text-xs text-slate-600 font-medium">
                    <MapPin size={12} className="text-indigo-500" />
                    <span>
                      {item.location?.zone}-{item.location?.row}-
                      {item.location?.shelf}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  {editingId === item._id ? (
                    <input
                      type="number"
                      value={tempQty}
                      onChange={(e) => setTempQty(e.target.value)}
                      className="w-20 px-2 py-1 border-2 border-indigo-500 rounded text-right font-bold text-sm focus:outline-none"
                    />
                  ) : (
                    <span className="text-sm font-bold text-slate-700">
                      {item.quantity}
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Clock size={14} />
                    <span>{item.daysInInventory} days</span>
                  </div>
                </td>

                <td className="px-6 py-4 text-center">
                  <StatusBadge status={item.status} />
                </td>

                {/* --- NEW ACTIONS COLUMN --- */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {editingId === item._id ? (
                      <>
                        <button
                          onClick={() => handleSave(item._id)}
                          className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1.5 bg-slate-100 text-slate-400 rounded-lg hover:bg-slate-200"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(item._id);
                            setTempQty(item.quantity);
                          }}
                          className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}