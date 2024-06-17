"use client";

import { useItemStore } from "@/store/itemStore";
import type { ItemsWithPreset } from "@/typings";
import type { Row } from "@tanstack/react-table";

export default function SuggestedForecastField({
  row,
}: {
  row: Row<ItemsWithPreset>;
}) {
  const { updateItem, items } = useItemStore((state) => state);

  const item = items.find((item) => item.itemCode === row.original.itemCode);

  if (!item) return <div>Item not found</div>;

  return <div>{item?.preset - (item?.inventory || 0)}</div>;
}
