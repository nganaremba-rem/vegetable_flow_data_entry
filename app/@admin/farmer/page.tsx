import { Button } from "@/components/ui/button";

import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { FarmerType, userSessionType } from "@/typings";
import Link from "next/link";
import { GiFarmer } from "react-icons/gi";
import TableContainer from "./_component/TableContainer";

async function getData(userId: string) {
  return await getRequest<FarmerType[]>({
    endpointUrl: "/farmer/getAll",
    tags: ["farmer"],
    userId,
  });
}

export default async function FarmerPage() {
  const session = await getSession<userSessionType>();
  if (!session) return <div>Session Expired</div>;
  const response = await getData(session.userInfo.userId);
  if (response.status !== "SUCCESS") {
    return (
      <div className="text-center text-red-600 font-bold tracking-wide">
        {response.message || "Unable to get the farmers data"}
      </div>
    );
  }
  return (
    <>
      <div className="p-2 2xl:px-[10rem]">
        <div className="flex justify-between items-center px-3 md:px-10">
          <h1 className="font-extrabold text-xl px-3">Farmers</h1>
          <div className="flex items-center gap-4">
            <Link href={"/farmer/add"}>
              <Button className="bg-primary-blue text-white flex items-center gap-2 hover:bg-sky-700">
                Add New Farmer
                <GiFarmer size={20} />
              </Button>
            </Link>
          </div>
        </div>

        <div className="container mx-auto  py-10">
          <TableContainer data={response.data || []} />
        </div>
      </div>
    </>
  );
}
