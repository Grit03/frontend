import { create } from "zustand";

export enum ImgProcessMode {
  None,
  Deleting,
  RemovingBg,
}

interface State {
  selections: string[] | null;
  mode:
    | ImgProcessMode.None
    | ImgProcessMode.Deleting
    | ImgProcessMode.RemovingBg;
}
interface Action {
  setSelectedLayer: (selections: string[]) => void;
  setSelected: (selections: string[], mode: ImgProcessMode) => void;
  setProcessMode: (mode: ImgProcessMode) => void;
  clearSelectedLayer: () => void;
}

const useSelectedLayerStore = create<State & Action>((set) => ({
  selections: null,
  mode: ImgProcessMode.None,
  setSelectedLayer: (selections: string[]) => set({ selections }),
  setSelected: (selections: string[], mode: ImgProcessMode) =>
    set({ selections, mode }),
  setProcessMode: (mode: ImgProcessMode) => set({ mode }),
  clearSelectedLayer: () =>
    set({ selections: null, mode: ImgProcessMode.None }),
}));

export default useSelectedLayerStore;
