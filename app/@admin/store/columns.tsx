'use client';

import { DataTableColumnHeader } from '@/components/data-table-column-header';
import type { ColumnDef } from '@tanstack/react-table';

import deleteStoreAction from '@/actions/deleteStoreAction';
import TableRowAction from '@/components/TableRowAction';
import { format } from 'date-fns';
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
    id: 'actions',
    // The issue is likely due to z-index stacking - the overlay from the action buttons
    // may be appearing behind other elements. Setting a higher z-index should fix this
    cell: ({ row }) => {
      return (
        <div className='relative z-50'>
          <TableRowAction
            editPageLink={`/store/edit/${row.original.storeId}`}
            serverActionFn={() =>
              deleteStoreAction(row.original.storeId.toString())
            }
            assignSalesRepLink={
              !row.original.salesRep
                ? `/store/assign-sales-rep/${row.original.storeId}`
                : null
            }
            removeSalesRepAssigned={
              row.original.salesRep ? { storeId: row.original.storeId } : null
            }
            storeItemsLink={`/store/storeItems/${row.original.storeId}`}
          />
        </div>
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
  //   accessorKey: "storeId",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Store ID" />
  //   ),
  // },
  {
    accessorKey: 'storeName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Store Name' />
    ),
  },
  {
    accessorKey: 'salesRep',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sales Rep' />
    ),
  },
  // {
  //   accessorKey: "address",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Address" />
  //   ),
  // },
  // {
  //   accessorKey: "delKey",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Del Key" />
  //   ),
  // },
  {
    accessorKey: 'createdOn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created On' />
    ),
    cell: ({ row }) => {
      return format(row.original.createdOn, 'dd/MM/yyyy');
    },
  },
];
