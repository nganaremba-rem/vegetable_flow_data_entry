import { getSession } from "@/lib/auth";
import generateSalesManagerTableData from "@/lib/generateSalesManagerTableData";
import { getRequest } from "@/services/apiGetRequests";
import type {
  SalesRepForecastedLatestDataType,
  itemType,
  userSessionType,
} from "@/typings";
import MainComponent from "./_components/MainComponent";

async function getSalesRepForecastedData(userId: string) {
  return await getRequest<SalesRepForecastedLatestDataType[]>({
    endpointUrl: "/forecast/getAll",
    tags: ["salesRepForecasted"],
    userId,
  });
}

async function checkIfAlreadySubmitted(userId: string) {
  return await getRequest({
    endpointUrl: "/forecast/smReportStatus",
    tags: ["smReportStatus"],
    userId,
  });
}

async function getAllVegData(userId: string) {
  return await getRequest<itemType[]>({
    endpointUrl: "/item/getAll",
    tags: ["allVeg"],
    userId,
  });
}

export default async function SalesRepForeCasted() {
  const session = await getSession<userSessionType>();
  if (!session) return <div>Session Expired</div>;

  const allVeg = await getAllVegData(session.userInfo.userId);
  if (allVeg.status !== "SUCCESS")
    return <div>{allVeg?.message || "Unable to get Vegetables"}</div>;

  const smReportStatus = await checkIfAlreadySubmitted(session.userInfo.userId);
  if (smReportStatus.status !== "AVAILABLE")
    return <>{smReportStatus.message}</>;

  const response = await getSalesRepForecastedData(session.userInfo.userId);
  if (!response) return <div>Unable to get Sales Rep Forecasted Data</div>;

  const salesManagerTableData = generateSalesManagerTableData({
    allVeg: allVeg.data,
    salesRepForecastedData: response.data,
  });

  return (
    // <div>Hello</div>
    <MainComponent
      isAlreadySubmitted={smReportStatus.status === "AVAILABLE"}
      smReportStatus={smReportStatus}
      salesManagerTableData={salesManagerTableData}
      rawSalesRepReport={response.data}
    />
  );
}
