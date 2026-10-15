export function Skeleton({ height = 280 }: { height?: number }) {
  return <div className="skeleton" style={{ height }} aria-hidden="true" />;
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid" aria-busy="true" aria-label="Carregando">
      {Array.from({ length: count }, (_, i) => <Skeleton key={i} />)}
    </div>
  );
}
