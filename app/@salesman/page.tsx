import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type {
  ItemsWithPreset,
  SalesRepForecastType,
  userSessionType,
} from "@/typings";
import type { StoreType } from "../@admin/store/columns";
import MainComponent from "./_components/MainComponent";

async function getItems(userId: string, storeId: string) {
  return await getRequest<ItemsWithPreset[]>({
    endpointUrl: `/store/item/getAll?storeId=${storeId}`,
    tags: ["item"],
    userId,
  });
}

async function getCurrentSRForecastStatus(userId: string, storeId: string) {
  return await getRequest<{
    storeId: string;
    storeName: string;
    data: SalesRepForecastType[];
  }>({
    endpointUrl: `/forecast/srReportStatus?storeId=${storeId}`,
    tags: ["storeForecastStatus", storeId],
    userId,
  });
}

async function getStoreByStoreId(storeId: string) {
  return await getRequest<StoreType>({
    endpointUrl: `/store/getById/${storeId}`,
    tags: ["store", storeId],
  });
}

export default async function SaleRep() {
  const session = await getSession<userSessionType>();
  if (!session) return <div>Session Expired</div>;
  const items = await getItems(
    session.userInfo.userId,
    session.userInfo.storeId
  );

  const forecastStatus = await getCurrentSRForecastStatus(
    session.userInfo.userId,
    session.userInfo.storeId
  );

  const storeResponse = await getStoreByStoreId(session.userInfo.storeId);

  if (storeResponse.status !== "SUCCESS")
    return <div>{storeResponse?.message || "Unable to get Store Info"}</div>;

  return (
    <MainComponent
      isAlreadyForecasted={forecastStatus.status === "AVAILABLE"}
      alreadyForecastedData={
        forecastStatus.status === "AVAILABLE" ? forecastStatus : null
      }
      storeId={session.userInfo.storeId}
      storeDetail={storeResponse.data}
      byRole={session.userInfo.userRole}
      items={items.data || []}
    />
  );
}
