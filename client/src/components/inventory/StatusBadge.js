// client/src/components/inventory/StatusBadge.js

import clsx from "clsx";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

export default function StatusBadge({ status }) {
  const styles = {
    DEAD: "bg-red-50 text-red-700 border-red-100",
    SLOW: "bg-amber-50 text-amber-700 border-amber-100",
    FRESH: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };

  const icons = {
    DEAD: AlertCircle,
    SLOW: Clock,
    FRESH: CheckCircle,
  };

  const Icon = icons[status] || Clock;

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wide",
        styles[status] || "bg-slate-100 text-slate-600 border-slate-200"
      )}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}