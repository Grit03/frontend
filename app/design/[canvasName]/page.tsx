"use client";

import { Loading } from "@/components/common/loading";

import { Canvas } from "@/app/design/[canvasName]/_components/canvas";
import { Room } from "@/app/design/[canvasName]/_components/room";
import { useEffect, useState } from "react";
import { getDesignCanvas } from "@/services/canvas/canvas-crud";
import NotFound from "@/app/not-found";
import { CanvasData } from "@/types/data";
import { useQuery } from "@tanstack/react-query";

interface DesignIdPageProps {
  params: {
    canvasName: string;
  };
}

const DesignIdPage = ({ params }: DesignIdPageProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["canvas", params.canvasName],
    queryFn: () => getDesignCanvas(params.canvasName),
  });
  // const [canvasData, setCanvasData] = useState<CanvasData | null>(null);
  // useEffect(() => {
  //   const getRoomData = async () => {
  //     try {
  //       const data = await getDesignCanvas(params.canvasName);
  //       setCanvasData(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getRoomData();
  // }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <>
      {data && (
        <Room roomId={data.roomId} fallback={<Loading />}>
          <Canvas canvasName={data.clothesName} />
        </Room>
      )}
    </>
  );
};

export default DesignIdPage;
