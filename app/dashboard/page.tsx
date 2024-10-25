"use client";

import NamingModal from "@/components/common/naming-modal";
import {
  getAllDesignCanvas,
  NameFormData,
  postCreatingRoom,
} from "@/services/canvas/canvas-crud";
import { HiOutlinePlus } from "react-icons/hi";
import DashboardCtxMenu from "./_components/dashboard-context-menu";
import { useEffect, useState } from "react";
import { CanvasData } from "@/types/data";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function DashBoardPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["AlldesignCanvas"],
    queryFn: getAllDesignCanvas,
  });

  // TODO : 디자인 최소 크기 정하기
  return (
    <>
      <h1 className="py-2 text-4xl font-bold">내 디자인</h1>
      <div className="grid min-w-80 auto-rows-auto grid-cols-1 gap-3 overflow-y-auto px-4 py-7 scrollbar-hide md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* <Link
          href={`/design/${nanoid()}`}
          className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-3xl bg-indigo-600 text-white transition hover:bg-indigo-600/90"
        >
          <HiOutlinePlus className="mb-4 text-5xl" />
          <div className="text-lg font-semibold">디자인 생성하기</div>
        </Link> */}

        <NamingModal
          description="생성할 디자인 캔버스의 이름을 입력해주세요"
          buttonName="생성하기"
          type="create"
        >
          <div className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-3xl bg-indigo-600 text-white transition hover:bg-indigo-600/90">
            <HiOutlinePlus className="mb-4 text-5xl" />
            <div className="text-lg font-semibold">디자인 생성하기</div>
          </div>
        </NamingModal>

        {data?.map((canvas) => (
          <DashboardCtxMenu key={canvas.roomId} canvasData={canvas}>
            <div className="group relative aspect-square rounded-3xl bg-zinc-100">
              <div className="absolute inset-x-0 bottom-0 px-4 py-2 text-right font-medium text-zinc-800 opacity-0 transition group-hover:opacity-100">
                {canvas.clothesName}
              </div>
            </div>
          </DashboardCtxMenu>
        ))}
        {isLoading && (
          <>
            <Skeleton className="aspect-square h-full w-full rounded-3xl" />
            <Skeleton className="aspect-square h-full w-full rounded-3xl" />
          </>
        )}
      </div>
    </>
  );
}
