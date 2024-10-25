"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/common/confirm-modal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Invoice = {
  id: string;
  canvasId: string;
  canvasTitle: string;
  amount: number;
};

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: "주문 ID",
  },
  {
    accessorKey: "canvasId",
    header: "티셔츠 캔버스 ID",
  },
  {
    accessorKey: "canvasTitle",
    header: "티셔츠 캔버스 제목",
  },
  {
    accessorKey: "amount",
    header: "수량",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invoice = row.original;
      console.log(invoice);

      return (
        <ConfirmModal
          header="디자인을 삭제하시겠습니까?"
          description="삭제하시면, 디자인과 디자인 안의 모든 요소들이 영구적으로 삭제됩니다."
          // disabled={pending}
          onConfirm={function (): void {
            throw new Error("Function not implemented.");
          }}
        >
          <Button variant="danger" size="icon">
            <Trash2 className="h-5 w-5" />
          </Button>
        </ConfirmModal>

        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0">
        //       <span className="sr-only">Open menu</span>
        //       <MoreHorizontal className="h-4 w-4" />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //     <DropdownMenuItem
        //       onClick={() => navigator.clipboard.writeText(invoice.id)}
        //     >
        //       Copy payment ID
        //     </DropdownMenuItem>
        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem>View customer</DropdownMenuItem>
        //     <DropdownMenuItem>View payment details</DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
      );
    },
  },
];

// export const columns: ColumnDef<Payment>[] = [];
