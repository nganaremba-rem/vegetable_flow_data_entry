import ProfileButton from "@/components/ProfileButton";
import { getSession } from "@/lib/auth";
import type { userSessionType } from "@/typings";
import { Home } from "lucide-react";
import Link from "next/link";
import SelectVegList from "./SelectVegList";
import SubmitToProcurementButton from "./SubmitToProcurementButton";

export default async function StickyNav() {
  const userInfo = await getSession<userSessionType>();
  if (!userInfo) return null;

  return (
    <div className="flex sticky top-0 z-[60]  bg-slate-100 justify-between items-center p-2 shadow-sky-50 shadow-lg mb-10">
      <h1 className="font-bold uppercase px-5">{userInfo.userInfo.storeId}</h1>
      <div className="flex items-center gap-[2rem]">
        <Link href={"/"} className="p-2 hover:bg-slate-200 rounded">
          <Home size={30} color="#333" />
        </Link>
        <SubmitToProcurementButton userId={userInfo.userInfo.userId} />
        <SelectVegList />
        {/* <Link href={"/"} className="p-2 hover:bg-slate-200 rounded">
          <Home size={30} color="#333" />
        </Link> */}
        <ProfileButton />
      </div>
    </div>
  );
}
