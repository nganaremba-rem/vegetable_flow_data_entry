"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useItemStore } from "@/store/itemStore";
import type { ItemsWithPreset } from "@/typings";
import type { Row } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";

export default function UpdatePacketsRequiredField({
  row,
}: {
  row: Row<ItemsWithPreset>;
}) {
  const { updateItem, items } = useItemStore((state) => state);
  const item = items.find((item) => item.itemCode === row.original.itemCode);

  const [oldInventory, setOldInventory] = useState<number | undefined>(
    item?.inventory
  );
  const [dataToShow, setDataToShow] = useState<string | number | undefined>(
    undefined
  );

  const updatePacketRequired = useCallback(() => {
    if (item?.inventory !== 0 && !item?.inventory) return;

    setDataToShow(
      item.preset - item.inventory < 0 ? 0 : item.preset - item.inventory
    );

    updateItem(
      row.original.itemCode,
      item.preset - item.inventory < 0 ? 0 : item.preset - item.inventory,
      "packets_required"
    );
  }, [item, row.original.itemCode, updateItem]);

  useEffect(() => {
    if (!item) return;

    if (dataToShow === undefined) {
      setDataToShow(
        item.preset - (item?.inventory || 0) < 0
          ? 0
          : item.preset - (item?.inventory || 0)
      );
    }
  }, [item, dataToShow]);

  useEffect(() => {
    if (item?.inventory !== 0 && !item?.inventory) return;

    if (item.inventory !== oldInventory) {
      updatePacketRequired();
      setOldInventory(item.inventory);
    }
  }, [item?.inventory, oldInventory, updatePacketRequired]);

  if (!item) return null;

  return (
    <div className="flex items-center gap-2 w-[5rem]">
      <Button
        onClick={() => {
          if (!item?.packets_required) return;

          setDataToShow(
            item.packets_required - 1 < 0 ? 0 : item.packets_required - 1
          );
          updateItem(
            row.original.itemCode,
            item.packets_required - 1 < 0 ? 0 : item.packets_required - 1,
            "packets_required"
          );
        }}
        className="bg-red-600 h-7 flex justify-center items-center text-xl w-4 hover:bg-red-700 text-white"
      >
        -
      </Button>
      <Input
        className={`${
          oldInventory !== item.inventory ? "border border-green-700" : ""
        }  w-[3rem]`}
        onBlur={() => {
          if (dataToShow === "" || Number(dataToShow) < 0) {
            setDataToShow(0);
            updateItem(row.original.itemCode, 0, "packets_required");
          }
        }}
        value={dataToShow}
        onChange={(e) => {
          // if preset - inventory equals packets_required and user pressed backspace and e.target.value is empty then set to 0
          if (e.target.value === "" || Number(e.target.value) < 0) {
            setDataToShow("");
            updateItem(row.original.itemCode, 0, "packets_required");
          } else {
            if (Number.isNaN(Number(e.target.value))) {
              setDataToShow("");
              updateItem(row.original.itemCode, 0, "packets_required");
              return;
            }

            setDataToShow(Number(e.target.value));
            updateItem(
              row.original.itemCode,
              Number(e.target.value),
              "packets_required"
            );
          }
          setOldInventory(item.inventory);
        }}
      />
      <Button
        onClick={() => {
          if (!Object.prototype.hasOwnProperty.call(item, "packets_required"))
            return;
          setDataToShow((item.packets_required || 0) + 1);
          updateItem(
            row.original.itemCode,
            (item.packets_required || 0) + 1,
            "packets_required"
          );
        }}
        className="bg-green-600 h-7 flex justify-center items-center text-xl w-4 hover:bg-green-700 text-white"
      >
        +
      </Button>
    </div>
  );
}
