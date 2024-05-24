import AdminCard from "@/components/AdminCard";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Admin() {
  return (
    <>
      <div className="grid grid-cols-fluid p-2 gap-2 md:p-10">
        <Link href={"/store"}>
          <AdminCard title="Store" />
        </Link>
        <Link href={"/item"}>
          <AdminCard title="Item" />
        </Link>
        <Link href={"/user"}>
          <AdminCard title="User" />
        </Link>
        <Link href={"/farmer"}>
          <AdminCard title="Farmer" />
        </Link>
      </div>
    </>
  );
}
