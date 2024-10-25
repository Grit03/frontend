"use client";

import { Actions } from "@/components/common/actions";
import TextLogo from "@/components/common/text-logo";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface InfoProps {
  canvasName: string;
}

const TabSaperator = () => {
  return <div className="flex items-center px-1.5 text-slate-300">|</div>;
};

export const Info = ({ canvasName }: InfoProps) => {
  return (
    <div className="absolute left-2 top-2 flex h-14 rounded-md bg-white px-2 py-1.5 shadow-md">
      <Hint label="디자인 대시보드로 돌아가기" side="bottom" sideOffset={10}>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-secondary/80"
        >
          <Image
            src="/logos/main-logo.png"
            alt="메인 로고"
            width={58}
            height={0}
          />
          <TextLogo />
        </Link>
      </Hint>
      <TabSaperator />
      {/* design 이름 */}
      <div className="flex h-full items-center px-2 py-1.5">{canvasName}</div>
      <TabSaperator />
      <Actions canvasName={canvasName} title={""} side="bottom" sideOffset={10}>
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
