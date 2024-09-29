import { Actions } from "@/components/common/actions";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import Link from "next/link";
import { HiOutlineDotsHorizontal, HiOutlinePlus } from "react-icons/hi";

export default function DashBoardPage() {
  // TODO : 디자인 최소 크기 정하기
  return (
    <>
      <h1 className="text-4xl font-bold">내 디자인</h1>
      <div className="grid grow grid-cols-4 gap-3 overflow-y-auto px-4 py-7 scrollbar-hide xl:grid-cols-5">
        <Link
          href={`/design/${nanoid()}`}
          className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-3xl bg-indigo-600 text-white transition hover:bg-indigo-600/90"
        >
          <HiOutlinePlus className="mb-4 text-5xl" />
          <div className="text-lg font-semibold">디자인 생성하기</div>
        </Link>
        {/* <div className="aspect-square rounded-3xl bg-zinc-100">
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
        </div> */}
        <div className="aspect-square rounded-3xl bg-zinc-100" />
        <div className="aspect-square rounded-3xl bg-zinc-100" />
      </div>
    </>
  );
}
