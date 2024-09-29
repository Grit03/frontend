import { Layer, LayerType, TextLayer } from "@/types/canvas";
import { cn } from "@/lib/utils";
import useRecentTextSetting from "@/store/text-store";
import { useMutation } from "@liveblocks/react";
import { LiveObject } from "@liveblocks/client";

interface ColorPickerProps {
  layer: Layer;
}

const textColorList = [
  "#1A1A1A",
  "#F5F5F5",
  "#FF4500",
  "#4682B4",
  "#FFD700",
  "#FF69B4",
  "#32CD32",
  "#A9A9A9",
  "#8B4513",
];

export default function ColorPicker({ layer }: ColorPickerProps) {
  const currentTextLayer = layer as TextLayer;
  // 최근 사용한 텍스트 설정과 텍스트 설정 update 함수들
  const { updateUsedFill } = useRecentTextSetting();

  const updateFillColor = useMutation(({ storage, self }, newColor: string) => {
    const liveLayers = storage.get("layers");
    const layer = liveLayers.get(self.presence.selection[0]);

    if (layer && layer.toObject().type === LayerType.Text) {
      const textLayer = layer as LiveObject<TextLayer>;
      textLayer.set("fill", newColor);
    }
  }, []);

  return (
    <ul className="mb-3.5 grid grid-cols-6 gap-2">
      {textColorList.map((color) => (
        <li
          className={cn(
            "relative mb-1.5 aspect-square w-full cursor-pointer overflow-hidden rounded-full shadow transition hover:ring-2 hover:ring-indigo-400 hover:brightness-95",
            currentTextLayer.fill === color && "ring-2 ring-indigo-500",
          )}
          onClick={() => {
            // text layer 속성 변경
            updateFillColor(color);
            // 최근 사용 색 변경
            updateUsedFill(color);
          }}
          style={{
            backgroundColor: color,
          }}
        />
      ))}
    </ul>
  );
}
