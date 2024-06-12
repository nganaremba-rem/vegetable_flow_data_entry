"use client";

import { DialogContainer } from "@/components/DialogContainer";
import { Button } from "@/components/ui/button";
import { getRequest } from "@/services/apiGetRequests";
import type { VegetableType } from "@/typings";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function AvailableItemsPopUp({ data }: { data: string[] }) {
  const [open, setOpen] = useState(false);
  const [vegetables, setVegetables] = useState<(string | null)[]>([]);
  const [pending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const getAllData = async () => {
      try {
        const response = await Promise.all(
          data.map(async (vegId) => {
            const vegRes = await getRequest<VegetableType>({
              endpointUrl: `/item/getById/${vegId}`,
              tags: ["vegetable"],
            });
            if (vegRes.status !== "SUCCESS") return null;
            return vegRes.data.itemName;
          })
        );
        setVegetables(response);
      } catch (error: any) {
        console.log(error);
      } finally {
        setIsPending(false);
      }
    };

    if (data?.length) {
      getAllData();
    }
  }, [data]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>View Items</Button>

      <DialogContainer open={open} setOpen={setOpen}>
        <div>
          <h1 className="text-xl font-bold text-gray-700 mb-3">
            Available Items
          </h1>

          {vegetables.map((item) => (
            <p key={item} className="text-gray-600">
              {item}
            </p>
          ))}
          {pending && (
            <div className="p-2 flex justify-center items-center">
              <ClipLoader color="#0173DC" size={30} />
            </div>
          )}
        </div>
      </DialogContainer>
    </>
  );
}
