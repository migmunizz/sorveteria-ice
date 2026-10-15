import type { ReactNode } from 'react';
import { Mascot } from '../Mascot';
import { Button } from './Button';

// Estado de erro padrão: mascote "derretendo" + tentar novamente.
export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="empty">
      <Mascot pose="melting" size={180} />
      <h3>Ops! Algo derreteu por aqui.</h3>
      <p className="muted">{message}</p>
      {onRetry && <Button onClick={onRetry}>Tentar novamente</Button>}
    </div>
  );
}

export function EmptyState({ title, text, action }: { title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="empty">
      <Mascot pose="sign" size={180} />
      <h3>{title}</h3>
      {text && <p className="muted">{text}</p>}
      {action}
    </div>
  );
}
