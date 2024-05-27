"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSrForcastedStore } from "@/store/srForcastedStore";
import type { SrPredictedDataType } from "@/typings";
import type { Row } from "@tanstack/react-table";
import { useState } from "react";

export default function FinalForeCastInput({
  row,
}: {
  row: Row<SrPredictedDataType>;
}) {
  const { updateItem, forcastedData } = useSrForcastedStore((state) => state);

  const currentValue = forcastedData
    .find((data) => data.itemCode === row.original.itemId)
    ?.srPredictDataList.find(
      (item) => item.storeId === row.original.storeId
    )?.smForeCast;

  const [dataToShow, setDataToShow] = useState<string | number | undefined>(
    currentValue
  );

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => {
          if (!currentValue) return;

          if (currentValue > 0) {
            if (!row.original.itemId) return;
            setDataToShow(Number(currentValue - 1));

            updateItem(
              row.original.itemId,
              row.original.storeId,
              Number(currentValue - 1)
            );
          }
        }}
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        -
      </Button>
      <Input
        className={"w-[5rem]"}
        value={dataToShow}
        onBlur={() => {
          if (!row.original.itemId) return;

          if (dataToShow === "") {
            setDataToShow(0);
            updateItem(row.original.itemId, row.original.storeId, 0);
          }
        }}
        onChange={(e) => {
          if (!row.original.itemId) return;

          console.log(e.target.value);
          if (
            e.target.value === "" ||
            Number(e.target.value) < 0 ||
            Number.isNaN(Number(e.target.value))
          ) {
            setDataToShow("");
            updateItem(row.original.itemId, row.original.storeId, 0);
            return;
          }

          setDataToShow(Number(e.target.value));
          updateItem(
            row.original.itemId,
            row.original.storeId,
            Number(e.target.value)
          );
        }}
      />
      <Button
        onClick={() => {
          if (!row.original.itemId || currentValue === undefined) return;

          setDataToShow(Number(currentValue + 1));
          updateItem(
            row.original.itemId,
            row.original.storeId,
            Number(currentValue + 1)
          );
        }}
        className="bg-green-600 text-white hover:bg-green-700"
      >
        +
      </Button>
    </div>
  );
}
