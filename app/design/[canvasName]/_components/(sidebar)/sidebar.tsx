import { cn } from "@/lib/utils";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import { useSelf, useStorage } from "@liveblocks/react";

import TextSetting from "./text-setting";
import AiSetting from "./ai-setting";
import { Dispatch, SetStateAction } from "react";

interface SideBarWrapperProps {
  isClosed: boolean;
  children: React.ReactNode;
}

interface SideBarProps {
  canvasState: CanvasState;
  setCanvasState: Dispatch<SetStateAction<CanvasState>>;
}

export default function SideBar({ canvasState, setCanvasState }: SideBarProps) {
  const selection = useSelf((me) => me.presence.selection);
  const layer =
    selection && useStorage((root) => root.layers.get(selection[0]));

  const isAiImage =
    layer && selection?.length === 1 && layer.type === LayerType.AiImage;
  const isTextLayer =
    layer && selection?.length === 1 && layer.type === LayerType.Text;

  // const closed =
  //   !isTextLayer && canvasState.mode !== CanvasMode.Generating && !isAiImage;

  const closed = !isTextLayer && canvasState.mode !== CanvasMode.Generating;

  return (
    <SideBarWrapper isClosed={closed}>
      {canvasState.mode !== CanvasMode.Generating && isTextLayer && (
        <TextSetting layer={layer} />
      )}
      {canvasState.mode === CanvasMode.Generating && (
        <AiSetting setCanvasState={setCanvasState} />
      )}
    </SideBarWrapper>
  );
}

function SideBarWrapper({ isClosed, children }: SideBarWrapperProps) {
  return (
    <div
      className={cn(
        "absolute bottom-2 right-2 top-2 h-full w-[320px] overflow-y-auto rounded-md bg-white shadow-md transition",
        isClosed && "-right-[100%]",
      )}
    >
      {children}
    </div>
  );
}
