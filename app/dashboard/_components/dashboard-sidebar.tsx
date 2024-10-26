"use client";
import useUserStore from "@/store/user-store";
import { ProfileActions } from "./profile-actions";
import Image from "next/image";
import { navigation } from "@/constants/menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/services/auth/user";
import { toast } from "sonner";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function DashboardSidebar({
  accessToken,
}: {
  accessToken: string;
}) {
  const { user, setUser } = useUserStore();
  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUserInfo(accessToken);
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
    if (isError) {
      router.push("/");
    }
  }, [data, isSuccess, isError]);

  if (isError) {
    toast.error("다시 로그인해주세요");
  }

  return (
    <nav className="flex h-full w-64 min-w-64 flex-col space-y-1.5 border border-zinc-200/40 px-2 py-6 shadow">
      <ProfileActions>
        <div className="group mb-5 flex cursor-pointer gap-4 rounded-xl px-3 py-2 transition hover:bg-indigo-50">
          <div className="relative h-14 w-14 overflow-hidden rounded-full">
            {isLoading ? (
              <Skeleton className="h-full w-full rounded-full bg-gray-200" />
            ) : (
              <Image
                priority
                alt="프로필 placeholder"
                src="/images/dashboard/profile-placeholder.png"
                width={56}
                height={56}
                className="h-full w-full object-cover opacity-80 transition group-hover:opacity-70"
              />
            )}
          </div>

          <div className="flex grow flex-col justify-center space-y-1 leading-5">
            <div className="mt-1 font-semibold transition group-hover:text-indigo-600">
              {isLoading ? (
                <Skeleton className="h-5 w-full rounded bg-gray-200" />
              ) : (
                <>{user?.userName}</>
              )}
            </div>
            <div className="text-sm text-zinc-400 transition group-hover:text-indigo-400">
              {isLoading ? (
                <Skeleton className="h-5 w-2/3 rounded bg-gray-200" />
              ) : (
                <>@{user?.loginId}</>
              )}
            </div>
          </div>
        </div>
      </ProfileActions>

      {navigation.map((button) => (
        <Link key={button.text} href={button.href} className="">
          <Button
            size="xl"
            variant="design"
            className="group w-full justify-start text-base"
          >
            <div className="mr-3 text-2xl text-zinc-600 group-hover:text-indigo-500">
              {button.icon}
            </div>
            {button.text}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
