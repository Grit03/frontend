import ColorPicker from "./color-picker";
import FontPicker from "./font-picker";
import { Layer } from "@/types/canvas";

interface TextSettingProps {
  layer: Layer;
}

export default function TextSetting({ layer }: TextSettingProps) {
  return (
    <>
      <div className="py-4 text-xl font-semibold">텍스트 편집</div>
      {/* 폰트 및 크기 변경 */}
      <div className="flex flex-col space-y-5">
        <div>
          <div className="mb-3.5 font-medium leading-none">폰트 및 크기</div>
          <FontPicker layer={layer} />
        </div>
        <div>
          <div className="mb-3.5 font-medium leading-none">색상</div>
          <ColorPicker layer={layer} />
        </div>
      </div>
    </>
  );
}
