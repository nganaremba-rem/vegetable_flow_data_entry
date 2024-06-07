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
  if (!session) return null;

  const allVeg = await getAllVegData(session.userInfo.userId);
  if (!allVeg) return null;

  const smReportStatus = await checkIfAlreadySubmitted(session.userInfo.userId);
  if (smReportStatus.status !== "AVAILABLE")
    return <>{smReportStatus.message}</>;

  const response = await getSalesRepForecastedData(session.userInfo.userId);
  if (!response) return null;

  const salesManagerTableData = generateSalesManagerTableData({
    allVeg: allVeg.data,
    salesRepForecastedData: response.data,
  });

  return (
    // <div>Hello</div>
    <MainComponent
      isAlreadySubmitted={smReportStatus.status === "AVAILABLE"}
      salesManagerTableData={salesManagerTableData}
      rawSalesRepReport={response.data}
    />
  );
}
