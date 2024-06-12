import { DataTable } from "@/components/data-table";
import { getRequest } from "@/services/apiGetRequests";
import type { StoreItemsType, VegetableType } from "@/typings";
import type { StoreType } from "../../columns";
import ModifyStoreItems from "./_components/ModifyStoreItems";
import { columns } from "./columns";

async function getStoreItems(storeId: string) {
  return await getRequest<StoreItemsType[]>({
    endpointUrl: `/store/item/getAll?storeId=${storeId}`,
    tags: ["storeItems", storeId],
  });
}

async function getStoreByStoreId(storeId: string) {
  return await getRequest<StoreType>({
    endpointUrl: `/store/getById/${storeId}`,
    tags: ["store", storeId],
  });
}

async function getAllVeg() {
  return await getRequest<VegetableType[]>({
    endpointUrl: "/item/getAll",
    tags: ["vegetables"],
  });
}

export default async function StoreItems({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const storeItemsResponse = await getStoreItems(params.storeId);
  if (storeItemsResponse.status !== "SUCCESS") return null;
  const storeResponse = await getStoreByStoreId(params.storeId);
  if (storeResponse.status !== "SUCCESS") return null;
  const vegetablesResponse = await getAllVeg();
  if (vegetablesResponse.status !== "SUCCESS") return null;

  return (
    <div className="p-2 sm:px-[3rem] lg:px-[5rem] xl:px-[10rem] 2xl:px-[20rem] ">
      <h2 className="text-xl font-bold text-gray-700">
        Available Items in {storeResponse.data.storeName}
      </h2>
      <ModifyStoreItems
        storeId={params.storeId}
        data={storeItemsResponse.data || []}
        vegetables={vegetablesResponse.data || []}
      />
      <DataTable
        searchId="itemName"
        searchPlaceholder="Search Vegetable Name"
        data={storeItemsResponse.data || []}
        columns={columns}
      />
    </div>
  );
}
