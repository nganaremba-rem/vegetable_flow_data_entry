import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaFileCsv, FaStore } from "react-icons/fa6";

import { type StoreType, columns } from "./columns";
import Link from "next/link";
import CSVDownloadButton from "@/components/CSVDownloadButton";

async function getData(): Promise<StoreType[]> {
  // Fetch data from your API here.
  const response = await fetch("http://burn.pagekite.me/store/getAll", {
    cache: "no-cache",
  });

  // const response = await fetch(
  //   "https://649ea8b1245f077f3e9cbb88.mockapi.io/user",
  //   {
  //     cache: "no-cache",
  //   }
  // );

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
          <h1 className="font-extrabold text-xl">Store</h1>
          <div className="flex items-center gap-4">
            <CSVDownloadButton />
            <Link href={"/store/add"}>
              <Button className="bg-primary-blue flex items-center gap-2 hover:bg-sky-700">
                Add New Store
                <FaStore size={20} />
              </Button>
            </Link>
          </div>
        </div>

        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}
