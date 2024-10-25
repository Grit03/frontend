import React from "react";
import { ImageLayer } from "@/types/canvas";

interface RectangleProps {
  id: string;
  layer: ImageLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

// export type ImageLayer = {
//   type: LayerType.Image;
//   x: number;
//   y: number;
//   height: number;
//   width: number;
//   value?: string;
// };

export const ImageRectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height, src } = layer;
  return (
    <>
      <image
        className="border drop-shadow-md"
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{ transform: `translate(${x}px, ${y}px)` }}
        x={0}
        y={0}
        width={width}
        height={height}
        href={src}
        strokeWidth={1}
        fill={"#e5e5e5"}
        stroke={selectionColor || "transparent"}
      />
    </>
  );
};
