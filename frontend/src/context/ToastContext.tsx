import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { Alert, type AlertType } from '../components/ui/Alert';

interface Toast { id: number; type: AlertType; message: string }

const ToastContext = createContext<(type: AlertType, message: string) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((type: AlertType, message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="toast-wrap" aria-live="polite">
        {toasts.map((t) => <Alert key={t.id} type={t.type}>{t.message}</Alert>)}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
