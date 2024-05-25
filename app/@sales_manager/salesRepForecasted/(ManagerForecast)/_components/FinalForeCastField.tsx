"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSrForcastedStore } from "@/store/srForcastedStore";
import type { SrPredictedDataType } from "@/typings";
import type { Row } from "@tanstack/react-table";

export default function FinalForeCastField({
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

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => {
          if (!currentValue) return;

          if (currentValue > 0) {
            if (!row.original.itemId) return;

            updateItem(
              row.original.itemId,
              row.original.storeId,
              Number(currentValue - 1)
            );
          }
        }}
        className="bg-red-600 hover:bg-red-700"
      >
        -
      </Button>
      <Input
        className={"w-[5rem]"}
        value={currentValue}
        onChange={(e) => {
          if (!row.original.itemId) return;
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

          updateItem(
            row.original.itemId,
            row.original.storeId,
            Number(currentValue + 1)
          );
        }}
        className="bg-green-600 hover:bg-green-700"
      >
        +
      </Button>
    </div>
  );
}
