"use client";

import { useState } from "react";
import type { Share } from "@/lib/lead-stats";

export type ChartPanel = {
  id: string;
  title: string;
  hint: string;
  items: Array<Share & { name: string; percent: string; countLabel: string }>;
};

const chartColors = ["#2457e6", "#8eacff", "#16348f", "#c9d6ff", "#4f6ec4", "#dbe4ff"];

export function AnalyticsCharts({ panels }: { panels: ChartPanel[] }) {
  const [active, setActive] = useState(panels[0]?.id ?? "");
  const panel = panels.find((item) => item.id === active) ?? panels[0];
  if (!panel) return null;

  return (
    <section className="rounded-[1.5rem] bg-paper px-4 py-4 ring-1 ring-line sm:px-5">
      <div role="tablist" aria-label={panels.map((item) => item.title).join(", ")} className="flex flex-wrap gap-1">
        {panels.map((item) => {
          const selected = item.id === panel.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`chart-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`chart-panel-${item.id}`}
              onClick={() => setActive(item.id)}
              className={`min-h-9 rounded-full px-3 text-sm font-medium ${
                selected ? "bg-blue-soft text-blue" : "text-muted hover:bg-background hover:text-ink"
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`chart-panel-${panel.id}`}
        aria-labelledby={`chart-tab-${panel.id}`}
        className="mt-3 grid items-center gap-4 sm:grid-cols-[9rem_minmax(0,1fr)]"
      >
        <p className="col-span-full text-xs leading-5 text-muted">{panel.hint}</p>
        <Donut title={panel.title} items={panel.items} />
        <ul className="grid gap-2 sm:grid-cols-2">
          {panel.items.map((item) => {
            const color = colorOf(panel.items, item.key);
            return (
              <li key={item.key} className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="mt-1 size-2.5 shrink-0 rounded-full"
                  style={{ background: color ?? "transparent", boxShadow: color ? undefined : "inset 0 0 0 1.5px var(--line)" }}
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-ink">{item.name}</span>
                  <span className="block text-xs tabular-nums text-muted">
                    {item.percent} · {item.countLabel}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Donut({ title, items }: { title: string; items: ChartPanel["items"] }) {
  const slices = items.filter((item) => item.count > 0);
  const arcs = slices.reduce<Array<(typeof slices)[number] & { start: number; end: number; color: string }>>((list, slice, index) => {
    const start = list.at(-1)?.end ?? 0;
    return [...list, { ...slice, start, end: start + slice.ratio, color: chartColors[index % chartColors.length] }];
  }, []);
  const lead = arcs[0];

  return (
    <svg viewBox="0 0 200 200" className="mx-auto size-32 sm:mx-0" role="img" aria-label={title}>
      {arcs.length === 1 ? (
        <circle cx="100" cy="100" r="64" fill="none" stroke={arcs[0].color} strokeWidth="28" />
      ) : (
        arcs.map((arc) => <path key={arc.key} d={donutPath(arc.start, arc.end)} fill={arc.color} />)
      )}
      <circle cx="100" cy="100" r="48" className="fill-paper" />
      {lead ? (
        <text x="100" y="108" textAnchor="middle" fontSize="22" fontWeight="600" fill="currentColor" className="text-ink">
          {lead.percent}
        </text>
      ) : null}
    </svg>
  );
}

function colorOf(items: ChartPanel["items"], key: string) {
  const index = items.filter((item) => item.count > 0).findIndex((item) => item.key === key);
  return index < 0 ? undefined : chartColors[index % chartColors.length];
}

function donutPath(start: number, end: number) {
  const outer = 78;
  const inner = 50;
  const gap = Math.min(0.012, (end - start) / 4);
  const from = start + gap;
  const to = Math.max(from + 0.001, end - gap);
  const a0 = from * Math.PI * 2 - Math.PI / 2;
  const a1 = to * Math.PI * 2 - Math.PI / 2;
  const point = (angle: number, radius: number) => [100 + radius * Math.cos(angle), 100 + radius * Math.sin(angle)];
  const [x0, y0] = point(a0, outer);
  const [x1, y1] = point(a1, outer);
  const [x2, y2] = point(a1, inner);
  const [x3, y3] = point(a0, inner);
  const large = to - from > 0.5 ? 1 : 0;
  return `M ${x0} ${y0} A ${outer} ${outer} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${inner} ${inner} 0 ${large} 0 ${x3} ${y3} Z`;
}
