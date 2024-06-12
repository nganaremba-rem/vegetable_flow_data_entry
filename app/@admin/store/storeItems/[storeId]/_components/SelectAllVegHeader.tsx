"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useTargetStore } from "@/store/updateTargetStore";
import type { VegetableType } from "@/typings";
import type { Table } from "@tanstack/react-table";

export default function SelectAllVegHeader({
  table,
}: {
  table: Table<VegetableType>;
}) {
  const { setTarget } = useTargetStore((state) => state);

  const updateSelectOrDeselectAll = (isAllSelected: boolean) => {
    if (isAllSelected) {
      const rowModel = table.getRowModel();
      console.log(rowModel.flatRows.map((row) => row.original.id));
      const data = rowModel.rows.map((row) => {
        return {
          itemCode: row.original.id,
          preset: row.original.preset,
        };
      });
      setTarget(data);
    } else {
      setTarget([]);
    }
  };

  return (
    <>
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
          updateSelectOrDeselectAll(!!value);
        }}
        aria-label="Select all"
      />
    </>
  );
}
