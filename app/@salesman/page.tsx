import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { itemType, userSessionType } from "@/typings";
import MainComponent from "./_components/MainComponent";

async function getItems(userId: string) {
  return await getRequest<itemType[]>({
    endpointUrl: "/item/getAll",
    tags: ["item"],
    userId,
  });
}

export default async function SaleRep() {
  const session = await getSession<userSessionType>();
  if (!session) return null;
  const items = await getItems(session.userInfo.userId);

  return (
    <MainComponent
      storeId={session.userInfo.storeId}
      byRole={session.userInfo.userRole}
      items={items.data}
    />
  );
}
