"use client";

import { Project } from "@/types/project";
import Sidebar from "./Sidebar";

export default function MobileSidebarDrawer({
  open,
  onClose,
  projects = [],
  search = "",
  onSearchChange,
}: {
  open: boolean;
  onClose: () => void;
  onSearchChange?: (value: string) => void;
  projects?: Project[];
  search?: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/55 lg:hidden" onClick={onClose}>
      <div className="h-full w-[320px] max-w-[88vw]" onClick={(e) => e.stopPropagation()}>
        <Sidebar mobile onSearchChange={onSearchChange} projects={projects} search={search} />
      </div>
    </div>
  );
}
