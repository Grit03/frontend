import React from "react";

import { Room } from "@/app/room";
import { Canvas } from "./_components/canvas";
import { Loading } from "@/components/common/loading";

interface DesignIdPageProps {
  params: {
    designId: string;
  };
}

const DesignIdPage = ({ params }: DesignIdPageProps) => {
  return (
    <Room roomId={params.designId} fallback={<Loading />}>
      <Canvas designId={params.designId} />
    </Room>
  );
};

export default DesignIdPage;
