import { expect, test } from "@playwright/test";

test("fast boot keeps the matrix loader hidden", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const loaderState = await page.evaluate(() => {
    const loader = document.getElementById("boot-loader");
    const state = (window as Window & {
      __bootLoaderState?: {
        shown?: boolean;
        appReady?: boolean;
        stylesReady?: boolean;
        fullyReady?: boolean;
        timer?: number | null;
      };
    }).__bootLoaderState;

    return {
      hidden: loader?.hasAttribute("hidden") ?? false,
      visibleState: loader?.getAttribute("data-state"),
      shown: state?.shown ?? false,
      appReady: state?.appReady ?? false,
      stylesReady: state?.stylesReady ?? false,
      fullyReady: state?.fullyReady ?? false,
      timerActive: state?.timer != null,
    };
  });

  expect(loaderState.hidden).toBe(true);
  expect(loaderState.visibleState).toBeNull();
  expect(loaderState.shown).toBe(false);
  expect(loaderState.appReady).toBe(true);
  expect(loaderState.stylesReady).toBe(true);
  expect(loaderState.fullyReady).toBe(true);
  expect(loaderState.timerActive).toBe(false);
});

test("slow network keeps the matrix boot loader visible until the app is ready", async ({ page }, testInfo) => {
  test.setTimeout(45000);

  await page.route("**/src/main.tsx", async (route) => {
    await page.waitForTimeout(4000);
    await route.continue();
  });

  await page.route("**/src/index.css", async (route) => {
    await page.waitForTimeout(2500);
    await route.continue();
  });

  const client = await page.context().newCDPSession(page);
  await client.send("Network.enable");
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 250,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
    connectionType: "cellular3g",
  });

  await page.goto("/", { waitUntil: "commit" });
  await page.screenshot({ path: testInfo.outputPath("slow3g-commit.png"), fullPage: false });

  const commitState = await page.evaluate(() => {
    const boot = document.getElementById("boot-loader");
    const root = document.getElementById("root");

    return {
      bootHidden: boot?.hasAttribute("hidden") ?? null,
      bootState: boot?.getAttribute("data-state") ?? null,
      rootLocked: root?.getAttribute("data-boot-locked") ?? null,
      rootVisibility: root ? getComputedStyle(root).visibility : null,
    };
  });

  expect(commitState.rootLocked).toBe("true");
  expect(commitState.rootVisibility).toBe("hidden");
  expect(
    (commitState.bootHidden === true && commitState.bootState === null)
      || commitState.bootState === "visible",
  ).toBe(true);

  await page.waitForTimeout(120);
  await page.screenshot({ path: testInfo.outputPath("slow3g-120ms.png"), fullPage: false });

  const earlyState = await page.evaluate(() => {
    const boot = document.getElementById("boot-loader");
    const root = document.getElementById("root");

    return {
      bootHidden: boot?.hasAttribute("hidden") ?? null,
      bootState: boot?.getAttribute("data-state") ?? null,
      rootVisibility: root ? getComputedStyle(root).visibility : null,
    };
  });

  expect(earlyState.rootVisibility).toBe("hidden");
  expect(
    earlyState.bootHidden === true || earlyState.bootState === "visible",
  ).toBe(true);

  await page.waitForTimeout(200);
  await page.screenshot({ path: testInfo.outputPath("slow3g-320ms.png"), fullPage: false });

  const bootLoader = page.getByTestId("boot-loader");
  await expect(bootLoader).toBeVisible();
  await expect(bootLoader).toContainText("> maicol.dev");

  const bootLoaderBackground = await bootLoader.evaluate(
    (element) => getComputedStyle(element).backgroundImage,
  );
  expect(bootLoaderBackground).toContain("gradient");

  await page.waitForFunction(() => document.documentElement.dataset.appReady === "true");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(bootLoader).toHaveAttribute("hidden", "");
});
