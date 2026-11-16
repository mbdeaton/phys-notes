import type { PostData } from "../../src/types";

export type PostFixture = PostData & {
  slug: { current: string };
};

const imageAssetRef =
  "image-0123456789abcdef0123456789abcdef01234567-100x100-jpg";

export const figurePost = {
  title: "Fixture post title",
  slug: { current: "fixture_post" },
  publishedAt: "2025-03-05T07:05:00.000Z",
  photo: {
    asset: { _ref: imageAssetRef },
    alt: "Fixture cover image",
  },
  note: [
    {
      _type: "block",
      _key: "paragraph-a",
      style: "normal",
      markDefs: [
        { _key: "figure-one-link", _type: "link", href: "#fig-1" },
      ],
      children: [
        {
          _type: "span",
          _key: "paragraph-a-text",
          text: "Fixture paragraph A",
          marks: ["figure-one-link"],
        },
      ],
    },
    {
      _type: "block",
      _key: "paragraph-b",
      style: "normal",
      markDefs: [
        { _key: "figure-two-link", _type: "link", href: "#fig-2" },
      ],
      children: [
        {
          _type: "span",
          _key: "paragraph-b-text",
          text: "Fixture paragraph B",
          marks: ["figure-two-link"],
        },
      ],
    },
    {
      _type: "block",
      _key: "paragraph-c",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "paragraph-c-text",
          text: "Fixture paragraph C",
          marks: [],
        },
      ],
    },
  ],
  figures: [
    {
      anchor: "fig-1",
      image: {
        asset: { _ref: imageAssetRef },
        alt: "Fixture figure one",
      },
      caption: "Fixture figure one caption",
    },
    {
      anchor: "fig-2",
      image: {
        asset: { _ref: imageAssetRef },
        alt: "Fixture figure two",
      },
    },
  ],
} satisfies PostFixture;

export const plainTextPost = {
  title: "Fixture plain text title",
  slug: { current: "fixture_plain_text" },
  publishedAt: "2025-03-05T07:05:00.000Z",
  photo: {
    asset: { _ref: imageAssetRef },
    alt: "Fixture plain text cover",
  },
  note: [
    {
      _type: "block",
      _key: "plain-paragraph-one",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "plain-paragraph-one-text",
          text: "Fixture plain text paragraph one",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "plain-paragraph-two",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "plain-paragraph-two-text",
          text: "Fixture plain text paragraph two",
          marks: [],
        },
      ],
    },
  ],
} satisfies PostFixture;
