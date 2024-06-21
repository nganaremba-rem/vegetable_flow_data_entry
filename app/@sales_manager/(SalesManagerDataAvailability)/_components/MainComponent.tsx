"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import useCSVData from "@/hooks/useCSVData";
import { useColumns } from "@/hooks/useColumns";
import type { DataAvailabilityType } from "@/typings";
import { format } from "date-fns";
import { CheckCheck, CircleX } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import SubmitBySMForSR from "./SubmitBySMForSR";

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

  const columnss = useColumns(
    dataAvailability,
    [
      {
        accessorKey: "entryTime",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Forecasted Time" />
        ),
        cell: ({ row }) => (
          <>
            <div className="text-sm">
              {row.original.entryTime !== null &&
                format(row.original.entryTime, "dd/MM/yyyy")}
            </div>
            <div className="text-xs text-muted-foreground">
              {row.original.entryTime !== null &&
                format(row.original.entryTime, "hh:mm a")}
            </div>
          </>
        ),
      },
      {
        accessorKey: "availability",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Forecast available" />
        ),
        cell: ({ row }) => {
          return row.original.availability ? (
            <CheckCheck size={30} color="green" />
          ) : (
            <CircleX size={30} color="red" />
          );
        },
      },
      {
        id: "forceAdd",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="" />
        ),
        cell: ({ row }) => {
          return row.original.availability ? (
            <></>
          ) : (
            <SubmitBySMForSR row={row} />
          );
        },
      },
    ],
    ["storeId"]
  );

  return (
    <div className="px-3 2xl:px-[10rem] flex flex-col gap-2 py-2">
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
        columns={columnss}
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
