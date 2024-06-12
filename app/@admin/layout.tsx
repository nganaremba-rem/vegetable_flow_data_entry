import AdminNavbar from "@/components/AdminNavbar";
import { Toaster } from "@/components/ui/toaster";
import { getSession } from "@/lib/auth";
import type { userSessionType } from "@/typings";
import { redirect } from "next/navigation";
import "react-toastify/ReactToastify.minimal.css";

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
      <Toaster />
    </>
  );
}
