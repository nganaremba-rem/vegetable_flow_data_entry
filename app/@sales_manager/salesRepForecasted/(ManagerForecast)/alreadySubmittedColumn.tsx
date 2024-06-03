"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { SrPredictedDataType } from "@/typings";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<SrPredictedDataType>[] = [
  {
    accessorKey: "storeId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Store ID" />
    ),
  },
  {
    accessorKey: "itemId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vegetable ID" />
    ),
  },
  {
    accessorKey: "inventory",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Inventory" />
    ),
  },
  {
    accessorKey: "srForecast",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales Rep. Forecast" />
    ),
  },
  {
    accessorKey: "smForeCast",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Final Forecast" />
    ),
  },
];
