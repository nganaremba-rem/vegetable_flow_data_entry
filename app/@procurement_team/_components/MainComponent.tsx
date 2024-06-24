"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import useCSVData from "@/hooks/useCSVData";
import { useColumns } from "@/hooks/useColumns";
import { getColumnLabel } from "@/lib/keyToLabel";
import type { FinalForecastedDataType } from "@/typings";
import { format } from "date-fns";
import { useMemo } from "react";
import Suppliers from "./Suppliers";

export default function MainComponent({
  finalForecastedData,
}: {
  finalForecastedData: FinalForecastedDataType[];
}) {
  const hiddenColumns = useMemo(() => ["itemCode"], []);

  const csvData = useCSVData({ data: finalForecastedData, hiddenColumns });

  const columns = useColumns(
    finalForecastedData,
    [
      {
        accessorKey: "count",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={getColumnLabel("count")}
          />
        ),
        cell: ({ row }) => {
          return row.original.count < 0 ? "N/A" : row.original.count;
        },
      },
      {
        accessorKey: "weight",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={`${getColumnLabel("weight")} (KG)`}
          />
        ),
        cell: ({ row }) => {
          return row.original.weight < 0
            ? "N/A"
            : `${row.original.weight / 1000} KG`;
        },
      },
      {
        accessorKey: "suppliers",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={getColumnLabel("suppliers")}
          />
        ),
        cell: ({ row }) => {
          return <Suppliers suppliers={row.original.suppliers} />;
        },
      },
    ],
    ["itemCode", "suppliers.name", "suppliers.phNo"]
  );

  return (
    <div className="md:px-10 px-3  flex flex-col gap-2 py-2">
      <p className="text-muted-foreground text-sm">
        Date: {format(Date.now(), "dd/MM/yyyy")}
      </p>
      <div className="self-end flex items-center gap-2">
        <CSVDownloadButton
          csvData={csvData}
          filename={`Procurement team received data - ${format(
            Date.now(),
            "dd-MM-yyyy hh:ss a"
          )}`}
        />
      </div>
      <DataTable
        searchId="itemName"
        searchPlaceholder="Search Vegetables"
        columns={columns}
        data={finalForecastedData}
      />
    </div>
  );
}
