"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";

import deleteFarmerAction from "@/actions/deleteFarmerAction";
import TableRowAction from "@/components/TableRowAction";
import type { FarmerType } from "@/typings";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<FarmerType>[] = [
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
          editPageLink={`/farmer/edit/${row.original.farmerId}`}
          serverActionFn={() =>
            deleteFarmerAction(row.original.farmerId.toString())
          }
          availableItemUpdateLink={`/farmer/edit/availableItems/${row.original.farmerId}`}
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
    accessorKey: "farmerId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Farmer ID" />
    ),
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
  },
  {
    accessorKey: "phoneNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
  },
  {
    accessorKey: "availableItem",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Available Items" />
    ),
  },
];
