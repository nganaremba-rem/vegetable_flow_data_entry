import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { ItemsWithPreset, userSessionType } from "@/typings";
import MainComponent from "./_components/MainComponent";

async function getItems(userId: string, storeId: string) {
  return await getRequest<ItemsWithPreset[]>({
    endpointUrl: `/store/item/getAll?storeId=${storeId}`,
    tags: ["item"],
    userId,
  });
}

async function getCurrentSRForecastStatus(userId: string, storeId: string) {
  return await getRequest<{ status: boolean; updateTime: string | null }>({
    endpointUrl: `/forecast/srReportStatus?storeId=${storeId}`,
    tags: ["storeForecastStatus", storeId],
    userId,
  });
}

export default async function SaleRep() {
  const session = await getSession<userSessionType>();
  if (!session) return null;
  const items = await getItems(
    session.userInfo.userId,
    session.userInfo.storeId
  );

  const forecastStatus = await getCurrentSRForecastStatus(
    session.userInfo.userId,
    session.userInfo.storeId
  );

  return (
    <MainComponent
      isAlreadyForecasted={
        forecastStatus.status === true || items.data === null
      }
      storeId={session.userInfo.storeId}
      byRole={session.userInfo.userRole}
      items={items.data || []}
    />
  );
}
