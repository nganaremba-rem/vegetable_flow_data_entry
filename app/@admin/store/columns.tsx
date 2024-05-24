"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

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
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 outline-none">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="hover:bg-primary-blue hover:text-white"
              onClick={() =>
                navigator.clipboard.writeText(payment.id.toString())
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-red-500 hover:text-white">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
