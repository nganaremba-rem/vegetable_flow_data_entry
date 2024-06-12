"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { FinalForecastedDataType } from "@/typings";
import type { ColumnDef } from "@tanstack/react-table";
import Suppliers from "./_components/Suppliers";

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
      <DataTableColumnHeader column={column} title="Forecasted Packets" />
    ),
    cell: ({ row }) => {
      return row.original.count < 0 ? "N/A" : row.original.count;
    },
  },
  {
    accessorKey: "weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Weights" />
    ),
    cell: ({ row }) => {
      return row.original.weight < 0 ? "N/A" : row.original.weight;
    },
  },
  {
    accessorKey: "suppliers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Suppliers" />
    ),
    cell: ({ row }) => {
      return <Suppliers suppliers={row.original.suppliers} />;
    },
  },
  // {
  //   id: "send_sms",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Send SMS" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <Button
  //         className="bg-primary-blue hover:bg-sky-700 p-2 rounded text-white"
  //         onClick={() => {
  //           alert("SMS Sent");
  //         }}
  //       >
  //         Send SMS
  //       </Button>
  //     );
  //   },
  // },
];
