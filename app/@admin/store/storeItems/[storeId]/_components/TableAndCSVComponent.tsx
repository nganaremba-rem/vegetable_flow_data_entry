"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTable } from "@/components/data-table";
import useCSVData from "@/hooks/useCSVData";
import type { StoreItemsType } from "@/typings";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useMemo } from "react";

type TableAndCSVComponentProps = {
  searchId: string;
  searchPlaceholder: string;
  data: StoreItemsType[] | [];
  columns: ColumnDef<StoreItemsType>[];
  storeName?: string;
};

export default function TableAndCSVComponent({
  searchId,
  searchPlaceholder,
  data,
  columns,
  storeName,
}: TableAndCSVComponentProps) {
  const hiddenColumns = useMemo(() => ["itemCode"], []);
  const csvData = useCSVData({
    data,
    hiddenColumns,
  });

  return (
    <div>
      <CSVDownloadButton
        csvData={csvData}
        filename={`Store Items for ${storeName} - ${format(
          Date.now(),
          "dd-MM-yyyy hh:ss a"
        )}`}
      />

      <DataTable
        searchId={searchId}
        searchPlaceholder={searchPlaceholder}
        data={data}
        columns={columns}
      />
    </div>
  );
}
