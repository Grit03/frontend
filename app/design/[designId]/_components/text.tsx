import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { cn, colorToCss } from "@/lib/utils";
import { LayerType, TextLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react/suspense";
import { PointerEvent } from "react";
import { LiveObject } from "@liveblocks/client";
import font from "next/font/google";

interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: PointerEvent, id: string) => void;
  selectionColor?: string;
}

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.25;

  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBaseOnWidth = width * scaleFactor;

  return Math.min(fontSizeBaseOnWidth, fontSizeBasedOnHeight, maxFontSize);
};

export const Text = ({
  layer,
  onPointerDown,
  id,
  selectionColor,
}: TextProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    const layer = liveLayers.get(id);

    if (layer && layer.toObject().type === LayerType.Text) {
      const textLayer = layer as LiveObject<TextLayer>;
      textLayer.set("value", newValue);
    }
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
    >
      <ContentEditable
        className="apply-font flex h-full w-full items-center justify-center text-center outline-none"
        onChange={handleContentChange}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? colorToCss(fill) : "white",
        }}
        html={value || "글자를 입력하세요"}
      />
    </foreignObject>
  );
};
