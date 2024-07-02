"use client";

import removeSRFromStore from "@/actions/removeSRFromStore";
import { Button } from "@/components/ui/button";
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
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

export default function RemoveSRAssigned({
  storeId,
  setOpenDropdown,
}: {
  storeId: string;
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, setState] = useState<{
    issues: string[];
    message: string;
  }>({ issues: [], message: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        setOpenDropdown(open);
        setOpenDialog(open);
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className="p-2 bg-white text-left text-sm rounded hover:bg-red-600 hover:text-white"
        >
          Remove Sales Rep from Store
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to remove Sales Rep from the Store?
          </DialogTitle>
          <DialogDescription>
            {state?.issues?.[0] && (
              <div className="text-red-500 py-2">{state?.issues?.[0]}</div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" onClick={() => setOpenDropdown(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => {
              startTransition(async () => {
                const response = await removeSRFromStore(storeId);
                if (response.status === "SUCCESS") {
                  setOpenDropdown(false);
                  // setOpenDialog(false);

                  toast.success(
                    response.message || "Sales Rep removed successfully"
                  );
                } else {
                  setState({
                    issues: response.issues,
                    message: response.message,
                  });
                }
              });
            }}
            className="bg-red-600 text-white"
            disabled={pending}
          >
            {pending ? "Removing..." : "Remove"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
