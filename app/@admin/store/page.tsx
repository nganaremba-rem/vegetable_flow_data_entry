import { Button } from "@/components/ui/button";
import { FaStore } from "react-icons/fa6";

import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { userSessionType } from "@/typings";
import Link from "next/link";
import TableContainer from "./_component/TableContainer";
import type { StoreType } from "./columns";

async function getData(userId: string) {
  return await getRequest<StoreType[]>({
    endpointUrl: "/store/getAll",
    tags: ["store"],
    userId,
  });
}

export default async function Store() {
  const session = await getSession<userSessionType>();
  if (!session) return null;
  const response = await getData(session.userInfo.userId);

  return (
    <>
      <div className="p-2">
        <div className="flex justify-between items-center px-3 md:px-10">
          <h1 className="font-extrabold text-xl px-3 md:px-10">Store</h1>
          <div className="flex items-center gap-4">
            <Link href={"/store/add"}>
              <Button className="bg-primary-blue text-white flex items-center gap-2 hover:bg-sky-700">
                Add New Store
                <FaStore size={20} />
              </Button>
            </Link>
          </div>
        </div>

        <div className="container mx-auto py-10">
          <TableContainer data={response.data} />
        </div>
      </div>
    </>
  );
}
