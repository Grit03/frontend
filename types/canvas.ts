import { LargeNumberLike } from "crypto";

// export type Color = {
//   r: number;
//   g: number;
//   b: number;
// };

export type Camera = {
  x: number;
  y: number;
};

export enum LayerType {
  Image,
  AiImage,
  Text,
}

export type ImageLayer = {
  type: LayerType.Image;
  x: number;
  y: number;
  height: number;
  width: number;
};

export type AiImageLayer = {
  type: LayerType.AiImage;
  x: number;
  y: number;
  height: number;
  width: number;
};

export type TextLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: string;
  value: string;
  font: string;
};

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | {
      mode: CanvasMode.SelectionNet;
      origin: Point;
      current?: Point;
    }
  | {
      mode: CanvasMode.Translating;
      current: Point;
    }
  | {
      mode: CanvasMode.Inserting;
      layerType: LayerType.AiImage | LayerType.Image | LayerType.Text;
    }
  | {
      mode: CanvasMode.Pressing;
      origin: Point;
    }
  | {
      mode: CanvasMode.Resizing;
      initialBounds: XYWH;
      corner: Side;
    }
  | {
      mode: CanvasMode.Generating;
    };

export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Generating,
}

export type Cursor = {
  x: number;
  y: number;
} | null;

export type Layer = ImageLayer | AiImageLayer | TextLayer;

// export type Storage = {};
