import ProfileButton from "@/components/ProfileButton";
import { getSession } from "@/lib/auth";
import type { userSessionType } from "@/typings";

export default async function SalesRepNavbar() {
  const userInfo = await getSession<userSessionType>();
  if (!userInfo) return null;

  return (
    <div className="flex justify-between items-center p-2 shadow-sky-50 dark:shadow-gray-900 shadow-lg mb-10">
      <h1 className="font-bold uppercase px-5">{userInfo.userInfo.storeId}</h1>
      <div className="flex items-center gap-2">
        {/* <Link href={"/"} className="p-2 hover:bg-slate-200 rounded">
          <Home size={30} color="#333" />
        </Link> */}
        <ProfileButton />
      </div>
    </div>
  );
}
