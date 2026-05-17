"use client";
import Sidebar from "./Sidebar";

export default function MobileSidebarDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={onClose}>
      <div className="h-full w-[260px]" onClick={(e) => e.stopPropagation()}><Sidebar mobile /></div>
    </div>
  );
}
