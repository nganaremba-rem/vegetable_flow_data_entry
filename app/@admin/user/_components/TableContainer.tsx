"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTable } from "@/components/data-table";
import useCSVData from "@/hooks/useCSVData";
import type { UserType } from "@/typings";
import { format } from "date-fns";
import { useMemo } from "react";
import { columns } from "../columns";

export default function TableContainer({ data }: { data: UserType[] }) {
  const listOfKeysWithFormatterCallback = useMemo(
    () => [
      {
        key: "createdOn",
        cb: (value: string) => format(new Date(value), "dd-MM-yyyy hh:mm a"),
      },
    ],
    []
  );
  const csvData = useCSVData({ data, listOfKeysWithFormatterCallback });
  return (
    <div>
      <CSVDownloadButton
        csvData={csvData}
        filename={`Users - ${format(Date.now(), "dd-MM-yyyy hh:ss a")}`}
      />
      <DataTable
        searchId="userName"
        searchPlaceholder="Search Username"
        columns={columns}
        data={data}
      />
    </div>
  );
}
