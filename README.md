# 이미지 생성 AI 기반 맞춤형 의류 디자인 툴, Tindy

## 🖥️ 프로젝트 소개
<img width="500" alt="image (3)" src="https://github.com/user-attachments/assets/a8ecbf59-a27f-49ed-8da4-8f877e040016" />


<br />프롬프트 작성방식을 개선하여, 이미지 생성 AI를 기반으로 <br />
누구나 사용하기 쉬운 티셔츠 디자인 툴, Tindy를 개발하였습니다.


### 🕰️ 프로젝트 기획 및 개발 기간 / 개발 스택
2024.01 - 2024.12 (1년) <br/><br/>
<img
  src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white"
/>
<img
  src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"
/>
<img src="https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white" />

### 📌 주요 기능 및 서비스 아키텍처

<div style="display: flex;">
  <img width="400" alt="image" src="https://github.com/user-attachments/assets/7a14bf12-42ed-4b3d-9a08-8cdd018ed335" />
  <img width="400" alt="image" src="https://github.com/user-attachments/assets/7881eeb8-493e-4e5c-a7d5-a91fa6bccc43" />
</div>

## 파일 구조
해당 프로젝트는 next.js로 개발되었습니다.
```bash
.
├── app
│   ├── api
│   ├── dashboard // 사용자 대시보드 화면
│   ├── design // 티셔츠 디자인 조작을 위한 캔버스 화면
│   └── fonts
├── components
│   ├── common // 프로젝트 전반에 걸쳐 사용되는 컴포넌트
│   └── ui // input, button 등 재사용을 위해 일반화한 컴포넌트
├── constants // 상수
├── hooks // 커스텀 훅
├── lib // 커서, selectNet, resize 후 경계 값 등 계산을 위한 함수 유틸리티
├── public
│   ├── images
│   ├── logos
│   └── placeholder
├── services // API 요청 핸들러
│   ├── auth // 로그인, 회원가입 관련
│   └── canvas // 캔버스 관련
├── store // 전역 상태 (Zustand)
└── types // 타입
```

## 주요 코드 설명
### 전역 상태 관리
전역 상태는 Zustand를 사용하여 관리하였습니다. 로그인한 회원 정보, 티셔츠 디자인 중 글자 디자인 생성 시 최근 사용한 폰트, AI 이미지 생성중 인지를 나타내는 상태 값을 저장하기 위해 사용되었습니다.
아래는 AI 이미지 생성중인지 체크하기 위해 생성된 상태입니다.

```tsx
import { create } from "zustand";

interface State {
  isGenerating: boolean;
  layerId: string | null;
  src: string | null;
}

interface Action {
  setIsGenerating: (isGenerating: boolean) => void;
  setLayerId: (layerId: string) => void;
  clearLayerId: () => void;
  setImgSrc: (src: string | null) => void;
}

const useIsGeneratingStore = create<State & Action>((set) => ({
  isGenerating: false,
  layerId: null,
  src: null,
  setIsGenerating: (isGenerating: boolean) => set({ isGenerating }),
  setLayerId: (layerId: string) => set({ layerId }),
  clearLayerId: () => set({ layerId: null }),
  setImgSrc: (src: string | null) => set({ src }),
}));

export default useIsGeneratingStore;
```
해당 상태를 전역으로 만든 이유는, 이미지가 생성중일 때, 캔버스의 다른 인터렉션 (요소 추가, 다른 버튼 클릭 등)을 하지 못하도록 막아,
중복된 서버 요청이나, 캔버스 모드(선택, 삽입, 리사이징 등)가 의도치 않게 바뀌는 걸 방지하기 위함입니다.

## 캔버스 구현
<img width="600" alt="image" src="https://github.com/user-attachments/assets/5fda6ac8-3589-42d8-bc8c-5abb4fd59a84" />

