import type { userInfoType } from "@/typings";
import { Home } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import ProfileButton from "./ProfileButton";
import Sidebar from "./Sidebar";

export default function AdminNavbar({
  userInfo,
}: {
  userInfo: userInfoType | undefined;
}) {
  if (!userInfo) return null;
  return (
    <div className="flex justify-between p-2 dark:shadow-gray-900 shadow-sky-50 shadow-lg mb-10">
      <div className="flex items-center">
        <Sidebar />
        <Logo />
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={"/"}
          className="p-2 hover:bg-slate-200 dark:hover:bg-gray-700 rounded"
        >
          <Home size={30} className="text-gray-800 dark:text-slate-300" />
        </Link>
        <ProfileButton />
      </div>
    </div>
  );
}
