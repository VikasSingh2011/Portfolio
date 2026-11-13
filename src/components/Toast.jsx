import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast() {
  const { toast, showToast } = usePortfolio();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md transition-all duration-300 animate-slide-up bg-white/95 dark:bg-slate-900/95 border-brand-500/30 text-slate-900 dark:text-white">
      {toast.type === 'error' ? (
        <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
      )}
      <span className="text-sm font-medium">{toast.message}</span>
      <button 
        onClick={() => showToast(null)}
        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors ml-2"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
