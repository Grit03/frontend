"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { DialogDescription } from "@radix-ui/react-dialog";
import { LoginFormData, postLogin } from "@/services/auth/user";

import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { Loader2 } from "lucide-react";

interface LoginModalProps {
  children: ReactNode;
}

interface PasswordEyeBtnProps {
  onOff: boolean;
  onClick: () => void;
}

function PasswordEyeBtn({ onOff, onClick }: PasswordEyeBtnProps) {
  if (onOff)
    return (
      <IoEye
        className="absolute inset-y-0 right-3 h-full cursor-pointer text-xl text-zinc-400 transition hover:text-zinc-600"
        onClick={onClick}
      />
    );
  else
    return (
      <IoEyeOff
        className="absolute inset-y-0 right-3 h-full cursor-pointer text-xl text-zinc-400 transition hover:text-zinc-600"
        onClick={onClick}
      />
    );
}
export default function LoginModal({ children }: LoginModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();
  const router = useRouter();

  const [eyeOnOff, setEyeOnOff] = useState<boolean>(false);

  const onSubmit = async (formData: LoginFormData) => {
    setLoading(true);
    const response = await postLogin(formData);

    if (response.success) {
      const jwt = response.message;
      setCookie("accessToken", jwt, {
        path: "/",
        expires: new Date(new Date().getTime() + 30 * 60 * 1000),
      });
      router.push("/");
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        reset();
        setOpen((prev) => !prev);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-2">
          <DialogTitle>로그인</DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            Tindy로 로그인하세요
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5">
          <div className="flex items-center gap-2">
            <Label htmlFor="loginId" className="w-14 text-sm font-medium">
              아이디
            </Label>
            <div className="flex grow">
              <Input
                id="loginId"
                {...register("loginId", {
                  required: "아이디를 입력해주세요.",
                })}
                placeholder="아이디"
                className="focus-visible:border-indigo-600 focus-visible:ring-indigo-600"
              />
            </div>
          </div>
          <div className="h-6 pr-1 pt-1 text-right text-xs text-rose-600">
            {errors.loginId?.message}
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="password" className="w-14 text-sm font-medium">
              비밀번호
            </Label>

            <div className="relative flex grow">
              <Input
                id="password"
                type={eyeOnOff ? "text" : "password"}
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                })}
                placeholder="비밀번호"
                className="focus-visible:border-indigo-600 focus-visible:ring-indigo-600"
              />
              <PasswordEyeBtn
                onOff={eyeOnOff}
                onClick={() => setEyeOnOff((prev) => !prev)}
              />
            </div>
          </div>
          <div className="h-6 pr-1 pt-1 text-right text-xs text-rose-600">
            {errors.password?.message}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="action"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            로그인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
