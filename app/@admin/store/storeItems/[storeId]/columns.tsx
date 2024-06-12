"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";

import type { StoreItemsType } from "@/typings";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<StoreItemsType>[] = [
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
];
