import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HiMiniSparkles } from "react-icons/hi2";
import TextLogo from "@/components/common/text-logo";
import { LuTextCursorInput } from "react-icons/lu";
import { Gugi, Shantell_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const GugiFont = Gugi({
  preload: false,
  weight: "400",
});

const ShantellSans = Shantell_Sans({
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="pt-[64px]">
      <Header />
      {/* 타이틀 섹션 */}
      <section className="flex h-svh w-full select-none flex-col items-center justify-center text-balance break-keep bg-slate-950 px-4 text-white">
        <TextLogo
          color="white"
          size="lg"
          className="my-4"
          style={{ textShadow: "#6366f1 -2px 2px 20px" }}
        />
        <h2 className="mb-4 text-6xl font-bold text-indigo-50">
          <strong className="text-indigo-500">
            AI <HiMiniSparkles className="inline-block" />{" "}
          </strong>
          로 내 스타일을 <strong className="text-indigo-500">티 - </strong>
          나게!
        </h2>

        <p className="mb-8 text-center text-xl">
          AI로 쉽게 나만의 개성을 가득 담은, <br />단 하나의 티셔츠를
          만들어보세요
        </p>
        <Link href="/dashboard">
          <Button variant="action" size="xl" className="mb-10 text-lg">
            티셔츠 디자인 시작하기
          </Button>
        </Link>

        <div className="relative w-1/3 animate-floating">
          <Image
            src="/images/main-image-crop.png"
            alt="메인 설명 이미지"
            width={0}
            height={0}
            sizes="100vw"
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* 기능 설명 */}
      <section className="flex flex-col gap-3 text-balance break-keep px-4">
        <h3 className="mt-16 text-center text-4xl font-bold">
          누구나 쉽게 할 수 있는 디자인
        </h3>
        <div className="text-center text-lg">
          <div className="mb-3 space-x-2">
            <span className="rounded-sm bg-indigo-600 px-2 py-1 text-white">
              가중치?
            </span>
            <span className="rounded-sm bg-indigo-600 px-2 py-1 text-white">
              체크포인트?
            </span>
            <span className="rounded-sm bg-indigo-600 px-2 py-1 text-white">
              로라?
            </span>
            <span className="rounded-sm bg-indigo-600 px-2 py-1 text-white">
              임베딩?
            </span>
          </div>
          <p className="text-zinc-600">
            어려운 용어 없이도 AI를 활용하여 누구나 쉽게 디자인할 수 있습니다.
          </p>
        </div>
        <div className="grid min-h-svh grow grid-cols-3 grid-rows-3 gap-8 py-10 lg:mx-auto">
          <div className="relative col-span-2 row-span-2 flex flex-col overflow-hidden rounded-2xl p-16 shadow-[0_12px_40px] shadow-indigo-300">
            <div className="mb-3 text-3xl font-semibold">
              {" "}
              티셔츠 제작에 적합한 <br />
              다양한 스타일 제공
            </div>
            <p className="leading-tight text-zinc-400">
              프롬프트를 잘 쓰지 않아도 괜찮아요. <br /> 티셔츠 디자인에 적합한
              다양한 스타일이 <br /> 준비되어 있습니다.
            </p>
            <Image
              alt="다양한 스타일"
              src="/images/artist-palette.svg"
              width={100}
              height={100}
              className="absolute bottom-4 right-10 w-40 object-cover"
            />
          </div>
          <div className="verflow-hidden relative flex flex-col rounded-2xl p-8 shadow-[0_8px_40px] shadow-zinc-300">
            <div className="text-xl font-semibold">
              쉽고 간단한 <br /> 배경 제거
            </div>
            <p className="mb-1 text-sm leading-tight text-zinc-400">
              버튼 한번으로 고성능 배경 제거
            </p>
            <Image
              alt="다양한 스타일"
              src="/images/remove-background.svg"
              width={75}
              height={75}
              className="absolute bottom-7 right-7 w-[75px] object-cover"
            />
          </div>
          <div className="relative flex flex-col overflow-hidden rounded-2xl p-8 shadow-[0_8px_40px] shadow-zinc-300">
            <div className="mb-1 text-xl font-semibold">
              편리한 <br />
              캔버스 툴
            </div>
            <p className="mb-1 text-sm leading-tight text-zinc-400">
              사용하기에 익숙한 이미지 <br />
              편집 툴을 제공
            </p>

            <Image
              alt="다양한 스타일"
              src="/images/canvas-tool.svg"
              width={80}
              height={80}
              className="absolute bottom-5 right-5 w-20 object-cover"
            />
          </div>
          <div className="relative flex flex-col overflow-hidden rounded-2xl p-8 shadow-[0_8px_40px] shadow-zinc-300">
            <div className="mb-3 text-xl font-semibold">
              한국어 <br />
              프롬프트 지원
            </div>
            <div
              className={cn(
                "absolute bottom-16 right-2.5 mb-1.5 text-6xl text-indigo-500",
                GugiFont.className,
              )}
            >
              가
            </div>
            <div
              className={cn(
                "absolute bottom-3 right-14 pr-2 text-6xl text-zinc-500",
                GugiFont.className,
              )}
            >
              나
            </div>
            <div
              className={cn(
                "absolute -bottom-2.5 -right-0.5 text-6xl text-zinc-400",
                GugiFont.className,
              )}
            >
              다
            </div>
          </div>
          <div className="relative flex flex-col overflow-hidden rounded-2xl p-8 shadow-[0_8px_40px] shadow-zinc-300">
            <div className="mb-0.5 text-xl font-semibold">다양한 폰트 지원</div>
            <p className="mb-1 text-sm leading-tight text-zinc-400">
              티셔츠 디자인에 적합한 다양한 폰트
            </p>
            <Image
              alt="다양한 스타일"
              src="/images/various-font.png"
              width={100}
              height={100}
              className="absolute bottom-3 right-4 w-[73px] object-cover"
            />
          </div>
          <div className="relative flex flex-col overflow-hidden rounded-2xl p-8 shadow-[0_2px_50px] shadow-fuchsia-200">
            <div className="mb-1 text-xl font-semibold">프롬프트 추천</div>
            <p className="mb-1 text-sm leading-tight text-zinc-400">
              어려운 프롬프트 작성은 그만!
            </p>
            <LuTextCursorInput className="absolute bottom-5 right-8 text-6xl text-slate-500" />
          </div>
        </div>
      </section>

      {/* 하단 CTA 섹샨*/}
      <section className="m-10 flex h-[430px] flex-col items-center justify-center text-balance break-keep rounded-3xl border px-4 shadow-[0_8px_40px] shadow-zinc-300">
        <span
          className={cn(
            ShantellSans.className,
            "mb-1 text-lg font-semibold text-indigo-700",
          )}
        >
          Tindy : T for Individual
        </span>
        <h2
          className="mb-2.5 text-center text-[2.6rem] font-bold leading-tight text-indigo-600"
          style={{ textShadow: "#a5b4fc -1px 1px 20px" }}
        >
          AI로 세상에 단 하나뿐인 <br />
          나만의 티셔츠를 만들어보세요
        </h2>
        <p className="mb-6 text-center text-lg leading-6 text-zinc-600">
          복잡한 디자인 툴은 필요 없습니다 <br /> AI를 활용해 내가 원하는 모든
          디자인을 손쉽게 실현해보세요
        </p>
        <Link href="/dashboard">
          <Button variant="action" size="xl" className="text-lg">
            나만의 티셔츠 제작하기
          </Button>
        </Link>
      </section>
      <Footer />
    </div>
  );
}
