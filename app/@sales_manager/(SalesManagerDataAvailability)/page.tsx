import { getSession } from "@/lib/auth";
import { oldGetRequest } from "@/services/apiGetRequests";
import type { DataAvailabilityType, userSessionType } from "@/typings";
import MainComponent from "./_components/MainComponent";

async function getDataAvailability(userId: string) {
  return await oldGetRequest<DataAvailabilityType>({
    endpointUrl: "/forecast/availability",
    tags: ["data_availability"],
    userId,
  });
}

export default async function SalesManager() {
  const userInfo = await getSession<userSessionType>();
  if (!userInfo) return null;

  const dataAvailability = await getDataAvailability(userInfo.userInfo.userId);

  return <MainComponent dataAvailability={dataAvailability} />;
}
