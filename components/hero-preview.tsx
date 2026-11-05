import Image from "next/image";
import type { Dictionary } from "@/lib/dictionary";
import { listingPhoto, photos } from "@/lib/media";

export function HeroPreview({ dict }: { dict: Dictionary }) {
  return (
    <figure className="min-w-0">
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_28px_70px_-36px_rgba(16,42,74,0.55)]"
      >
        <div className="flex items-center gap-2 border-b border-line bg-[#f7f9fc] px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#d5deea]" />
          <span className="size-2.5 rounded-full bg-[#d5deea]" />
          <span className="size-2.5 rounded-full bg-[#d5deea]" />
          <span className="ml-2 truncate rounded-md bg-white px-3 py-1 text-xs text-muted ring-1 ring-line">
            {dict.preview.domain}
          </span>
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-ink">{dict.preview.agency}</p>
            <p className="text-xs font-medium text-muted">{dict.preview.agencyLine}</p>
          </div>
          <div className="relative mt-4 overflow-hidden rounded-xl">
            <Image
              src={photos.building.src}
              alt=""
              width={photos.building.width}
              height={photos.building.height}
              priority
              sizes="(min-width: 1024px) 640px, 100vw"
              className="h-44 w-full object-cover sm:h-56"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101b2d]/85 via-[#101b2d]/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="max-w-sm text-lg font-semibold leading-tight sm:text-2xl">
                {dict.preview.bannerTitle}
              </p>
              <p className="mt-1 text-sm text-white/85">{dict.preview.bannerText}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.values(dict.preview.filters).map((filter) => (
              <span
                key={filter}
                className="rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-blue"
              >
                {filter}
              </span>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {dict.listings.map((listing) => {
              const photo = listingPhoto[listing.image];
              return (
                <div key={listing.id} className="min-w-0">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 truncate text-xs font-semibold text-ink">{listing.neighborhood}</p>
                  <p className="truncate text-xs text-muted">{listing.price}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 max-w-xl text-sm leading-6 text-muted">
        {dict.preview.heroCaption}
      </figcaption>
    </figure>
  );
}
