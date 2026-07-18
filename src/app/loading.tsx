import { BrandLogo } from "@/components/branding/BrandLogo";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center">
      <BrandLogo variant="stacked" size="lg" showTagline />
    </div>
  );
}
