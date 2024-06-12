"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import type { StoreItemsType } from "@/typings";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const addOrDeleteVegForStoreCols: ColumnDef<StoreItemsType>[] = [
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
    id: "delete",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delete" />
    ),
    cell: ({ row }) => (
      <Button
        onClick={() => {
          console.log("Delete", row.original);
        }}
      >
        Delete
      </Button>
    ),
  },
];
