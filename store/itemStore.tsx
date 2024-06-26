import type { ItemsWithPreset } from "@/typings";
import { create } from "zustand";

export type itemStoreStateType = {
  items: ItemsWithPreset[];
  updateItem: (
    itemCode: number,
    noOfItem: number,
    field: "inventory" | "packets_required"
  ) => void;
  setItems: (items: ItemsWithPreset[]) => void;
};

export const useItemStore = create<itemStoreStateType>((set) => ({
  items: [],
  updateItem: (itemCode, noOfItem, field) =>
    set((state) => {
      const currentItem = state.items.find(
        (item) => item.itemCode === itemCode
      );
      if (!currentItem) return state;
      const index = state.items.indexOf(currentItem);
      state.items[index][field] = noOfItem;
      return { ...state, items: [...state.items] };
    }),
  setItems: (items) => set({ items }),
}));
