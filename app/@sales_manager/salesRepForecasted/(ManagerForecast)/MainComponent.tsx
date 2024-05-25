"use client";

import { useSrForcastedStore } from "@/store/srForcastedStore";
import type { SalesRepForcastedDataType, userSessionType } from "@/typings";
import { useEffect } from "react";
import ForecastedData from "./_components/ForecastedData";

export default function MainComponent({
  salesRepForecastedData,
  session,
}: {
  salesRepForecastedData: SalesRepForcastedDataType[];
  session: userSessionType;
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
      <div className="relative px-[10rem]">
        <div className="text-gray-800 text-xl font-bold px-10">
          Sales Rep forecasted data for every vegetables
        </div>
        {forcastedData?.map((data) => (
          <div key={data.itemCode} className="py-10">
            <h1 className="text-2xl z-50 bg-green-600 py-2 px-10 text-white font-bold sticky top-[75px]">
              {data.itemName}
            </h1>
            <div className="p-10">
              <div className="flex items-center justify-end">
                <div className="text-muted-foreground text-sm">
                  Packet Weight:{" "}
                  <span className={"font-extrabold text-lg text-gray-800"}>
                    {data.packetWeight}
                  </span>
                </div>
              </div>
              <ForecastedData
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
