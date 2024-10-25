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
import { ReactNode, useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { DialogDescription } from "@radix-ui/react-dialog";
import { postIdCheck, postRegister } from "@/services/auth/user";
import { cn } from "@/lib/utils";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";

import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface RegisterFormData {
  loginId: string;
  idCheck: boolean;
  password: string;
  passwordCheck: string;
  userName: string;
}

interface RegisterModalProps {
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
export default function RegisterModal({ children }: RegisterModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      idCheck: false,
    },
  });

  const [isAvailaleId, setIsAvailableId] = useState<boolean | null>(null);
  const [eyeOnOff, setEyeOnOff] = useState<boolean>(false);
  const [checkEyeOnOff, setCheckEyeOnOff] = useState<boolean>(false);

  const loginIdRegex = /^[a-zA-Z0-9!@#$%^&*()?_~]{5,20}$/;
  const passwordRegex = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const usernameRegex = /^[a-zA-Z0-9가-힣]{,30}$/;

  const loginIdValue = watch("loginId");
  const passwordValue = watch("password");

  const onSubmit = async (formData: RegisterFormData) => {
    const { idCheck, loginId, password, passwordCheck, userName } = formData;
    if (idCheck) {
      const formData = { loginId, password, passwordCheck, userName };
      setLoading(true);
      const response = await postRegister(formData);
      if (response.success) {
        setLoading(false);
        toast.success(response.message);
        setOpen(false);
      } else {
        setLoading(false);
        toast.error(response.message);
      }
    } else {
      setError("loginId", {
        type: "notChecked",
        message: "아이디 중복 체크가 되지 않았습니다.",
      });
    }
  };

  useEffect(() => {
    if (isAvailaleId !== null) {
      setIsAvailableId(null);
      setValue("idCheck", false);
    }
  }, [loginIdValue]);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setIsAvailableId(null);
        reset();
        setOpen((prev) => !prev);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-2">
          <DialogTitle>회원가입</DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            AI로 내 스타일을 더 티나게! Tindy 회원가입을 진행합니다
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="loginId" className="text-sm font-medium">
              아이디
            </Label>
            <div className="flex items-center justify-between gap-4">
              <div className="relative w-full">
                <Input
                  id="loginId"
                  {...register("loginId", {
                    required: "아이디를 입력해주세요.",
                    minLength: {
                      value: 5,
                      message: "5자 이상 입력하세요.",
                    },
                    maxLength: {
                      value: 20,
                      message: "20자 이하로 입력하세요.",
                    },
                    pattern: loginIdRegex,
                  })}
                  placeholder="아이디를 입력해주세요 (5~20자)"
                  className={cn(
                    "focus-visible:border-indigo-600 focus-visible:ring-indigo-600",
                    isAvailaleId !== null &&
                      isAvailaleId &&
                      "border-[1.5px] border-green-800/40 bg-green-50",
                    isAvailaleId !== null &&
                      !isAvailaleId &&
                      "border-[1.5px] border-rose-800/40 !bg-rose-50",
                  )}
                />
                {isAvailaleId !== null && isAvailaleId && (
                  <FaCheckCircle className="absolute inset-y-0 right-3 h-full text-green-600" />
                )}
                {isAvailaleId !== null && !isAvailaleId && (
                  <MdOutlineError className="absolute inset-y-0 right-3 h-full text-rose-600" />
                )}
              </div>

              <Button
                variant="check"
                size="sm"
                onClick={async (e) => {
                  e.preventDefault();
                  const response = await postIdCheck({ loginId: loginIdValue });
                  if (response.value) {
                    setValue("idCheck", true);
                  } else {
                    setError("loginId", {
                      type: "notAvailable",
                      message: response.message,
                    });
                    setValue("idCheck", false);
                  }
                  console.log(response);
                  setIsAvailableId(response.value);
                }}
              >
                중복 확인
              </Button>
            </div>
            <div className="h-3 text-xs text-rose-600">
              {errors.loginId?.message}
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="password" className="text-sm font-medium">
              비밀번호
            </Label>

            <div className="relative flex">
              <Input
                id="password"
                type={eyeOnOff ? "text" : "password"}
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 8,
                    message: "8자 이상 입력하세요.",
                  },
                  pattern: {
                    value: passwordRegex,
                    message: "영문, 숫자, 특수문자를 각각 1개씩 포함해주세요.",
                  },
                })}
                placeholder="비밀번호 (영문, 숫자, 특수문자 8자 이상)"
                className="focus-visible:border-indigo-600 focus-visible:ring-indigo-600"
              />
              <PasswordEyeBtn
                onOff={eyeOnOff}
                onClick={() => setEyeOnOff((prev) => !prev)}
              />
            </div>
            <div className="h-3 pb-2 text-xs text-rose-600">
              {errors.password?.message}
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="password-check" className="text-sm font-medium">
              비밀번호 확인
            </Label>
            <div className="relative flex">
              <Input
                id="password-check"
                type={checkEyeOnOff ? "text" : "password"}
                placeholder="비밀번호를 한 번 더 입력해주세요"
                {...register("passwordCheck", {
                  required: "비밀번호를 재입력 해주세요.",
                  validate: (value) =>
                    value === passwordValue || "비밀번호가 일치하지 않습니다.",
                })}
                className="focus-visible:border-indigo-600 focus-visible:ring-indigo-600"
              />
              <PasswordEyeBtn
                onOff={checkEyeOnOff}
                onClick={() => setCheckEyeOnOff((prev) => !prev)}
              />
            </div>
            <div className="h-3 text-xs text-rose-600">
              {errors.passwordCheck?.message}
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="userName" className="text-sm font-medium">
              이름
            </Label>
            <Input
              id="userName"
              placeholder="이름을 입력해주세요"
              {...register("userName", {
                required: "사용자 이름을 입력해주세요.",
                maxLength: {
                  value: 30,
                  message: "30자 이하로 입력하세요.",
                },
                // pattern: {
                //   value: usernameRegex,
                //   message: "올바르지 않은 사용자 이름입니다.",
                // },
              })}
              className="focus-visible:border-indigo-600 focus-visible:ring-indigo-600"
            />
          </div>
          <div className="h-3 text-xs text-rose-600">
            {errors.userName?.message}
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
            회원 가입
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
