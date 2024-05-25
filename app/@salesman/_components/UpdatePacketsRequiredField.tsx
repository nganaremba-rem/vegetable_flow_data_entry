"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useItemStore } from "@/store/itemStore";
import type { Row } from "@tanstack/react-table";
import { useState } from "react";
import type { ItemType } from "../columns";

export default function UpdatePacketsRequiredField({
  row,
}: {
  row: Row<ItemType>;
}) {
  const { updateItem, items } = useItemStore((state) => state);
  const item = items.find((item) => item.id === row.original.id);
  const [oldInventory, setOldInventory] = useState<number | undefined>(
    item?.inventory
  );
  const [isFocused, setIsFocused] = useState(false);

  if (!item) return null;

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => {
          updateItem(
            row.original.id,
            item?.packets_required
              ? item.packets_required - 1
              : item.preset - (item.inventory || 0) - 1 < 0
              ? 0
              : item.preset - (item.inventory || 0) - 1,
            "packets_required"
          );
        }}
        className="bg-red-600 hover:bg-red-700"
      >
        -
      </Button>
      <Input
        className={`${
          oldInventory !== item.inventory ? "border border-green-700" : ""
        }  w-[5rem]`}
        value={
          item?.packets_required || item?.packets_required === 0
            ? item?.packets_required
            : item.preset - (item.inventory || 0)
        }
        onChange={(e) => {
          if (isFocused) {
            // if preset - inventory equals packets_required and user pressed backspace and e.target.value is empty then set to 0
            if (e.target.value === "" || Number(e.target.value) < 0) {
              updateItem(row.original.id, 0, "packets_required");
            } else {
              updateItem(
                row.original.id,
                Number(e.target.value),
                "packets_required"
              );
            }
          }
          setOldInventory(item.inventory);
        }}
        onFocus={() => {
          // if focus and all deleted then set to 0
          setIsFocused(true);
        }}
      />
      <Button
        onClick={() => {
          updateItem(
            row.original.id,
            item?.packets_required ? item.packets_required + 1 : 1,
            "packets_required"
          );
        }}
        className="bg-green-600 hover:bg-green-700"
      >
        +
      </Button>
    </div>
  );
}
