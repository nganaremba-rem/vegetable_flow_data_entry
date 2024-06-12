"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";

import type { VegetableType } from "@/typings";
import CheckedVegList from "./_components/CheckedVegList";
import SelectAllVegHeader from "./_components/SelectAllVegHeader";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const vegCols: ColumnDef<VegetableType>[] = [
  {
    accessorKey: "itemName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vegetable Name" />
    ),
  },
  {
    id: "select",
    header: ({ table }) => <SelectAllVegHeader table={table} />,
    cell: ({ row, table }) => <CheckedVegList row={row} table={table} />,
    enableSorting: false,
    enableHiding: false,
  },
];
