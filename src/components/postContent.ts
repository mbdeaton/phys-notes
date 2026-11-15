import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";
import type { PostFigure } from "../types";

function isPortableTextSpan(
  child: PortableTextBlock["children"][number],
): child is PortableTextSpan {
  return child._type === "span";
}

function getLinkedFigureAnchors(block: PortableTextBlock) {
  const markDefs = block.markDefs ?? [];
  const anchors = new Set<string>();

  for (const child of block.children) {
    if (!isPortableTextSpan(child)) continue;

    for (const mark of child.marks ?? []) {
      const link = markDefs.find(
        (definition) => definition._key === mark && definition._type === "link",
      );
      const href = link?.href;

      if (typeof href === "string" && href.startsWith("#") && href.length > 1) {
        anchors.add(href.slice(1));
      }
    }
  }

  return [...anchors];
}

export function getNoteSections(note: PortableTextBlock[], figures: PostFigure[]) {
  const figuresByAnchor = new Map(figures.map((figure) => [figure.anchor, figure]));
  const placedAnchors = new Set<string>();
  const sections: Array<{ blocks: PortableTextBlock[]; figures: PostFigure[] }> = [];
  let sectionStart = 0;

  note.forEach((block, index) => {
    const linkedFigures = getLinkedFigureAnchors(block)
      .map((anchor) => figuresByAnchor.get(anchor))
      .filter((figure): figure is PostFigure => figure !== undefined)
      .filter((figure) => {
        if (placedAnchors.has(figure.anchor)) return false;
        placedAnchors.add(figure.anchor);
        return true;
      });

    if (linkedFigures.length > 0) {
      sections.push({
        blocks: note.slice(sectionStart, index + 1),
        figures: linkedFigures,
      });
      sectionStart = index + 1;
    }
  });

  if (sectionStart < note.length) {
    sections.push({ blocks: note.slice(sectionStart), figures: [] });
  }

  return sections;
}
