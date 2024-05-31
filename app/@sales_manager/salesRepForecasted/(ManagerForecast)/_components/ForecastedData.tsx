"use client";

import { Separator } from "@/components/ui/separator";
import type { SalesRepForcastedDataType, SrPredictedDataType } from "@/typings";
import { useState } from "react";
import { columns as alreadySubmittedCols } from "../alreadySubmittedColumn";
import { columns } from "../columns";
import { DataTable } from "./data-table";

export default function ForecastedData({
  forecastedData,
  currentData,
  isAlreadySubmitted,
}: {
  forecastedData: SrPredictedDataType[];
  currentData: SalesRepForcastedDataType;
  isAlreadySubmitted: boolean;
}) {
  //   const currentItem = forecastedData.find((item) => item.itemId === itemId);
  //   if (!currentItem) return;
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0,
  });

  const totalPackets = forecastedData.reduce((acc, curr) => {
    if (!curr.smForeCast || curr.smForeCast === -1) return acc;

    return acc + curr.smForeCast;
  }, 0);

  const totalWeights = currentData.packetWeight * totalPackets;

  const cols = isAlreadySubmitted ? alreadySubmittedCols : columns;

  return (
    <>
      <div className="flex items-center gap-5">
        <DataTable
          pagination={pagination}
          searchId="storeId"
          searchPlaceholder="Search Store ID"
          columns={cols}
          data={forecastedData}
        />
        <div
          id={`component-${currentData.itemName.replace(/\s/g, "-")}`}
          className="flex items-center justify-end"
        >
          <div className="p-2 grid rounded gap-2">
            <div className="text-muted-foreground text-sm">
              Packet Weight:{" "}
              <span
                className={
                  "font-extrabold text-lg text-gray-800 dark:text-slate-300"
                }
              >
                {currentData.packetWeight}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-muted-foreground">
                Total Packets{" "}
                <h1 className="font-extrabold text-lg text-gray-800 dark:text-slate-300">
                  {totalPackets}
                </h1>
              </div>
              <Separator orientation="vertical" />
              <div className="text-muted-foreground">
                Total Weights{" "}
                <h1 className="font-extrabold text-lg text-gray-800 dark:text-slate-300">
                  {totalWeights}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
