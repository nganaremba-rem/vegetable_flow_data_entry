"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";

import type { ItemsWithPreset, SalesRepForecastType } from "@/typings";
import SuggestedForecastField from "./_components/SuggestedForecastField";
import UpdateInventoryField from "./_components/UpdateInventoryField";
import UpdatePacketsRequiredField from "./_components/UpdatePacketsRequiredField";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ItemType = {
  id: number;
  itemName: string;
  itemGroup: string;
  packetWeight: number;
  preset: number;
};

export const columns: ColumnDef<ItemsWithPreset | SalesRepForecastType>[] = [
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
      <DataTableColumnHeader column={column} title="Vegetable" />
    ),
  },

  {
    accessorKey: "preset",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target" />
    ),
  },
  {
    id: "inventory",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Inventory" />
    ),
    cell: ({ row }) => {
      // add inventory when the input is updated
      return <UpdateInventoryField row={row} />;
    },
  },
  {
    id: "suggested_forecast",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Suggested Forecast" />
    ),
    cell: ({ row }) => {
      return <SuggestedForecastField row={row} />;
    },
  },
  {
    id: "packets_required",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales Rep. Forecast" />
    ),
    cell: ({ row }) => {
      return <UpdatePacketsRequiredField row={row} />;
    },
  },
];
