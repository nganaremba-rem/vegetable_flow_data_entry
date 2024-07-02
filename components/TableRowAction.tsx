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

import RemoveSRAssigned from "@/app/@admin/store/_component/RemoveSRAssigned";
import DeleteEntry from "@/components/DeleteEntry";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CustomMutateResponseType } from "@/typings";
import Link from "next/link";

export default function TableRowAction({
  editPageLink,
  serverActionFn,
  availableItemUpdateLink = null,
  assignSalesRepLink = null,
  removeSalesRepAssigned = null,
  storeItemsLink = null,
}: {
  editPageLink: string;
  serverActionFn: () => Promise<
    | {
        status: string;
        issues: any;
        message: string;
        data: never[];
      }
    | CustomMutateResponseType<[]>
  >;
  availableItemUpdateLink?: string | null;
  assignSalesRepLink?: string | null;
  removeSalesRepAssigned?: { storeId: string } | null;
  storeItemsLink?: string | null;
}) {
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
        <Button
          onClick={() => setOpenDropdown((prev) => !prev)}
          variant="ghost"
          className="h-8 w-8 p-0 outline-none"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <Link
          className="w-full block py-1 px-2 rounded hover:bg-primary-blue hover:text-white"
          href={editPageLink}
        >
          Edit
        </Link>
        <DropdownMenuSeparator />
        <Dialog onOpenChange={setOpenDropdown}>
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
                serverActionFn={serverActionFn}
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <DropdownMenuSeparator />
        {availableItemUpdateLink !== null && (
          <Link
            className="w-full block py-1 px-2 rounded hover:bg-sky-600 hover:text-white"
            href={availableItemUpdateLink}
          >
            Update Available Items
          </Link>
        )}

        {assignSalesRepLink !== null && (
          <Link
            className="w-full block py-1 px-2 rounded hover:bg-green-600 hover:text-white"
            href={assignSalesRepLink}
          >
            Assign Sales Rep
          </Link>
        )}

        {removeSalesRepAssigned !== null && (
          <>
            <RemoveSRAssigned
              setOpenDropdown={setOpenDropdown}
              storeId={removeSalesRepAssigned.storeId}
            />
          </>
        )}
        <DropdownMenuSeparator />

        {storeItemsLink !== null && (
          <Link
            className="w-full block py-1 px-2 rounded hover:bg-teal-600 hover:text-white"
            href={storeItemsLink}
          >
            View Store Items
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
