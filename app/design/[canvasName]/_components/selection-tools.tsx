"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { Camera, LayerType } from "@/types/canvas";
import { useMutation, useSelf } from "@liveblocks/react/suspense";
import { memo, useEffect, useState } from "react";
import { Hint } from "@/components/ui/hint";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useDeleteLayers from "@/hooks/use-delete-layers";
import { RiSendBackward, RiBringForward } from "react-icons/ri";
import { PiSelectionBackgroundDuotone } from "react-icons/pi";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import useSelectedLayerStore, {
  ImgProcessMode,
} from "@/store/selected-layer-store";
import { useStorage } from "@liveblocks/react";
import { postRemoveBg } from "@/services/canvas/tool";
import { usePathname } from "next/navigation";

interface SelectionToolsProps {
  camera: Camera;
}

export const SelectionTools = memo(({ camera }: SelectionToolsProps) => {
  const [activeFontFamily, setActiveFontFamily] = useState<string>("Open Sans");
  const selection = useSelf((me) => me.presence.selection);
  const [iconColor, setIconColor] = useState<string>("000000");
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  const { mode, setSelectedLayer, clearSelectedLayer, setProcessMode } =
    useSelectedLayerStore();
  const layers = useStorage((root) => root.layers);

  useEffect(() => {
    setSelectedLayer(selection);
    // console.log(selection);
  }, [selection]);

  useEffect(() => {
    return clearSelectedLayer();
  }, []);

  const pathname = usePathname();

  const moveToFront = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      const arr = liveLayerIds.toArray();

      for (let i = 0; i < arr.length; i++) {
        if (selection?.includes(arr[i])) {
          indices.push(i);
        }
      }

      for (let i = indices.length - 1; i >= 0; i--) {
        liveLayerIds.move(
          indices[i],
          arr.length - 1 - (indices.length - 1 - i),
        );
      }
    },
    [selection],
  );

  const moveToBack = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      const arr = liveLayerIds.toArray();

      for (let i = 0; i < arr.length; i++) {
        if (selection?.includes(arr[i])) {
          indices.push(i);
        }
      }

      for (let i = 0; i < indices.length; i++) {
        liveLayerIds.move(indices[i], i);
      }
    },
    [selection],
  );

  // 삭제 이벤트 핸들러
  const handleDelete = async () => {
    try {
      setProcessMode(ImgProcessMode.Deleting);
      await deleteLayers();
      toast.success("이미지 삭제에 성공했습니다.");
    } catch (error) {
      toast.error("이미지 삭제에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setProcessMode(ImgProcessMode.None);
    }
  };

  const deleteLayers = useDeleteLayers();

  // 배경 제거 이벤트 핸들러
  const handleRemoveBg = useMutation(
    async ({ storage }) => {
      try {
        setProcessMode(ImgProcessMode.RemovingBg);
        if (selection.length === 1) {
          const liveLayer = storage.get("layers");
          const layer = liveLayer.get(selection[0]);
          let layerObj = layer!.toObject()!;

          if (layer && layerObj && layerObj.type !== LayerType.Text) {
            const formData = {
              clothesName: decodeURIComponent(pathname).split("/")[2],
              imageId: selection[0],
              imageUrl: layerObj.src,
            };
            const data = await postRemoveBg(formData, cookies.accessToken);
            layer.update({ src: data.imageUrl });
            toast.success("배경 제거에 성공했습니다.");
          } else {
            toast.error("배경 제거할 수 있는 요소가 아닙니다");
          }
        } else {
          toast.error("이미지 요소를 한 개 선택해주세요.");
        }
      } catch (error) {
        toast.error("배경 제거에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setProcessMode(ImgProcessMode.None);
      }
    },
    [selection],
  );

  const selectionBounds = useSelectionBounds();
  if (!selectionBounds) {
    return null;
  }

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;

  return (
    <div
      className="absolute flex select-none rounded-xl border bg-white px-2.5 py-1.5 shadow-sm"
      style={{
        transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
      }}
    >
      {/* <ColorPicker onChange={setFill} /> */}
      {selection.length === 1 &&
        layers?.get(selection[0])?.type !== LayerType.Text && (
          <div className="mr-2 flex items-center border-r border-neutral-200 pr-2">
            <Hint label="배경 제거">
              <Button onClick={handleRemoveBg} variant="design" size="icon">
                <PiSelectionBackgroundDuotone className="text-2xl" />
              </Button>
            </Hint>
          </div>
        )}

      <Hint label="앞으로 가져오기">
        <Button onClick={moveToFront} variant="design" size="icon">
          <RiBringForward className="text-2xl" />
        </Button>
      </Hint>
      <Hint label="뒤로 보내기">
        <Button onClick={moveToBack} variant="design" size="icon">
          <RiSendBackward className="text-2xl" />
        </Button>
      </Hint>
      <div className="ml-2 flex items-center border-l border-neutral-200 pl-2">
        <Hint label="삭제하기">
          <Button variant="design" size="icon" onClick={handleDelete}>
            <Trash2 className="w-5" />
            {mode}
          </Button>
        </Hint>
      </div>
    </div>
  );
});

SelectionTools.displayName = "SelectionTools";
