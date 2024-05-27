import ErrorMessage from "@/components/ErrorMessage";
import { getSession } from "@/lib/auth";
import type {
  FinalForecastedDataResponseType,
  userSessionType,
} from "@/typings";
import MainComponent from "./_components/MainComponent";

async function getFinalForecastedData(userId: string) {
  const response = await fetch("http://burn.pagekite.me/forecast/getPtReport", {
    headers: {
      userId,
    },
    cache: "no-store",
    next: {
      tags: ["final-forecasted-data"],
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const responseData = await response.json();

  if (responseData?.status !== "SUCCESS") {
    return {
      status: responseData.status,
      message: responseData?.message || "Failed to fetch data",
      dataList: [],
    };
  }

  return responseData as FinalForecastedDataResponseType;
}

export default async function ProcurementTeam() {
  const session = await getSession<userSessionType>();
  if (!session) return null;

  const finalForecastedData = await getFinalForecastedData(
    session.userInfo.userId
  );

  if (finalForecastedData.status !== "SUCCESS")
    return (
      <>
        <ErrorMessage data={finalForecastedData} />
      </>
    );

  return (
    <>
      <div className="2xl:px-[10rem] py-10">
        <h1 className="font-extrabold px-3 dark:text-slate-300 md:px-10 py-4 text-gray-800 text-3xl">
          Final Forecasted Data
        </h1>
        <MainComponent finalForecastedData={finalForecastedData.dataList} />
      </div>
    </>
  );
}
