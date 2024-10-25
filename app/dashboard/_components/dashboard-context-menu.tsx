"use client";

import { ConfirmModal } from "@/components/common/confirm-modal";
import NamingModal from "@/components/common/naming-modal";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { deleteDesignCanvas } from "@/services/canvas/canvas-crud";
import { CanvasData } from "@/types/data";
import { ReactNode, useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { LuTrash2 } from "react-icons/lu";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/common/query-provider";

interface DashboardCtxMenuProps {
  children: ReactNode;
  canvasData: CanvasData;
}

export default function DashboardCtxMenu({
  children,
  canvasData,
}: DashboardCtxMenuProps) {
  // 캔버스 삭제
  const mutation = useMutation({
    mutationFn: (clothesName: string) => deleteDesignCanvas(clothesName),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["AlldesignCanvas"] });
      toast.success("캔버스가 성공적으로 삭제되었습니다");
    },
    onError: (error) => {
      toast.error("캔버스를 삭제하는 과정에서 문제가 발생했습니다");
    },
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
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
          disabled={mutation.isPending}
          onConfirm={() => {
            mutation.mutate(canvasData.clothesName);
          }}
        >
          <div className="flex cursor-pointer items-center rounded-md py-2 pl-4 pr-16 text-sm text-rose-500 hover:!bg-rose-50 hover:!text-rose-700">
            <LuTrash2 className="mr-2" />
            <div>삭제</div>
          </div>
        </ConfirmModal>
      </ContextMenuContent>
    </ContextMenu>
  );
}
