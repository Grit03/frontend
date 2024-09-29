"use client";

import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Cursor,
  LayerType,
  Point,
  Side,
  XYWH,
} from "@/types/canvas";
import { Info } from "./info";
import {
  findIntersectingLayersWithRectangle,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "@/lib/utils";
import { nanoid } from "nanoid";
import { Toolbar } from "./toolbar";
import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useStorage,
  useMutation,
} from "@liveblocks/react/suspense";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";
import { SelectionTools } from "./selection-tools";
import useDeleteLayers from "@/hooks/use-delete-layers";
import SideBar from "./(sidebar)/sidebar";
import useRecentTextSetting from "@/store/text-store";

const MAX_LAYERS = 100;

interface CanvasProps {
  designId: string;
}

export const Canvas = ({ designId }: CanvasProps) => {
  // 최근 폰트 설정
  const { fontStyle, usedFill, updateFont } = useRecentTextSetting();

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

  const deleteLayers = useDeleteLayers();

  // layer 추가 함수
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType: LayerType.AiImage | LayerType.Image | LayerType.Text,
      position: Point,
      fontStyle: string,
    ) => {
      console.log("useMutation: ", fontStyle);
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) return;

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      let layer = null;

      // console.log("인서트 시 폰트 : ", font);
      if (layerType === LayerType.Text) {
        layer = new LiveObject({
          type: layerType,
          x: position.x,
          y: position.y,
          height: 100,
          width: 100,
          fill: usedFill,
          value: "Text",
          font: fontStyle,
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
    [],
  );

  // 단축키
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Backspace": {
          // deleteLayers();
          break;
        }
        case "z": {
          if (e.ctrlKey || e.metaKey) {
            if (e.shiftKey) {
              history.redo();
            } else {
              history.undo();
            }
            break;
          }
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [deleteLayers, history]);

  // 휠 이벤트 function (카메라 뷰 설정)
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    setCamera((camera) => ({ x: camera.x - e.deltaX, y: camera.y - e.deltaY }));
  }, []);

  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) return;

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayer = storage.get("layers");

      // 선택된 모든 객체에 대하여
      for (const id of self.presence.selection) {
        const layer = liveLayer.get(id);

        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },

    [canvasState],
  );

  // Layer를  unselect
  const unselectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  // 일정 정도 드래그 시 selectionNet 모드로 전환하는 핸들러
  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    // if 조건은 Threshold -> 5이상 차이가 나게 드래그 했을 때
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });
    }
  }, []);

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();

      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });

      const ids = findIntersectingLayersWithRectangle(
        layerIds,
        layers,
        origin,
        current,
      );

      // console.log(ids);

      setMyPresence({ selection: ids });
    },
    [layerIds],
  );

  // layer를 resize 할때 크기 계산 및 처리 함수
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

  // layer를 클릭했을 때
  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (canvasState.mode === CanvasMode.Inserting) return;

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        // setMyPresence({ selection: [layerId] }, { addToHistory: true });
        // 히스토리에 남기지 않는 방식
        setMyPresence({ selection: [layerId] }, { addToHistory: false });
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, history, canvasState.mode],
  );

  // resize 조절 handler를 클릭했을 때
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

  const onPointerMove = useMutation(
    ({}, e: React.PointerEvent) => {
      e.preventDefault();

      // 현재 커서 위치
      const current = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayers(current);
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current);
      }

      setCursor(current);
      // console.log(cursor);
    },
    [
      camera,
      canvasState,
      startMultiSelection,
      updateSelectionNet,
      translateSelectedLayers,
      resizeSelectedLayer,
      setCursor,
    ],
  );

  // 마우스 클릭할 때
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        return;
      }

      setCanvasState({ origin: point, mode: CanvasMode.Pressing });
    },
    [camera, canvasState.mode, setCanvasState],
  );

  // 마우스 뗄 때
  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unselectLayers();
        setCanvasState({ mode: CanvasMode.None });
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point, fontStyle);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer, unselectLayers],
  );

  return (
    <main className="relative h-full w-full touch-none overflow-hidden bg-neutral-100">
      <Info designId={designId} />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <SideBar canvasState={canvasState} />

      <SelectionTools camera={camera} />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
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
          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current != null && (
              <rect
                className="fill-indigo-500/5 stroke-indigo-500 stroke-1"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}
        </g>
      </svg>
    </main>
  );
};
