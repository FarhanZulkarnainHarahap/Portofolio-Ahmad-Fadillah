import Link from "next/link";

export type BrandLogoVariant = "primary" | "symbol" | "horizontal" | "stacked";
export type BrandLogoSize = "sm" | "md" | "lg" | "xl";

type BrandLogoProps = {
  brandName?: string | null;
  tagline?: string | null;
  variant?: BrandLogoVariant;
  size?: BrandLogoSize;
  href?: string;
  className?: string;
  showTagline?: boolean;
};

const sizeMap: Record<BrandLogoSize, { mark: string; name: string; tagline: string; gap: string }> = {
  sm: { mark: "size-9", name: "text-base", tagline: "text-[10px]", gap: "gap-2" },
  md: { mark: "size-10", name: "text-2xl", tagline: "text-[11px]", gap: "gap-3" },
  lg: { mark: "size-14", name: "text-xl", tagline: "text-xs", gap: "gap-3" },
  xl: { mark: "size-20", name: "text-3xl", tagline: "text-sm", gap: "gap-4" },
};

export function BrandLogo({
  brandName,
  tagline,
  variant = "horizontal",
  size = "md",
  href,
  className = "",
  showTagline = false,
}: BrandLogoProps) {
  const resolvedName = brandName || "Portofolio HR";
  const resolvedTagline = tagline || "People Growth Connector";
  const cfg = sizeMap[size];
  const stacked = variant === "stacked" || variant === "primary";
  const showText = variant !== "symbol";
  const content = (
    <span className={`inline-flex items-center ${stacked ? "flex-col text-center" : ""} ${cfg.gap} ${className}`}>
      <BrandMark className={cfg.mark} />
      {showText ? (
        <span className="grid leading-none">
          <span className={`font-serif ${cfg.name} font-semibold tracking-normal text-[color:var(--text-primary)]`}>{resolvedName}</span>
          {showTagline || variant === "primary" || variant === "stacked" ? (
            <span className={`mt-1 font-semibold uppercase tracking-[0.16em] text-[color:var(--text-muted)] ${cfg.tagline}`}>{resolvedTagline}</span>
          ) : null}
        </span>
      ) : null}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label={`${resolvedName} beranda`}>
      {content}
    </Link>
  );
}

function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" role="img" aria-label="Human Growth Connector logo">
      <path
        d="M32 6c5.1 0 9.2 4.1 9.2 9.2s-4.1 9.2-9.2 9.2-9.2-4.1-9.2-9.2S26.9 6 32 6Z"
        fill="var(--primary)"
      />
      <path
        d="M12.9 35.1c6.4-8.4 15.1-10.6 19.1-10.6s12.7 2.2 19.1 10.6c1.9 2.5.4 6.2-2.8 6.6-5.4.8-9.8-1.2-13.3-5.4v16.2c0 2-1.4 3.5-3 3.5s-3-1.5-3-3.5V36.3c-3.5 4.2-7.9 6.2-13.3 5.4-3.2-.4-4.7-4.1-2.8-6.6Z"
        fill="var(--secondary)"
      />
      <path
        d="M39.9 27.3c6.5.3 11.6-2.7 15.2-8.9.8-1.4 2.9-.7 2.7.9-1.1 9.1-6.4 14-15.7 14.7-1.4.1-2.6-1-2.8-2.4l-.2-1.3c-.2-1.5.9-2.9 2.4-3Z"
        fill="var(--accent)"
      />
      <circle cx="11.5" cy="27" r="3.5" fill="var(--primary)" />
      <circle cx="52.5" cy="27" r="3.5" fill="var(--primary)" />
      <path d="M15 28c4.8-4.5 9.6-6.7 14.3-6.7M48.9 28c-4.8-4.5-9.6-6.7-14.3-6.7" fill="none" stroke="var(--border-strong)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
