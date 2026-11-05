import Image from "next/image";
import { LotusMark } from "@/components/Icons";

export function ProductImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className="flex h-full w-full items-center justify-center bg-gradient-to-b from-sand to-[#ddd3c3]"
    >
      <LotusMark className="h-6 w-10 text-bronze/50" />
    </div>
  );
}
