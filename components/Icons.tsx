type IconProps = { className?: string };

export function BagIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 8.5h13l-1 11h-11l-1-11Z" />
      <path strokeLinecap="round" d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
    </svg>
  );
}

export function MenuIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden="true">
      <path strokeLinecap="round" d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function CloseIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden="true">
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m-5-5 5 5-5 5" />
    </svg>
  );
}

export function WhatsappIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.93L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.2 15.02l-.3-.18-3.07.88.9-2.99-.2-.32A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 3.9c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.15s.93 2.5 1.06 2.67c.13.17 1.8 2.86 4.43 3.9 2.19.86 2.63.69 3.1.65.48-.04 1.53-.63 1.75-1.23.22-.6.22-1.12.15-1.23-.06-.11-.24-.17-.5-.3-.26-.13-1.53-.76-1.77-.84-.24-.09-.41-.13-.58.13-.17.26-.67.84-.82 1.01-.15.17-.3.2-.56.07-.26-.13-1.1-.4-2.1-1.3-.77-.69-1.3-1.55-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.07-.13-.58-1.4-.8-1.92-.2-.5-.42-.43-.58-.44h-.5Z" />
    </svg>
  );
}

export function LotusMark({ className = "h-5 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 64 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M32 6 C36 14 36 22 32 30 C28 22 28 14 32 6 Z" />
      <path d="M20 12 C24 18 26 24 26 30 C19 27 15 21 14 15 C16 13 18 12 20 12 Z" />
      <path d="M44 12 C40 18 38 24 38 30 C45 27 49 21 50 15 C48 13 46 12 44 12 Z" />
      <path d="M10 22 C15 24 19 27 22 31 C15 33 9 32 4 29 C5 26 7 24 10 22 Z" />
      <path d="M54 22 C49 24 45 27 42 31 C49 33 55 32 60 29 C59 26 57 24 54 22 Z" />
    </svg>
  );
}
