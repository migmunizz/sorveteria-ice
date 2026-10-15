import type { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  block?: boolean;
  size?: 'md' | 'sm';
}

const cls = (variant: Variant, block?: boolean, size?: string, extra?: string) =>
  ['btn', `btn--${variant}`, block && 'btn--block', size === 'sm' && 'btn--sm', extra].filter(Boolean).join(' ');

export function Button({ variant = 'primary', loading, block, size, className, children, disabled, ...rest }: ButtonProps) {
  return (
    <button className={cls(variant, block, size, className)} disabled={disabled || loading} {...rest}>
      {loading && <span className="spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}

interface ButtonLinkProps {
  to: string;
  variant?: Variant;
  block?: boolean;
  size?: 'md' | 'sm';
  children: React.ReactNode;
}

export function ButtonLink({ to, variant = 'primary', block, size, children }: ButtonLinkProps) {
  return <Link to={to} className={cls(variant, block, size)}>{children}</Link>;
}
