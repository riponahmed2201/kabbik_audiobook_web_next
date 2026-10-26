// components/Drawer.tsx
"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  position?: "left" | "right";
  width?: string;
  children: React.ReactNode;
};

export const CustomDrawer = ({
  open,
  onClose,
  position = "right",
  width = "w-80",
  children,
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer if click happens outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          `fixed top-0 h-full bg-white z-50 shadow-lg transition-transform duration-300 ease-in-out`,
          position === "right" ? "right-0" : "left-0",
          width,
          open
            ? "translate-x-0"
            : position === "right"
            ? "translate-x-full"
            : "-translate-x-full"
        )}
      >
        {children}
      </div>
    </>
  );
};
