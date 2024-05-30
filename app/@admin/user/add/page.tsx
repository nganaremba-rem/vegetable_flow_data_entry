import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { RoleType, userSessionType } from "@/typings";
import type { StoreType } from "../../store/columns";
import AddUser from "./_components/AddUser";

export async function getRoles(userId: string) {
  return await getRequest<RoleType[]>({
    endpointUrl: "/user/getRoles",
    tags: ["role"],
    userId,
  });
}
export async function getStores(userId: string) {
  return await getRequest<StoreType[]>({
    endpointUrl: "/store/getAll",
    tags: ["store"],
    userId,
  });
}

export default async function page() {
  const session = await getSession<userSessionType>();
  if (!session) return null;

  const responseRoleCode = await getRoles(session.userInfo.userId);

  const roleOptions = responseRoleCode.data.map((role) => ({
    label: role.roleName,
    value: role.roleCode,
  }));

  const responseStoreCode = await getStores(session.userInfo.userId);

  const storeOptions = responseStoreCode.data.map((store) => ({
    label: store.storeName,
    value: store.storeId,
  }));

  return (
    <>
      <AddUser roleOptions={roleOptions} storeOptions={storeOptions} />
    </>
  );
}
