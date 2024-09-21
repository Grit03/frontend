"use client";

import { Actions } from "@/components/common/actions";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface InfoProps {
  designId: string;
}
const TabSaperator = () => {
  return <div className="flex items-center px-1.5 text-slate-300">|</div>;
};

export const Info = ({ designId }: InfoProps) => {
  return (
    <div className="absolute left-2 top-2 flex h-14 rounded-md bg-white px-2 py-1.5 shadow-md">
      <Hint label="대시보드로 돌아가기" side="bottom" sideOffset={10}>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-secondary/80"
        >
          <Image
            src="/logos/main_logo.png"
            alt="메인 로고"
            width={45}
            height={0}
          />
          <span className="font-extrabold tracking-wide text-zinc-800">
            PERSONALI-
            <span className="text-violet-800">T</span>
          </span>
        </Link>
      </Hint>
      <TabSaperator />
      {/* design 이름 */}
      <div className="flex h-full items-center px-2 py-1.5">{designId}</div>
      <TabSaperator />
      <Actions id={designId} title={""} side="bottom" sideOffset={10}>
        <div>
          <Hint label="메인 메뉴" side="bottom" sideOffset={10}>
            <Button
              size="icon"
              variant="design"
              className="h-full w-full px-2 py-1.5"
            >
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};
