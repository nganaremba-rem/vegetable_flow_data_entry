"use client";

import { salesRepForecast } from "@/actions/salesRepForecast";
import { DialogContainer } from "@/components/DialogContainer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getRequest } from "@/services/apiGetRequests";
import type {
  DataAvailabilityType,
  ItemsWithPreset,
  userSessionType,
} from "@/typings";
import type { Row } from "@tanstack/react-table";
import { MailCheck, MessageCircleWarning } from "lucide-react";
import { useState, useTransition } from "react";

export default function SubmitZerosButton({
  row,
  session,
}: {
  row: Row<DataAvailabilityType>;
  session: userSessionType;
}) {
  const [state, setState] = useState<{
    issues: string[];
    message: string;
  }>({
    issues: [],
    message: "",
  });
  const [isPending, startTransition] = useTransition();

  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  async function submitZerosForecast() {
    const items = await getRequest<ItemsWithPreset[]>({
      endpointUrl: `/store/item/getAll?storeId=${row.original.storeId}`,
      tags: ["item"],
    });

    const dataToSubmit =
      items?.data?.map((item) => {
        return {
          itemCode: item.itemCode,
          inventory: 0,
          srForecast: 0,
        };
      }) || [];

    const finalData = {
      storeId: row.original.storeId,
      byRole: session.userInfo.userRole,
      data: dataToSubmit,
    };

    console.log(finalData);

    const { issues, message } = await salesRepForecast(finalData);
    setState({ issues, message });

    if (issues.length > 0) {
      setIsErrorDialogOpen(true);
      setIsSuccessDialogOpen(false);
    } else {
      setIsSuccessDialogOpen(true);
      setIsErrorDialogOpen(false);
    }
  }
  return (
    <div>
      <DialogContainer open={isErrorDialogOpen} setOpen={setIsErrorDialogOpen}>
        <div className="flex flex-col ">
          <div className="text-red-600 flex gap-6 items-center">
            <MessageCircleWarning size={30} color="red" />
            {state.issues?.[0] && state.issues[0]}
          </div>
          <Separator className="my-5" />
          <Button
            className="bg-red-600 text-white hover:bg-red-700 w-max self-end"
            onClick={() => setIsErrorDialogOpen(false)}
          >
            Close
          </Button>
        </div>
      </DialogContainer>
      <DialogContainer
        open={isSuccessDialogOpen}
        setOpen={setIsSuccessDialogOpen}
      >
        <div className="flex flex-col ">
          <div className="text-green-600 flex gap-6 items-center">
            <MailCheck size={39} color="green" />
            {state?.message}
          </div>
          <Separator className="my-5" />
          <Button
            className="bg-red-600 text-white hover:bg-red-700 w-max self-end"
            onClick={() => setIsSuccessDialogOpen(false)}
          >
            Close
          </Button>
        </div>
      </DialogContainer>
      <Button
        onClick={() => {
          startTransition(() => {
            submitZerosForecast();
          });
        }}
        disabled={isPending}
      >
        Submit Zeros
      </Button>
    </div>
  );
}
