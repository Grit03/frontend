"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useCookies } from "react-cookie";

export default function LogoutBtn() {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const router = useRouter();
  return (
    <Button
      variant="designActive"
      onClick={() => {
        removeCookie("accessToken");
      }}
    >
      로그아웃
    </Button>
  );
}
