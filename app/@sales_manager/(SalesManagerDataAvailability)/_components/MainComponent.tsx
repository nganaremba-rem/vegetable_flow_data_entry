"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTable } from "@/components/data-table";
import useCSVData from "@/hooks/useCSVData";
import type { DataAvailabilityType } from "@/typings";
import { format } from "date-fns";
import Link from "next/link";
import { useMemo } from "react";
import { columns } from "../columns";

export default function MainComponent({
  dataAvailability,
}: {
  dataAvailability: DataAvailabilityType[];
}) {
  const listOfKeysWithFormatterCallback = useMemo(
    () => [
      {
        key: "entryTime",
        cb: (value: string) => format(new Date(value), "dd-MM-yyyy hh:mm a"),
      },
    ],
    []
  );

  const hiddenColumns = useMemo(() => ["storeId"], []);

  const csvData = useCSVData({
    data: dataAvailability,
    hiddenColumns,
    listOfKeysWithFormatterCallback,
  });

  return (
    <div className="px-3 2xl:px-[15rem] flex flex-col gap-2 py-2">
      <h1 className="text-3xl font-bold">Store Forecast Status</h1>
      <p className="text-muted-foreground text-sm">
        Date: {format(Date.now(), "dd/MM/yyyy")}
      </p>
      <div className="self-end flex items-center gap-2">
        <CSVDownloadButton
          csvData={csvData}
          filename={`Forecasted Status for all stores - ${format(
            Date.now(),
            "dd-MM-yyyy hh:ss a"
          )}`}
        />
      </div>
      <DataTable
        searchId="storeName"
        searchPlaceholder="Search Store Name"
        columns={columns}
        data={dataAvailability}
      />
      <Link
        className="bg-primary-blue my-10 text-center hover:bg-sky-700 p-2 rounded text-white"
        href={"/salesRepForecasted"}
      >
        Check Sales Rep Forecasted Report
      </Link>
    </div>
  );
}
