"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LegacyRef, ReactNode, RefAttributes, RefObject, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  NameFormData,
  postCreatingRoom,
  putRenamingCanvas,
  RenameFormData,
} from "@/services/canvas/canvas-crud";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./query-provider";
import { Loader2 } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

interface NamingModalProps {
  children: ReactNode;
  description: string;
  buttonName: string;
  defaultValue?: string;
  type: "rename" | "create";
}

export default function NamingModal({
  children,
  description,
  buttonName,
  defaultValue,
  type,
}: NamingModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormData>({
    defaultValues: {
      clothesName: defaultValue,
    },
  });

  const router = useRouter();

  const closeRef = useRef<HTMLDivElement>(null);

  // 캔버스 생성 mutation
  const mutationAfterCreation = useMutation({
    mutationFn: (fromData: NameFormData) => postCreatingRoom(fromData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["AlldesignCanvas"] });
      router.push(`/design/${data.clothesName}`);
    },
    onError: (error) => {
      toast.error("디자인 캔버스 생성에 실패했습니다");
    },
  });

  // 캔버스 이름 변경 mutation
  const mutationAfterRenaming = useMutation({
    mutationFn: (fromData: RenameFormData) => putRenamingCanvas(fromData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["AlldesignCanvas"] });
      if (closeRef.current) {
        closeRef.current.click();
      }
      toast.error("디자인 캔버스 이름이 성공적으로 변경되었습니다.");
    },
    onError: (error) => {
      toast.error("디자인 캔버스 이름 수정 중 문제가 발생했습니다.");
    },
  });

  // // 캔버스 생성 함수
  // const onCreateCanvas = async (fromData: NameFormData) => {
  //   try {
  //     const data = await postCreatingRoom(fromData);
  //     const { clothesName } = data;
  //     router.push(`/design/${clothesName}`);
  //   } catch (error) {
  //     toast.error("디자인 캔버스 생성에 실패했습니다");
  //   }
  // };

  const onCreateCanvas = (formData: NameFormData) => {
    console.log(formData);
    mutationAfterCreation.mutate(formData);
  };

  // 캔버스 이름 수정 함수
  const onRenameCanvas = async (fromData: NameFormData) => {
    if (defaultValue) {
      const body = {
        oldClothesName: defaultValue,
        newClothesName: fromData.clothesName,
      };
      mutationAfterRenaming.mutate(body);
    } else {
      return;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>디자인 캔버스 이름</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Input
          {...register("clothesName", { required: true })}
          className="focus-visible:border-indigo-600 focus-visible:ring-indigo-600"
        />
        {errors.clothesName && (
          <div className="my-1 text-xs text-rose-600">
            디자인 캔버스 이름을 입력하세요
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <div ref={closeRef} className="hidden">
              Close
            </div>
          </DialogClose>
          <Button
            disabled={
              type === "create"
                ? mutationAfterCreation.isPending
                : mutationAfterRenaming.isPending
            }
            variant="action"
            onClick={handleSubmit(
              type === "create" ? onCreateCanvas : onRenameCanvas,
            )}
          >
            {(type === "create"
              ? mutationAfterCreation.isPending
              : mutationAfterRenaming.isPending) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {buttonName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
