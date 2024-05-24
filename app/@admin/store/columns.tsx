"use client";

import { Checkbox } from "@/components/ui/checkbox";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

import TableRowAction from "@/components/TableRowAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StoreType = {
  id: number;
  storeId: string;
  storeName: string;
  salesRep: string;
  address: string;
  delKey: string;
  createdOn: string;
};

export const columns: ColumnDef<StoreType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },

  {
    accessorKey: "storeId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Store ID" />
    ),
  },
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
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
  },
  {
    accessorKey: "delKey",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Del Key" />
    ),
  },
  {
    accessorKey: "createdOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created On" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <TableRowAction row={row} />;
    },
  },
];
