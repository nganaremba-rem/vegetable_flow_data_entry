"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import type { DataAvailabilityType } from "@/typings";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
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
