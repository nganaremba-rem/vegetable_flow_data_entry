import type { userInfoType } from "@/typings";
import Sidebar from "./Sidebar";
import ProfileButton from "./ProfileButton";
import Link from "next/link";
import { Home } from "lucide-react";

export default function AdminNavbar({
  userInfo,
}: {
  userInfo: userInfoType | undefined;
}) {
  if (!userInfo) return null;
  return (
    <div className="flex justify-between p-2 shadow-sky-50 shadow-lg mb-10">
      <Sidebar />
      <div className="flex items-center gap-2">
        <Link href={"/"} className="p-2 hover:bg-slate-200 rounded">
          <Home size={30} color="#333" />
        </Link>
        <ProfileButton />
      </div>
    </div>
  );
}
