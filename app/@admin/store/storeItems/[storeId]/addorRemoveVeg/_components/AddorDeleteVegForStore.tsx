import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import type { StoreItemsType } from "@/typings";
import { addOrDeleteVegForStoreCols } from "../columns";

export default function AddorDeleteVegForStore({
  storeId,
  data,
}: {
  storeId: string;
  data: StoreItemsType[];
}) {
  return (
    <div>
      <Button>Add Vegetables</Button>

      <DataTable
        data={data}
        columns={addOrDeleteVegForStoreCols}
        searchId="itemName"
        searchPlaceholder="Search Vegetable Name"
      />
    </div>
  );
}
