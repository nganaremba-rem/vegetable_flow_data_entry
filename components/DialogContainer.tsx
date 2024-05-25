import { Dialog, DialogContent } from "@/components/ui/dialog";
import type React from "react";

export function DialogContainer({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
