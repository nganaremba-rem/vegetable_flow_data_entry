"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import type { FinalForecastedDataType } from "@/typings";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<FinalForecastedDataType>[] = [
  {
    accessorKey: "itemName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vegetable Name" />
    ),
  },
  {
    accessorKey: "count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Packets" />
    ),
  },
  {
    accessorKey: "weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Weights" />
    ),
  },
  {
    accessorKey: "suppliers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Suppliers" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[5rem] overflow-hidden">
          <div className="overflow-hidden text-ellipsis">
            {row.original.suppliers}
          </div>
        </div>
      );
    },
  },
  {
    id: "send_sms",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Send SMS" />
    ),
    cell: ({ row }) => {
      return (
        <Button
          className="bg-primary-blue hover:bg-sky-700 p-2 rounded text-white"
          onClick={() => {
            alert("SMS Sent");
          }}
        >
          Send SMS
        </Button>
      );
    },
  },
];
