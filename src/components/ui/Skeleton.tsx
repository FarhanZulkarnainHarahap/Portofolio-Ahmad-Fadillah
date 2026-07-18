export function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-[color:var(--surface-muted)] ${className}`} />;
}
