import type { SalesRepForecastedLatestDataType } from "@/typings";
import { create } from "zustand";

export type srForecastedStoreType = {
  forcastedData: SalesRepForecastedLatestDataType[];
  updateItem: (itemCode: string, storeId: string, noOfItem: number) => void;
  setItems: (forcastedData: SalesRepForecastedLatestDataType[]) => void;
};

export const useSrForcastedStore = create<srForecastedStoreType>((set) => ({
  forcastedData: [],
  updateItem: (itemCode, storeId, noOfItem) =>
    set((state) => {
      const currentStore = state.forcastedData.find(
        (item) => item.storeId === storeId
      );
      if (!currentStore) return state;
      const index = state.forcastedData.indexOf(currentStore);
      const item = state.forcastedData[index].data.find(
        (prediction) => prediction.itemCode === Number(itemCode)
      );
      if (!item) return state;
      const itemIndex = state.forcastedData[index].data.indexOf(item);
      state.forcastedData[index].data[itemIndex].smForeCast = noOfItem;
      return { forcastedData: state.forcastedData };
    }),
  setItems: (forcastedData) => set({ forcastedData }),
}));
