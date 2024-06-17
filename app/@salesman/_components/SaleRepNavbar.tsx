import Logo from "@/components/Logo";
import ProfileButton from "@/components/ProfileButton";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/auth";
import type { StoreSchema } from "@/schema/StoreSchema";
import { getRequest } from "@/services/apiGetRequests";
import type { userSessionType } from "@/typings";
import type { z } from "zod";

async function getStoreByStoreId(storeId: string, userId: string) {
  return getRequest<z.infer<typeof StoreSchema>>({
    endpointUrl: `/store/getById/${storeId}`,
    tags: [],
    userId,
  });
}

export default async function SalesRepNavbar() {
  const session = await getSession<userSessionType>();
  if (!session) return <div>Session Expired</div>;

  const storeResponse = await getStoreByStoreId(
    session.userInfo.storeId,
    session.userInfo.userId
  );

  return (
    <div className="flex justify-between items-center p-2 md:py-2 md:px-5 shadow-sky-50 dark:shadow-gray-900 shadow-lg mb-10">
      <div className="flex items-center gap-2">
        <Logo />
        <Separator orientation="vertical" />
        <h1 className="font-bold uppercase px-5">
          <span className="text-muted-foreground text-xs">Store Name:</span>{" "}
          {storeResponse.data.storeName}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {/* <Link href={"/"} className="p-2 hover:bg-slate-200 rounded">
          <Home size={30} color="#333" />
        </Link> */}
        <ProfileButton />
      </div>
    </div>
  );
}
