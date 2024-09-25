import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import TextLogo from "./text-logo";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-white">
      <nav
        aria-label="Global"
        className="flex items-center justify-between px-8 py-2.5"
      >
        <Link href="/" className="flex items-center justify-center space-x-2">
          <span className="sr-only">PERSONALIT</span>
          <Image
            src="/logos/main-logo.png"
            alt="메인 로고"
            priority
            width={60}
            height={40}
            className="h-14 w-auto select-none"
          />
          <TextLogo />
        </Link>

        <Button variant="action">로그인</Button>
      </nav>
    </header>
  );
}
