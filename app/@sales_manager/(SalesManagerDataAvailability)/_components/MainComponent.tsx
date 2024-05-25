"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTable } from "@/components/data-table";
import type { DataAvailabilityType } from "@/typings";
import { format } from "date-fns";
import Link from "next/link";
import { columns } from "../columns";

export default function MainComponent({
  dataAvailability,
}: {
  dataAvailability: DataAvailabilityType[];
}) {
  return (
    <div className="px-10 flex flex-col gap-2 py-2">
      <h1 className="text-3xl font-bold">Data Availability</h1>
      <p className="text-muted-foreground text-sm">
        Date: {format(Date.now(), "dd/MM/yyyy")}
      </p>
      <div className="self-end flex items-center gap-2">
        <CSVDownloadButton />
        <Link
          className="bg-primary-blue hover:bg-sky-700 p-2 rounded text-white"
          href={"/salesRepForecasted"}
        >
          Continue
        </Link>
      </div>
      <DataTable
        searchId="storeName"
        searchPlaceholder="Search Store Name"
        columns={columns}
        data={dataAvailability}
      />
    </div>
  );
}
