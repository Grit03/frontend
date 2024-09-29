import { create } from "zustand";

type State = {
  fontStyle: string;
  usedFill: string;
};

type Action = {
  updateFont: (font: State["fontStyle"]) => void;
  updateUsedFill: (color: State["usedFill"]) => void;
};

// Create your store, which includes both state and (optionally) actions
const useRecentTextSetting = create<State & Action>((set) => ({
  fontStyle: "poppinsFont",
  usedFill: "#1A1A1A",
  updateFont: (newFont) => set(() => ({ fontStyle: newFont })),
  updateUsedFill: (newColor) => set(() => ({ usedFill: newColor })),
}));

export default useRecentTextSetting;
