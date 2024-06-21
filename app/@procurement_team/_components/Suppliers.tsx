"use client";

import { DialogContainer } from "@/components/DialogContainer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { SupplierType } from "@/typings";
import { MessageCircleMore, Phone } from "lucide-react";
import { useState } from "react";
import { v4 } from "uuid";

export default function Suppliers({
  suppliers,
}: {
  suppliers: SupplierType[];
}) {
  const [open, setOpen] = useState<boolean>(false);

  // const allSuppliers = suppliers.split(",");

  return (
    <>
      <Button
        className="bg-slate-100 hover:bg-slate-200 shadow-lg text-gray-700"
        onClick={() => setOpen(true)}
      >
        Select Supplier
      </Button>
      <DialogContainer open={open} setOpen={setOpen}>
        <div className="pt-5">
          <header className="font-bold text-gray-700 text-center mb-5">
            List of Suppliers
          </header>
          <ScrollArea className="h-[60svh]  px-3">
            {suppliers.map((supplier) => (
              <div
                className="grid items-center sm:grid-cols-3 gap-2 my-2"
                key={v4()}
              >
                <p>{supplier.name}</p>
                <Button className="flex gap-1 items-center bg-[#00C31E] hover:bg-[#009d18] ">
                  <Phone size={20} className="flex-shrink-0" />
                  <div className="text-sm">{supplier.phNo}</div>
                </Button>
                <Button className="flex gap-1 items-center bg-[#2d8686] hover:bg-[#246c6c]">
                  <MessageCircleMore size={20} className="flex-shrink-0" />{" "}
                  <div className="text-sm">Send SMS</div>
                </Button>
              </div>
            ))}
          </ScrollArea>
        </div>
      </DialogContainer>
    </>
  );
}
