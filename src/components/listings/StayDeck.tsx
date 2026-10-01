import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PropertyPicture from "@/components/PropertyPicture";
import type { SharedPhoto } from "@/data/sharedMedia";

const DESKTOP_MQ = "(min-width: 768px)";

export type StayCard = {
  key: string;
  title: string;
  href: string;
  external?: boolean;
  photo: SharedPhoto;
  meta: [string, string];
  tagline: string;
  action: string;
  /** object-position so a 16:9 crop keeps pool, architecture, and horizon. */
  imagePosition: string;
};

const SNAP_MS = 420;
const WHEEL_LOCK_MS = 460;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useIsDesktopListing() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(DESKTOP_MQ).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

const StayCardFace = ({ card, deck }: { card: StayCard; deck?: boolean }) => (
  <>
    <div className="stay-deck-photo relative aspect-video overflow-hidden">
      <PropertyPicture
        photo={card.photo}
        alt={card.photo.alt}
        sizes={deck ? "90vw" : "(min-width: 1024px) 420px, 80vw"}
        pictureClassName="block h-full w-full"
        className="stay-card-image h-full w-full object-cover"
        style={{ objectPosition: card.imagePosition }}
      />
      {deck ? null : <div className="stay-card-dim absolute inset-0" />}
      <div className="stay-deck-shade absolute inset-0" />
      <div className="stay-card-action absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6">
        <span className="luxury-subheading text-[11px] font-bold text-primary">
          {card.action} <span className="stay-card-arrow" aria-hidden="true">→</span>
        </span>
      </div>
    </div>
    <div className={deck ? "p-6" : "p-5 sm:p-6 lg:p-7"}>
      <h3 className={`luxury-heading mb-3 text-foreground ${deck ? "text-2xl" : "text-xl lg:text-[1.35rem]"}`}>
        {card.title}
      </h3>
      <div className="mb-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.18em] text-foreground/45">
        <span>{card.meta[0]}</span>
        {card.meta[1] ? (
          <>
            <span className="text-foreground/20">|</span>
            <span>{card.meta[1]}</span>
          </>
        ) : null}
      </div>
      <p className={`luxury-body leading-[1.7] ${deck ? "text-[15px] text-muted-foreground/80" : "text-[13px] text-muted-foreground/60"}`}>
        {card.tagline}
      </p>
    </div>
  </>
);

