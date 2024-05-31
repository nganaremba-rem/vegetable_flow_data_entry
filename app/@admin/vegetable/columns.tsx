"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";

import deleteVegetableAction from "@/actions/deleteVegetableAction";
import TableRowAction from "@/components/TableRowAction";
import type { VegetableType } from "@/typings";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<VegetableType>[] = [
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
    id: "actions",
    cell: ({ row }) => {
      return (
        <TableRowAction
          editPageLink={`/vegetable/edit/${row.original.id}`}
          serverActionFn={() =>
            deleteVegetableAction(row.original.id.toString())
          }
        />
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "itemName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vegetable Name" />
    ),
  },
  {
    accessorKey: "itemGroup",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vegetable Group" />
    ),
  },
  {
    accessorKey: "packetWeight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vegetable Weight" />
    ),
  },
  {
    accessorKey: "preset",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target" />
    ),
  },
];
