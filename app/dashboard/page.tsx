import { Actions } from "@/components/common/actions";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import Link from "next/link";
import { HiOutlineDotsHorizontal, HiOutlinePlus } from "react-icons/hi";

export default function DashBoardPage() {
  return (
    <div className="grid grid-cols-3 gap-7 px-4 py-7 lg:grid-cols-4 2xl:grid-cols-5">
      <Link
        href={`/design/${nanoid()}`}
        className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-3xl bg-indigo-600 text-white transition hover:bg-indigo-600/90"
      >
        <HiOutlinePlus className="mb-4 text-5xl" />
        <div className="text-lg font-semibold">디자인 생성하기</div>
      </Link>
      <div className="aspect-square rounded-3xl bg-zinc-100">
        <Actions
          id="SDF"
          title="제목을 입력해주세요"
          side="bottom"
          sideOffset={10}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-6 top-6 rounded-full p-5 opacity-0 shadow-[0_1px_15px] shadow-zinc-200 transition group-hover:opacity-100"
          >
            <span className="focus:opacity-100">
              <HiOutlineDotsHorizontal className="text-lg" />
            </span>
          </Button>
        </Actions>
      </div>
      <div className="aspect-square rounded-3xl bg-zinc-100" />
    </div>
  );
}
