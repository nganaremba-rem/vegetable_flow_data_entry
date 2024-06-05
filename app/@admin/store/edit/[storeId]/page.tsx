import { getSession } from "@/lib/auth";
import type { StoreSchema } from "@/schema/StoreSchema";
import { getRequest } from "@/services/apiGetRequests";
import type { userSessionType } from "@/typings";
import type { z } from "zod";
import StoreUpdateForm from "./_components/StoreUpdateForm";

async function getStoreByStoreId(storeId: string, userId: string) {
  return getRequest<z.infer<typeof StoreSchema>>({
    endpointUrl: `/store/getById/${storeId}`,
    tags: [],
    userId,
  });
}

type paramType = {
  params: {
    storeId: string;
  };
};

export default async function EditStore({ params }: paramType) {
  const session = await getSession<userSessionType>();
  if (!session) return null;

  const storeResponse = await getStoreByStoreId(
    params.storeId,
    session.userInfo.userId
  );

  return <StoreUpdateForm store={storeResponse.data} />;
}
