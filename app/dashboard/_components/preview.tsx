"use client";
import { Canvas } from "@/app/design/[canvasName]/_components/canvas";
import { LayerPreview } from "@/app/design/[canvasName]/_components/layer-preview";
import { Room } from "@/app/design/[canvasName]/_components/room";
import { useWindowSize } from "@/hooks/use-window-size";
import { getDesignCanvas } from "@/services/canvas/canvas-crud";
import { useClient, useStorage } from "@liveblocks/react";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import blackTshirt from "@/public/images/t-shirt/black.png";
import { Skeleton } from "@/components/ui/skeleton";

export default function Preview({ canvasName }: { canvasName: string }) {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const { data, error, isLoading } = useQuery({
    queryKey: ["canvas", canvasName],
    queryFn: () => getDesignCanvas(canvasName, cookies.accessToken),
  });

  const [ratio, setRatio] = useState<number>(1);
  const svgRef = useRef<SVGSVGElement>(null);

  //   const handleConvertAndDownload = () => {
  //     const svgElement = svgRef.current;
  //     if (svgElement) {
  //       const svgData = new XMLSerializer().serializeToString(svgElement);
  //       const canvas = document.createElement("canvas");
  //       const ctx = canvas.getContext("2d");
  //       const img = new Image();
  //       const svgBlob = new Blob([svgData], {
  //         type: "image/svg+xml;charset=utf-8",
  //       });
  //       const url = URL.createObjectURL(svgBlob);

  //       // 다운로드 링크 생성 및 클릭하여 다운로드
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.download = "design.svg"; // 저장될 파일명
  //       document.body.appendChild(link);
  //       link.click();

  //       // 링크 제거 및 URL 해제
  //       document.body.removeChild(link);
  //       URL.revokeObjectURL(url);

  //       img.src = url;
  //     }
  //   };

  const layerIds = useStorage((root) => root.layerIds);

  const { width, height } = useWindowSize();

  console.log(layerIds);

  //   useEffect(() => {
  //     if (svgRef.current) {
  //       setCamera({
  //         x: svgRef.current?.clientWidth! / 2 - 800 / 2,
  //         y:
  //           (svgRef.current?.clientHeight! -
  //             (800 * blackTshirt.height) / blackTshirt.width) /
  //           2,
  //       });
  //     }
  //   }, [svgRef.current]);

  console.log(ratio);

  useEffect(() => {
    if (svgRef.current) {
      const svgRatio = Math.min(
        svgRef.current.clientHeight / height,
        svgRef.current.clientWidth / width,
      );
      setRatio(svgRatio);
    }
  }, [layerIds]);

  return (
    <>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="absolute h-full w-full"
      >
        <g
          style={{
            transform: `translate(${svgRef.current?.clientWidth! / 2 - (800 * ratio) / 2}px, ${
              (svgRef.current?.clientHeight! -
                (800 * ratio * blackTshirt.height) / blackTshirt.width) /
              2
            }px)`,
          }}
        >
          {layerIds && (
            <image
              href="/images/t-shirt/black.png"
              height={((800 * blackTshirt.height) / blackTshirt.width) * ratio}
              width={800 * ratio}
              x={0}
              y={0}
            />
          )}

          {layerIds?.map((layerId) => (
            <LayerPreview key={layerId} id={layerId} ratio={ratio} />
          ))}
        </g>
      </svg>
    </>
  );
}
