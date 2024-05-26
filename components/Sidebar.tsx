"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify, Carrot, Store, Tractor, Users } from "lucide-react";
import { useState } from "react";
import SheetItem from "./SheetItem";
import { Separator } from "./ui/separator";

export default function Sidebar() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet
      open={sheetOpen}
      modal={false}
      onOpenChange={(open) => setSheetOpen(open)}
    >
      <SheetTrigger>
        <div className="p-3 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700">
          <AlignJustify />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-2 pt-16 w-[15rem]">
        <SheetItem
          icon={<Store />}
          setSheetOpen={setSheetOpen}
          itemName="Store"
          href="/store"
        />
        <Separator />
        <SheetItem
          icon={<Users />}
          setSheetOpen={setSheetOpen}
          itemName="User"
          href="/user"
        />
        <Separator />
        <SheetItem
          icon={<Carrot />}
          setSheetOpen={setSheetOpen}
          itemName="Item"
          href="/item"
        />
        <Separator />
        <SheetItem
          icon={<Tractor />}
          setSheetOpen={setSheetOpen}
          itemName="Farmer"
          href="/farmer"
        />
        <Separator />
      </SheetContent>
    </Sheet>
  );
}