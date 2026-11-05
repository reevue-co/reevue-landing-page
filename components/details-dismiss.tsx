"use client";

import { useEffect } from "react";

export function DetailsDismiss({ id }: { id: string }) {
  useEffect(() => {
    function closeIfOutside(event: PointerEvent) {
      const menu = document.getElementById(id) as HTMLDetailsElement | null;
      if (!menu?.open) return;
      if (event.target instanceof Node && menu.contains(event.target)) return;
      menu.open = false;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const menu = document.getElementById(id) as HTMLDetailsElement | null;
      if (!menu?.open) return;
      menu.open = false;
      menu.querySelector("summary")?.focus();
    }

    document.addEventListener("pointerdown", closeIfOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeIfOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [id]);

  return null;
}
