import Logo from "@/components/Logo";
import ProfileButton from "@/components/ProfileButton";
import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { userSessionType } from "@/typings";
import { Home } from "lucide-react";
import Link from "next/link";

async function checkIfAlreadySubmitted(userId: string) {
  return await getRequest({
    endpointUrl: "/forecast/smReportStatus",
    tags: ["smReportStatus"],
    userId,
  });
}

export default async function StickyNav() {
  const session = await getSession<userSessionType>();
  if (!session) return null;

  const smReportStatus = await checkIfAlreadySubmitted(session.userInfo.userId);

  return (
    <div className="flex sticky top-0 z-[3] bg-slate-100 dark:bg-[#0A0A0A] dark:shadow-gray-900 justify-between items-center p-2 shadow-sky-50 shadow-lg mb-10">
      <div className="px-5">
        <Logo />
      </div>
      <div className="flex items-center gap-[2rem]">
        <Link
          href={"/"}
          className="p-2 hover:bg-slate-200 dark:hover:bg-gray-700 rounded"
        >
          <Home size={30} className="text-gray-800 dark:text-slate-200" />
        </Link>
        <div className="hidden items-center gap-2">
          {/* <SubmitToProcurementButton
            isAlreadySubmitted={smReportStatus.status === true}
          />
          <SelectVegList /> */}
        </div>
        {/* <Link href={"/"} className="p-2 hover:bg-slate-200 rounded">
          <Home size={30} color="#333" />
        </Link> */}
        <ProfileButton />
      </div>
    </div>
  );
}
