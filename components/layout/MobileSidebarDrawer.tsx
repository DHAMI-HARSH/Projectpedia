"use client";

import Sidebar from "./Sidebar";

export default function MobileSidebarDrawer({
  open,
  onClose,
  search = "",
  onSearchChange,
}: {
  open: boolean;
  onClose: () => void;
  onSearchChange?: (value: string) => void;
  search?: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/55 lg:hidden" onClick={onClose}>
      <div className="h-full w-[320px] max-w-[88vw]" onClick={(e) => e.stopPropagation()}>
        <Sidebar mobile onSearchChange={onSearchChange} search={search} />
      </div>
    </div>
  );
}
