"use client";

import { Layer } from "@/types/canvas";
import { LiveMap, LiveList, LiveObject } from "@liveblocks/client";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import React, { useEffect } from "react";
import { ReactNode } from "react";
import axios from "axios";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: ReactNode;
}

export function Room({ children, roomId, fallback }: RoomProps) {
  return (
    <LiveblocksProvider
      throttle={16}
      publicApiKey={
        "pk_dev_ZM6zakXGJdkC6qSBeh900KJO7Hd6grCrvqbswIxUDxCARcfPt6Y2-V9Bkrhhdz7l"
      }
      // authEndpoint="/api/liveblocks-auth"
    >
      <RoomProvider
        id={roomId}
        initialPresence={{ selection: [] }}
        initialStorage={{
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([]),
        }}
      >
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
