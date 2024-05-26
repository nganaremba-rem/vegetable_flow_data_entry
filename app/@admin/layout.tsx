import AdminNavbar from "@/components/AdminNavbar";
import { getSession } from "@/lib/auth";
import type { userSessionType } from "@/typings";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession<userSessionType>();

  if (!session) redirect("/");

  return (
    <>
      <AdminNavbar userInfo={session?.userInfo} />
      {children}
    </>
  );
}
