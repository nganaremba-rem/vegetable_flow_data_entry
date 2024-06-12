import { getRequest } from "@/services/apiGetRequests";
import type { StoreItemsType } from "@/typings";
import type { StoreType } from "../../../columns";
import UpdateTargetForm from "./_components/UpdateTargetForm";

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

export default async function UpdateTarget({
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

  return (
    <div className="p-2 sm:px-[3rem] lg:px-[5rem] xl:px-[10rem] 2xl:px-[20rem] ">
      <h1 className="text-xl font-bold text-gray-700">Update Target</h1>
      <UpdateTargetForm
        storeId={params.storeId}
        data={storeItemsResponse.data || []}
      />
    </div>
  );
}