비교적 짧은 시간 안에 구현을 완료해야 해서, 캔버스 내용 실시간 저장, 요소 변경에 대한 history 추적, 요소 정의 등에 대한 구현을
liveblocks 라는 라이브러리를 활용해 구현하였습니다. [liveblocks 링크](https://liveblocks.io/)

캔버스 모드에 대한 타입은 아래와 같이 정의하여, 사용자가 툴 버튼을 클릭 시 캔버스 상태를 변경하고 상태에 따른 ui와 기능을 동작하게 하였습니다.

```ts
export type CanvasState =
  | {
      mode: CanvasMode.None; // 선택 안됨
    }
  | {
      mode: CanvasMode.SelectionNet; // 일정 정도 드래그 하여 selectionNet 상태
      origin: Point;
      current?: Point;
    }
  | {
      mode: CanvasMode.Translating; // 레이어 이동
      current: Point;
    }
  | {
      mode: CanvasMode.Inserting; // 삽입
      layerType: LayerType.AiImage | LayerType.Image | LayerType.Text; // 삽입되는 이미지가 AI 생성 이미지인지, 일반 이미지인지, text 요소인지 정의
    }
  | {
      mode: CanvasMode.Pressing; // 커서 누름
      origin: Point;
    }
  | {
      mode: CanvasMode.Resizing; // 크기 조절 중
      initialBounds: XYWH;
      corner: Side;
    }
  | {
      mode: CanvasMode.Generating; // AI 생성
    };
```
### 커스텀 훅 제작
`liveblocks`를 사용하여, 다중 선택된 layer를 지우는 `hook`, 선택된 layer 경계를 반환하는 `hook`, 브라우저 창이 리사이징 될때마다,
창의 `width`, `height`를 반환하는 `hook`을 만들어 기능 구현에 활용하였습니다.

```bash
hooks
├── use-delete-layers.ts
├── use-selection-bounds.ts
└── use-window-size.ts
```

### UI 구현
`shadcn` 라이브러리를 활용하여 필요한 ui를 구현하였습니다.
api 요청하고 결과가 반환이 안된 경우, loading state를 관리하여 버튼 및 화면에 ui로 표시하고, 의도치 않은 api 요청을 방지하였습니다.

### 데이터 캐싱
사용자의 캔버스 정보와 사용자 정보를 표시하는 대시보드에 필요한 데이터를 요청, 캐싱, 무효화하기 위해 `react-query`를 사용하였습니다.
아래는 이러한 로직 중 무효화가 반영된 코드입니다. 대시보드에서 캔버스의 하단 ...을 클릭하면 캔버스 이름 변경, 캔버스 삭제를 위한 action button이 나오는데,
캔버스 삭제 버튼 클릭 시, 캔버스 삭제 api 요청을 진행하고, 성공하였을 때, 캔버스 정보를 무효화하고 toast 메세지를 띄우는 기능을 구현한 것입니다.

```tsx
// app/dashboard/_components/design-action-menu.tsx 중 일부 코드
// 캔버스 삭제
const mutation = useMutation({
  mutationFn: (clothesName: string) =>
    deleteDesignCanvas(clothesName, cookies.accessToken),
  onSuccess: async (data) => {
    await queryClient.invalidateQueries({
      queryKey: ["AlldesignCanvas"],
    });
    toast.success("캔버스가 성공적으로 삭제되었습니다");
  },
  onError: (error) => {
    toast.error("캔버스를 삭제하는 과정에서 문제가 발생했습니다");
  },
});
```


## 🌐 웹사이트 주소
[Tindy 🎨](https://tindy.vercel.app/) <br/>
백엔드 서버와 AI 서버가 중단되어, 현재 홈 화면만 접속이 가능합니다. 자세한 데모는 아래 영상을 참고해주세요.
모든 기능을 화면 녹화하였습니다.

### 프로젝트 상세 소개 및 시연 영상
### 전체 영상
https://github.com/user-attachments/assets/65369c27-1f72-4afd-9232-10ff1003cbbc

### 핵심 기능별 시연 영상
https://github.com/user-attachments/assets/d35797c7-f123-4152-bea7-5fa121f8de7e

## 프로젝트 구조




