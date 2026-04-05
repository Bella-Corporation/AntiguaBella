import fs from "node:fs/promises";
import path from "node:path";
import { chromium, devices } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
const OUTPUT_DIR = path.resolve(
  "verification-artifacts",
  "wp-07-request-payload-rendered-verification"
);

const scenarios = [
  {
    id: "stay",
    name: "Stay request",
    detailPath: "/stays/AntiguaBella",
    ctaText: "Request This Stay",
  },
  {
    id: "experience",
    name: "Experience request",
    detailPath: "/experiences/culinary_journeys",
    ctaText: "Request This Experience",
  },
  {
    id: "charter-fixed-duration",
    name: "Charter request (duration fixed by selected item)",
    detailPath: "/charters/coastline_private_day",
    ctaText: "Request This Charter",
  },
];

const viewports = [
  { id: "desktop-1440x900", viewport: { width: 1440, height: 900 } },
  {
    id: "mobile-390x844",
    viewport: { width: 390, height: 844 },
    device: devices["iPhone 12"],
  },
];

const plusDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const assertCheck = (checks, label, value, details = "") => {
  checks.push({ label, pass: Boolean(value), details });
};

const isVisibleText = async (page, text) => {
  return page.getByText(text, { exact: true }).first().isVisible();
};

const getLabelY = async (page, label) => {
  const target = page.locator("p").filter({ hasText: label }).first();
  if (!(await target.isVisible())) return null;
  const box = await target.boundingBox();
  return box?.y ?? null;
};

const fillCoreContact = async (page) => {
  await page.getByPlaceholder("Your name").fill("Alex Rivera");
  await page.getByPlaceholder("you@example.com").fill("alex@example.com");
};

const fillScenarioRequiredDetails = async (page, scenarioId, includeDuration) => {
  if (scenarioId === "stay") {
    const checkIn = plusDays(3);
    const checkOut = plusDays(5);
    await page
      .locator('p:has-text("Check-in") + input[type="date"]')
      .first()
      .fill(checkIn);
    await page
      .locator('p:has-text("Check-out") + input[type="date"]')
      .first()
      .fill(checkOut);
    return;
  }

  await page
    .locator('p:has-text("Preferred Date") + input[type="date"]')
    .first()
    .fill(plusDays(4));

  if (scenarioId.startsWith("charter") && includeDuration) {
    await page.getByPlaceholder("e.g. 4 hours").fill("4 hours");
  }
};

