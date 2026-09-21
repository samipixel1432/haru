"use client";

import { useState, useTransition } from "react";
import { login } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-5 py-16">
      <h1 className="font-serif-display text-center text-2xl text-ink">Acceso Admin</h1>
      <p className="mt-2 text-center text-sm text-ink/50">Haru Boutique</p>

      <form action={handleSubmit} className="mt-8 flex flex-col gap-4">
        <input
          type="text"
          name="username"
          required
          autoComplete="username"
          placeholder="Usuario"
          className="border border-gold/30 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
        />
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          placeholder="Contraseña"
          className="border border-gold/30 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
        />
        {error && <p className="text-xs text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="mt-2 border border-gold bg-gold py-3 text-xs tracking-[0.2em] text-white hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? "INGRESANDO..." : "INGRESAR"}
        </button>
      </form>
    </div>
  );
}
