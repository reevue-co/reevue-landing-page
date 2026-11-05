import type { Dictionary } from "@/lib/dictionary";

export function PortalPreview({ dict }: { dict: Dictionary }) {
  return (
    <div
      role="img"
      aria-label={`${dict.portal.mockTitle}. ${dict.portal.mockNote}`}
      className="rounded-2xl border border-line bg-[#f7f9fc] p-4 sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">{dict.portal.mockTitle}</p>
        <p className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-blue ring-1 ring-line">
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
            <span className="h-10 w-14 shrink-0 rounded-md bg-[#d7e3f0]" />
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs leading-5 text-muted">{dict.portal.mockNote}</p>
    </div>
  );
}
