"use client";

import DecreaseButton from "@/components/DecreaseButton";
import IncreaseButton from "@/components/IncreaseButton";
import { Input } from "@/components/ui/input";
import { useTargetStore } from "@/store/updateTargetStore";
import type { StoreItemsType } from "@/typings";
import type { Row } from "@tanstack/react-table";

export default function PresetUpdateColumn({
  row,
}: {
  row: Row<StoreItemsType>;
}) {
  const { data, updateTarget } = useTargetStore((state) => state);

  const currentItem = data.find(
    (item) => item.itemCode === row.original.itemCode
  );
  if (!currentItem) return;

  return (
    <div className="flex items-center gap-1">
      <DecreaseButton
        onClick={() => {
          if (currentItem.preset > 0)
            updateTarget(currentItem.itemCode, currentItem.preset - 1);
        }}
      />
      <Input
        value={currentItem.preset}
        className="w-20"
        onChange={(e) => {
          if (Number.isNaN(Number(e.currentTarget.value))) return;

          updateTarget(currentItem.itemCode, Number(e.currentTarget.value));
        }}
      />
      <IncreaseButton
        onClick={() => {
          updateTarget(currentItem.itemCode, currentItem.preset + 1);
        }}
      />
    </div>
  );
}
