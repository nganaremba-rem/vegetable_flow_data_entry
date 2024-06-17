import type { StoreType } from "@/app/@admin/store/columns";
import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type {
  ItemsWithPreset,
  SalesRepForecastType,
  userSessionType,
} from "@/typings";
import MainComponent from "./_components/MainComponent";

async function getItems(storeId: string) {
  return await getRequest<ItemsWithPreset[]>({
    endpointUrl: `/store/item/getAll?storeId=${storeId}`,
    tags: ["item"],
  });
}

async function getCurrentSRForecastStatus(storeId: string) {
  return await getRequest<{
    storeId: string;
    storeName: string;
    data: SalesRepForecastType[];
  }>({
    endpointUrl: `/forecast/srReportStatus?storeId=${storeId}`,
    tags: ["storeForecastStatus", storeId],
  });
}

async function getStoreByStoreId(storeId: string) {
  return await getRequest<StoreType>({
    endpointUrl: `/store/getById/${storeId}`,
    tags: ["store", storeId],
  });
}

export default async function ProxyEntry({
  params,
}: {
  params: { storeId: string };
}) {
  const session = await getSession<userSessionType>();
  if (!session) return <div>Session Expired</div>;
  const items = await getItems(params.storeId);

  const forecastStatus = await getCurrentSRForecastStatus(params.storeId);

  const storeResponse = await getStoreByStoreId(params.storeId);

  if (storeResponse.status !== "SUCCESS")
    return <div>{storeResponse?.message || "Unable to get Store Info"}</div>;

  return (
    <MainComponent
      isAlreadyForecasted={forecastStatus.status === "AVAILABLE"}
      alreadyForecastedData={
        forecastStatus?.status === "AVAILABLE" ? forecastStatus : null
      }
      storeId={params.storeId}
      storeDetail={storeResponse.data}
      byRole={session.userInfo.userRole}
      items={items.data || []}
    />
  );
}
