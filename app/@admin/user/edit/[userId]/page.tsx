import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { UserType, userSessionType } from "@/typings";
import { getRoles, getStores } from "../../add/page";
import UserUpdateForm from "./_components/UserUpdateForm";

async function getUserByStoreId(selectedUserId: string, userId: string) {
  return getRequest<UserType>({
    endpointUrl: `/user/getById/${selectedUserId}`,
    tags: [],
    userId,
  });
}

type paramType = {
  params: {
    userId: string;
  };
};

export default async function EditUser({ params }: paramType) {
  const session = await getSession<userSessionType>();
  if (!session) return <div>Session Expired</div>;

  const userResponse = await getUserByStoreId(
    params.userId,
    session.userInfo.userId
  );

  console.log(userResponse);

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
    <UserUpdateForm
      user={userResponse.data}
      roleOptions={roleOptions}
      storeOptions={storeOptions}
    />
  );
}
