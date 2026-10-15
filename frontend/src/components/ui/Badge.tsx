import { formatPrice } from '../../utils/format';

export function Badge({ kind }: { kind: 'promo' | 'new' }) {
  return <span className={`badge ${kind === 'new' ? 'badge--new' : ''}`}>{kind === 'new' ? 'Novo' : 'Promo'}</span>;
}

export function PriceBadge({ value, className = '' }: { value: number; className?: string }) {
  return <span className={`price ${className}`}>{formatPrice(value)}</span>;
}
