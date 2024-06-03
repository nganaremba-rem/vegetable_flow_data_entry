import Logo from "@/components/Logo";
import ProfileButton from "@/components/ProfileButton";
import { getSession } from "@/lib/auth";
import type { userSessionType } from "@/typings";

export default async function SalesManagerNavbar() {
  const session = await getSession<userSessionType>();
  if (!session) return null;

  return (
    <div className="flex  bg-slate-100 dark:bg-[#0A0A0A] dark:shadow-gray-900 justify-between items-center p-2 shadow-sky-50 shadow-lg mb-10">
      <div className=" px-5 ">
        <Logo />
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
