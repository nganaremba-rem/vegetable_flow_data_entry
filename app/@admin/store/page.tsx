import { Button } from "@/components/ui/button";
import { FaStore } from "react-icons/fa6";

import Link from "next/link";
import TableContainer from "./_component/TableContainer";
import type { StoreType } from "./columns";

async function getData(): Promise<StoreType[]> {
  // Fetch data from your API here.
  const response = await fetch("http://burn.pagekite.me/store/getAll", {
    cache: "no-cache",
    next: {
      tags: ["store"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
}

export default async function Store() {
  const data = await getData();

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
          <TableContainer data={data} />
        </div>
      </div>
    </>
  );
}
