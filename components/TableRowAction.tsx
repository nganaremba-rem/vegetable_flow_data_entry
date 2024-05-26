import type { StoreType } from "@/app/@admin/store/columns";
import type { Row } from "@tanstack/react-table";
import React from "react";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import DeleteEntry from "@/components/DeleteEntry";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function TableRowAction({ row }: { row: Row<StoreType> }) {
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [state, setState] = React.useState<{
    issues: string[];
    message: string;
  }>({ issues: [], message: "" });

  return (
    <DropdownMenu
      open={openDropdown}
      onOpenChange={(open) => setOpenDropdown(open)}
    >
      <DropdownMenuTrigger className="bg-primary-blue text-white" asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 outline-none">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <Link
          className="w-full block py-1 px-2 rounded hover:bg-primary-blue hover:text-white"
          href={`/store/edit/${row.original.storeId}`}
        >
          Edit
        </Link>
        <DropdownMenuSeparator />
        <Dialog>
          <DialogTrigger className="py-1 px-2 w-full text-left text-sm rounded hover:bg-red-600 hover:text-white">
            Delete
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete.
              </DialogDescription>
              <DialogDescription>
                {state?.issues?.[0] && (
                  <div className="text-red-500 py-2">{state?.issues?.[0]}</div>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DeleteEntry
                setOpenDropdown={setOpenDropdown}
                setState={setState}
                id={row.original.storeId}
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
