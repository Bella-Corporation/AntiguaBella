import fs from "node:fs/promises";
import path from "node:path";
import { chromium, devices } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
const OUTPUT_DIR = path.resolve(
  "verification-artifacts",
  "wp-12-public-surface-rendered-verification"
);

const viewports = [
  { id: "desktop-1440x900", viewport: { width: 1440, height: 900 } },
  {
    id: "mobile-390x844",
    viewport: { width: 390, height: 844 },
    device: devices["iPhone 12"],
  },
];

const routes = [
  {
    id: "homepage",
    name: "Homepage",
    path: "/",
    checks: async (page, routeChecks, viewportId) => {
      await assertTextVisible(page, routeChecks, "Stays");
      await assertTextVisible(page, routeChecks, "Experiences");
      await assertTextVisible(page, routeChecks, "Charters");
      await assertTextVisible(page, routeChecks, "Explore Stays");
      await assertTextVisible(page, routeChecks, "Explore Experiences");
      await assertTextVisible(page, routeChecks, "Explore Charters");
      await assertTextVisible(page, routeChecks, "Explore Concierge");
      await assertTextVisible(page, routeChecks, "Request with Concierge");

      if (viewportId === "desktop-1440x900") {
        await assertFits(
          page.getByRole("link", { name: "Start Inquiry" }).first(),
          routeChecks,
          "Desktop header Start Inquiry fits cleanly",
          36
        );
      }
    },
  },
  {
    id: "stays-index",
    name: "Stays index",
    path: "/stays",
    checks: async (page, routeChecks) => {
      await assertTextVisible(page, routeChecks, "Accommodations");
      await assertTextVisible(page, routeChecks, "Your Private");
      await assertTextVisible(page, routeChecks, "Request This Stay");
      await assertTextVisible(page, routeChecks, "Request with Concierge");
      await assertTextVisible(page, routeChecks, "Up to 8 guests");
      await assertTextVisible(page, routeChecks, "4 Bedrooms");
      await assertFits(
        page.getByRole("link", { name: "Request This Stay" }).first(),
        routeChecks,
        "Stay card CTA fits cleanly",
        56
      );
    },
  },
  {
    id: "experiences-index",
    name: "Experiences index",
    path: "/experiences",
    checks: async (page, routeChecks) => {
      await assertTextVisible(page, routeChecks, "Experiences");
      await assertTextVisible(page, routeChecks, "Beyond the");
      await assertTextVisible(page, routeChecks, "View Details");
      await assertTextVisible(page, routeChecks, "Request This Experience");
      await assertTextVisible(page, routeChecks, "St. John's, Antigua");
      await assertTextVisible(page, routeChecks, "Up to 6 guests");
      await assertFits(
        page.getByRole("link", { name: "Request This Experience" }).first(),
        routeChecks,
        "Experience card CTA fits cleanly",
        56
      );
    },
  },
  {
    id: "charters-index",
    name: "Charters index",
    path: "/charters",
    checks: async (page, routeChecks) => {
      await assertTextVisible(page, routeChecks, "Charters");
      await assertTextVisible(page, routeChecks, "Private on the");
      await assertTextVisible(page, routeChecks, "Request This Charter");
      await assertTextVisible(page, routeChecks, "North Sound, Antigua");
      await assertTextVisible(page, routeChecks, "Up to 8 guests");
      await assertTextVisible(page, routeChecks, "From $2,800 / charter");
      await assertFits(
        page.getByRole("link", { name: "Request This Charter" }).first(),
        routeChecks,
        "Charter card CTA fits cleanly",
        56
      );
    },
  },
  {
    id: "stay-detail",
    name: "Stay detail",
    path: "/stays/AntiguaBella",
    checks: async (page, routeChecks) => {
      await assertTextVisible(page, routeChecks, "Villa");
      await assertTextVisible(page, routeChecks, "Nightly");
      await assertTextVisible(page, routeChecks, "Stay Overview");
      await assertTextVisible(page, routeChecks, "Amenities");
      await assertTextVisible(page, routeChecks, "Request This Stay");
      await assertTextVisible(page, routeChecks, "Inquiry only. Availability is confirmed after review.");
      await assertFits(
        page.getByRole("link", { name: "Request This Stay" }).first(),
        routeChecks,
        "Stay detail primary CTA fits cleanly",
        56
      );
    },
  },
  {
    id: "experience-detail",
    name: "Experience detail",
    path: "/experiences/culinary_journeys",
    checks: async (page, routeChecks) => {
      await assertTextVisible(page, routeChecks, "Experience");
      await assertTextVisible(page, routeChecks, "Experience Type");
      await assertTextVisible(page, routeChecks, "Experience Overview");
      await assertTextVisible(page, routeChecks, "What you can expect");
      await assertTextVisible(page, routeChecks, "Request This Experience");
      await assertTextVisible(page, routeChecks, "Inquiry only. Availability and pricing are confirmed after review where relevant.");
      await assertFits(
        page.getByText("Experience Type").first(),
        routeChecks,
        "Experience fact label fits cleanly",
        24
      );
    },
  },
  {
    id: "charter-detail",
    name: "Charter detail",
    path: "/charters/coastline_private_day",
    checks: async (page, routeChecks) => {
      await assertTextVisible(page, routeChecks, "Charter");
      await assertTextVisible(page, routeChecks, "Starting");
      await assertTextVisible(page, routeChecks, "Charter Overview");
      await assertTextVisible(page, routeChecks, "What you can expect");
      await assertTextVisible(page, routeChecks, "Request This Charter");
      await assertTextVisible(page, routeChecks, "Inquiry only. Availability and pricing are confirmed after review where relevant.");
      await assertFits(
        page.getByRole("link", { name: "Request This Charter" }).first(),
        routeChecks,
        "Charter detail primary CTA fits cleanly",
        56
      );
    },
  },
  {
    id: "concierge",
    name: "Concierge",
    path: "/concierge",
    checks: async (page, routeChecks) => {
      await assertTextVisible(page, routeChecks, "Custom Planning,");
      await assertTextVisible(page, routeChecks, "Support Beyond");
      await assertTextVisible(page, routeChecks, "Planning Paths");
      await assertTextVisible(page, routeChecks, "Request with Concierge");
      await assertTextVisible(page, routeChecks, "Explore Charters");
      await assertFits(
        page.getByRole("link", { name: "Request with Concierge" }).first(),
        routeChecks,
        "Concierge CTA fits cleanly",
        56
      );
    },
  },
  {
    id: "sitemap-global-labels",
    name: "Sitemap / global labels",
    path: "/sitemap",
    checks: async (page, routeChecks) => {
      await assertTextVisible(page, routeChecks, "Start Inquiry");
      await assertTextVisible(page, routeChecks, "Contact Support");
      await assertTextVisible(page, routeChecks, "Privacy Policy");
      await assertTextVisible(page, routeChecks, "Terms of Service");
      await assertFits(
        page.getByRole("link", { name: "Start Inquiry" }).first(),
        routeChecks,
        "Global Start Inquiry label fits cleanly",
        24
      );
      await assertFits(
        page.getByRole("link", { name: "Privacy Policy" }).first(),
        routeChecks,
        "Privacy Policy label fits cleanly",
        32
      );
      await assertFits(
        page.getByRole("link", { name: "Terms of Service" }).first(),
        routeChecks,
        "Terms of Service label fits cleanly",
        32
      );
    },
  },
];

