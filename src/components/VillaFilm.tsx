import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

import { villaFilmPoster, villaFilmSrc } from "@/data/antiguabellaMedia";

const VillaFilm = () => {
  const [requested, setRequested] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!requested) return;
    videoRef.current?.play().catch(() => undefined);
  }, [requested]);

  return (
    <section className="mt-12" aria-labelledby="villa-film-heading">
      <h2 id="villa-film-heading" className="luxury-heading text-3xl text-foreground mb-4">
        Watch the villa film
      </h2>
      <div className="overflow-hidden rounded-2xl border border-border/30 bg-black">
        <div className="relative aspect-video">
          {requested ? (
            <video
              ref={videoRef}
              src={villaFilmSrc}
              poster={villaFilmPoster}
              controls
              playsInline
              preload="auto"
              className="h-full w-full bg-black object-contain"
            />
          ) : (
            <button
              type="button"
              onClick={() => setRequested(true)}
              className="group absolute inset-0"
            >
              <img
                src={villaFilmPoster}
                alt=""
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center gap-3 rounded-full border border-white/30 bg-black/40 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-white">
                  <Play size={14} />
                  Watch the villa film
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        The film shows the villa, guests, and dining. It does not confirm which services are included with a stay.
      </p>
    </section>
  );
};

export default VillaFilm;
