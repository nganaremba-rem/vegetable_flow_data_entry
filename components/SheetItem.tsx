"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SheetItem({
  itemName,
  href,
  setSheetOpen,
  icon,
}: {
  itemName: string;
  href: string;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  icon: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link href={href} onClick={() => setSheetOpen(false)}>
      <div
        className={` p-2 grid grid-cols-[1fr_5fr] rounded cursor-pointer select-none ${
          pathname === href
            ? "bg-primary-blue hover:bg-[rgb(1,130,250)] text-white font-bold"
            : "hover:bg-slate-200 text-gray-600"
        }`}
      >
        <div>{icon}</div>
        <div>{itemName}</div>
      </div>
    </Link>
  );
}
