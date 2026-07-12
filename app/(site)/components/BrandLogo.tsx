import Image from "next/image";
import { cn } from "@/lib/utils";

export const SITE_NAME = "Renta Motos CyV";

type BrandLogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

export function BrandLogo({ className, size = 44, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/assets/logo.webp"
      alt={SITE_NAME}
      width={size}
      height={size}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}
