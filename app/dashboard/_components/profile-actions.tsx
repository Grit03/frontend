"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IoMdLogOut } from "react-icons/io";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
}

export const ProfileActions = ({
  children,
  side,
  sideOffset,
}: ActionsProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  const router = useRouter();

  const logout = () => {
    removeCookie("accessToken");
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-56"
      >
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer px-3 py-2 font-medium"
        >
          <IoMdLogOut className="mr-3 text-xl" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
