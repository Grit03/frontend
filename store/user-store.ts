import { UserInfo } from "@/types/user";
import { create } from "zustand";

interface State {
  user: UserInfo | null;
}
interface Action {
  setUser: (userInfo: UserInfo) => void;
  clearUser: () => void;
}

const useUserStore = create<State & Action>((set) => ({
  user: null,
  setUser: (userInfo) => set({ user: userInfo }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
