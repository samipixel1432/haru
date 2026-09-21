"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-5 py-16">
      <h1 className="font-serif-display text-center text-2xl text-ink">Acceso Admin</h1>
      <p className="mt-2 text-center text-sm text-ink/50">Haru Boutique</p>

      {!isSupabaseConfigured && (
        <p className="mt-6 border border-gold/30 bg-gold/5 p-4 text-xs text-ink/70">
          Supabase todavía no está configurado. Agrega las variables de entorno en{" "}
          <code>.env.local</code> para poder iniciar sesión (ver <code>.env.local.example</code>).
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <input
          type="email"
          required
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gold/30 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
        />
        <input
          type="password"
          required
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gold/30 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
        />
        {error && <p className="text-xs text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={loading || !isSupabaseConfigured}
          className="mt-2 border border-gold bg-gold py-3 text-xs tracking-[0.2em] text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "INGRESANDO..." : "INGRESAR"}
        </button>
      </form>
    </div>
  );
}
