export function LotusDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-gold/40" />
      <svg viewBox="0 0 64 40" className="h-5 w-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M32 6 C36 14 36 22 32 30 C28 22 28 14 32 6 Z" />
        <path d="M20 12 C24 18 26 24 26 30 C19 27 15 21 14 15 C16 13 18 12 20 12 Z" />
        <path d="M44 12 C40 18 38 24 38 30 C45 27 49 21 50 15 C48 13 46 12 44 12 Z" />
        <path d="M10 22 C15 24 19 27 22 31 C15 33 9 32 4 29 C5 26 7 24 10 22 Z" />
        <path d="M54 22 C49 24 45 27 42 31 C49 33 55 32 60 29 C59 26 57 24 54 22 Z" />
        <path d="M32 30 C34 33 34 36 32 38 C30 36 30 33 32 30 Z" />
      </svg>
      <span className="h-px w-12 bg-gold/40" />
    </div>
  );
}
