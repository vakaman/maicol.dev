import { expect, test } from "@playwright/test";

test("floating loader stays hidden on the initial home boot", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByTestId("app-floating-loader")).toHaveCount(0);
});

test("clicking read more shows strategic feedback quickly and only for the opened journey", async ({ page }) => {
  test.setTimeout(45000);

  const markdownRequests: string[] = [];

  page.on("request", (request) => {
    if (request.url().includes(".md")) {
      markdownRequests.push(request.url());
    }
  });

  await page.route("**/src/pages/JourneyDetail.tsx*", async (route) => {
    await page.waitForTimeout(700);
    await route.continue();
  });

  await page.route("**/content/journey/masternet/detail/us-en.md*", async (route) => {
    await page.waitForTimeout(900);
    await route.continue();
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByTestId("app-floating-loader")).toHaveCount(0);
  expect(markdownRequests).toHaveLength(0);

  const masternetEntry = page.locator("#journey-entry-masternet");
  await masternetEntry.scrollIntoViewIfNeeded();

  const clickStartedAt = Date.now();
  await masternetEntry.locator('a[href="/journey/masternet"]').click();

  const loader = page.getByTestId("app-floating-loader");
  await expect(loader).toBeVisible();
  const loaderVisibleAfterMs = Date.now() - clickStartedAt;

  expect(loaderVisibleAfterMs).toBeGreaterThanOrEqual(100);
  expect(loaderVisibleAfterMs).toBeLessThan(450);

  await expect(page).toHaveURL(/\/journey\/masternet$/);
  await page.waitForResponse((response) => {
    const url = response.url();

    return response.ok() && url.includes("/content/journey/masternet/detail/us-en.md");
  });

  await expect(page.getByRole("heading", { level: 1, name: "Masternet Telecom" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Welcome to Masternet" })).toBeVisible();
  await expect(loader).toHaveCount(0);

  expect(markdownRequests.some((url) => url.includes("/content/journey/masternet/detail/us-en.md"))).toBe(true);
  expect(markdownRequests.filter((url) => url.includes("/content/journey/") && url.includes(".md"))).toHaveLength(1);
});

test("fast journey navigation does not flash the floating loader", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const masternetEntry = page.locator("#journey-entry-masternet");
  await masternetEntry.scrollIntoViewIfNeeded();
  await masternetEntry.locator('a[href="/journey/masternet"]').click();

  await expect(page).toHaveURL(/\/journey\/masternet$/);
  await expect(page.getByRole("heading", { level: 1, name: "Masternet Telecom" })).toBeVisible();
  await expect(page.getByTestId("app-floating-loader")).toHaveCount(0);
});

test("journey images open in fullscreen without repeated asset reloads", async ({ page }) => {
  const imageRequests: string[] = [];
  const imagePath = "/img/network-eng-1.jpg";

  page.on("request", (request) => {
    const url = request.url();

    if (url.includes("/img/") && /\.(png|jpe?g|webp|gif|svg)$/i.test(url)) {
      imageRequests.push(url);
    }
  });

  await page.goto("/journey/masternet");
  await expect(page.getByRole("heading", { level: 1, name: "Masternet Telecom" })).toBeVisible();

  const inlineImage = page.locator(`img[src="${imagePath}"]`).first();
  await inlineImage.scrollIntoViewIfNeeded();
  await expect(inlineImage).toBeVisible();

  await inlineImage.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(`img[src="${imagePath}"]`)).toBeVisible();

  await dialog.click({ position: { x: 8, y: 8 } });
  await expect(dialog).toHaveCount(0);

  await inlineImage.click();
  await expect(dialog).toBeVisible();

  await page.getByRole("button", { name: "Close" }).click();
  await expect(dialog).toHaveCount(0);

  const masternetImageRequests = imageRequests.filter((url) => url.includes("network-eng-1.jpg"));
  expect(masternetImageRequests.length).toBeLessThanOrEqual(2);
});
