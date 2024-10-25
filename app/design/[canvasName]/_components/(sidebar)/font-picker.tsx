import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fonts } from "@/constants/text-related";
import useRecentTextSetting from "@/store/text-store";
import { Layer, LayerType, TextLayer } from "@/types/canvas";
import { LiveObject } from "@liveblocks/client";
import { useMutation } from "@liveblocks/react";

interface FontPickerProps {
  layer: Layer;
}

export default function FontPicker({ layer }: FontPickerProps) {
  const currentTextLayer = layer as TextLayer;
  // 최근 사용한 텍스트 설정과 텍스트 설정 update 함수들
  const { fontStyle, updateFont } = useRecentTextSetting();

  const updateFontStyle = useMutation(({ storage, self }, newFont: string) => {
    const liveLayers = storage.get("layers");
    const layer = liveLayers.get(self.presence.selection[0]);

    if (layer && layer.toObject().type === LayerType.Text) {
      const textLayer = layer as LiveObject<TextLayer>;
      textLayer.set("font", newFont);
    }
  }, []);

  return (
    <div className="flex w-full gap-2">
      {/* 폰트 종류 */}
      <Select
        onValueChange={(value) => {
          updateFontStyle(value);
          updateFont(value);
        }}
        defaultValue="poppinsFont"
        value={fonts[currentTextLayer.font as keyof typeof fonts].value}
      >
        <SelectTrigger
          className={
            fonts[currentTextLayer.font as keyof typeof fonts].font.className
          }
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.values(fonts).map((font) => (
            <SelectItem
              key={font.value}
              value={font.value}
              className={font.font.className}
            >
              {font.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 폰트 weight */}
      <Select>
        <SelectTrigger className="w-1/3">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
