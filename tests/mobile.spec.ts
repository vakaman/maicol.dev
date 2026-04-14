import { expect, test } from "@playwright/test";

test("home renders without horizontal overflow on mobile", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("button", { name: /open navigation menu/i })).toBeVisible();

  const widths = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(widths.scrollWidth).toBeLessThanOrEqual(widths.clientWidth + 1);
});

test("mobile navigation opens, scrolls to section, and closes", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /open navigation menu/i }).click();
  await expect(page.getByTestId("mobile-locale-pt-br")).toBeVisible();

  await page.getByRole("button", { name: "journey" }).click();

  await expect(page.getByTestId("mobile-locale-pt-br")).toHaveCount(0);
  await expect(page.locator("#journey")).toBeInViewport();
});
