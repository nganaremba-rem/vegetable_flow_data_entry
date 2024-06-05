"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Button } from "@/components/ui/button";
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
    id: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Forecasted Time" />
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => {
      return row.original.availability ? (
        <></>
      ) : (
        <>
          <Button>Force Add</Button>
        </>
      );
    },
  },
];
