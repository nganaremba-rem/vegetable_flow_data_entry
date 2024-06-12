"use client";

import { ComboBoxResponsive, type DataType } from "@/components/ComboBox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { submitHandleValidationAndSessionErrors } from "@/services/submitHandleValidationAndSessionErrors";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";

export default function SRListSelect({
  data,
  storeId,
}: {
  data: DataType[];
  storeId: string;
}) {
  const [SrId, setSrId] = useState<null | string>(null);
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<{
    issues: string[];
    message: string;
  }>({
    issues: [],
    message: "",
  });
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-5">
        <Label>Select Sales Rep</Label>
        {state?.issues?.[0] && (
          <div className="text-red-500 py-2">{state?.issues?.[0]}</div>
        )}
        {state?.message && (
          <div className="text-green-600 bg-inherit py-2">{state.message}</div>
        )}
        <ComboBoxResponsive
          className="min-w-[10rem]"
          placeholder="Select Sales Rep"
          data={data}
          cb={(srId) => setSrId(srId)}
        />
      </div>
      <Button
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            const response = await submitHandleValidationAndSessionErrors({
              endpointUrl: "/store/updateSR",
              method: "PUT",
              revalidateTagString: "store",
              validatedFields: {
                data: { storeId, salesRepId: SrId },
                success: true,
              },
            });

            if (response.status === "SUCCESS") {
              router.back();
              toast.success(
                response.message || "Sales Rep assigned successfully"
              );
            } else {
              setState({
                issues: [...response.issues],
                message: response.message,
              });
            }
          });
        }}
        className="bg-sky-600 w-full text-white hover:bg-sky-700"
      >
        {pending ? "Assigning..." : "Assign"}
      </Button>
    </div>
  );
}
