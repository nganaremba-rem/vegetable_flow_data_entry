import AdminCard from "@/components/AdminCard";
import { Carrot, Store, User } from "lucide-react";
import Link from "next/link";
import { GiFarmer } from "react-icons/gi";

export default function Admin() {
  return (
    <>
      <div className="grid grid-cols-fluid p-2 gap-2 md:p-10">
        <Link href={"/store"}>
          <AdminCard title="Store" icon={<Store size={40} />} />
        </Link>
        <Link href={"/vegetable"}>
          <AdminCard title="Vegetable" icon={<Carrot size={40} />} />
        </Link>
        <Link href={"/user"}>
          <AdminCard title="User" icon={<User size={40} />} />
        </Link>
        <Link href={"/farmer"}>
          <AdminCard title="Farmer" icon={<GiFarmer size={40} />} />
        </Link>
      </div>
    </>
  );
}
