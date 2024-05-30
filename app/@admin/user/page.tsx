import { Button } from "@/components/ui/button";

import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { UserType, userSessionType } from "@/typings";
import { UserRoundPlus } from "lucide-react";
import Link from "next/link";
import TableContainer from "./_components/TableContainer";

async function getData(userId: string) {
  return await getRequest<UserType[]>({
    endpointUrl: "/user/getAll",
    tags: ["user"],
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
          <h1 className="font-extrabold text-xl px-3 md:px-10">
            All Users
            <div className="text-muted-foreground text-xs font-medium">
              [Sales Rep, Sales Manager, Procurement Team]
            </div>
          </h1>
          <div className="flex items-center gap-4">
            <Link href={"/user/add"}>
              <Button className="bg-primary-blue text-white flex items-center gap-2 hover:bg-sky-700">
                Add New User
                <UserRoundPlus size={20} />
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
