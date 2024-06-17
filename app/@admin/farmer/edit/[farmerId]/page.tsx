import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { FarmerType, userSessionType } from "@/typings";
import FarmerUpdateForm from "./_components/FarmerUpdateForm";

async function getFarmerById(farmerId: string, userId: string) {
  return getRequest<FarmerType>({
    endpointUrl: `/farmer/getById/${farmerId}`,
    tags: [],
    userId,
  });
}

type paramType = {
  params: {
    farmerId: string;
  };
};

export default async function EditFarmer({ params }: paramType) {
  const session = await getSession<userSessionType>();
  if (!session) return <div>Session Expired</div>;

  const farmerResponse = await getFarmerById(
    params.farmerId,
    session.userInfo.userId
  );

  return <FarmerUpdateForm farmer={farmerResponse.data} />;
}
