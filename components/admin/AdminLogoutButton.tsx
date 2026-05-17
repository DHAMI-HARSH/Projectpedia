"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-[var(--sidebar-muted)] hover:bg-white/10 hover:text-[var(--sidebar-text)] disabled:cursor-not-allowed disabled:opacity-70"
      disabled={loading}
      onClick={handleLogout}
      type="button"
    >
      {loading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
