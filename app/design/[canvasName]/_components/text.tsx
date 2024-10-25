"use client";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { cn } from "@/lib/utils";
import { LayerType, TextLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react/suspense";
import { PointerEvent, useRef } from "react";
import { LiveObject } from "@liveblocks/client";
import { fonts } from "@/constants/text-related";

interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: PointerEvent, id: string) => void;
  selectionColor?: string;
}

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.4;

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
  const { x, y, width, height, fill, value, font } = layer;

  const textRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (textRef.current) {
  //     updateHeight(textRef.current?.clientHeight);
  //   }
  // }, [textRef.current?.clientHeight]);

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    const layer = liveLayers.get(id);

    if (layer && layer.toObject().type === LayerType.Text) {
      const textLayer = layer as LiveObject<TextLayer>;
      textLayer.set("value", newValue);
    }
  }, []);

  // 글자 작성에 따른 높이 업데이트
  // const updateHeight = useMutation(({ storage }, newHeight: number) => {
  //   const liveLayers = storage.get("layers");
  //   const layer = liveLayers.get(id);

  //   if (layer && layer.toObject().type === LayerType.Text) {
  //     const textLayer = layer as LiveObject<TextLayer>;
  //     textLayer.set("height", newHeight);
  //   }
  // }, []);

  // 글자 작성에 따른 너비 업데이트
  // const updateWidth = useMutation(({ storage }, newWidth: number) => {
  //   const liveLayers = storage.get("layers");
  //   const layer = liveLayers.get(id);

  //   if (layer && layer.toObject().type === LayerType.Text) {
  //     const textLayer = layer as LiveObject<TextLayer>;
  //     textLayer.set("width", newWidth);
  //   }
  // }, []);

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
        className={cn(
          "apply-font flex min-h-full min-w-full items-center justify-center break-all outline-none",
          fonts[font as keyof typeof fonts].font.className,
        )}
        // innerRef={textRef}
        onChange={handleContentChange}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill,
        }}
        html={value || "Text"}
      />
    </foreignObject>
  );
};
