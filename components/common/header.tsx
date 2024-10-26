import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import TextLogo from "./text-logo";
import RegisterModal from "./register-modal";
import LoginModal from "./login-modal";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Header() {
  const token = cookies().get("accessToken")?.value;
  if (token) {
    redirect("/dashboard");
  }

  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-white">
      <nav
        aria-label="Global"
        className="flex items-center justify-between px-7 py-2"
      >
        <Link href="/" className="flex items-center justify-center space-x-2">
          <span className="sr-only">Tindy</span>
          <Image
            src="/logos/main-logo.png"
            alt="메인 로고"
            priority
            width={60}
            height={40}
            className="h-12 w-auto select-none"
          />
          <TextLogo />
        </Link>

        {!token && (
          <div className="flex gap-2.5">
            <LoginModal>
              <Button variant="action">로그인</Button>
            </LoginModal>

            <RegisterModal>
              <Button variant="designActive">회원가입</Button>
            </RegisterModal>
          </div>
        )}
        {/* {token ? (
          <div className="flex gap-2.5">
            <Link href="/dashboard">
              <Button variant="action">내 대시보드</Button>
            </Link>
            <LogoutBtn />
          </div>
        ) : (
          <div className="flex gap-2.5">
            <LoginModal>
              <Button variant="action">로그인</Button>
            </LoginModal>

            <RegisterModal>
              <Button variant="designActive">회원가입</Button>
            </RegisterModal>
          </div>
        )} */}
      </nav>
    </header>
  );
}
