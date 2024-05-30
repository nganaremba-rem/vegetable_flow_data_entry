import ErrorMessage from "@/components/ErrorMessage";
import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { FinalForecastedDataType, userSessionType } from "@/typings";
import MainComponent from "./_components/MainComponent";

async function getFinalForecastedData(userId: string) {
  return await getRequest<FinalForecastedDataType[]>({
    endpointUrl: "/forecast/getPtReport",
    tags: ["final-forecasted-data"],
    userId,
  });
}

export default async function ProcurementTeam() {
  const session = await getSession<userSessionType>();
  if (!session) return null;

  // const smReportStatus = await checkIfAlreadySubmitted(session.userInfo.userId);

  const finalForecastedData = await getFinalForecastedData(
    session.userInfo.userId
  );

  if (finalForecastedData.status !== "SUCCESS")
    return (
      <>
        <ErrorMessage message={finalForecastedData?.message} />
      </>
    );

  return (
    <>
      <div className="2xl:px-[10rem] py-10">
        <h1 className="font-extrabold px-3 dark:text-slate-300 md:px-10 py-4 text-gray-800 text-3xl">
          Final Forecasted Data
        </h1>
        <MainComponent finalForecastedData={finalForecastedData.data} />
      </div>
    </>
  );
}
