import Logo from "@/components/Logo";
import ProfileButton from "@/components/ProfileButton";
import { getSession } from "@/lib/auth";
import type { userSessionType } from "@/typings";

export default async function ProcurementNavbar() {
  const userInfo = await getSession<userSessionType>();
  if (!userInfo) return <div>Session Expired</div>;

  return (
    <div className="flex  bg-slate-100 dark:bg-[#0A0A0A] dark:shadow-gray-900 justify-between items-center  shadow-sky-50 shadow-lg mb-10">
      <div className="font-bold flex items-center gap-5 text-gray-800 text-sm p-2 md:px-5">
        <Logo />
        Procurement Team
      </div>
      <div className="flex items-center gap-2">
        {/* <Link href={"/"} className="p-2 hover:bg-slate-200 rounded">
          <Home size={30} color="#333" />
        </Link> */}
        <ProfileButton />
      </div>
    </div>
  );
}
