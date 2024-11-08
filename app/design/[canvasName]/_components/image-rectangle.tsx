import React, { useEffect } from "react";
import { AiImageLayer, ImageLayer } from "@/types/canvas";
import { Loader2 } from "lucide-react";
import useSelectedLayerStore, {
  ImgProcessMode,
} from "@/store/selected-layer-store";

interface ImageRectangleProps {
  id: string;
  layer: ImageLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
  ratio?: number;
}

export const ImageRectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
  ratio = 1,
}: ImageRectangleProps) => {
  const { selections, mode } = useSelectedLayerStore();
  const { x, y, width, height, src } = layer;
  useEffect(() => {
    console.log(selections);
  }, [mode]);
  return (
    <>
      <image
        className="border drop-shadow-md"
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
          transform: `translate(${x * ratio}px, ${y * ratio}px)`,
        }}
        x={0}
        y={0}
        width={width * ratio}
        height={height * ratio}
        href={src}
        strokeWidth={1}
        crossOrigin="anonymous"
      />
      {selections?.includes(id) && mode === ImgProcessMode.Deleting && (
        <>
          <rect
            className="pointer-events-none"
            style={{ transform: `translate(${x}px, ${y}px)` }}
            x={0}
            y={0}
            width={width}
            height={height}
            strokeWidth={1}
            fill="#000"
            fillOpacity="50%"
            stroke={selectionColor || "transparent"}
          />
          <foreignObject x={x} y={y} width={width} height={height}>
            <div className="flex h-full w-full items-center justify-center font-medium text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              삭제 중
            </div>
          </foreignObject>
        </>
      )}

      {selections?.includes(id) && mode === ImgProcessMode.RemovingBg && (
        <>
          <rect
            className="pointer-events-none"
            style={{ transform: `translate(${x}px, ${y}px)` }}
            x={0}
            y={0}
            width={width}
            height={height}
            strokeWidth={1}
            fill="#000"
            fillOpacity="50%"
            stroke={selectionColor || "transparent"}
          />
          <foreignObject x={x} y={y} width={width} height={height}>
            <div className="flex h-full w-full items-center justify-center font-medium text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              배경 제거 중...
            </div>
          </foreignObject>
        </>
      )}

      {/* <rect
        className="border drop-shadow-md"
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{ transform: `translate(${x}px, ${y}px)` }}
        x={0}
        y={0}
        width={width}
        height={height}
        strokeWidth={1}
        fill={"#e5e5e5"}
        stroke={selectionColor || "transparent"}
      /> */}
    </>
  );
};
