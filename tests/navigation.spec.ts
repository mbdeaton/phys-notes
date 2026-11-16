import { test, expect, type Page } from "@playwright/test";

async function expectPostRendered(page: Page): Promise<void> {
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText(/^\d{4}-\d{2}-\d{2}$/)).toBeVisible();

  const article = page.getByRole("article");
  await expect(article).toBeVisible();
  await expect(article).not.toBeEmpty();
}

test.describe("live navigation @live", () => {
  test("Home page renders the latest post", { tag: "@live" }, async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: "Notes to Young Physicists" }),
    ).toBeVisible();
    await expectPostRendered(page);
  });

  test("Gallery lists posts", { tag: "@live" }, async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.getByRole("link", { name: "Gallery" }).click();

    await expect(
      page.getByRole("heading", { name: "Gallery", level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /^Open post / }).first(),
    ).toBeVisible();
  });

  test("Reader can open a post from the gallery", { tag: "@live" }, async ({
    page,
  }) => {
    await page.goto("/gallery");
    await page.getByRole("link", { name: /^Open post / }).first().click();

    await expect(page).toHaveURL(/\/posts\/[^/]+$/);
    await expectPostRendered(page);
  });

  test("Reader can navigate back home", { tag: "@live" }, async ({
    page,
  }) => {
    await page.goto("/gallery");
    await page.getByRole("link", { name: /^Open post / }).first().click();
    await page
      .getByRole("link", { name: "Notes to Young Physicists" })
      .click();

    await expect(page).toHaveURL("/");
    await expectPostRendered(page);
  });
});
