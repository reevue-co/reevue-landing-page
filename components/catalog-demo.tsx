"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Dictionary, Listing } from "@/lib/dictionary";
import { listingPhoto, photos } from "@/lib/media";

type IntentFilter = "all" | "sale" | "rent";

function normalize(value: string) {
  return value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function CatalogDemo({ dict }: { dict: Dictionary }) {
  const [intent, setIntent] = useState<IntentFilter>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(dict.listings[0]?.id ?? "");

  const visible = useMemo(() => {
    const needle = normalize(query.trim());
    return dict.listings.filter((listing) => {
      const matchesIntent = intent === "all" || listing.intent === intent;
      const haystack = normalize(`${listing.title} ${listing.neighborhood}`);
      return matchesIntent && (needle.length === 0 || haystack.includes(needle));
    });
  }, [dict.listings, intent, query]);

  const selected = visible.find((listing) => listing.id === selectedId) ?? visible[0];
  const filters: { id: IntentFilter; label: string }[] = [
    { id: "all", label: dict.preview.filters.all },
    { id: "sale", label: dict.preview.filters.sale },
    { id: "rent", label: dict.preview.filters.rent },
  ];

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="min-w-0 rounded-[1.8rem] bg-paper p-2 shadow-[0_30px_80px_-48px_rgba(18,36,72,0.4)] ring-1 ring-line">
        <div className="overflow-hidden rounded-[1.35rem]">
        <div className="flex items-center gap-2 px-4 py-3">
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="ml-2 truncate text-xs text-muted">{dict.preview.domain}</span>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-lg font-semibold text-ink">{dict.preview.agency}</p>
              <p className="text-sm text-muted">{dict.preview.agencyLine}</p>
            </div>
            <p className="text-xs font-medium text-blue">
              {dict.preview.fictional}
            </p>
          </div>

          <form
            className="mt-5 grid gap-4"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-2">
              <label htmlFor="catalog-search" className="text-sm font-semibold text-ink">
                {dict.preview.searchLabel}
              </label>
              <input
                id="catalog-search"
                type="search"
                value={query}
                autoComplete="off"
                placeholder={dict.preview.searchPlaceholder}
                onChange={(event) => setQuery(event.target.value)}
                className="h-12 w-full rounded-2xl bg-background px-4 text-base text-ink outline-none placeholder:text-muted"
              />
            </div>
            <fieldset>
              <legend className="sr-only">{dict.preview.filterLegend}</legend>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => {
                  const active = intent === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setIntent(filter.id)}
                      className={`min-h-11 rounded-full px-4 text-sm font-medium ${
                        active ? "bg-ink text-background" : "bg-background text-ink hover:bg-line"
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </form>

          {visible.length === 0 ? (
            <p className="mt-6 rounded-xl bg-background px-4 py-8 text-sm text-muted">{dict.preview.empty}</p>
          ) : (
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {visible.map((listing) => (
                <li key={listing.id}>
                  <PropertyButton
                    listing={listing}
                    intentLabel={dict.preview.intent[listing.intent]}
                    pressed={selected?.id === listing.id}
                    onSelect={() => setSelectedId(listing.id)}
                  />
                </li>
              ))}
            </ul>
          )}

          {selected ? <PropertyDetail dict={dict} listing={selected} /> : null}
        </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-28">
        <p className="mb-3 text-sm font-semibold text-ink">{dict.demo.mobile}</p>
        <PhoneFrame dict={dict} listing={selected} />
      </div>
    </div>
  );
}

function PropertyButton({
  listing,
  intentLabel,
  pressed,
  onSelect,
}: {
  listing: Listing;
  intentLabel: string;
  pressed: boolean;
  onSelect: () => void;
}) {
  const photo = listingPhoto[listing.image];

  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onSelect}
      className={`w-full rounded-2xl p-2 text-left ${
        pressed ? "bg-blue-soft" : "bg-background hover:bg-line"
      }`}
    >
      <span className="relative block aspect-[4/3] overflow-hidden rounded-lg">
        <Image
          src={photo.src}
          alt={listing.photoAlt}
          fill
          sizes="(min-width: 1024px) 220px, 100vw"
          className="object-cover"
        />
      </span>
      <span className="mt-2 block text-xs font-semibold text-blue">{intentLabel}</span>
      <span className="mt-1 block text-sm font-semibold text-ink">{listing.title}</span>
      <span className="block text-sm text-muted">
        {listing.neighborhood} · {listing.price}
      </span>
    </button>
  );
}

function PropertyDetail({ dict, listing }: { dict: Dictionary; listing: Listing }) {
  const photo = listingPhoto[listing.image];
  const gallery = [photo, photos.interior, photos.apartment];

  return (
    <article className="mt-6 border-t border-line pt-6" aria-live="polite">
      <p className="text-sm font-semibold text-blue">{dict.preview.intent[listing.intent]}</p>
      <h3 className="mt-1 text-2xl font-semibold tracking-tight text-ink">{listing.title}</h3>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-ink">{listing.price}</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Spec label={dict.preview.specs.neighborhood} value={listing.neighborhood} />
        <Spec label={dict.preview.specs.area} value={listing.area} />
        <Spec label={dict.preview.specs.bedrooms} value={listing.bedrooms} />
        <Spec label={dict.preview.specs.parking} value={listing.parking} />
      </dl>
      <div className="mt-5">
        <p className="text-sm font-semibold text-ink">{dict.preview.gallery}</p>
        <ul className="mt-3 grid grid-cols-3 gap-2">
          {gallery.map((item, index) => (
            <li key={`${listing.id}-${item.src}`} className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={item.src}
                alt={index === 0 ? listing.photoAlt : dict.preview.galleryAlt}
                fill
                sizes="180px"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5">
        <button
          type="button"
          disabled
          className="inline-flex min-h-12 cursor-not-allowed items-center rounded-full bg-background px-5 text-sm font-medium text-muted"
        >
          {dict.preview.whatsapp}
        </button>
        <p className="mt-2 text-sm text-muted">{dict.preview.whatsappNote}</p>
      </div>
    </article>
  );
}

function PhoneFrame({ dict, listing }: { dict: Dictionary; listing: Listing | undefined }) {
  return (
    <div className="mx-auto w-full max-w-[280px] rounded-[2rem] bg-line p-2 shadow-[0_24px_50px_-32px_rgba(18,28,48,0.45)]">
      <div className="overflow-hidden rounded-[1.55rem] bg-paper">
        <div className="flex justify-center py-2">
          <span className="h-1.5 w-14 rounded-full bg-line" />
        </div>
        {listing ? (
          <div className="px-3 pb-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={listingPhoto[listing.image].src}
                alt={listing.photoAlt}
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs font-semibold text-blue">{dict.preview.intent[listing.intent]}</p>
            <p className="text-base font-semibold leading-tight text-ink">{listing.title}</p>
            <p className="mt-1 text-sm text-muted">{listing.neighborhood}</p>
            <p className="mt-2 text-lg font-semibold text-ink">{listing.price}</p>
            <p className="mt-2 text-sm text-muted">
              {listing.area} · {listing.bedroomsLabel} · {listing.parkingLabel}
            </p>
          </div>
        ) : (
          <p className="px-4 py-16 text-sm text-muted">{dict.demo.mobileEmpty}</p>
        )}
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-1 py-2">
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-ink">{value}</dd>
    </div>
  );
}
