"use client";

import NamingModal from "@/components/common/naming-modal";
import { getAllDesignCanvas } from "@/services/canvas/canvas-crud";
import { HiOutlinePlus } from "react-icons/hi";
import DesignActionMenu from "./_components/design-action-menu";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useCookies } from "react-cookie";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Preview from "./_components/preview";
import { Room } from "../design/[canvasName]/_components/room";

export default function DashBoardPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const { data, error, isLoading } = useQuery({
    queryKey: ["AlldesignCanvas"],
    queryFn: () => getAllDesignCanvas(cookies.accessToken),
  });

  // TODO : 디자인 최소 크기 정하기
  return (
    <>
      <h1 className="py-2 text-4xl font-bold">내 디자인</h1>
      <div className="grid min-w-80 grid-cols-1 items-stretch justify-items-stretch gap-4 overflow-y-auto px-4 py-7 scrollbar-hide md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <NamingModal
          description="생성할 디자인 캔버스의 이름을 입력해주세요"
          buttonName="생성하기"
          type="create"
        >
          <button className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-3xl bg-indigo-600 text-white transition hover:bg-indigo-600/90">
            <HiOutlinePlus className="mb-4 text-5xl" />
            <div className="text-lg font-semibold">디자인 생성하기</div>
          </button>
        </NamingModal>
        {/* <Skeleton className="aspect-square rounded-3xl" /> */}
        {data &&
          data.map((canvas) => (
            <Link
              href={`/design/${canvas.clothesName}`}
              className="group relative aspect-square rounded-3xl shadow-[0_0_20px] shadow-zinc-200"
            >
              <div className="overflow-hidden rounded-3xl">
                {/* <div className="h-full w-full">
                  <Room
                    roomId={canvas.roomId}
                    // fallback={
                    //   <Skeleton className="absolute inset-0 h-full w-full" />
                    // }
                  >
                    <Preview canvasName={canvas.clothesName} />
                  </Room>
                </div> */}

                <Image
                  alt="캔버스 디자인 placeholder"
                  src="/placeholder/design-placeholder.png"
                  width={300}
                  height={300}
                  className="h-full w-full from-slate-100 object-cover"
                />
              </div>

              <div
                className="absolute inset-0 h-full overflow-hidden rounded-3xl transition hover:bg-zinc-600/10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute inset-x-0 bottom-0 px-4 py-2 text-right font-medium text-zinc-800 opacity-0 transition group-hover:opacity-100">
                  {canvas.clothesName}
                </div>
                <DesignActionMenu key={canvas.roomId} canvasData={canvas}>
                  <div className="absolute left-0 cursor-pointer px-4 py-2 font-medium text-zinc-800 opacity-0 transition hover:text-indigo-600 group-hover:opacity-100">
                    <HiOutlineDotsHorizontal className="text-2xl" />
                  </div>
                </DesignActionMenu>
              </div>
            </Link>
          ))}

        {isLoading && (
          <>
            <Skeleton className="aspect-square rounded-3xl" />
            <Skeleton className="aspect-square rounded-3xl" />
          </>
        )}
      </div>
    </>
  );
}
