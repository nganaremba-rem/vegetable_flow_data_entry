"use client";

import { useSrForcastedStore } from "@/store/srForcastedStore";
import type { SalesRepForcastedDataType } from "@/typings";
import { useEffect } from "react";
import ForecastedData from "./_components/ForecastedData";
import SelectVegList from "./_components/SelectVegList";
import SubmitToProcurementButton from "./_components/SubmitToProcurementButton";

export default function MainComponent({
  isAlreadySubmitted,
  salesRepForecastedData,
}: {
  salesRepForecastedData: SalesRepForcastedDataType[];
  isAlreadySubmitted: boolean;
}) {
  const { setItems, forcastedData } = useSrForcastedStore((state) => state);

  useEffect(() => {
    setItems(
      salesRepForecastedData.map((data) => {
        return {
          ...data,
          srPredictDataList: data.srPredictDataList.map((predictedData) => {
            return {
              ...predictedData,
              itemId: data.itemCode,
              smForeCast: predictedData.srForecast,
            };
          }),
        };
      })
    );
  }, [setItems, salesRepForecastedData]);

  return (
    <>
      <div className="relative px-2 2xl:px-[10rem]">
        <div className="flex md:hidden items-center p-2 mb-10 gap-2">
          <SubmitToProcurementButton isAlreadySubmitted={isAlreadySubmitted} />
          <SelectVegList />
        </div>
        <div className="text-gray-800 dark:text-slate-200 text-xl font-bold px-3 md:px-10">
          Sales Rep Forecasted Data
        </div>
        {forcastedData?.map((data) => (
          <div key={data.itemCode} className="py-10">
            <h1 className="text-2xl z-[2] bg-green-600 py-2 px-3 md:px-10 text-white font-bold sticky top-[75px]">
              {data.itemName}
            </h1>
            <div className="p-3 md:p-10">
              <div className="flex items-center justify-end">
                <div className="text-muted-foreground text-sm">
                  Packet Weight:{" "}
                  <span
                    className={
                      "font-extrabold text-lg text-gray-800 dark:text-slate-300"
                    }
                  >
                    {data.packetWeight}
                  </span>
                </div>
              </div>
              <ForecastedData
                isAlreadySubmitted={isAlreadySubmitted}
                currentData={data}
                forecastedData={data.srPredictDataList}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
