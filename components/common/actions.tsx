"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link2, Trash2 } from "lucide-react";
import { ConfirmModal } from "@/components/common/confirm-modal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) => {
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/design/${id}`)
      .then(() => toast.success("링크 복사 완료!"))
      .catch(() => toast.error("링크 복사 실패"));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-52"
      >
        <DropdownMenuItem
          onClick={onCopyLink}
          className="cursor-pointer p-3 font-medium"
        >
          <Link2 className="mr-2 h-4 w-4" />
          디자인 링크 복사
        </DropdownMenuItem>
        <ConfirmModal
          header="디자인을 삭제하시겠습니까?"
          description="삭제하시면, 디자인과 디자인 안의 모든 요소들이 영구적으로 삭제됩니다."
          // disabled={pending}
          onConfirm={function (): void {
            throw new Error("Function not implemented.");
          }}
        >
          <Button
            variant="ghost"
            onClick={() => {}}
            className="w-full cursor-pointer justify-start p-3 text-sm font-medium font-normal"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            티셔츠 캔버스 삭제
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
