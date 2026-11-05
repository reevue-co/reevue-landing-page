"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function isDark() {
  return document.documentElement.classList.contains("dark");
}

export function ThemeToggle({ toDark, toLight }: { toDark: string; toLight: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);
  const label = dark ? toLight : toDark;

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("reevue-theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-full hover:bg-background"
    >
      <span aria-hidden="true" className="flex h-5 w-9 items-center rounded-full bg-line p-0.5">
        <span className="size-4 rounded-full bg-ink transition-transform duration-200 ease-out dark:translate-x-4" />
      </span>
    </button>
  );
}
