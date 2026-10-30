import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info';
}

interface NotificationToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#151A2E] border border-[#1C2340] rounded-xl p-4 shadow-2xl flex items-start gap-3 animate-slide-up transition-all"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-[#8257F5] shrink-0 mt-0.5" />}

          <div className="flex-1">
            <p className="text-xs font-bold text-white leading-tight">{toast.title}</p>
            {toast.description && (
              <p className="text-[11px] text-[#A1A9C2] mt-0.5 leading-snug">{toast.description}</p>
            )}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#A1A9C2] hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
