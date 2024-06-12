"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";
import { useTargetStore } from "@/store/updateTargetStore";
import type { StoreItemsType } from "@/typings";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { updateTargetColumns } from "../../_components/updateTargetColumns";

export default function UpdateTargetForm({
  data,
  storeId,
}: {
  data: StoreItemsType[];
  storeId: string;
}) {
  const { data: formData, setTarget } = useTargetStore((state) => state);
  const [state, setState] = useState<{
    issues: string[];
    message: string;
  }>({
    issues: [],
    message: "",
  });
  const router = useRouter();

  useEffect(() => {
    const dataToSet = data.map((item) => ({
      itemCode: item.itemCode,
      preset: item.preset,
    }));

    setTarget(dataToSet);
  }, [data, setTarget]);

  const [pending, startTransition] = useTransition();

  const submitUpdatedTarget = async () => {
    const response = await submitHandleValidationAndSessionErrors({
      endpointUrl: "/store/item/update",
      method: "PUT",
      revalidateTagString: "store",
      validatedFields: {
        data: {
          storeId,
          data: formData,
        },
        success: true,
      },
    });
    if (response.status === "SUCCESS") {
      router.back();
      toast.success(response.message || "Targets Updated Successfully");
    } else {
      setState({ issues: [...response.issues], message: response.message });
    }
  };

  return (
    <div>
      {state?.issues?.[0] && (
        <div className="text-red-500 py-2">{state?.issues?.[0]}</div>
      )}
      {state?.message && (
        <div className="text-green-600 bg-inherit py-2">{state.message}</div>
      )}

      <DataTable
        data={data}
        columns={updateTargetColumns}
        searchId="itemName"
        searchPlaceholder="Search Vegetable Name"
      />
      <Button
        onClick={() => {
          startTransition(() => {
            submitUpdatedTarget();
          });
        }}
        disabled={pending}
        className="w-full my-10 bg-primary-blue hover:bg-sky-700"
      >
        {pending ? "Submitting..." : "Submit Updated Targets"}
      </Button>
    </div>
  );
}
