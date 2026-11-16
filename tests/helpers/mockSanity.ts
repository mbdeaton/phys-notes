import { Buffer } from "node:buffer";
import type { Page } from "@playwright/test";
import type { PostFixture } from "../fixtures/posts";

const onePixelPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/r9sAAAAASUVORK5CYII=",
  "base64",
);

export async function mockSanity(
  page: Page,
  posts: PostFixture[],
): Promise<void> {
  await page.route("**/*.apicdn.sanity.io/**", async (route) => {
    const url = new URL(route.request().url());
    const query = url.searchParams.get("query") ?? "";
    let result: unknown;

    if (query.includes("slug.current == ")) {
      const slug = query.match(/slug\.current == "([^"]+)"/)?.[1];
      result = posts.find((post) => post.slug.current === slug) ?? null;
    } else if (/\{\s*slug,\s*photo\s*\}/.test(query)) {
      result = posts.map(({ slug, photo }) => ({ slug, photo }));
    } else if (query.includes("[0]")) {
      result = posts[0] ?? null;
    } else {
      throw new Error(`Unexpected Sanity query: ${query}`);
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ result, ms: 1, query }),
    });
  });

  await page.route("**/cdn.sanity.io/images/**", (route) =>
    route.fulfill({ contentType: "image/png", body: onePixelPng }),
  );
}