const pushCheck = (checks, label, pass, details = "") => {
  checks.push({ label, pass: Boolean(pass), details });
};

const assertTextVisible = async (page, checks, text) => {
  const visible = await page.getByText(text, { exact: false }).first().isVisible();
  pushCheck(checks, `Visible: ${text}`, visible);
};

const assertFits = async (locator, checks, label, maxHeight) => {
  const visible = await locator.isVisible();
  if (!visible) {
    pushCheck(checks, label, false, "Element not visible");
    return;
  }

  const box = await locator.boundingBox();
  pushCheck(
    checks,
    label,
    Boolean(box) && box.height <= maxHeight,
    box ? `height=${box.height.toFixed(1)}` : "No bounding box"
  );
};

const assertNoHorizontalOverflow = async (page, checks) => {
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth + 1;
  });

  pushCheck(checks, "No horizontal overflow", !hasOverflow);
};

const assertPathMatches = async (page, route, checks) => {
  const current = new URL(page.url()).pathname;
  pushCheck(checks, "No broken navigation on tested path", current === route.path, current);
};

const assertNoBookingLanguage = async (page, checks) => {
  const bodyText = await page.locator("body").innerText();
  const bookingLike =
    bodyText.includes("Book Now") ||
    bodyText.includes("Checkout") ||
    bodyText.includes("Pay Now") ||
    bodyText.includes("Payment Confirmed");

  pushCheck(checks, "No accidental booking-like interpretation introduced", !bookingLike);
};

const autoScrollPage = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const distance = Math.max(300, Math.floor(window.innerHeight * 0.8));
      const timer = window.setInterval(() => {
        window.scrollBy(0, distance);
        total += distance;

        if (total >= document.body.scrollHeight) {
          window.clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });

  await page.waitForTimeout(250);
};

const verifyRoute = async (page, route, viewportId) => {
  const checks = [];
  await page.goto(`${BASE_URL}${route.path}`, { waitUntil: "networkidle" });

  await assertPathMatches(page, route, checks);
  await assertNoHorizontalOverflow(page, checks);
  await assertNoBookingLanguage(page, checks);
  await autoScrollPage(page);

  await route.checks(page, checks, viewportId);

  const screenshotPath = path.join(
    OUTPUT_DIR,
    `${route.id}-${viewportId}.png`
  );
  await page.screenshot({ path: screenshotPath, fullPage: true });

  return {
    route: route.name,
    routeId: route.id,
    path: route.path,
    viewport: viewportId,
    status: checks.every((check) => check.pass) ? "PASS" : "FAIL",
    screenshot: screenshotPath,
    checks,
  };
};

const run = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];

  try {
    for (const viewportConfig of viewports) {
      const context = await browser.newContext(
        viewportConfig.device
          ? { ...viewportConfig.device, viewport: viewportConfig.viewport }
          : { viewport: viewportConfig.viewport }
      );

      await context.addInitScript(() => {
        window.localStorage.setItem("antiguabella.language", "en");
      });

      const page = await context.newPage();

      for (const route of routes) {
        const result = await verifyRoute(page, route, viewportConfig.id);
        results.push(result);
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }

  const report = {
    baseUrl: BASE_URL,
    generatedAt: new Date().toISOString(),
    totalChecks: results.length,
    overallStatus: results.every((result) => result.status === "PASS")
      ? "PASS"
      : "FAIL",
    results,
  };

  const reportPath = path.join(OUTPUT_DIR, "report.json");
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), "utf8");
  console.log(`WP-12 verification report: ${reportPath}`);
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

