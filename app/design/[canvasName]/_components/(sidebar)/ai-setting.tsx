"use client";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, WandSparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { GiCardRandom } from "react-icons/gi";
import {
  GeneratingImageForm,
  postGeneratingImage,
} from "@/services/canvas/tool";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import {
  AiImageLayer,
  CanvasMode,
  CanvasState,
  Layer,
  LayerType,
  Point,
} from "@/types/canvas";
import useIsGeneratingStore from "@/store/generating-store";
import { nanoid } from "nanoid";
import { useMutation } from "@liveblocks/react";
import { LiveObject } from "@liveblocks/client";
import { toast } from "sonner";

export interface PromptInputs {
  designStyle:
    | "none"
    | "line-art"
    | "vintage"
    | "graffiti"
    | "pop-art"
    | "geometric"
    | "hand-drawn"
    | "3D"
    | "collage"
    | "watercolor"
    | "sticker";
  prompt: string;
}

interface StyleSelectorProps {
  onChange: (value: any) => void;
  value: string;
}

// 스타일 리스트
const styleList = [
  {
    type: "none",
    name: "선택 없음",
    value: "none",
    description: "프롬프트만으로 디자인을 생성합니다",
  },
  {
    type: "line-art",
    name: "라인 아트",
    value: "line-art",
    description:
      "손으로 그은 듯한 선으로 이미지를 표현하며, 심플한 디자인을 생성합니다",
  },
  {
    type: "vintage",
    name: "빈티지",
    value: "vintage",
    description:
      "과거의 포스터 스타일을 재해석하여 클래식한 디자인을 생성합니다",
  },
  {
    type: "graffiti",
    name: "그래피티",
    value: "graffiti",
    description: "대담한 색상과 패턴으로 자유롭고 스트리트 감성을 표현합니다",
  },
  {
    type: "pop-art",
    name: "팝 아트",
    value: "pop-art",
    description:
      "대중문화 아이콘과 강렬한 색채를 사용해 시각적으로 강렬한 디자인을 만듭니다",
  },
  {
    type: "geometric",
    name: "기하학",
    value: "geometric",
    description: "기하학적 도형을 반복적으로 사용해 세련된 디자인을 만듭니다",
  },
  {
    type: "hand-drawn",
    name: "손그림",
    value: "hand-drawn",
    description: "손으로 그린 듯한 그림을 연상하는 디자인을 생성합니다",
  },
  {
    type: "3D",
    name: "3D",
    value: "3D",
    description:
      "입체감있고 게임 요소, 3D 아이콘 같은 디자인 요소를 생성합니다",
  },
  {
    type: "collage",
    name: "콜라주",
    value: "collage",
    description:
      "신문지, 빈티지한 물건 등 다양한 오브젝트를 조합해 창의적이고 독창적인 패턴을 만듭니다",
  },
  {
    type: "watercolor",
    name: "수채화",
    value: "watercolor",
    description:
      "부드럽고 따뜻한 색상을 사용하고, 물감 느낌을 강조하며 수채화 디자인을 생성합니다",
  },
  {
    type: "sticker",
    name: "스티커",
    value: "sticker",
    description:
      "귀엽고 생동감 있는 그래픽 요소로 스티커 같은 디자인을 만듭니다",
  },
];

interface AiSettingProps {
  setCanvasState: Dispatch<SetStateAction<CanvasState>>;
}

export default function AiSetting({ setCanvasState }: AiSettingProps) {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const { isGenerating, setIsGenerating, setLayerId, clearLayerId, setImgSrc } =
    useIsGeneratingStore();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PromptInputs>({
    defaultValues: {
      designStyle: "none",
    },
  });

  const pathname = usePathname();

  const onSubmit = async ({ designStyle, prompt }: PromptInputs) => {
    const formData: GeneratingImageForm = {
      clothesName: pathname.split("/")[2],
      imageId: nanoid(),
      designStyle,
      prompt,
    };

    try {
      setIsGenerating(true);
      const { imageUrl, imageId } = await postGeneratingImage(
        formData,
        cookies.accessToken,
      );
      setLayerId(imageId);
      setImgSrc(imageUrl);
      setCanvasState({
        mode: CanvasMode.Inserting,
        layerType: LayerType.AiImage,
      });
    } catch (error) {
      toast.error("이미지 생성에 문제가 생겼습니다");
      clearLayerId();
      setImgSrc(null);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="py-4 text-xl font-semibold">AI 디자인 생성</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 스타일 선택 창 */}
        <div className="flex flex-col">
          <div className="mb-3.5 font-medium leading-none">
            디자인 스타일 선택
          </div>

          <Controller
            control={control}
            name="designStyle"
            render={({ field: { onChange, value } }) => (
              <StyleSelector onChange={onChange} value={value} />
            )}
          />
        </div>

        {/* 프롬프트 입력 창 */}
        <div className="grid w-full gap-1">
          <Label htmlFor="prompt" className="text-base">
            프롬프트
          </Label>

          <Textarea
            placeholder="만들고 싶은 티셔츠 디자인을 설명해보세요."
            id="prompt"
            rows={5}
            className="mb-2 resize-none focus-visible:border-indigo-600 focus-visible:ring-indigo-600"
            {...register("prompt", { required: true })}
            disabled={isGenerating}
          />
          <Button type="submit" variant="action" disabled={isGenerating}>
            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span className="mr-2">생성하기</span>
            <WandSparkles className="w-4" />
          </Button>
          <Button
            variant="designActive"
            className="mt-2"
            disabled={isGenerating}
          >
            <span className="mr-2">프롬프트 추천</span>
            <WandSparkles className="w-4" />
          </Button>
        </div>
      </form>
    </>
  );
}

function StyleSelector({ onChange, value }: StyleSelectorProps) {
  return (
    <>
      <ul className="mb-3.5 grid grid-cols-4 gap-3.5">
        {styleList.map((style) => (
          <li
            key={style.type}
            className="group flex flex-col items-center justify-center"
          >
            <div
              className={cn(
                "relative mb-1.5 aspect-square w-full cursor-pointer overflow-hidden rounded-full transition group-hover:ring-2 group-hover:ring-indigo-400 group-hover:brightness-95",
                value === style.value && "ring-2 ring-indigo-500",
              )}
              onClick={() => {
                onChange(style.value);
              }}
            >
              {style.type === "none" ? (
                <div className="flex h-full w-full items-center justify-center">
                  <GiCardRandom className="text-center text-4xl text-indigo-500 transition group-hover:text-indigo-400" />
                </div>
              ) : (
                <Image
                  src={`/images/designStyle/${style.type}.webp`}
                  alt={style.name}
                  width={100}
                  height={100}
                  className="w-full object-cover"
                />
              )}
            </div>

            <div
              className={cn(
                "text-balance break-keep text-center text-xs font-medium text-zinc-800 group-hover:text-indigo-600",
                value === style.value && "text-indigo-600",
              )}
            >
              {style.name}
            </div>
          </li>
        ))}
      </ul>
      <div className="mb-3.5 flex h-[80px] flex-col space-y-0.5 rounded-lg bg-zinc-50 px-6 py-3">
        <div className="text-[0.8rem] font-medium">스타일 설명 💬</div>
        <div className="flex grow items-center text-xs text-zinc-400">
          {styleList.map((style) => style.value === value && style.description)}
        </div>
      </div>
    </>
  );
}
