"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { SrPredictedDataType } from "@/typings";
import type { ColumnDef } from "@tanstack/react-table";
import FinalForeCastField from "./_components/FinalForeCastField";

export const columns: ColumnDef<SrPredictedDataType>[] = [
  {
    accessorKey: "storeId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Store ID" />
    ),
  },
  // {
  //   accessorKey: "itemId",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Vegetable ID" />
  //   ),
  // },
  {
    accessorKey: "inventory",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Inventory" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.original.srForecast === -1 ? "N/A" : row.original.inventory}
        </div>
      );
    },
  },
  {
    accessorKey: "srForecast",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales Rep. Forecast" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.original.srForecast === -1 ? "N/A" : row.original.srForecast}
        </div>
      );
    },
  },
  {
    id: "final_forecast",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Final Forecast" />
    ),
    cell: ({ row }) => {
      return <FinalForeCastField row={row} />;
    },
  },
];
