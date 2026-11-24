import React from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
          error: <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />,
          info: <Info className="w-5 h-5 text-indigo-600 flex-shrink-0" />
        };

        const bgStyles = {
          success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
          warning: 'bg-amber-50 border-amber-200 text-amber-900',
          error: 'bg-red-50 border-red-200 text-red-900',
          info: 'bg-indigo-50 border-indigo-200 text-indigo-900'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-lg flex items-start gap-3 transition-all duration-300 transform translate-y-0 opacity-100 ${
              bgStyles[toast.type] || bgStyles.info
            }`}
          >
            <div className="mt-0.5">{icons[toast.type] || icons.info}</div>
            <div className="flex-1 min-w-0">
              {toast.title && (
                <div className="text-sm font-bold tracking-tight mb-0.5">
                  {toast.title}
                </div>
              )}
              <div className="text-xs opacity-90 leading-relaxed">
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1 -mr-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
