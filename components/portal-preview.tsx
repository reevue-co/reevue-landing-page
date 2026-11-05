import type { Dictionary } from "@/lib/dictionary";

export function PortalPreview({ dict }: { dict: Dictionary }) {
  return (
    <div
      role="img"
      aria-label={`${dict.portal.mockTitle}. ${dict.portal.mockNote}`}
      className="rounded-[1.8rem] bg-paper p-5 shadow-[0_30px_80px_-48px_rgba(18,36,72,0.4)] ring-1 ring-line sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">{dict.portal.mockTitle}</p>
        <p className="text-xs font-medium text-blue">
          {dict.portal.mockBadge}
        </p>
      </div>
      <ul className="mt-4 divide-y divide-line">
        {dict.portal.mockItems.map((item) => (
          <li key={item.title} className="flex items-center justify-between gap-3 py-3">
            <span>
              <span className="block text-sm font-semibold text-ink">{item.title}</span>
              <span className="block text-xs text-muted">{item.meta}</span>
            </span>
            <span className="h-10 w-14 shrink-0 rounded-lg bg-line" />
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs leading-5 text-muted">{dict.portal.mockNote}</p>
    </div>
  );
}
