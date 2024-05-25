import { getSession } from "@/lib/auth";
import type { FinalForecastedDataType, userSessionType } from "@/typings";
import MainComponent from "./_components/MainComponent";

async function getFinalForecastedData(userId: string) {
  const response = await fetch("http://burn.pagekite.me/forecast/getPtReport", {
    headers: {
      userId,
    },
    cache: "no-cache",
    next: {
      tags: ["final-forecasted-data"],
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const responseData = await response.json();

  if (responseData?.status !== "SUCCESS") {
    throw new Error("Failed to fetch data");
  }

  return responseData.data as FinalForecastedDataType[];
}

export default async function ProcurementTeam() {
  const session = await getSession<userSessionType>();
  if (!session) return null;

  const finalForecastedData = await getFinalForecastedData(
    session.userInfo.userId
  );

  return (
    <>
      <h1 className="font-extrabold px-10 py-4 text-gray-800 text-3xl">
        Final Forecasted Data
      </h1>
      <MainComponent finalForecastedData={finalForecastedData} />
    </>
  );
}
