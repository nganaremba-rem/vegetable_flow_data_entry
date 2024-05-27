import { getSession } from "@/lib/auth";
import type { DataAvailabilityType, userSessionType } from "@/typings";
import MainComponent from "./_components/MainComponent";

async function getDataAvailability(userId: string) {
  const response = await fetch(
    "http://burn.pagekite.me/forecast/availability",
    {
      headers: {
        userId,
      },
      cache: "no-store",
      next: {
        tags: ["data_availability"],
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data availability");
  }

  const data = (await response.json()) as DataAvailabilityType[];
  return data;
}

export default async function SalesManager() {
  const userInfo = await getSession<userSessionType>();
  if (!userInfo) return null;

  const dataAvailability = await getDataAvailability(userInfo.userInfo.userId);

  return <MainComponent dataAvailability={dataAvailability} />;
}
