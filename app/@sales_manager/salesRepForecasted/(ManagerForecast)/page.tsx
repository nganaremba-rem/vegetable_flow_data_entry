import { getSession } from "@/lib/auth";
import type { SalesRepForcastedDataType, userSessionType } from "@/typings";
import MainComponent from "./MainComponent";

async function getSalesRepForecastedData(userId: string) {
  const response = await fetch("http://burn.pagekite.me/forecast/getAll", {
    headers: {
      userId,
    },
    cache: "no-cache",
    next: {
      tags: ["salesRepForecasted"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch sales rep forecasted data");
  }

  const data: SalesRepForcastedDataType[] = await response.json();
  return data;
}

export default async function SalesRepForeCasted() {
  const session = await getSession<userSessionType>();
  if (!session) return null;
  const salesRepForecastedData = await getSalesRepForecastedData(
    session.userInfo.userId
  );

  if (!salesRepForecastedData) return null;

  return (
    <MainComponent
      session={session}
      salesRepForecastedData={salesRepForecastedData}
    />
  );
}
