"use server";

import type { OptionType } from "@/components/ReactSelect";
import { getSession } from "@/lib/auth";
import { getRequest } from "@/services/apiGetRequests";
import type { FarmerType, VegetableType, userSessionType } from "@/typings";
import type { MultiValue } from "react-select";
import UpdateAvailableItemsForm from "./_components/UpdateAvailableItemsForm";

async function getFarmerById(farmerId: string, userId: string) {
  return await getRequest<FarmerType>({
    endpointUrl: `/farmer/getById/${farmerId}`,
    tags: [],
    userId,
  });
}

async function getAllVeg(userId: string) {
  return await getRequest<VegetableType[]>({
    endpointUrl: "/item/getAll",
    tags: ["vegetable"],
    userId,
  });
}

export default async function UpdateAvailableItems({
  params,
}: {
  params: { farmerId: string };
}) {
  const session = await getSession<userSessionType>();
  if (!session) return null;

  const farmerResponse = await getFarmerById(
    params.farmerId,
    session.userInfo.userId
  );

  const allVeg = await getAllVeg(session.userInfo.userId);

  const defaultValues: MultiValue<OptionType> = await Promise.all(
    farmerResponse.data.availableItem.split(",").map(async (itemId) => {
      const item = await getRequest<VegetableType>({
        endpointUrl: `/item/getById/${itemId}`,
        tags: [],
        userId: session.userInfo.userId,
      });

      return {
        label: item.data.itemName,
        value: item.data?.id ? item.data.id.toString() : "",
      } as OptionType;
    })
  );

  const options: MultiValue<OptionType> = await Promise.all(
    allVeg.data.map(async (veg) => {
      return {
        label: veg.itemName,
        value: veg.id.toString(),
      } as OptionType;
    })
  );

  return (
    <>
      <div className="p-2 lg:px-[25rem] grid gap-10">
        <h1 className="font-bold text-lg">Modify Available Items</h1>
        <UpdateAvailableItemsForm
          farmer={farmerResponse.data}
          defaultValues={defaultValues}
          options={options}
        />
      </div>
    </>
  );
}
