"use client";

import DecreaseButton from "@/components/DecreaseButton";
import IncreaseButton from "@/components/IncreaseButton";
import { Input } from "@/components/ui/input";
import { useSrForcastedStore } from "@/store/srForcastedStore";
import type { SalesRepForecastType } from "@/typings";
import type { Row } from "@tanstack/react-table";
import { useState } from "react";

export default function FinalForeCastInput({
  row,
}: {
  row: Row<SalesRepForecastType>;
}) {
  const { updateItem } = useSrForcastedStore((state) => state);
  const [value, setValue] = useState<number | string>(
    row.original.smForeCast || 0
  );

  return (
    <div className="flex items-center gap-2">
      <DecreaseButton
        onClick={() => {
          if (!row.original.storeId) return;
          if (!row.original.itemCode) return;
          if (!row.original.smForeCast) return;
          if (row.original.smForeCast === 0) return;

          setValue(row.original.smForeCast - 1);

          updateItem(
            row.original.itemCode.toString(),
            row.original.storeId,
            row.original.smForeCast - 1
          );
        }}
      />
      <Input
        value={value}
        className={"w-[5rem]"}
        min={0}
        onChange={(e) => {
          const value = Number(e.currentTarget.value.replace(/[^0-9]/g, ""));
          if (!row.original.storeId) return;
          if (!row.original.itemCode) return;

          if (!e.currentTarget.value) {
            setValue("");
            updateItem(
              row.original.itemCode.toString(),
              row.original.storeId,
              0
            );
            return;
          }

          setValue(value);
          updateItem(
            row.original.itemCode.toString(),
            row.original.storeId,
            value
          );
        }}
      />
      <IncreaseButton
        onClick={() => {
          if (!row.original.storeId) return;
          if (!row.original.itemCode) return;
          setValue((row.original.smForeCast || 0) + 1);
          updateItem(
            row.original.itemCode.toString(),
            row.original.storeId,
            (row.original.smForeCast || 0) + 1
          );
        }}
      />
    </div>
  );
}
