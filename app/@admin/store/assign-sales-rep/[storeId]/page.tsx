"use server";

import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { UserType, userSessionType } from "@/typings";
import type { StoreType } from "../../columns";
import SRListSelect from "./components/SRListSelect";

type AssignSalesRepProps = {
  params: {
    storeId: string;
  };
};

async function getAvailableSalesReps(userId: string) {
  return await getRequest<UserType[]>({
    endpointUrl: "/user/getAvailablSR",
    tags: ["availableSR"],
    userId,
  });
}

async function getStoreByStoreId(storeId: string, userId: string) {
  return await getRequest<StoreType>({
    endpointUrl: `/store/getById/${storeId}`,
    tags: ["store", storeId],
    userId,
  });
}

export default async function AssignSalesRep({ params }: AssignSalesRepProps) {
  const session = await getSession<userSessionType>();
  if (!session) return null;
  const availableSRResponse = await getAvailableSalesReps(
    session.userInfo.userId
  );
  if (availableSRResponse.status !== "SUCCESS") return null;

  const storeResponse = await getStoreByStoreId(
    params.storeId,
    session.userInfo.userId
  );

  if (storeResponse.status !== "SUCCESS") return null;

  const data = availableSRResponse.data.map((sr) => ({
    label: sr.userName,
    value: sr.empId,
  }));

  return (
    <div className="flex flex-col py-5 gap-5 justify-center items-left px-5 shadow rounded-lg 2xl:mx-[20rem]">
      <h2 className="text-lg text-gray-700 font-bold">
        <span className="text-muted-foreground font-light">Store Name:</span>{" "}
        {storeResponse.data.storeName}
      </h2>

      <SRListSelect storeId={params.storeId} data={data} />
    </div>
  );
}
