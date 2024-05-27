import { getSession } from "@/lib/auth";
import type { itemType, userSessionType } from "@/typings";
import MainComponent from "./_components/MainComponent";

async function getItems() {
  const response = await fetch("http://burn.pagekite.me/item/getAll", {
    cache: "no-store",
    next: {
      tags: ["item"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  const data = await response.json();
  return data as itemType[];
}

export default async function SaleRep() {
  const userInfo = await getSession<userSessionType>();
  if (!userInfo) return null;
  const items = await getItems();

  return <MainComponent items={items} userInfo={userInfo} />;
}
