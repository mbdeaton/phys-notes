import { test, expect } from "@playwright/test";
import { figurePost, plainTextPost } from "./fixtures/posts";
import { mockSanity } from "./helpers/mockSanity";

test.describe("post rendering", () => {
  test("Inline figures render between text blocks in order", async ({
    page,
  }) => {
    await mockSanity(page, [figurePost]);
    await page.goto(`/posts/${figurePost.slug.current}`);

    for (const paragraph of [
      "Fixture paragraph A",
      "Fixture paragraph B",
      "Fixture paragraph C",
    ]) {
      await expect(page.getByText(paragraph)).toBeVisible();
    }
    await expect(
      page.getByRole("img", { name: "Fixture figure one" }),
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "Fixture figure two" }),
    ).toBeVisible();
    await expect(page.getByText("Fixture figure one caption")).toBeVisible();

    const articleContent = await page.getByRole("article").evaluate((article) =>
      Array.from(article.children, (element) => ({
        text: element.textContent?.trim() ?? "",
        alt: element.querySelector("img")?.getAttribute("alt") ?? null,
      })),
    );
    expect(articleContent).toEqual([
      { text: "Fixture paragraph A", alt: null },
      { text: "Fixture figure one caption", alt: "Fixture figure one" },
      { text: "Fixture paragraph B", alt: null },
      { text: "", alt: "Fixture figure two" },
      { text: "Fixture paragraph C", alt: null },
    ]);
  });

  test("Publication date shows only the calendar date", async ({ page }) => {
    await mockSanity(page, [figurePost]);
    await page.goto(`/posts/${figurePost.slug.current}`);

    await expect(page.getByText("2025-03-05", { exact: true })).toBeVisible();
  });

  test("A post with no figures renders as plain text", async ({ page }) => {
    await mockSanity(page, [plainTextPost]);
    await page.goto(`/posts/${plainTextPost.slug.current}`);

    await expect(
      page.getByText("Fixture plain text paragraph one"),
    ).toBeVisible();
    await expect(
      page.getByText("Fixture plain text paragraph two"),
    ).toBeVisible();
    await expect(page.getByRole("article").getByRole("img")).toHaveCount(0);
  });
});
