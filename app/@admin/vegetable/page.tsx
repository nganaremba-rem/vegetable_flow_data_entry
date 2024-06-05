import { Button } from "@/components/ui/button";

import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { VegetableType, userSessionType } from "@/typings";
import { LeafyGreen } from "lucide-react";
import Link from "next/link";
import TableContainer from "./_component/TableContainer";

async function getData(userId: string) {
  return await getRequest<VegetableType[]>({
    endpointUrl: "/item/getAll",
    tags: ["vegetable"],
    userId,
  });
}

export default async function ItemPage() {
  const session = await getSession<userSessionType>();
  if (!session) return null;
  const response = await getData(session.userInfo.userId);

  return (
    <>
      <div className="p-2 md:px-[15rem]">
        <div className="flex justify-between items-center px-3 md:px-10">
          <h1 className="font-extrabold text-xl px-3">Vegetables</h1>
          <div className="flex items-center gap-4">
            <Link href={"/vegetable/add"}>
              <Button className="bg-primary-blue text-white flex items-center gap-2 hover:bg-sky-700">
                Add New Vegetable
                <LeafyGreen size={20} color="#12d35c" />
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
