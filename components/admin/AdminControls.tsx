"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct, signOut } from "@/app/admin/actions";

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="text-xs text-red-700/70 underline hover:text-red-700"
      >
        Eliminar
      </button>
    );
  }

  return (
    <span className="flex items-center gap-2 text-xs">
      <span>¿Eliminar &quot;{name}&quot;?</span>
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await deleteProduct(id);
            router.refresh();
          })
        }
        className="text-red-700 underline"
      >
        Sí
      </button>
      <button onClick={() => setConfirming(false)} className="text-ink/50 underline">
        No
      </button>
    </span>
  );
}

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
