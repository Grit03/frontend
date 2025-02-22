import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { Toolbutton } from "./tool-button";
import {
  ImagePlus,
  MousePointer2,
  Redo2,
  Type,
  Undo2,
  WandSparkles,
} from "lucide-react";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import { toast } from "sonner";

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  setImage: Dispatch<SetStateAction<File | null>>;
}

export const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
  setImage,
}: ToolbarProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("test");
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="absolute left-2 top-[50%] z-10 flex -translate-y-[50%] flex-col gap-y-4">
      <div className="flex flex-col items-center gap-y-2 rounded-md bg-white p-1.5 shadow-md">
        <Toolbutton
          label="선택"
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />
        <Toolbutton
          label="텍스트 입력"
          icon={Type}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        <Toolbutton
          label="이미지 추가"
          icon={ImagePlus}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Image,
            });
            handleButtonClick();
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Image
          }
        />
        <Toolbutton
          label="AI 이미지 생성"
          icon={WandSparkles}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Generating,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Generating ||
            (canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.AiImage)
          }
        />
      </div>
      <div className="flex flex-col items-center gap-y-2 rounded-md bg-white p-1.5 shadow-md">
        <Toolbutton
          label="되돌리기"
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <Toolbutton
          label="다시 실행"
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
};
