"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, username }),
    });
    setLoading(false);

    if (!r.ok) {
      setError("Invalid credentials");
      return;
    }

    const destination =
      new URLSearchParams(window.location.search).get("from") || "/admin";
    router.replace(destination);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.16)_0%,_rgba(244,250,255,1)_34%,_rgba(255,249,243,1)_100%)] px-4">
      <form onSubmit={onSubmit} className="motion-enter w-full max-w-md rounded-[24px] border border-white/70 bg-white/92 p-8 shadow-[0_24px_70px_rgba(15,35,61,0.1)] backdrop-blur">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">Admin Access</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">Sign in to manage Projectpedia</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">Use your admin credentials to manage projects, milestones, screenshots, and documentation.</p>
        <input className="mt-6 w-full rounded-2xl border border-[var(--border)] bg-[var(--panel-muted)] px-4 py-3.5 text-sm outline-none" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" className="mt-3 w-full rounded-2xl border border-[var(--border)] bg-[var(--panel-muted)] px-4 py-3.5 text-sm outline-none" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        <button className="mt-6 w-full rounded-full bg-[var(--accent)] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(15,118,110,0.22)] hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-70" disabled={loading}>{loading ? "Signing In..." : "Sign In"}</button>
      </form>
    </div>
  );
}
