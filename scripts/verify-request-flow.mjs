import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright";

const baseURL = process.env.REQUEST_FLOW_BASE_URL ?? "http://127.0.0.1:4173";
const outputDir = path.resolve(
  "verification-artifacts",
  "wp-02-request-flow"
);

const desktopViewport = { width: 1440, height: 900 };
const mobileViewport = {
  width: 390,
  height: 844,
  isMobile: true,
  hasTouch: true,
};

const evidence = [];
const failures = [];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function containsNormalizedParams(url, expectedType, expectedItem) {
  const parsed = new URL(url);
  const params = parsed.searchParams;

  assert(parsed.pathname === "/request", `Expected /request but got ${parsed.pathname}`);
  assert(params.get("type") === expectedType, `Expected type=${expectedType} but got ${params.get("type")}`);
  assert(params.get("item") === expectedItem, `Expected item=${expectedItem} but got ${params.get("item")}`);
  assert(Boolean(params.get("name")), "Expected name param to be present");
  assert(!params.has("villaId"), "Legacy villaId param should not be present");
  assert(!params.has("experienceId"), "Legacy experienceId param should not be present");
  assert(!params.has("charterId"), "Legacy charterId param should not be present");
}

async function screenshot(page, name) {
  const filePath = path.join(outputDir, `${name}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  return filePath;
}

async function record(name, fn) {
  try {
    const result = await fn();
    evidence.push({ name, status: "PASS", ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    evidence.push({ name, status: "FAIL", error: message });
    failures.push(`${name}: ${message}`);
  }
}

async function ensureRequestPageTruth(page) {
  await page.getByText("Share Your Request", { exact: true }).waitFor();
  await page
    .getByText(
      "This form starts a request with the AntiguaBella concierge. We review each inquiry personally and follow up manually with fit, timing, and next steps.",
      { exact: true }
    )
    .waitFor();
  await page
    .getByText(
      "Submitting this form does not place a booking, hold inventory, or collect payment.",
      { exact: true }
    )
    .waitFor();
}

async function ensureConfirmationTruth(page) {
  await page.getByText("Request Received", { exact: true }).waitFor();
  await page
    .getByText(
      "This confirms that your request was sent. It is not a reservation or payment confirmation.",
      { exact: true }
    )
    .waitFor();
}

async function openAndVerifyRequest(page, expectedType, expectedItem) {
  await page.waitForURL(/\/request(\?|$)/);
  containsNormalizedParams(page.url(), expectedType, expectedItem);
  await ensureRequestPageTruth(page);
}

async function submitRequest(page, type) {
  if (type === "villa") {
    await page.locator('input[type="date"]').nth(0).fill("2026-05-10");
    await page.locator('input[type="date"]').nth(1).fill("2026-05-14");
  } else {
    await page.locator('input[type="date"]').first().fill("2026-05-12");
  }

  const sendButton = page.getByRole("button", { name: "Send Request" });
  await sendButton.scrollIntoViewIfNeeded();
  await sendButton.click();
  await ensureConfirmationTruth(page);
}

async function verifyListToRequest(page, route, ctaLabel, expectedType, expectedItem, screenshotName) {
  await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
  const cta = page.getByRole("link", { name: ctaLabel }).first();
  await cta.scrollIntoViewIfNeeded();
  await cta.click();
  await openAndVerifyRequest(page, expectedType, expectedItem);
  const image = await screenshot(page, screenshotName);
  return { route, finalUrl: page.url(), screenshot: image };
}

async function verifyDetailToRequest(page, route, ctaLabel, expectedType, expectedItem, screenshotName) {
  await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
  const cta = page.getByRole("link", { name: ctaLabel });
  await cta.scrollIntoViewIfNeeded();
  await cta.click();
  await openAndVerifyRequest(page, expectedType, expectedItem);
  const image = await screenshot(page, screenshotName);
  return { route, finalUrl: page.url(), screenshot: image };
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  try {
    const desktop = await browser.newContext({ viewport: desktopViewport });
    const mobile = await browser.newContext({ ...mobileViewport });

    desktop.setDefaultTimeout(20000);
    mobile.setDefaultTimeout(20000);

    const desktopPage = await desktop.newPage();
    const mobilePage = await mobile.newPage();

    await record("desktop stays listing -> request", async () =>
      verifyListToRequest(
        desktopPage,
        "/stays",
        "Request This Stay",
        "villa",
        "AntiguaBella",
        "desktop-stays-list-request"
      )
    );

    await record("desktop stays detail -> request + confirmation", async () => {
      await desktopPage.goto(`${baseURL}/stays/AntiguaBella`, {
        waitUntil: "networkidle",
      });
      const cta = desktopPage.getByRole("link", { name: "Request This Stay" });
      await cta.scrollIntoViewIfNeeded();
      await cta.click();
      await openAndVerifyRequest(desktopPage, "villa", "AntiguaBella");
      const preSubmit = await screenshot(
        desktopPage,
        "desktop-stays-detail-request"
      );
      await submitRequest(desktopPage, "villa");
      const confirmation = await screenshot(
        desktopPage,
        "desktop-stays-confirmation"
      );
      return {
        route: "/stays/AntiguaBella",
        finalUrl: desktopPage.url(),
        screenshot: preSubmit,
        confirmationScreenshot: confirmation,
      };
    });

    await record("desktop experiences listing -> request", async () =>
      verifyListToRequest(
        desktopPage,
        "/experiences",
        "Request This Experience",
        "experience",
        "culinary_journeys",
        "desktop-experiences-list-request"
      )
    );

    await record("desktop experiences detail -> request + confirmation", async () => {
      await desktopPage.goto(`${baseURL}/experiences/culinary_journeys`, {
        waitUntil: "networkidle",
      });
      const cta = desktopPage.getByRole("link", {
        name: "Request This Experience",
      });
      await cta.scrollIntoViewIfNeeded();
      await cta.click();
      await openAndVerifyRequest(desktopPage, "experience", "culinary_journeys");
      const preSubmit = await screenshot(
        desktopPage,
        "desktop-experiences-detail-request"
      );
      await submitRequest(desktopPage, "experience");
      const confirmation = await screenshot(
        desktopPage,
        "desktop-experiences-confirmation"
      );
      return {
        route: "/experiences/culinary_journeys",
        finalUrl: desktopPage.url(),
        screenshot: preSubmit,
        confirmationScreenshot: confirmation,
      };
    });

    await record("desktop charters listing -> request", async () =>
      verifyListToRequest(
        desktopPage,
        "/charters",
        "Request This Charter",
        "charter",
        "coastline_private_day",
        "desktop-charters-list-request"
      )
    );

    await record("desktop charters detail -> request + confirmation", async () => {
      await desktopPage.goto(`${baseURL}/charters/coastline_private_day`, {
        waitUntil: "networkidle",
      });
      const cta = desktopPage.getByRole("link", {
        name: "Request This Charter",
      });
      await cta.scrollIntoViewIfNeeded();
      await cta.click();
      await openAndVerifyRequest(desktopPage, "charter", "coastline_private_day");
      const preSubmit = await screenshot(
        desktopPage,
        "desktop-charters-detail-request"
      );
      await submitRequest(desktopPage, "charter");
      const confirmation = await screenshot(
        desktopPage,
        "desktop-charters-confirmation"
      );
      return {
        route: "/charters/coastline_private_day",
        finalUrl: desktopPage.url(),
        screenshot: preSubmit,
        confirmationScreenshot: confirmation,
      };
    });

    await record("desktop /book compatibility redirect", async () => {
      await desktopPage.goto(
        `${baseURL}/book?charterId=coastline_private_day`,
        { waitUntil: "networkidle" }
      );
      await openAndVerifyRequest(desktopPage, "charter", "coastline_private_day");
      const image = await screenshot(desktopPage, "desktop-book-redirect");
      return {
        route: "/book?charterId=coastline_private_day",
        finalUrl: desktopPage.url(),
        screenshot: image,
      };
    });

    await record("mobile stays detail -> request", async () =>
      verifyDetailToRequest(
        mobilePage,
        "/stays/AntiguaBella",
        "Request This Stay",
        "villa",
        "AntiguaBella",
        "mobile-stays-detail-request"
      )
    );

    await record("mobile experiences detail -> request", async () =>
      verifyDetailToRequest(
        mobilePage,
        "/experiences/culinary_journeys",
        "Request This Experience",
        "experience",
        "culinary_journeys",
        "mobile-experiences-detail-request"
      )
    );

    await record("mobile charters detail -> request", async () =>
      verifyDetailToRequest(
        mobilePage,
        "/charters/coastline_private_day",
        "Request This Charter",
        "charter",
        "coastline_private_day",
        "mobile-charters-detail-request"
      )
    );

    await desktop.close();
    await mobile.close();
  } finally {
    await browser.close();
  }

  const reportPath = path.join(outputDir, "report.json");
  await writeFile(reportPath, JSON.stringify(evidence, null, 2));

  if (failures.length > 0) {
    console.error("Request-flow verification failed.");
    console.error(JSON.stringify(evidence, null, 2));
    process.exitCode = 1;
    return;
  }

  console.log("Request-flow verification passed.");
  console.log(`Evidence directory: ${outputDir}`);
  console.log(JSON.stringify(evidence, null, 2));
}

await main();
