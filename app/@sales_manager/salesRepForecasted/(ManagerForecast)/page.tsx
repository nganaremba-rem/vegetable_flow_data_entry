import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { SalesRepForcastedDataType, userSessionType } from "@/typings";
import MainComponent from "./_components/MainComponent";

async function getSalesRepForecastedData(userId: string) {
  return await getRequest<SalesRepForcastedDataType[]>({
    endpointUrl: "/forecast/getAll",
    tags: ["salesRepForecasted"],
    userId,
  });
}

export async function checkIfAlreadySubmitted(userId: string) {
  return await getRequest({
    endpointUrl: "/forecast/smReportStatus",
    tags: ["smReportStatus"],
    userId,
  });
}

export default async function SalesRepForeCasted() {
  const session = await getSession<userSessionType>();
  if (!session) return null;

  const smReportStatus = await checkIfAlreadySubmitted(session.userInfo.userId);

  if (!smReportStatus.status) return <>{smReportStatus.message}</>;

  const response = await getSalesRepForecastedData(session.userInfo.userId);

  if (!response) return null;

  return (
    // <div>Hello</div>
    <MainComponent
      isAlreadySubmitted={smReportStatus.status === true}
      salesRepForecastedData={response.data}
    />
  );
}
