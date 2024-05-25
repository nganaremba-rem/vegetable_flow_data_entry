"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { DataAvailabilityType } from "@/typings";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckCheck, CircleX } from "lucide-react";

export const columns: ColumnDef<DataAvailabilityType>[] = [
  //   {
  //     accessorKey: "storeId",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Store ID" />
  //     ),
  //   },

  {
    accessorKey: "storeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Store Name" />
    ),
  },
  {
    accessorKey: "salesRep",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales Rep" />
    ),
  },
  {
    accessorKey: "availability",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Availability" />
    ),
    cell: ({ row }) => {
      return row.original.availability ? (
        <CheckCheck size={30} color="green" />
      ) : (
        <CircleX size={30} color="red" />
      );
    },
  },
];
