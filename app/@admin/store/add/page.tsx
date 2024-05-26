import { getSession } from "@/lib/auth";
import type { userSessionType } from "@/typings";
import AddStore from "./_component/AddStore";

export default async function AddStoreHompage() {
  const session = await getSession<userSessionType>();
  if (!session) return null;

  return <AddStore session={session} />;
}
