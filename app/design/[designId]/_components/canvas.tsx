"use client";

import React, { useCallback } from "react";
import { useState } from "react";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  Cursor,
  LayerType,
  Point,
  Side,
  XYWH,
} from "@/types/canvas";
import { Info } from "./info";
import { pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { nanoid } from "nanoid";
import { Toolbar } from "./toolbar";
import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useStorage,
  useMutation,
} from "@liveblocks/react";
import { CursorsPresence } from "./cursors-presence";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";

const MAX_LAYERS = 100;

interface CanvasProps {
  designId: string;
}

export const Canvas = ({ designId }: CanvasProps) => {
  // 캔버스 모드
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  // 작업 history
  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

  // 카메라 위치
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  // 커서 위치
  const [cursor, setCursor] = useState<Cursor>({ x: 0, y: 0 });

  // layer 요소 id
  const layerIds = useStorage((root) => root.layerIds);
  // 최근 사용 color
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  // layer 추가 함수
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType: LayerType.AiImage | LayerType.Image | LayerType.Text,
      position: Point,
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) return;

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      let layer = null;
      if (layerType === LayerType.Text) {
        layer = new LiveObject({
          type: layerType,
          x: position.x,
          y: position.y,
          height: 100,
          width: 100,
          fill: lastUsedColor,
        });
      } else {
        layer = new LiveObject({
          type: layerType,
          x: position.x,
          y: position.y,
          height: 100,
          width: 100,
        });
      }

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor],
  );

  // 휠 이벤트 function (카메라 뷰 설정)
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    setCamera((camera) => ({ x: camera.x - e.deltaX, y: camera.y - e.deltaY }));
  }, []);

  // resize 처리 함수
  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point,
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState],
  );

  const onPointerMove = (e: React.PointerEvent) => {
    e.preventDefault();

    // 현재 커서 위치
    const current = pointerEventToCanvasPoint(e, camera);

    if (canvasState.mode === CanvasMode.Resizing) {
      resizeSelectedLayer(current);
    }

    setCursor(current);
    // console.log(cursor);
  };

  // 포인터를 움직였을 때
  // const onPointerMove = useMutation(
  //   ({ setMyPresence }, e: React.PointerEvent) => {
  //     e.preventDefault();

  //     if (canvasState.mode === CanvasMode.Resizing) {
  //       console.log("hello");
  //     }
  //   },
  //   [canvasState],
  // );

  // 클릭했을 때
  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer],
  );

  // layer를 클릭했을 때
  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (canvasState.mode === CanvasMode.Inserting) return;

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, history, canvasState.mode],
  );

  // resize 상태에서 조절 handler를 클릭했을 때
  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history],
  );

  // const [images, setImage] = useState(new window.Image());
  // useEffect(() => {
  //   const MyImage = new window.Image();
  //   MyImage.src = "/t-shirt-mockup-front.png";
  //   MyImage.onload = () => {
  //     setImage(MyImage);
  //   };
  // }, []);

  return (
    <main className="relative h-full w-full touch-none bg-neutral-100">
      <Info designId={designId} />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds?.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
        </g>
      </svg>
    </main>
  );
};
