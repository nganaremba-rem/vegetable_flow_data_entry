import type { FarmerType } from "@/typings";
import type { Row } from "@tanstack/react-table";
import AvailableItemsPopUp from "./AvailableItemsPopUp";

export default function AvailableItems({ row }: { row: Row<FarmerType> }) {
  const allItems = row.original.availableItem.split(",");

  return <AvailableItemsPopUp data={allItems} />;
}
