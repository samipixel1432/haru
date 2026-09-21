"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/app/admin/actions";

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await signOut();
        router.push("/admin/login");
        router.refresh();
      }}
      className="text-xs text-ink/50 underline hover:text-gold"
    >
      Cerrar sesión
    </button>
  );
}
