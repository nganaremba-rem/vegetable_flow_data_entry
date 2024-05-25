import type { SalesRepForcastedDataType } from "@/typings";
import { create } from "zustand";

export type srForecastedStoreType = {
  forcastedData: SalesRepForcastedDataType[];
  updateItem: (itemId: string, storeId: string, noOfItem: number) => void;
  setItems: (forcastedData: SalesRepForcastedDataType[]) => void;
};

export const useSrForcastedStore = create<srForecastedStoreType>((set) => ({
  forcastedData: [],
  updateItem: (itemId, storeId, noOfItem) =>
    set((state) => {
      const currentItem = state.forcastedData.find(
        (item) => item.itemCode === itemId
      );
      if (!currentItem) return state;
      const index = state.forcastedData.indexOf(currentItem);
      const store = state.forcastedData[index].srPredictDataList.find(
        (prediction) => prediction.storeId === storeId
      );
      if (!store) return state;
      const storeIndex =
        state.forcastedData[index].srPredictDataList.indexOf(store);
      state.forcastedData[index].srPredictDataList[storeIndex].smForeCast =
        noOfItem;
      return { forcastedData: state.forcastedData };
    }),
  setItems: (forcastedData) => set({ forcastedData }),
}));
