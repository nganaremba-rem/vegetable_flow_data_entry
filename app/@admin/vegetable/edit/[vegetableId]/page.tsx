import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { VegetableType, userSessionType } from "@/typings";
import VegetableUpdateForm from "./_components/VegetableUpdateForm";

async function getVegetableById(vegetableId: string, userId: string) {
  return getRequest<VegetableType>({
    endpointUrl: `/item/getById/${vegetableId}`,
    tags: [],
    userId,
  });
}

type paramType = {
  params: {
    vegetableId: string;
  };
};

export default async function EditVegetable({ params }: paramType) {
  const session = await getSession<userSessionType>();
  if (!session) return null;

  const vegetableResponse = await getVegetableById(
    params.vegetableId,
    session.userInfo.userId
  );

  return <VegetableUpdateForm vegetable={vegetableResponse.data} />;
}
