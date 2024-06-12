"use client";

import { DialogContainer } from "@/components/DialogContainer";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";
import { useTargetStore } from "@/store/updateTargetStore";
import type { StoreItemsType, VegetableType } from "@/typings";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { vegCols } from "../vegColumns";

export default function ModifyStoreItems({
  storeId,
  data,
  vegetables,
}: {
  storeId: string;
  data: StoreItemsType[];
  vegetables: VegetableType[];
}) {
  const { data: formData, setTarget } = useTargetStore((state) => state);
  const [openAddORRemoveVeg, setOpenAddORRemoveVeg] = useState(false);
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<{
    issues: string[];
    message: string;
  }>({
    issues: [],
    message: "",
  });

  useEffect(() => {
    setTarget(
      data.map((item) => ({ itemCode: item.itemCode, preset: item.preset }))
    );
  }, [data, setTarget]);

  const submitAddOrRemoveVeg = async () => {
    const response = await submitHandleValidationAndSessionErrors({
      endpointUrl: "/store/item/update",
      method: "PUT",
      revalidateTagString: "store",
      validatedFields: {
        data: { storeId, data: formData },
        success: true,
      },
    });

    if (response.status === "SUCCESS") {
      setOpenAddORRemoveVeg(false);
      toast.success(response.message || "Store Items Updated Successfully");
    } else {
      setState({ issues: [...response.issues], message: response.message });
    }
  };

  return (
    <div className="flex gap-2 my-4 flex-col sm:flex-row sm:items-center sm:justify-between">
      <Link
        href={`/store/storeItems/${storeId}/updateTarget`}
        className="bg-sky-600 text-white px-2 py-1 rounded hover:bg-sky-700"
      >
        Update Target
      </Link>
      {/* <Link
        href={`/store/storeItems/${storeId}/addorRemoveVeg`}
        className="bg-primary-blue text-white px-2 py-1 rounded hover:bg-sky-700"
      >
        Add / Remove Vegetables
      </Link> */}
      <Button
        onClick={() => setOpenAddORRemoveVeg(true)}
        size={"sm"}
        className="bg-primary-blue text-white px-2 py-1 rounded hover:bg-sky-700"
      >
        Add / Remove Vegetables
      </Button>

      <DialogContainer
        open={openAddORRemoveVeg}
        setOpen={setOpenAddORRemoveVeg}
      >
        <h4 className="text-lg text-gray-700">Vegetables List</h4>
        {state?.issues?.[0] && (
          <div className="text-red-500 py-2">{state?.issues?.[0]}</div>
        )}
        {state?.message && (
          <div className="text-green-600 bg-inherit py-2">{state.message}</div>
        )}

        <ScrollArea className="p-2">
          <DataTable
            data={vegetables}
            columns={vegCols}
            searchId="itemName"
            searchPlaceholder="Search Vegetable Name"
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <Button
          disabled={pending}
          onClick={() => {
            startTransition(() => {
              submitAddOrRemoveVeg();
            });
          }}
        >
          {pending ? "Updating..." : "Update"}
        </Button>
      </DialogContainer>
    </div>
  );
}
