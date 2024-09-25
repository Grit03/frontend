"use-client";

import React, { memo } from "react";
import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react/suspense";
import { Rectangle } from "./rectangle";
import { Text } from "./text";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Image:
        return (
          <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown} />
        );
      case LayerType.AiImage:
        return null;
      case LayerType.Text:
        return (
          <Text id={id} layer={layer} onPointerDown={onLayerPointerDown} />
        );
      default:
        console.log("잘못된 디자인 요소입니다");
        return null;
    }
  },
);

LayerPreview.displayName = "LayerPreview";
