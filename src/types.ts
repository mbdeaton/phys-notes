import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  asset: { _ref: string };
  alt?: string;
};

export type PostFigure = {
  anchor: string;
  image: SanityImage & { alt: string };
  caption?: string;
};

export type PostData = {
  title: string;
  photo: SanityImage;
  caption?: string;
  note?: PortableTextBlock[];
  figures?: PostFigure[];
  originalLetterPages?: Array<SanityImage & { alt: string }>;
  next?: { current: string };
  prev?: { current: string };
};
