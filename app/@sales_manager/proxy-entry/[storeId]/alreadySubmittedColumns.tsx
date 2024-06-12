"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";

import type { ItemsWithPreset, SalesRepForecastType } from "@/typings";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ItemType = {
  id: number;
  itemName: string;
  itemGroup: string;
  packetWeight: number;
  preset: number;
};

export const alreadForecastedColumns: ColumnDef<
  SalesRepForecastType | ItemsWithPreset
>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "itemName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vegetable Name" />
    ),
  },
  {
    accessorKey: "preset",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target" />
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
      <DataTableColumnHeader column={column} title="Sales Rep. Forecasted" />
    ),
  },
];
