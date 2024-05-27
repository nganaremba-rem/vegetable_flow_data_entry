import { getSession } from "@/lib/auth";
import { oldGetRequest } from "@/services/apiGetRequests";
import type {
  SalesRepForcastedDataType,
  salesManagerReportStatus,
  userSessionType,
} from "@/typings";
import MainComponent from "./MainComponent";

async function getSalesRepForecastedData(userId: string) {
  return await oldGetRequest<SalesRepForcastedDataType>({
    endpointUrl: "/forecast/getAll",
    tags: ["salesRepForecasted"],
    userId,
  });
}

export async function checkIfAlreadySubmitted(userId: string) {
  const response = await fetch("http://burn.pagekite.me/forecast/smReport", {
    headers: {
      userId,
    },
    cache: "no-store",
    next: {
      tags: ["smReportStatus"],
      // revalidate: 1000,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch the Sales manager report status");
  }

  const data: salesManagerReportStatus = await response.json();
  return data;
}

export default async function SalesRepForeCasted() {
  const session = await getSession<userSessionType>();
  if (!session) return null;

  const smsReportStatus = await checkIfAlreadySubmitted(
    session.userInfo.userId
  );

  const salesRepForecastedData = await getSalesRepForecastedData(
    session.userInfo.userId
  );

  if (!salesRepForecastedData) return null;

  return (
    // <div>Hello</div>
    <MainComponent
      isAlreadySubmitted={smsReportStatus.status}
      salesRepForecastedData={salesRepForecastedData}
    />
  );
}
