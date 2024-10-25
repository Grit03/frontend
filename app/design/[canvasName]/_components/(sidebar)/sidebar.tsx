import { cn } from "@/lib/utils";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import { useSelf, useStorage } from "@liveblocks/react";

import TextSetting from "./text-setting";
import AiSetting from "./ai-setting";

interface SideBarWrapperProps {
  isClosed: boolean;
  children: React.ReactNode;
}

interface SideBarProps {
  canvasState: CanvasState;
}

export default function SideBar({ canvasState }: SideBarProps) {
  const selection = useSelf((me) => me.presence.selection);
  const layer =
    selection && useStorage((root) => root.layers.get(selection[0]));

  const isAiImage =
    layer && selection?.length === 1 && layer.type === LayerType.AiImage;
  const isTextLayer =
    layer && selection?.length === 1 && layer.type === LayerType.Text;

  const closed =
    !isTextLayer && canvasState.mode !== CanvasMode.Generating && !isAiImage;

  return (
    <SideBarWrapper isClosed={closed}>
      {canvasState.mode !== CanvasMode.Generating && isTextLayer && (
        <TextSetting layer={layer} />
      )}
      {(canvasState.mode === CanvasMode.Generating || isAiImage) && (
        <AiSetting />
      )}
    </SideBarWrapper>
  );
}

function SideBarWrapper({ isClosed, children }: SideBarWrapperProps) {
  return (
    <div
      className={cn(
        "absolute bottom-2 right-2 top-2 w-[320px] rounded-md bg-white px-6 py-1.5 shadow-md transition",
        isClosed && "-right-[100%]",
      )}
    >
      {children}
    </div>
  );
}
