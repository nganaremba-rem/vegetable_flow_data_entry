import type { itemType } from "@/typings";
import { create } from "zustand";

export type itemStoreStateType = {
  items: itemType[];
  updateItem: (
    id: number,
    noOfItem: number,
    field: "inventory" | "packets_required"
  ) => void;
  setItems: (items: itemType[]) => void;
};

export const useItemStore = create<itemStoreStateType>((set) => ({
  items: [],
  updateItem: (id, noOfItem, field) =>
    set((state) => {
      const currentItem = state.items.find((item) => item.id === id);
      if (!currentItem) return state;
      const index = state.items.indexOf(currentItem);
      state.items[index][field] = noOfItem;
      return { ...state, items: [...state.items] };
    }),
  setItems: (items) => set({ items }),
}));
