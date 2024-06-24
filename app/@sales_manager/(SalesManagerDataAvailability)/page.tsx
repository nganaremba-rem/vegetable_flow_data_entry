"use server";

import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { DataAvailabilityType, userSessionType } from "@/typings";
import MainComponent from "./_components/MainComponent";

async function getDataAvailability(userId: string) {
  return await getRequest<DataAvailabilityType[]>({
    endpointUrl: "/forecast/availability",
    tags: ["data_availability"],
    userId,
  });
}

export default async function SalesManager() {
  const userInfo = await getSession<userSessionType>();
  if (!userInfo) return <div>Session Expired</div>;

  const response = await getDataAvailability(userInfo.userInfo.userId);
  if (response?.status !== "SUCCESS")
    return <div>{response?.message || "Unable to get data availability"}</div>;

  const isAllDataAvailable = response.data.every(
    (store) => store.availability === true
  );

  return (
    <MainComponent
      isAllDataAvailable={isAllDataAvailable}
      dataAvailability={response.data}
      session={userInfo}
    />
  );
}
