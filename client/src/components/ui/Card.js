// client/src/components/ui/Card.js

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white border border-slate-200 shadow-sm rounded-xl transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
}