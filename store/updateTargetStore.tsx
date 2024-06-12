import { create } from "zustand";

type TargetUpdateFormType = { itemCode: number; preset: number };

type TargetStoreType = {
  data: TargetUpdateFormType[];
  updateTarget: (itemCode: number, preset: number) => void;
  setTarget: (data: TargetUpdateFormType[]) => void;
};

export const useTargetStore = create<TargetStoreType>((set) => ({
  data: [],
  updateTarget: (itemCode, preset) =>
    set((state) => {
      const currentItem = state.data.find((item) => item.itemCode === itemCode);
      if (!currentItem) return state;
      const index = state.data.indexOf(currentItem);
      state.data[index].preset = preset;
      return { ...state, data: [...state.data] };
    }),
  setTarget: (data) => set({ data }),
}));
