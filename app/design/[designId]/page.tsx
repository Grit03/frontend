import { Loading } from "@/components/common/loading";

import { Canvas } from "@/app/design/[designId]/_components/canvas";
import { Room } from "@/app/design/[designId]/_components/room";

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
