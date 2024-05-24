import AdminNavbar from "@/components/AdminNavbar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) redirect("/");

  return (
    <>
      <AdminNavbar userInfo={session?.userInfo} />
      {children}
    </>
  );
}
