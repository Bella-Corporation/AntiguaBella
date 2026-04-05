import { useEffect } from "react";

const DEFAULT_TITLE = "AntiguaBella — The Caribbean, Curated";
const DEFAULT_DESCRIPTION =
  "Discover Antigua's finest private villas, curated island experiences, and private charter services. Enquiry-led — every arrangement fulfilled personally.";

const SITE_URL: string | undefined =
  typeof import.meta !== "undefined" && (import.meta as { env?: Record<string, string> }).env?.VITE_SITE_URL;

interface PageMetaOptions {
  title: string;
  description: string;
  canonicalPath?: string;
}

/**
 * Sets document.title and meta[name="description"] for the active route.
 * Canonical link is written only when VITE_SITE_URL is configured.
 * All values reset to site defaults on unmount (route change).
 */
export function usePageMeta({ title, description, canonicalPath }: PageMetaOptions): void {
  useEffect(() => {
    document.title = title;

    const descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", description);

    let addedCanonical = false;
    if (canonicalPath !== undefined && SITE_URL) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
        addedCanonical = true;
      }
      link.href = `${SITE_URL}${canonicalPath}`;
    }

    return () => {
      document.title = DEFAULT_TITLE;
      if (descEl) descEl.setAttribute("content", DEFAULT_DESCRIPTION);
      if (addedCanonical) {
        document.querySelector('link[rel="canonical"]')?.remove();
      }
    };
  }, [title, description, canonicalPath]);
}