const verifyScenario = async (page, scenario, viewportId) => {
  const checks = [];
  const result = {
    scenario: scenario.name,
    scenarioId: scenario.id,
    viewport: viewportId,
    sourcePath: `${scenario.detailPath} -> /request`,
    status: "PASS",
    screenshot: "",
    checks,
  };

  await page.goto(`${BASE_URL}${scenario.detailPath}`, { waitUntil: "networkidle" });
  const cta = page.getByRole("link", { name: scenario.ctaText });
  await cta.scrollIntoViewIfNeeded();
  await cta.click();
  await page.waitForURL(/\/request\?/);

  const formCard = page.locator("main .max-w-3xl").first();
  await formCard.waitFor({ state: "visible" });

  const formText = await formCard.innerText();
  const pageText = await page.locator("body").innerText();
  const labelOrder = await formCard.evaluate((element) =>
    Array.from(element.querySelectorAll("p"))
      .map((node) => (node.textContent ?? "").trim())
      .filter(Boolean)
  );
  const idxFullName = labelOrder.findIndex((label) => label === "Full Name");
  const idxEmail = labelOrder.findIndex((label) => label === "Email");
  const idxPhone = labelOrder.findIndex((label) => label === "Phone or WhatsApp");
  const fullNameY = await getLabelY(page, "Full Name");
  const notesY = await getLabelY(page, "Notes");
  const guestsY = await getLabelY(page, "Guests");
  const groupSizeY = await getLabelY(page, "Group Size");
  const preferredDateY = await getLabelY(page, "Preferred Date");
  const selectedSummaryVisible = await page
    .locator("p")
    .filter({ hasText: /^Selection:/ })
    .first()
    .isVisible();
  assertCheck(checks, "Selected-item summary visible", selectedSummaryVisible);
  const requestUrl = new URL(page.url());
  const requestedName = decodeURIComponent(requestUrl.searchParams.get("name") ?? "");
  assertCheck(
    checks,
    "Selected-item summary identifies requested item",
    requestedName.length > 0 && pageText.includes(requestedName)
  );
  assertCheck(
    checks,
    "Contact fields ordered Full Name > Email > Phone or WhatsApp",
    idxFullName >= 0 && idxEmail > idxFullName && idxPhone > idxEmail
  );
  assertCheck(
    checks,
    "Phone or WhatsApp optional helper present",
    formText.includes("Optional. Include if you’d like follow-up there.")
  );
  assertCheck(
    checks,
    "Notes present and last field block",
    notesY != null &&
      notesY >
        Math.max(
          fullNameY ?? 0,
          guestsY ?? 0,
          groupSizeY ?? 0,
          preferredDateY ?? 0
        )
  );
  assertCheck(
    checks,
    "No duplicate editable item/category fields",
    !formText.includes("Item Title") && !formText.includes("Category")
  );
  assertCheck(
    checks,
    "Trust layer remains visible",
    await page
      .locator("p")
      .filter({ hasText: "Submitting this form does not place a booking" })
      .first()
      .isVisible()
  );

  const submit = page.getByRole("button", { name: "Send Request" });
  assertCheck(checks, "Required fields block submit when empty", await submit.isDisabled());

  await page.getByPlaceholder("Your name").fill("Alex Rivera");
  await page.getByPlaceholder("you@example.com").fill("invalid-email");
  await fillScenarioRequiredDetails(page, scenario.id, false);
  assertCheck(checks, "Invalid email blocks submit", await submit.isDisabled());

  if (scenario.id === "stay") {
    const checkIn = plusDays(6);
    await page
      .locator('p:has-text("Check-in") + input[type="date"]')
      .first()
      .fill(checkIn);
    await page
      .locator('p:has-text("Check-out") + input[type="date"]')
      .first()
      .fill(checkIn);
    await page.getByPlaceholder("you@example.com").fill("alex@example.com");
    assertCheck(checks, "Check-out must be after Check-in", await submit.isDisabled());
    await page
      .locator('p:has-text("Check-out") + input[type="date"]')
      .first()
      .fill(plusDays(7));
  } else {
    await page.getByPlaceholder("you@example.com").fill("alex@example.com");
  }

  if (scenario.id === "stay") {
    assertCheck(checks, "Stay shows Check-in", await isVisibleText(page, "Check-in"));
    assertCheck(checks, "Stay shows Check-out", await isVisibleText(page, "Check-out"));
    assertCheck(checks, "Stay shows Guests", await isVisibleText(page, "Guests"));
    assertCheck(checks, "Stay hides Preferred Time", !(await isVisibleText(page, "Preferred Time")));
    assertCheck(checks, "Stay hides Preferred Departure Time", !(await isVisibleText(page, "Preferred Departure Time")));
    assertCheck(checks, "Stay hides Duration", !(await isVisibleText(page, "Duration")));
  }

  if (scenario.id === "experience") {
    assertCheck(checks, "Experience shows Preferred Date", await isVisibleText(page, "Preferred Date"));
    assertCheck(checks, "Experience shows Preferred Time", await isVisibleText(page, "Preferred Time"));
    assertCheck(checks, "Experience shows Group Size", await isVisibleText(page, "Group Size"));
    assertCheck(checks, "Experience hides Check-in", !(await isVisibleText(page, "Check-in")));
    assertCheck(checks, "Experience hides Check-out", !(await isVisibleText(page, "Check-out")));
    assertCheck(checks, "Experience hides Guests", !(await isVisibleText(page, "Guests")));
    assertCheck(checks, "Experience hides Preferred Departure Time", !(await isVisibleText(page, "Preferred Departure Time")));
    assertCheck(checks, "Experience hides Duration", !(await isVisibleText(page, "Duration")));
  }

  if (scenario.id === "charter-fixed-duration") {
    const durationVisible = await isVisibleText(page, "Duration");
    assertCheck(checks, "Charter shows Preferred Date", await isVisibleText(page, "Preferred Date"));
    assertCheck(checks, "Charter shows Preferred Departure Time", await isVisibleText(page, "Preferred Departure Time"));
    assertCheck(checks, "Charter shows Group Size", await isVisibleText(page, "Group Size"));
    assertCheck(checks, "Charter duration hidden when item defines duration", !durationVisible);
  }

  await fillCoreContact(page);
  const minusButton = page.locator("button:has(svg.lucide-minus)").first();
  await minusButton.click();
  await minusButton.click();
  const groupText = await page.locator("span.text-lg.font-sans").first().innerText();
  assertCheck(checks, "Guests/group size remains positive integer", groupText.trim().startsWith("1 "));

  const durationFieldVisible = await isVisibleText(page, "Duration");
  if (scenario.id === "charter-fixed-duration" && durationFieldVisible) {
    await page.getByPlaceholder("e.g. 4 hours").fill("");
    assertCheck(checks, "Duration required branch active only when rendered", await submit.isDisabled());
    await page.getByPlaceholder("e.g. 4 hours").fill("4 hours");
  }

  assertCheck(
    checks,
    "Optional fields do not block submit when empty",
    !(await submit.isDisabled())
  );

  const fileName = `${scenario.id}-${viewportId}.png`;
  const screenshotPath = path.join(OUTPUT_DIR, fileName);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  result.screenshot = screenshotPath;

  if (checks.some((check) => !check.pass)) {
    result.status = "FAIL";
  }

  return result;
};

const run = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const allResults = [];

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

      for (const scenario of scenarios) {
        const result = await verifyScenario(page, scenario, viewportConfig.id);
        allResults.push(result);
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }

  const charterDurationRendered = allResults
    .filter((result) => result.scenarioId.startsWith("charter"))
    .some((result) =>
      result.checks.some(
        (check) =>
          check.label === "Charter duration hidden when item defines duration" &&
          !check.pass
      )
    );

  const summary = {
    baseUrl: BASE_URL,
    generatedAt: new Date().toISOString(),
    scenarioCount: allResults.length,
    results: allResults,
    charterDataAvailability: charterDurationRendered
      ? "Rendered charter item required duration input; fixed-duration branch not confirmed."
      : "Only fixed-duration charter branch is present in current public data; duration-required branch is not renderable with existing public charter items.",
    overallStatus: allResults.every((result) => result.status === "PASS")
      ? "PASS"
      : "FAIL",
  };

  const reportPath = path.join(OUTPUT_DIR, "report.json");
  await fs.writeFile(reportPath, JSON.stringify(summary, null, 2), "utf8");
  console.log(`WP-07 verification report: ${reportPath}`);
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