const StayDeck = ({ cards }: { cards: StayCard[] }) => {
  const isDesktop = useIsDesktopListing();
  const deckRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const announcedRef = useRef(-1);
  const animRef = useRef(0);
  const wheelLockRef = useRef(0);
  const dragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    startScroll: 0,
  });
  const touchingRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const slides = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return [];
    return Array.from(root.querySelectorAll<HTMLElement>("[data-stay-slide]"));
  }, []);

  const centerFor = useCallback(
    (slide: HTMLElement) => {
      const root = scrollerRef.current;
      if (!root) return 0;
      return slide.offsetLeft - (root.clientWidth - slide.offsetWidth) / 2;
    },
    [],
  );

  const nearestIndex = useCallback(() => {
    const root = scrollerRef.current;
    const nodes = slides();
    if (!root || nodes.length === 0) return 0;
    const view = root.scrollLeft + root.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    nodes.forEach((node, i) => {
      const dist = Math.abs(node.offsetLeft + node.offsetWidth / 2 - view);
      if (dist < bestDist) {
        best = i;
        bestDist = dist;
      }
    });
    return best;
  }, [slides]);

  const paint = useCallback(() => {
    const root = scrollerRef.current;
    const nodes = slides();
    if (!root || nodes.length === 0) return;
    const reduce = prefersReducedMotion();
    const view = root.scrollLeft + root.clientWidth / 2;
    const dragging = dragRef.current.active || touchingRef.current;
    const stride = nodes.length > 1 ? nodes[1].offsetLeft - nodes[0].offsetLeft : nodes[0].offsetWidth;
    nodes.forEach((node) => {
      const delta = node.offsetLeft + node.offsetWidth / 2 - view;
      const t = Math.min(Math.abs(delta) / stride, 1);
      if (reduce) {
        node.style.transform = "";
        node.style.opacity = "";
        node.style.zIndex = "";
        return;
      }
      const scale = 1 - t * 0.035;
      const opacity = 1 - t * 0.22;
      const y = t * 10;
      const tilt = dragging ? Math.max(-1.5, Math.min(1.5, (-delta / stride) * 1.5)) : 0;
      node.style.transformOrigin = Math.abs(delta) < 8 ? "center center" : delta > 0 ? "left center" : "right center";
      node.style.transform = `translateY(${y}px) scale(${scale}) rotate(${tilt}deg)`;
      node.style.opacity = String(opacity);
      node.style.zIndex = String(10 - Math.round(t * 5));
    });
  }, [slides]);

  const commitIndex = useCallback(
    (next: number, announce: boolean) => {
      const clamped = Math.max(0, Math.min(cards.length - 1, next));
      indexRef.current = clamped;
      setIndex(clamped);
      if (announce && announcedRef.current !== clamped) {
        announcedRef.current = clamped;
        const card = cards[clamped];
        setAnnouncement(`${card.title}, ${clamped + 1} of ${cards.length}`);
      }
    },
    [cards],
  );

  const scrollToIndex = useCallback(
    (next: number, focus = false, announce = true) => {
      const root = scrollerRef.current;
      const nodes = slides();
      if (!root || nodes.length === 0) return;
      const clamped = Math.max(0, Math.min(nodes.length - 1, next));
      const target = centerFor(nodes[clamped]);
      cancelAnimationFrame(animRef.current);
      const reduce = prefersReducedMotion();
      const from = root.scrollLeft;
      const distance = target - from;
      if (reduce || Math.abs(distance) < 1) {
        root.scrollLeft = target;
        root.style.scrollSnapType = "";
        paint();
        commitIndex(clamped, announce);
        if (focus) nodes[clamped].focus({ preventScroll: true });
        return;
      }
      root.style.scrollSnapType = "none";
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / SNAP_MS);
        root.scrollLeft = from + distance * easeOut(t);
        if (t < 1) {
          animRef.current = requestAnimationFrame(step);
        } else {
          root.style.scrollSnapType = "";
          commitIndex(clamped, announce);
          if (focus) nodes[clamped].focus({ preventScroll: true });
        }
      };
      animRef.current = requestAnimationFrame(step);
    },
    [centerFor, commitIndex, paint, slides],
  );

  useEffect(() => {
    if (isDesktop) return;
    const root = scrollerRef.current;
    const deck = deckRef.current;
    if (!root || !deck) return;

    const onScroll = () => {
      paint();
      const next = nearestIndex();
      if (next !== indexRef.current) commitIndex(next, false);
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const dir = Math.sign(event.deltaY);
      if (dir === 0) return;
      const current = indexRef.current;
      const atEdge = (dir < 0 && current === 0) || (dir > 0 && current === cards.length - 1);
      if (atEdge) return;
      event.preventDefault();
      const now = performance.now();
      if (now < wheelLockRef.current) return;
      wheelLockRef.current = now + WHEEL_LOCK_MS;
      scrollToIndex(current + dir);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        touchingRef.current = true;
        return;
      }
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      cancelAnimationFrame(animRef.current);
      dragRef.current = {
        active: true,
        moved: false,
        startX: event.clientX,
        startScroll: root.scrollLeft,
      };
      root.style.scrollSnapType = "none";
      root.classList.add("is-dragging");
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragRef.current.active) return;
      const dx = event.clientX - dragRef.current.startX;
      if (Math.abs(dx) > 5) dragRef.current.moved = true;
      root.scrollLeft = dragRef.current.startScroll - dx;
    };

    const endDrag = () => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      root.classList.remove("is-dragging");
      scrollToIndex(nearestIndex());
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        touchingRef.current = false;
        paint();
      }
      endDrag();
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!dragRef.current.moved) return;
      event.preventDefault();
      event.stopPropagation();
      dragRef.current.moved = false;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.metaKey || event.ctrlKey) return;
      const current = indexRef.current;
      let next = current;
      if (event.key === "ArrowRight") next = current + 1;
      else if (event.key === "ArrowLeft") next = current - 1;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = cards.length - 1;
      else return;
      event.preventDefault();
      scrollToIndex(next, true);
    };

    const onResize = () => scrollToIndex(indexRef.current, false, false);

    paint();
    root.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    root.addEventListener("click", onClickCapture, true);
    deck.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animRef.current);
      root.removeEventListener("scroll", onScroll);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      root.removeEventListener("click", onClickCapture, true);
      deck.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isDesktop, cards.length, commitIndex, nearestIndex, paint, scrollToIndex]);

  if (isDesktop) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-5">
        {cards.map((card) => (
          <Link
            key={card.key}
            to={card.href}
            target={card.external ? "_blank" : undefined}
            rel={card.external ? "noopener noreferrer" : undefined}
            aria-label={card.external ? `${card.title} on Airbnb (opens in a new tab)` : undefined}
            className="stay-card block overflow-hidden rounded-2xl"
          >
            <StayCardFace card={card} />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={deckRef}
      className="stay-deck"
      role="region"
      aria-roledescription="carousel"
      aria-label="Private residences"
    >
      <div ref={scrollerRef} className="stay-deck-scroller">
        {cards.map((card, i) => (
          <Link
            key={card.key}
            to={card.href}
            target={card.external ? "_blank" : undefined}
            rel={card.external ? "noopener noreferrer" : undefined}
            data-stay-slide
            aria-roledescription="slide"
            aria-label={
              card.external
                ? `${card.title} on Airbnb, slide ${i + 1} of ${cards.length}, opens in a new tab`
                : `${card.title}, slide ${i + 1} of ${cards.length}`
            }
            className="stay-deck-card stay-card"
          >
            <StayCardFace card={card} deck />
          </Link>
        ))}
      </div>

      <div className="stay-deck-nav">
        <button
          type="button"
          className="stay-deck-arrow"
          aria-label="Previous residence"
          disabled={index === 0}
          onClick={() => scrollToIndex(index - 1, true)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <div className="stay-deck-marks" aria-hidden="true">
          {cards.map((card, i) => (
            <span key={card.key} className={i === index ? "is-active" : undefined} />
          ))}
        </div>
        <button
          type="button"
          className="stay-deck-arrow"
          aria-label="Next residence"
          disabled={index === cards.length - 1}
          onClick={() => scrollToIndex(index + 1, true)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
};

export default StayDeck;
