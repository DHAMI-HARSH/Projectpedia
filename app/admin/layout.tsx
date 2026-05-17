"use client";

import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen lg:pl-[280px]">
      <aside className="fixed left-0 top-0 hidden h-screen w-[280px] border-r border-white/10 bg-[var(--sidebar-bg)] p-6 text-[var(--sidebar-text)] lg:flex lg:flex-col motion-enter">
        <div className="rounded-[20px] border border-white/10 bg-white/5 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sidebar-muted)]">Admin</p>
          <h2 className="mt-2 text-[1.7rem] font-semibold tracking-[-0.03em] text-white">Control Room</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--sidebar-muted)]">Manage records, edits, and publishing from one calmer workspace.</p>
        </div>
        <nav className="mt-6 space-y-2 text-sm">
          <Link href="/" className="block rounded-2xl px-3 py-3 font-medium hover:bg-[var(--sidebar-hover)]">Dashboard</Link>
          <Link href="/admin" className="block rounded-2xl px-3 py-3 font-medium hover:bg-[var(--sidebar-hover)]">All Projects</Link>
          <Link href="/admin/new" className="block rounded-2xl px-3 py-3 font-medium hover:bg-[var(--sidebar-hover)]">Add New Project</Link>
        </nav>
        <div className="mt-auto pt-6">
          <AdminLogoutButton />
        </div>
      </aside>
      <div className="p-4 sm:p-6 lg:p-8 motion-enter">{children}</div>
    </div>
  );
}
