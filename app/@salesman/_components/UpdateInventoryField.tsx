"use client";

import { Input } from "@/components/ui/input";
import { useItemStore } from "@/store/itemStore";
import type { ItemsWithPreset } from "@/typings";
import type { Row } from "@tanstack/react-table";
import { useState } from "react";

export default function UpdateInventoryField({
  row,
}: {
  row: Row<ItemsWithPreset>;
}) {
  const { updateItem, items } = useItemStore((state) => state);
  const [dataToShow, setDataToShow] = useState<string | number | undefined>(0);

  const item = items.find((item) => {
    return item.itemCode === row.original.itemCode;
  });

  // console.log(items);

  return (
    <Input
      className="max-w-[3rem]"
      value={dataToShow}
      onBlur={() => {
        if (dataToShow === "") {
          setDataToShow(0);
          updateItem(row.original.itemCode, 0, "inventory");
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
          updateItem(row.original.itemCode, 0, "inventory");
          return;
        }

        setDataToShow(Number(inputValue));
        updateItem(row.original.itemCode, Number(inputValue), "inventory");
      }}
    />
  );
}
