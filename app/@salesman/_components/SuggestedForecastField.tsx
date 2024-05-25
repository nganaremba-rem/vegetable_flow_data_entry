"use client";

import { useItemStore } from "@/store/itemStore";
import type { Row } from "@tanstack/react-table";
import type { ItemType } from "../columns";

export default function SuggestedForecastField({
  row,
}: {
  row: Row<ItemType>;
}) {
  const { updateItem, items } = useItemStore((state) => state);

  const item = items.find((item) => item.id === row.original.id);

  if (!item) return null;

  return <div>{item?.preset - (item?.inventory || 0)}</div>;
}
