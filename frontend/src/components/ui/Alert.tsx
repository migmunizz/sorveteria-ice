import type { ReactNode } from 'react';

export type AlertType = 'success' | 'error' | 'warning';

const icons: Record<AlertType, string> = { success: '✔', error: '✖', warning: '⚠' };
const labels: Record<AlertType, string> = { success: 'Sucesso', error: 'Erro', warning: 'Aviso' };

// Sempre ícone + texto, nunca só cor (Design System §3).
export function Alert({ type, children }: { type: AlertType; children: ReactNode }) {
  return (
    <div className={`alert alert--${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <span className="alert__icon" aria-hidden="true">{icons[type]}</span>
      <span className="sr-only">{labels[type]}: </span>
      <div>{children}</div>
    </div>
  );
}
