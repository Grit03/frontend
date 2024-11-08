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
