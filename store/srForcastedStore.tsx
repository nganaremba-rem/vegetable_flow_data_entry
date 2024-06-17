import type { SalesRepForecastedLatestDataType } from "@/typings";
import { create } from "zustand";

export type srForecastedStoreType = {
  forecastedData: SalesRepForecastedLatestDataType[];
  updateItem: (itemCode: string, storeId: string, noOfItem: number) => void;
  setItems: (forcastedData: SalesRepForecastedLatestDataType[]) => void;
};

export const useSrForcastedStore = create<srForecastedStoreType>((set) => ({
  forecastedData: [],
  updateItem: (itemCode, storeId, noOfItem) =>
    set((state) => {
      const currentStore = state.forecastedData.find(
        (item) => item.storeId === storeId
      );
      if (!currentStore) return state;
      const index = state.forecastedData.indexOf(currentStore);
      const item = state.forecastedData[index].data.find(
        (prediction) => prediction.itemCode === Number(itemCode)
      );
      if (!item) return state;
      const itemIndex = state.forecastedData[index].data.indexOf(item);
      state.forecastedData[index].data[itemIndex].smForeCast = noOfItem;
      return { forecastedData: state.forecastedData };
    }),
  setItems: (forecastedData) => set({ forecastedData }),
}));
