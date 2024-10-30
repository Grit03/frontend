import React, { useEffect } from "react";
import { AiImageLayer, ImageLayer } from "@/types/canvas";
import { Loader2 } from "lucide-react";
import useSelectedLayerStore, {
  ImgProcessMode,
} from "@/store/selected-layer-store";

interface AiImageProps {
  id: string;
  layer: AiImageLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const AiImage = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: AiImageProps) => {
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
          transform: `translate(${x}px, ${y}px)`,
        }}
        x={0}
        y={0}
        width={width}
        height={height}
        href={src}
        strokeWidth={1}
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
