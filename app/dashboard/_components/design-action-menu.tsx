"use client";

import { ConfirmModal } from "@/components/common/confirm-modal";
import NamingModal from "@/components/common/naming-modal";
import { deleteDesignCanvas } from "@/services/canvas/canvas-crud";
import { CanvasData } from "@/types/data";
import { ReactNode, useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { LuTrash2 } from "react-icons/lu";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/common/query-provider";
import { useCookies } from "react-cookie";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Loader2 } from "lucide-react";

interface DashboardCtxMenuProps {
  children: ReactNode;
  canvasData: CanvasData;
}

export default function DesignActionMenu({
  children,
  canvasData,
}: DashboardCtxMenuProps) {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [open, setOpen] = useState(true);

  // 캔버스 삭제
  const mutation = useMutation({
    mutationFn: (clothesName: string) =>
      deleteDesignCanvas(clothesName, cookies.accessToken),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["AlldesignCanvas"],
      });
      toast.success("캔버스가 성공적으로 삭제되었습니다");
    },
    onError: (error) => {
      toast.error("캔버스를 삭제하는 과정에서 문제가 발생했습니다");
    },
  });

  if (mutation.isPending) {
    return (
      <div className="absolute inset-0 z-30">
        <div className="flex h-full w-full items-center justify-center font-medium text-indigo-600">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <div>삭제중</div>
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <NamingModal
          description="디자인 캔버스 이름을 수정해주세요"
          buttonName="저장하기"
          defaultValue={canvasData.clothesName}
          type="rename"
        >
          <div className="flex cursor-pointer items-center py-2 pl-4 pr-16 text-sm">
            <HiPencil className="mr-2" />
            <div>이름 수정</div>
          </div>
        </NamingModal>
        <ConfirmModal
          header="디자인을 삭제하시겠습니까?"
          description="삭제하시면, 디자인과 디자인 안의 모든 요소들이 영구적으로 삭제됩니다."
          onConfirm={() => {
            mutation.mutate(canvasData.clothesName);
          }}
        >
          <div className="flex cursor-pointer items-center rounded-md py-2 pl-4 pr-16 text-sm text-rose-500 hover:!bg-rose-50 hover:!text-rose-700">
            <LuTrash2 className="mr-2" />
            <div>삭제</div>
          </div>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
