import Image from "next/image";
import type { Dictionary } from "@/lib/dictionary";
import { listingPhoto, photos } from "@/lib/media";

export function HeroPreview({ dict }: { dict: Dictionary }) {
  return (
    <figure className="min-w-0">
      <div aria-hidden="true" className="rounded-[1.5rem] bg-paper/70 p-1.5 shadow-[0_40px_90px_-48px_rgba(18,36,72,0.55)] ring-1 ring-line">
        <div className="overflow-hidden rounded-[1.2rem] bg-paper">
        <div className="flex items-center gap-2 px-3 py-2">
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="ml-2 truncate text-xs text-muted">{dict.preview.domain}</span>
        </div>
        <div className="p-3 sm:p-3.5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink">{dict.preview.agency}</p>
            <p className="text-xs font-medium text-muted">{dict.preview.agencyLine}</p>
          </div>
          <div className="relative mt-2.5 overflow-hidden rounded-xl">
            <Image
              src={photos.building.src}
              alt=""
              width={photos.building.width}
              height={photos.building.height}
              priority
              sizes="(min-width: 1024px) 640px, 100vw"
              className="h-32 w-full object-cover sm:h-36 lg:h-32 xl:h-36"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101b2d]/85 via-[#101b2d]/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-white">
              <p className="max-w-sm text-base font-semibold leading-tight">
                {dict.preview.bannerTitle}
              </p>
              <p className="mt-0.5 text-xs text-white/85">{dict.preview.bannerText}</p>
            </div>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {Object.values(dict.preview.filters).map((filter) => (
              <span
                key={filter}
                className="rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-blue"
              >
                {filter}
              </span>
            ))}
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {dict.listings.map((listing) => {
              const photo = listingPhoto[listing.image];
              return (
                <div key={listing.id} className="min-w-0">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-1.5 truncate text-xs font-semibold text-ink">{listing.neighborhood}</p>
                  <p className="truncate text-xs text-muted">{listing.price}</p>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </div>
      <figcaption className="mt-2 max-w-xl text-xs leading-5 text-muted">
        {dict.preview.heroCaption}
      </figcaption>
    </figure>
  );
}
