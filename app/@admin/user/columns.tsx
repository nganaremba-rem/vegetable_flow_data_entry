"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";

import deleteUserAction from "@/actions/deleteUserAction";
import TableRowAction from "@/components/TableRowAction";
import type { UserType } from "@/typings";
import { format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<UserType>[] = [
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
          editPageLink={`/user/edit/${row.original.empId}`}
          serverActionFn={() => deleteUserAction(row.original.empId.toString())}
        />
      );
    },
  },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="ID" />
  //   ),
  // },

  // {
  //   accessorKey: "empId",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Employee ID" />
  //   ),
  // },
  {
    accessorKey: "userName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
  },
  // {
  //   accessorKey: "gender",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Gender" />
  //   ),
  // },
  {
    accessorKey: "roleCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role Code" />
    ),
  },
  {
    accessorKey: "storeId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Store ID" />
    ),
  },
  // {
  //   accessorKey: "info",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Info" />
  //   ),
  // },
  {
    accessorKey: "createdOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created On" />
    ),
    cell: ({ row }) => {
      return format(row.original.createdOn, "dd/MM/yyyy");
    },
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created by" />
    ),
  },
];
