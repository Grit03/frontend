import { Camera, Point, Side, XYWH } from "@/types/canvas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 현재 커서 위치 받아오는 util 함수
export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera,
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point) {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  if ((corner && Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner && Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if ((corner && Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.height - point.y);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner && Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
}
