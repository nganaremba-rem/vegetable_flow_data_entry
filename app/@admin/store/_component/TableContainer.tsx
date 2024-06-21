"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTable } from "@/components/data-table";
import useCSVData from "@/hooks/useCSVData";
import { format } from "date-fns";
import { useMemo } from "react";
import { type StoreType, columns } from "../columns";

export default function TableContainer({ data }: { data: StoreType[] }) {
  const hiddenColumns = useMemo(() => ["id"], []);
  const listOfKeysWithFormatterCallback = useMemo(
    () => [
      {
        key: "createdOn",
        cb: (value: string) => {
          return format(new Date(value), "dd-MM-yyyy HH:mm a");
        },
      },
    ],
    []
  );

  const csvData = useCSVData({
    data,
    hiddenColumns,
    listOfKeysWithFormatterCallback,
  });

  return (
    <div>
      <CSVDownloadButton
        csvData={csvData}
        filename={`Store - ${format(Date.now(), "dd-MM-yyyy hh:ss a")}`}
      />
      <DataTable
        searchPlaceholder="Search Store Name"
        searchId="storeName"
        columns={columns}
        data={data}
      />
    </div>
  );
}
