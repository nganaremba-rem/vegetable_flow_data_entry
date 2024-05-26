"use client";

import { Input } from "@/components/ui/input";
import { useItemStore } from "@/store/itemStore";
import type { Row } from "@tanstack/react-table";
import { useState } from "react";
import type { ItemType } from "../columns";

export default function UpdateInventoryField({ row }: { row: Row<ItemType> }) {
  const { updateItem, items } = useItemStore((state) => state);
  const [dataToShow, setDataToShow] = useState<string | number | undefined>(0);

  const item = items.find((item) => {
    return item.id === row.original.id;
  });

  // console.log(items);

  return (
    <Input
      value={dataToShow}
      onBlur={() => {
        if (dataToShow === "") {
          setDataToShow(0);
          updateItem(row.original.id, 0, "inventory");
        }
      }}
      onChange={(e) => {
        const inputValue = e.target.value;

        if (
          Number.isNaN(Number(inputValue)) ||
          inputValue.trim() === "" ||
          Number(inputValue) < 0
        ) {
          setDataToShow("");
          updateItem(row.original.id, 0, "inventory");
          return;
        }

        setDataToShow(Number(inputValue));
        updateItem(row.original.id, Number(inputValue), "inventory");
      }}
    />
  );
}
