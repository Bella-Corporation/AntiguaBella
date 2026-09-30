import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PropertyPicture from "@/components/PropertyPicture";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PropertyPhoto } from "@/data/antiguabellaMedia";

type VillaPhotoGalleryProps = {
  photos: PropertyPhoto[];
  presentation?: "grid" | "story";
  highlights?: string[];
  eyebrow?: string;
  heading?: string;
};

const VillaPhotoGallery = ({
  photos,
  presentation = "grid",
  highlights,
  eyebrow = "Gallery",
  heading = "The residence",
}: VillaPhotoGalleryProps) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const pointerStart = useRef<number | null>(null);

  const photo = photos[index];
  const countLabel = `${index + 1} of ${photos.length}`;

  const show = (nextIndex: number, trigger?: HTMLButtonElement | null) => {
    triggerRef.current = trigger ?? triggerRef.current;
    setIndex(nextIndex);
    setOpen(true);
  };

  const step = (direction: -1 | 1) => {
    setIndex((current) => (current + direction + photos.length) % photos.length);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, photos.length]);

  if (!photo) return null;

  const storyPhotos = (highlights ?? photos.slice(0, 6).map((item) => item.id))
    .map((id) => photos.find((item) => item.id === id))
    .filter((item): item is PropertyPhoto => Boolean(item));

  const tile = (item: PropertyPhoto, eager = false) => {
    const itemIndex = photos.findIndex((candidate) => candidate.id === item.id);
    return (
      <button
        key={item.id}
        type="button"
        onClick={(event) => show(itemIndex, event.currentTarget)}
        className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/50 focus-visible:outline-offset-2"
      >
        <span className="block overflow-hidden rounded-xl border border-border/30 bg-card aspect-[3/2]">
          <PropertyPicture
            photo={item}
            alt=""
            loading={eager ? "eager" : "lazy"}
            sizes={eager ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 639px) 100vw, (max-width: 768px) 50vw, 33vw"}
            pictureClassName="block h-full w-full"
            className="h-full w-full object-cover object-center"
          />
        </span>
        <span className="mt-2 block text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
          {item.caption}
        </span>
      </button>
    );
  };

  return (
    <section aria-labelledby="villa-gallery-heading">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p id="villa-gallery-heading" className="luxury-subheading text-primary mb-2">
            {eyebrow}
          </p>
          <h2 className="luxury-heading text-[clamp(1.65rem,6.5vw,1.875rem)] leading-[1.15] text-foreground md:text-3xl">{heading}</h2>
        </div>
        {presentation === "story" && (
          <button
            type="button"
            onClick={(event) => show(0, event.currentTarget)}
            className="luxury-subheading text-[11px] tracking-[0.18em] text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/50 focus-visible:outline-offset-2"
          >
            View all {photos.length} photos
          </button>
        )}
      </div>

      {presentation === "story" ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-2">{storyPhotos[0] ? tile(storyPhotos[0], true) : null}</div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
              {storyPhotos.slice(1, 3).map((item) => tile(item))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {storyPhotos.slice(3).map((item) => tile(item))}
          </div>
        </>
      ) : (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            onClick={(event) => show(itemIndex, event.currentTarget)}
            className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/50 focus-visible:outline-offset-2"
          >
            <span className="block overflow-hidden rounded-xl border border-border/30 bg-card aspect-[4/3]">
              <PropertyPicture
                photo={item}
                alt=""
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                pictureClassName="block h-full w-full"
                className="h-full w-full object-contain sm:object-cover"
              />
            </span>
            <span className="mt-2 block text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
              {item.caption}
            </span>
          </button>
        ))}
      </div>
      )}

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) triggerRef.current?.focus();
        }}
      >
        <DialogContent className="flex h-[100dvh] max-h-[100dvh] w-screen max-w-none flex-col items-center justify-center gap-4 border-0 bg-background/96 p-4 sm:rounded-none sm:p-8">
          <DialogTitle className="sr-only">{photo.caption}</DialogTitle>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground" aria-live="polite">
            {countLabel}
          </p>
            <figure
            className="flex w-full flex-1 flex-col items-center justify-center touch-none"
            onPointerDown={(event) => {
              pointerStart.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (pointerStart.current == null) return;
              const delta = event.clientX - pointerStart.current;
              pointerStart.current = null;
              if (delta > 48) step(-1);
              if (delta < -48) step(1);
            }}
          >
            <PropertyPicture
              photo={photo}
              alt={photo.alt}
              loading="eager"
              sizes="100vw"
              className="h-auto w-auto object-contain"
              pictureClassName="flex items-center justify-center"
              style={{
                maxWidth: `min(100%, ${photo.width}px)`,
                maxHeight: `min(72vh, ${photo.height}px)`,
              }}
            />
            <figcaption className="mt-4 max-w-xl text-center text-sm text-foreground/80">
              {photo.caption}
            </figcaption>
          </figure>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/40 text-foreground/80"
              aria-label="Previous photo"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/40 text-foreground/80"
              aria-label="Next photo"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default VillaPhotoGallery;
