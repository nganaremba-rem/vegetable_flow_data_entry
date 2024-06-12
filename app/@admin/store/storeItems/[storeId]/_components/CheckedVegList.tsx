"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useTargetStore } from "@/store/updateTargetStore";
import type { VegetableType } from "@/typings";
import type { Row, Table } from "@tanstack/react-table";
import { useEffect } from "react";

export default function CheckedVegList({
  row,
  table,
}: {
  row: Row<VegetableType>;
  table: Table<VegetableType>;
}) {
  const { data: vegAndTarget, setTarget } = useTargetStore((state) => state);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    for (const veg of vegAndTarget) {
      if (veg.itemCode === row.original.id) {
        row.toggleSelected(true);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStoreTarget = (value: boolean) => {
    const rows = table.getFilteredSelectedRowModel().rows;

    const data = rows.map((row) => {
      return {
        itemCode: row.original.id,
        preset: row.original.preset,
      };
    });

    if (value) {
      const found = data.find((veg) => veg.itemCode === row.original.id);
      if (!found) {
        data.push({
          itemCode: row.original.id,
          preset: row.original.preset,
        });
      }
    } else {
      const index = data.findIndex((veg) => veg.itemCode === row.original.id);
      if (index > -1) {
        data.splice(index, 1);
      }
    }

    setTarget(data);
  };

  return (
    <div>
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
          updateStoreTarget(!!value);
        }}
        aria-label="Select row"
      />
    </div>
  );
}
