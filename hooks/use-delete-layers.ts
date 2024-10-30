import { postDeleteImage } from "@/services/canvas/tool";
import { LayerType } from "@/types/canvas";
import { useSelf, useMutation } from "@liveblocks/react/suspense";
import { cookies } from "next/headers";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

/**
 * Delete all the selected layers.
 */
export default function useDeleteLayers() {
  const selection = useSelf((me) => me.presence.selection);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  return useMutation(
    async ({ storage, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const liveLayerIds = storage.get("layerIds");

      for (const id of selection) {
        // Delete the layer from the layers LiveMap

        const selectedLayer = liveLayers.get(id)?.toObject();

        // 이미지  Layer 일 때
        if (selectedLayer && selectedLayer.type === LayerType.Image) {
          await postDeleteImage(
            { fileUrl: selectedLayer.src },
            cookies.accessToken,
          );
        }

        liveLayers.delete(id);

        // Find the layer index in the z-index list and remove it
        const index = liveLayerIds.indexOf(id);
        if (index !== -1) {
          liveLayerIds.delete(index);
        }
      }

      setMyPresence({ selection: [] }, { addToHistory: true });
    },
    [selection],
  );
}
