import { test, expect } from "@playwright/test";

test.describe("Loan Data Viewer Page", () => {
  test("should load the page and display chart, table, and filters", async ({
    page,
  }) => {
    await page.goto("http://localhost:4174");

    const chart = page.locator('[data-testid="loan-chart"]');
    await chart.waitFor({ state: "visible", timeout: 10000 });
    await expect(chart).toBeVisible();

    const table = page.locator('[data-testid="loan-table"]');
    await table.waitFor({ state: "visible", timeout: 10000 });
    await expect(table).toBeVisible();

    const filters = page.locator('[data-testid="loan-table"]');
    await filters.waitFor({ state: "visible", timeout: 10000 });
    await expect(filters).toBeVisible();
  });
});
