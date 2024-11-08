"use-client";

import React, { memo } from "react";
import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react/suspense";
import { ImageRectangle } from "./image-rectangle";
import { Text } from "./text";
import { AiImage } from "./ai-image";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown?: (e: React.PointerEvent, layerId: string) => void;
  ratio?: number;
}

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, ratio }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Image:
        return (
          <ImageRectangle
            ratio={ratio}
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown ? onLayerPointerDown : () => {}}
          />
        );
      case LayerType.AiImage:
        return (
          <AiImage
            ratio={ratio}
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown ? onLayerPointerDown : () => {}}
          />
        );
      case LayerType.Text:
        return (
          <Text
            // ratio={ratio}
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown ? onLayerPointerDown : () => {}}
          />
        );
      default:
        console.log("잘못된 디자인 요소입니다");
        return null;
    }
  },
);

LayerPreview.displayName = "LayerPreview";
