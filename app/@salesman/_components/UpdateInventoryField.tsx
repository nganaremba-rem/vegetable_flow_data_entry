"use client";

import { Input } from "@/components/ui/input";
import { useItemStore } from "@/store/itemStore";
import type { Row } from "@tanstack/react-table";
import type { ItemType } from "../columns";

export default function UpdateInventoryField({ row }: { row: Row<ItemType> }) {
  const { updateItem, items } = useItemStore((state) => state);

  const item = items.find((item) => item.id === row.original.id);

  return (
    <Input
      value={item?.inventory || 0}
      onChange={(e) => {
        updateItem(row.original.id, Number(e.target.value), "inventory");
      }}
    />
  );
}
